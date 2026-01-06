-- USERS: role via auth metadata (role: 'admin' | 'user')

-- Storage bucket for receipts
-- Create via dashboard if not exists: 'receipts' public

-- Donations table (records successful approved donations)
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  amount numeric not null,
  campaign text not null,
  created_at timestamp with time zone default now()
);

alter table public.donations enable row level security;
create policy "donations_select_own" on public.donations for select using (auth.uid() = user_id);
create policy "donations_insert_own" on public.donations for insert with check (auth.uid() = user_id);

-- Manual payments submitted by users for admin moderation
create table if not exists public.manual_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  amount numeric not null,
  campaign text not null,
  receipt_url text,
  method text default 'upi',
  status text not null default 'pending', -- pending | approved | rejected
  created_at timestamp with time zone default now()
);

alter table public.manual_payments enable row level security;
create policy "manual_payments_insert_own" on public.manual_payments for insert with check (auth.uid() = user_id);
create policy "manual_payments_select_own" on public.manual_payments for select using (
  auth.uid() = user_id or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
);
create policy "manual_payments_update_admin" on public.manual_payments for update using (
  coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
) with check (
  coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
);

-- Fundraisers created by users
create table if not exists public.fundraisers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  status text not null default 'draft', -- draft | published | closed
  created_at timestamp with time zone default now()
);

alter table public.fundraisers enable row level security;
create policy "fundraisers_select_own_or_published" on public.fundraisers for select using (
  user_id = auth.uid() or status = 'published' or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
);
create policy "fundraisers_insert_own" on public.fundraisers for insert with check (auth.uid() = user_id);
create policy "fundraisers_update_own_or_admin" on public.fundraisers for update using (
  user_id = auth.uid() or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
) with check (
  user_id = auth.uid() or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
);

-- Admin helper view for pending manual payments
create or replace view public.v_pending_manual_payments as
select mp.*, u.email
from public.manual_payments mp
join auth.users u on u.id = mp.user_id
where mp.status = 'pending';

-- Payment settings (single row, id=1)
create table if not exists public.payment_settings (
  id int primary key default 1,
  upi text,
  bank text,
  account text,
  ifsc text,
  qr_url text,
  updated_at timestamp with time zone default now()
);

alter table public.payment_settings enable row level security;
drop policy if exists "payment_settings_public_read" on public.payment_settings;
create policy "payment_settings_public_read" on public.payment_settings
  for select using (true);

drop policy if exists "payment_settings_admin_write" on public.payment_settings;
create policy "payment_settings_admin_write" on public.payment_settings
  for all using (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  ) with check (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );