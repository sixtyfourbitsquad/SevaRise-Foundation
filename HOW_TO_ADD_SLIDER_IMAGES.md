# How to Add Homepage Slider Images

The homepage slider is empty because there are no slides in the database yet. Here's how to add them:

---

## ✅ **Method 1: Using Admin Panel (EASIEST - Recommended)**

### Step 1: Log in as Admin
1. Go to your website: http://localhost:8080
2. Click "Login" (top right)
3. Log in with your admin account

### Step 2: Go to Admin Panel
1. Click your avatar (top right)
2. Click "Dashboard"
3. You should see "Admin Panel"

### Step 3: Add Slides
1. Click the **"Content"** tab in Admin Panel
2. Click **"Add New Slide"** button
3. Fill in the form:
   - **Image URL:** Paste an image URL (see options below)
   - **Title:** e.g., "Help Children in Need"
   - **Description:** e.g., "Your donation makes a difference"
   - **Button Text:** e.g., "Donate Now"
   - **Button Link:** e.g., "/donate"
   - **Sort Order:** 0 (for first slide), 1 (for second), etc.
   - **Active:** ✅ Check this box
4. Click **"Save Slide"**
5. Repeat for 2-3 more slides

### Step 4: Refresh Homepage
- Go back to homepage (http://localhost:8080)
- The slider should now be visible!

---

## 🖼️ **Where to Get Image URLs**

### Option A: Free Stock Photos (Easiest)

**Unsplash:**
1. Go to https://unsplash.com
2. Search for images (e.g., "children", "charity", "helping")
3. Click on an image you like
4. Click "Download" or right-click → "Copy image address"
5. Use that URL in the Image URL field

**Example Unsplash URLs:**
```
https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920
https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920
https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920
```

**Pexels:**
1. Go to https://pexels.com
2. Search for images
3. Click on an image
4. Right-click → "Copy image address"
5. Use that URL

**Example Pexels URLs:**
```
https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg
https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg
```

### Option B: Upload to Supabase Storage (Optional)

If you want to upload your own images:

1. **Go to Supabase Dashboard**
2. **Click "Storage"** in left sidebar
3. **Click on "images" bucket** (or create it if it doesn't exist)
4. **Click "Upload file"**
5. **Select your image** and upload
6. **Click on the uploaded file**
7. **Copy the "Public URL"**
8. **Use that URL** in the Admin Panel

---

## 💻 **Method 2: Add Slides Using SQL (Alternative)**

If you prefer to add slides directly in Supabase:

1. **Go to Supabase Dashboard**
2. **Click "SQL Editor"**
3. **Click "New query"**
4. **Copy and paste** this SQL (replace with your image URLs):

```sql
-- Add your first slide
INSERT INTO public.hero_slides (image_url, title, description, cta, cta_link, sort_order, is_active)
VALUES (
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920',
  'Help Children in Need',
  'Your donation makes a real difference in children''s lives',
  'Donate Now',
  '/donate',
  0,
  true
);

-- Add your second slide
INSERT INTO public.hero_slides (image_url, title, description, cta, cta_link, sort_order, is_active)
VALUES (
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920',
  'Feed the Hungry',
  'Help provide meals to families in need',
  'Donate Now',
  '/donate',
  1,
  true
);

-- Add your third slide
INSERT INTO public.hero_slides (image_url, title, description, cta, cta_link, sort_order, is_active)
VALUES (
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920',
  'Education for All',
  'Support education programs for underprivileged children',
  'Donate Now',
  '/donate',
  2,
  true
);
```

5. **Click "Run"**
6. **Refresh your homepage** - slides should appear!

---

## 🔍 **Troubleshooting**

### Slider still not showing?

1. **Check if slides exist:**
   - Go to Supabase Dashboard → Table Editor
   - Click on `hero_slides` table
   - You should see your slides listed

2. **Check if slides are active:**
   - Make sure `is_active` column is `true` (checked)

3. **Check browser console:**
   - Press F12 in your browser
   - Look for any errors
   - Check if Supabase connection is working

4. **Verify Supabase connection:**
   - Make sure `.env` file has correct Supabase URL and key
   - Restart dev server: `npm run dev`

5. **Check image URLs:**
   - Make sure image URLs are publicly accessible
   - Test the URL in a new browser tab - image should load

---

## 📝 **Quick Test**

To quickly test if everything works:

1. Add ONE slide with this SQL:
```sql
INSERT INTO public.hero_slides (image_url, title, description, cta, cta_link, sort_order, is_active)
VALUES (
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920',
  'Test Slide',
  'This is a test slide',
  'Donate Now',
  '/donate',
  0,
  true
);
```

2. Refresh homepage
3. You should see the slider with one image
4. If it works, add more slides!

---

## ✅ **Summary**

**You DON'T need to upload images to Supabase Storage** - you can use any public image URL from:
- Unsplash
- Pexels  
- Any other image hosting service
- Or upload to Supabase Storage if you prefer

**The easiest way is:**
1. Get image URLs from Unsplash
2. Use Admin Panel → Content tab → Add New Slide
3. Paste the image URL
4. Fill in title, description, etc.
5. Save
6. Done! 🎉

