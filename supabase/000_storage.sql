-- donations
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  amount numeric not null,
  campaign text not null,
  created_at timestamp with time zone default now()
);

-- fundraisers
create table if not exists public.fundraisers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  status text not null default 'draft',
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.donations enable row level security;
drop policy if exists "donations_select_own" on public.donations;
create policy "donations_select_own" on public.donations
  for select using (auth.uid() = user_id);
drop policy if exists "donations_insert_own" on public.donations;
create policy "donations_insert_own" on public.donations
  for insert with check (auth.uid() = user_id);

alter table public.fundraisers enable row level security;
drop policy if exists "fundraisers_select_own" on public.fundraisers;
create policy "fundraisers_select_own" on public.fundraisers
  for select using (auth.uid() = user_id);
drop policy if exists "fundraisers_insert_own" on public.fundraisers;
create policy "fundraisers_insert_own" on public.fundraisers
  for insert with check (auth.uid() = user_id);