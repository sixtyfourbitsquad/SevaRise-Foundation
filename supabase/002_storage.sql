-- Create storage bucket for receipts (if not created via dashboard)
insert into storage.buckets (id, name, public) values ('receipts', 'receipts', true)
on conflict (id) do nothing;

-- Allow users to upload to their own folder and read public files
drop policy if exists "receipts_public_read" on storage.objects;
create policy "receipts_public_read" on storage.objects
for select using (bucket_id = 'receipts');

drop policy if exists "receipts_user_insert" on storage.objects;
create policy "receipts_user_insert" on storage.objects
for insert with check (
  bucket_id = 'receipts' and (auth.uid()::text = (substring(name from '^[^/]+'))) -- path starts with user_id/
);

drop policy if exists "receipts_user_update" on storage.objects;
create policy "receipts_user_update" on storage.objects
for update using (
  bucket_id = 'receipts' and (auth.uid()::text = (substring(name from '^[^/]+')))
) with check (
  bucket_id = 'receipts' and (auth.uid()::text = (substring(name from '^[^/]+')))
);

-- Create storage bucket for images (if not created via dashboard)
insert into storage.buckets (id, name, public) values ('images', 'images', true)
on conflict (id) do nothing;

-- Allow public read access to images bucket
drop policy if exists "images_public_read" on storage.objects;
create policy "images_public_read" on storage.objects
for select using (bucket_id = 'images');

-- Allow authenticated users (especially admins) to upload to images bucket
drop policy if exists "images_authenticated_insert" on storage.objects;
create policy "images_authenticated_insert" on storage.objects
for insert with check (
  bucket_id = 'images' and auth.uid() is not null
);

-- Allow authenticated users to update images
drop policy if exists "images_authenticated_update" on storage.objects;
create policy "images_authenticated_update" on storage.objects
for update using (
  bucket_id = 'images' and auth.uid() is not null
) with check (
  bucket_id = 'images' and auth.uid() is not null
);


