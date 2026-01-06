# Fix QR Code Not Showing on Payment Page

If you upload a QR code in Admin Panel and save it, but it doesn't show on the visitor payment page, follow these steps:

---

## 🔍 **Step 1: Verify QR Code is Saved in Database**

1. **Go to Supabase Dashboard**
2. **Click** "Table Editor" in left sidebar
3. **Click** on `payment_settings` table
4. **Check** the `qr_url` column - is there a URL there?
   - ✅ **If YES:** The URL is saved, proceed to Step 2
   - ❌ **If NO or EMPTY:** The save didn't work, proceed to Step 3

---

## 🔒 **Step 2: Check Storage Bucket is Public**

The QR code is uploaded to the `images` storage bucket. It must be **public** for visitors to see it.

### **Check if bucket is public:**
1. **Go to Supabase Dashboard**
2. **Click** "Storage" in left sidebar
3. **Click** on `images` bucket
4. **Check** if it says **"Public bucket"** ✅
   - ✅ **If YES:** Proceed to Step 3
   - ❌ **If NO:** Make it public (see below)

### **Make bucket public:**
1. **Click** on `images` bucket
2. **Click** "Settings" or the gear icon ⚙️
3. **Find** "Public bucket" toggle
4. **Turn it ON** ✅
5. **Save**

---

## 🖼️ **Step 3: Verify Storage Policies**

The storage bucket needs proper policies for public read access.

### **Check/Add Storage Policy:**
1. **Go to Supabase Dashboard**
2. **Click** "Storage" → `images` bucket
3. **Click** "Policies" tab
4. **Check** if there's a policy that allows public read access

### **If no policy exists, add one:**
1. **Go to SQL Editor** in Supabase
2. **Run** this SQL:

```sql
-- Allow public read access to images bucket
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');
```

---

## 🔗 **Step 4: Test the QR Code URL**

1. **Copy the QR URL** from the database (Step 1)
2. **Paste it in a new browser tab**
3. **Does the image load?**
   - ✅ **If YES:** The URL works, proceed to Step 5
   - ❌ **If NO:** The URL is broken, see Step 6

---

## 💾 **Step 5: Clear Cache and Refresh**

Sometimes the browser caches the old (empty) QR URL.

1. **On the payment page**, do a **hard refresh:**
   - **Windows:** `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac:** `Cmd + Shift + R`
2. **Or clear browser cache** completely
3. **Try again**

---

## 🔄 **Step 6: Re-upload QR Code**

If the URL doesn't work, try re-uploading:

### **Method A: Upload via Admin Panel**
1. **Go to Admin Panel** → **Payments** tab
2. **Click** "Choose File" under QR Code
3. **Select** your QR code image
4. **Wait** for upload to complete (you should see a preview)
5. **Click** "Save Settings"
6. **Check** if you see "Saved" message
7. **Refresh** the payment page

### **Method B: Upload to Supabase Storage Manually**
1. **Go to Supabase Dashboard** → **Storage** → `images` bucket
2. **Click** "Upload file"
3. **Select** your QR code image
4. **Upload**
5. **Click** on the uploaded file
6. **Copy** the "Public URL"
7. **Go to Admin Panel** → **Payments** tab
8. **Paste** the URL in "QR Code Image URL" field
9. **Click** "Save Settings"

### **Method C: Use External Image URL**
If Supabase storage isn't working, use an external image hosting service:

1. **Upload** your QR code to:
   - **Imgur:** https://imgur.com (free, no account needed)
   - **ImgBB:** https://imgbb.com (free)
   - **Any image hosting service**
2. **Copy** the direct image URL (should end in .jpg, .png, etc.)
3. **Go to Admin Panel** → **Payments** tab
4. **Paste** the URL in "QR Code Image URL" field
5. **Click** "Save Settings"

---

## 🐛 **Step 7: Check Browser Console for Errors**

1. **Open** the payment page
2. **Press** `F12` to open Developer Tools
3. **Click** "Console" tab
4. **Look** for any red error messages
5. **Common errors:**
   - `CORS error` → Storage bucket needs public access
   - `404 Not Found` → URL is wrong or file doesn't exist
   - `403 Forbidden` → Storage policy issue

---

## ✅ **Step 8: Verify Database Update**

After saving, verify the URL was actually saved:

1. **Go to Supabase Dashboard** → **Table Editor**
2. **Click** `payment_settings` table
3. **Check** `qr_url` column - should have a URL
4. **If empty:** The save failed, check browser console for errors

---

## 🔧 **Quick Fix Checklist**

- [ ] `images` storage bucket exists
- [ ] `images` bucket is marked as **Public** ✅
- [ ] Storage policy allows public read access
- [ ] QR URL is saved in `payment_settings` table
- [ ] QR URL is accessible (test in new tab)
- [ ] Browser cache cleared
- [ ] Payment page refreshed

---

## 💡 **Common Issues & Solutions**

### **Issue: "Save Settings" shows error**
**Solution:** Check browser console (F12) for error message. Common causes:
- Storage bucket doesn't exist → Create `images` bucket
- No write permission → Check you're logged in as admin
- Database error → Check Supabase logs

### **Issue: QR shows in admin panel preview but not on payment page**
**Solution:** 
- The preview uses the state value, but payment page reads from database
- Make sure you clicked "Save Settings" after uploading
- Check database has the URL saved

### **Issue: QR URL is saved but image doesn't load**
**Solution:**
- Check if URL is accessible (paste in new tab)
- Verify storage bucket is public
- Check storage policies allow public read
- Try using external image hosting (Imgur, etc.)

### **Issue: Upload works but URL is wrong format**
**Solution:**
- The URL should be a full URL like: `https://xxxxx.supabase.co/storage/v1/object/public/images/payment_qr/...`
- If it's just a path, the upload didn't complete properly
- Try re-uploading

---

## 🧪 **Test the Fix**

1. **Upload** QR code in Admin Panel
2. **Click** "Save Settings"
3. **Wait** for "Saved" message
4. **Go to** payment page (as visitor, not logged in)
5. **Check** if QR code appears
6. **If still not showing:**
   - Open browser console (F12)
   - Check for errors
   - Verify URL in database
   - Test URL in new tab

---

## 📝 **Manual SQL Update (Last Resort)**

If nothing works, you can manually set the QR URL in the database:

1. **Go to Supabase** → **SQL Editor**
2. **Run** this (replace with your actual QR image URL):

```sql
UPDATE public.payment_settings 
SET qr_url = 'https://your-qr-image-url-here.com/qr.png'
WHERE id = 1;
```

3. **Refresh** payment page

---

## ✅ **Summary**

**Most common fix:**
1. Make sure `images` storage bucket is **Public** ✅
2. Upload QR code in Admin Panel
3. **Click "Save Settings"** (important!)
4. Clear browser cache
5. Refresh payment page

If it still doesn't work, use an external image hosting service (Imgur) and paste the URL directly.

