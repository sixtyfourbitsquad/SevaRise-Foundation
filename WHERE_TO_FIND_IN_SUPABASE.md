# Where to Find Things in Supabase Dashboard

Quick guide to navigate Supabase Dashboard for fixing QR code issues.

---

## 📍 **Where to Make Images Bucket Public**

### **Step-by-Step:**
1. **Go to:** https://supabase.com/dashboard
2. **Log in** to your account
3. **Click** on your project name (SevaRise Foundation or whatever you named it)
4. **In the LEFT SIDEBAR**, look for **"Storage"** (it has a folder/box icon 📁)
5. **Click** "Storage"
6. **You'll see a list of buckets** - look for `images` bucket
7. **Click** on the `images` bucket name
8. **You'll see tabs:** Files, Policies, Settings
9. **Click** "Settings" tab
10. **Look for** "Public bucket" toggle/checkbox
11. **Turn it ON** ✅
12. **Click** "Save" or it auto-saves

**If `images` bucket doesn't exist:**
- Click "New bucket" button
- Name: `images`
- Check "Public bucket" ✅
- Click "Create bucket"

---

## 📍 **Where to Run SQL (Add Storage Policies)**

### **Step-by-Step:**
1. **Go to:** https://supabase.com/dashboard
2. **Click** on your project
3. **In the LEFT SIDEBAR**, look for **"SQL Editor"** (it has a code/terminal icon </>)
4. **Click** "SQL Editor"
5. **Click** "New query" button (top right, or in the middle)
6. **Paste** your SQL code
7. **Click** "Run" button (or press Ctrl+Enter)
8. **Wait** for "Success" message

---

## 📍 **Where to Check if QR URL is Saved**

### **Step-by-Step:**
1. **Go to:** https://supabase.com/dashboard
2. **Click** on your project
3. **In the LEFT SIDEBAR**, look for **"Table Editor"** (it has a table/grid icon 📊)
4. **Click** "Table Editor"
5. **In the dropdown** at the top, select **"payment_settings"**
6. **You'll see a table** with columns: id, upi, bank, account, ifsc, qr_url, updated_at
7. **Look at the `qr_url` column** - is there a URL there?

---

## 📍 **Where to Check Storage Buckets**

### **Step-by-Step:**
1. **Go to:** https://supabase.com/dashboard
2. **Click** on your project
3. **In the LEFT SIDEBAR**, click **"Storage"**
4. **You'll see a list** of all buckets:
   - `receipts`
   - `images`
   - (any others you created)
5. **Click** on a bucket name to see its files and settings

---

## 📍 **Where to Check Storage Policies**

### **Step-by-Step:**
1. **Go to:** Supabase Dashboard → Storage
2. **Click** on `images` bucket
3. **Click** "Policies" tab
4. **You'll see** a list of policies
5. **Look for** a policy that allows public read access

---

## 📍 **Where to Upload QR Code Manually (Alternative)**

### **Step-by-Step:**
1. **Go to:** Supabase Dashboard → Storage
2. **Click** on `images` bucket
3. **Click** "Upload file" button (usually top right)
4. **Select** your QR code image file
5. **Click** "Upload"
6. **Wait** for upload to complete
7. **Click** on the uploaded file name
8. **Copy** the "Public URL" shown
9. **Go to** your website Admin Panel → Payments tab
10. **Paste** the URL in "QR Code Image URL" field
11. **Click** "Save Settings"

---

## 🗺️ **Visual Navigation Map**

```
Supabase Dashboard
│
├── 🔑 Authentication (for user management)
│   └── Users (to add admin role)
│
├── 📊 Table Editor (to check database)
│   └── payment_settings (to check qr_url)
│
├── 📁 Storage (for file uploads)
│   ├── receipts bucket
│   └── images bucket ← QR codes go here
│       ├── Files (to see uploaded files)
│       ├── Policies (to check permissions)
│       └── Settings (to make bucket public)
│
└── </> SQL Editor (to run SQL commands)
    └── New query (to add storage policies)
```

---

## 🎯 **Quick Checklist - Where to Go**

**To fix QR code not showing:**

1. ✅ **Check if QR is saved:**
   - Table Editor → `payment_settings` → Check `qr_url` column

2. ✅ **Make bucket public:**
   - Storage → `images` bucket → Settings → Turn on "Public bucket"

3. ✅ **Add storage policies:**
   - SQL Editor → New query → Paste SQL → Run

4. ✅ **Re-upload QR:**
   - Admin Panel → Payments tab → Upload file → Save Settings

5. ✅ **Test:**
   - Copy `qr_url` from database → Paste in new browser tab → Should see image

---

## 💡 **Can't Find Something?**

**If you can't see "Storage" in sidebar:**
- Make sure you're in the correct project
- Refresh the page
- Check if you have the right permissions

**If you can't see "Table Editor":**
- It might be under "Database" → "Tables"
- Or look for "Database" in the sidebar

**If the UI looks different:**
- Supabase updates their UI sometimes
- Look for similar names: "Files", "Buckets", "Database", "SQL"

---

## 📞 **Still Stuck?**

If you can't find something, describe what you see in your Supabase Dashboard and I'll guide you to the right place!

