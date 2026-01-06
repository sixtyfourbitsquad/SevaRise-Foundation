-- Allow manual payments without user account and capture donor details
alter table public.manual_payments
  alter column user_id drop not null,
  add column if not exists donor_name text,
  add column if not exists donor_email text,
  add column if not exists donor_mobile text,
  add column if not exists anonymous boolean default false;

-- Relax insert/select RLS to allow public inserts (anonymous)
drop policy if exists "manual_payments_insert_own" on public.manual_payments;
create policy "manual_payments_insert_public" on public.manual_payments
  for insert with check (true);

drop policy if exists "manual_payments_select_own" on public.manual_payments;
create policy "manual_payments_select_own_or_admin" on public.manual_payments
  for select using (
    (auth.uid() is not null and user_id = auth.uid())
    or coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );


