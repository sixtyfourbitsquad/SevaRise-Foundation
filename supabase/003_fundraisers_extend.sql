-- Extend fundraisers to support rich campaign fields and moderation
alter table public.fundraisers
  add column if not exists slug text unique,
  add column if not exists subtitle text,
  add column if not exists story text,
  add column if not exists image text,
  add column if not exists raised numeric default 0,
  add column if not exists goal numeric,
  add column if not exists donations integer default 0,
  add column if not exists days_left integer default 0,
  add column if not exists organizer text,
  add column if not exists organizer_verified boolean default false,
  add column if not exists organizer_bio text,
  add column if not exists impact jsonb default '[]'::jsonb,
  add column if not exists updates jsonb default '[]'::jsonb,
  add column if not exists status text default 'pending';

-- Update RLS policies if they already exist to allow published/approved visibility
drop policy if exists "fundraisers_select_own_or_published" on public.fundraisers;
create policy "fundraisers_select_own_or_published" on public.fundraisers
  for select using (
    user_id = auth.uid() or status in ('published','approved') or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );

-- Allow admin to insert fundraisers
drop policy if exists "fundraisers_insert_admin" on public.fundraisers;
create policy "fundraisers_insert_admin" on public.fundraisers
  for insert with check (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );

-- Allow admin to delete fundraisers
drop policy if exists "fundraisers_delete_admin" on public.fundraisers;
create policy "fundraisers_delete_admin" on public.fundraisers
  for delete using (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );


