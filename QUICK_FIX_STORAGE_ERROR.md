# Quick Fix: "new row violates row-level security policy" Error

This error happens when trying to upload QR code because storage policies aren't set up.

---

## ⚡ **Quick Fix (2 minutes)**

### **Step 1: Go to Supabase SQL Editor**
1. **Go to:** https://supabase.com/dashboard
2. **Click** on your project
3. **Click** "SQL Editor" in left sidebar
4. **Click** "New query"

### **Step 2: Run This SQL**
**Copy and paste** this entire SQL block:

```sql
-- Fix storage policy error for QR code uploads

-- Make sure images bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "images_authenticated_delete" ON storage.objects;

-- Allow public read access
CREATE POLICY "images_public_read" 
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users to upload
CREATE POLICY "images_authenticated_insert" 
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);

-- Allow authenticated users to update
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

-- Allow authenticated users to delete
CREATE POLICY "images_authenticated_delete" 
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);
```

### **Step 3: Click "Run"**
- Click the **"Run"** button (or press Ctrl+Enter)
- You should see: **"Success. No rows returned"**

### **Step 4: Try Uploading Again**
1. **Go back** to Admin Panel → Payments tab
2. **Click** "Choose File"
3. **Select** your QR code image
4. **Upload** should work now! ✅

---

## ✅ **What This Does**

This SQL:
- ✅ Creates `images` bucket if it doesn't exist
- ✅ Makes it public (so visitors can see QR codes)
- ✅ Allows any logged-in user to upload files
- ✅ Allows public read access (so QR codes show on payment page)
- ✅ Allows updating/deleting files

---

## 🔍 **Verify It Worked**

After running the SQL:

1. **Go to** Supabase Dashboard → Storage
2. **Click** on `images` bucket
3. **Click** "Policies" tab
4. **You should see** 4 policies:
   - `images_public_read`
   - `images_authenticated_insert`
   - `images_authenticated_update`
   - `images_authenticated_delete`

---

## 🐛 **If You Still Get Errors**

### **Error: "bucket does not exist"**
- The bucket wasn't created
- **Fix:** Go to Storage → Create bucket → Name: `images` → Public: ✅

### **Error: "permission denied"**
- You're not logged in
- **Fix:** Make sure you're logged in on your website as admin

### **Error: "policy already exists"**
- Policies were already created
- **Fix:** The DROP POLICY statements should handle this, but if it fails, just continue - it means policies exist

---

## 📝 **Alternative: Use External Image URL**

If storage still doesn't work, use an external image hosting service:

1. **Upload** QR to **Imgur:** https://imgur.com
2. **Copy** the image URL
3. **Paste** in Admin Panel → Payments → "QR Code Image URL" field
4. **Click** "Save Settings"

This bypasses Supabase storage completely.

---

## ✅ **Summary**

**The fix:**
1. Run the SQL above in Supabase SQL Editor
2. Try uploading QR code again
3. Should work! ✅

**If it still fails:**
- Use Imgur or another image hosting service
- Paste the URL directly in the "QR Code Image URL" field

