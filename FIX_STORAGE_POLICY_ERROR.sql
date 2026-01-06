-- Fix "new row violates row-level security policy" error for QR code uploads
-- Run this in Supabase SQL Editor

-- Step 1: Make sure images bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Step 2: Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_delete" ON storage.objects;

-- Step 3: Allow public read access (so visitors can see QR codes)
CREATE POLICY "images_public_read" 
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Step 4: Allow authenticated users to upload (any logged-in user can upload)
CREATE POLICY "images_authenticated_insert" 
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);

-- Step 5: Allow authenticated users to update/overwrite files
CREATE POLICY "images_authenticated_update" 
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
)
WITH CHECK (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);

-- Step 6: Allow authenticated users to delete files
CREATE POLICY "images_authenticated_delete" 
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);

-- Verify: Check if policies were created
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE 'images%';


