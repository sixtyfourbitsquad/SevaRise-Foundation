-- Hero slides table for dynamic homepage carousel
create table if not exists public.hero_slides (
  id bigint generated always as identity primary key,
  image_url text not null,
  title text not null,
  description text not null,
  cta text default 'Donate Now',
  cta_link text default '/donate',
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table public.hero_slides enable row level security;

-- Public can read only active slides
drop policy if exists "Hero slides public read" on public.hero_slides;
create policy "Hero slides public read" on public.hero_slides
  for select using (is_active = true);

-- Admin full access (matches role in JWT metadata)
drop policy if exists "Hero slides admin write" on public.hero_slides;
create policy "Hero slides admin write" on public.hero_slides
  for all using (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  ) with check (
    coalesce((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role', '') = 'admin'
  );

-- Optional: images storage bucket should exist as 'images' (public)
-- Create via dashboard if not already created.
