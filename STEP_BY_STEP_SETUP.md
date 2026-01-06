# Complete Step-by-Step Setup Guide
## SevaRise Foundation - Donation Platform

Follow these steps **in order** to get your website up and running.

---

## 📋 **STEP 1: Create Supabase Account & Project**

1. **Go to** https://supabase.com
2. **Click** "Start your project" or "Sign up"
3. **Sign up** with GitHub, Google, or email
4. **Click** "New Project"
5. **Fill in the form:**
   - **Name:** SevaRise Foundation (or any name you prefer)
   - **Database Password:** Create a strong password (save it somewhere safe!)
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Free tier is fine to start
6. **Click** "Create new project"
7. **Wait** 2-3 minutes for project to initialize

---

## 🔑 **STEP 2: Get Your Supabase API Keys**

1. **In Supabase Dashboard**, click **Settings** (gear icon) in left sidebar
2. **Click** "API" in the settings menu
3. **Copy these two values:**
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
4. **Keep these open** - you'll need them in the next step

---

## 📝 **STEP 3: Create Environment File**

1. **Open** your project folder: `donate-today-site-main`
2. **Create a new file** named `.env` (no extension, just `.env`)
3. **Add these lines** (replace with YOUR values from Step 2):
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. **Save** the file

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🗄️ **STEP 4: Run Database Migrations**

1. **In Supabase Dashboard**, click **SQL Editor** in left sidebar
2. **Click** "New query"
3. **Open** the file `supabase/001_schema.sql` from your project
4. **Copy ALL the content** from that file
5. **Paste** into the SQL Editor
6. **Click** "Run" (or press Ctrl+Enter)
7. **Wait** for "Success. No rows returned" message
8. **Repeat** for each file **in this exact order:**
   - ✅ `001_schema.sql` (already done)
   - ✅ `003_fundraisers_extend.sql`
   - ✅ `004_manual_payments_extend.sql`
   - ✅ `005_fundraisers_type.sql`
   - ✅ `006_create_hero_slides.sql`
   - ✅ `002_storage.sql`

**Important:** Run them one at a time, wait for success message before moving to next file.

---

## 📦 **STEP 5: Create Storage Buckets**

1. **In Supabase Dashboard**, click **Storage** in left sidebar
2. **Click** "Create bucket" button
3. **Create first bucket:**
   - **Name:** `receipts`
   - **Public bucket:** ✅ Check this box
   - **Click** "Create bucket"
4. **Click** "Create bucket" again
5. **Create second bucket:**
   - **Name:** `images`
   - **Public bucket:** ✅ Check this box
   - **Click** "Create bucket"

**Alternative (using SQL):**
- Go to SQL Editor
- Run this query:
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;
```

---

## ⚙️ **STEP 6: Initialize Payment Settings**

1. **In Supabase Dashboard**, go to **SQL Editor**
2. **Click** "New query"
3. **Copy and paste** this SQL:
```sql
INSERT INTO public.payment_settings (id, upi, bank, account, ifsc, qr_url)
VALUES (1, '', '', '', '', '')
ON CONFLICT (id) DO NOTHING;
```
4. **Click** "Run"
5. **Verify** success message

---

## 📦 **STEP 7: Install Dependencies**

1. **Open** terminal/command prompt
2. **Navigate** to your project folder:
   ```bash
   cd "C:\Work\Prateek Ads Agency_\donate-today-site-main\donate-today-site-main"
   ```
3. **Run:**
   ```bash
   npm install
   ```
4. **Wait** for installation to complete (may take 2-3 minutes)

---

## 🚀 **STEP 8: Start Development Server**

1. **In the same terminal**, run:
   ```bash
   npm run dev
   ```
2. **Wait** for the message: "Local: http://localhost:8080"
3. **Open** your browser
4. **Go to** http://localhost:8080
5. **You should see** your website homepage!

---

## 👤 **STEP 9: Create Your Admin Account**

1. **On your website**, click "Login" button (top right)
2. **Click** "Sign up" tab
3. **Enter:**
   - Your email address
   - A password (at least 6 characters)
4. **Click** "Sign up"
5. **Check your email** for confirmation link
6. **Click** the confirmation link
7. **Go back** to Supabase Dashboard

---

## 🔐 **STEP 10: Make Yourself Admin**

1. **In Supabase Dashboard**, click **Authentication** in left sidebar
2. **Click** "Users"
3. **Find** your email address in the list
4. **Click** the three dots (⋮) next to your user
5. **Click** "Edit user"
6. **Scroll down** to "User Metadata"
7. **Click** "Add row"
8. **Enter:**
   - **Key:** `role`
   - **Value:** `admin`
9. **Click** "Save"

**Alternative (using SQL):**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```
(Replace with your actual email)

---

## 💳 **STEP 11: Configure Payment Settings**

1. **On your website**, make sure you're logged in as admin
2. **Click** your avatar (top right) → **Dashboard**
3. **You should see** "Admin Panel" (if you're admin)
4. **Click** "Payments" tab
5. **Fill in:**
   - **UPI ID:** Your UPI ID (e.g., `yourname@paytm`)
   - **Bank Name:** Your bank name
   - **Account Number:** Your account number
   - **IFSC Code:** Your IFSC code
   - **QR Code:** Upload a payment QR code image (optional)
6. **Click** "Save Settings"

---

## 🎨 **STEP 12: Add Homepage Content**

1. **In Admin Panel**, click **Content** tab
2. **Click** "Add New Slide"
3. **Fill in:**
   - **Title:** (e.g., "Help Children in Need")
   - **Description:** (e.g., "Your donation makes a difference")
   - **Image URL:** Upload an image or use a URL
   - **Button Text:** (e.g., "Donate Now")
   - **Button Link:** (e.g., "/donate")
4. **Click** "Save"
5. **Add 2-3 more slides** for a nice carousel

---

## 🎯 **STEP 13: Create Your First Campaign**

1. **In Admin Panel**, click **Campaigns** tab
2. **Click** "Create New Campaign"
3. **Fill in:**
   - **Title:** (e.g., "Feed the Hungry")
   - **Subtitle:** (e.g., "Help provide meals to families")
   - **Description:** Write a detailed description
   - **Goal:** Enter amount in ₹ (e.g., 100000)
   - **Type:** Select "monthly" or "org"
   - **Image:** Upload or paste image URL
4. **Click** "Create Campaign"
5. **Your campaign** will appear on the homepage!

---

## ✅ **STEP 14: Test Everything**

Test these features to make sure everything works:

1. ✅ **Homepage loads** - Should show hero carousel and campaigns
2. ✅ **Navigation works** - Click menu items, they should work
3. ✅ **Sign up/Login** - Create a test user account
4. ✅ **Browse campaigns** - Click on a campaign, should see details
5. ✅ **Donation form** - Go to /donate, fill out the form
6. ✅ **Submit payment** - Submit a test payment
7. ✅ **Admin panel** - Access admin features
8. ✅ **Approve payment** - As admin, approve a test payment

---

## 🐛 **Troubleshooting**

### Problem: "Supabase client not initialized"
**Solution:** 
- Check `.env` file exists in project root
- Verify the URL and key are correct (no extra spaces)
- Restart the dev server (`npm run dev`)

### Problem: "Storage bucket not found"
**Solution:**
- Go to Supabase → Storage
- Make sure `receipts` and `images` buckets exist
- Check they are marked as "Public"

### Problem: "Permission denied" errors
**Solution:**
- Go back to Step 4
- Make sure ALL SQL migrations ran successfully
- Check for any error messages in SQL Editor

### Problem: "Admin panel not accessible"
**Solution:**
- Go to Step 10
- Verify your user has `role: "admin"` in metadata
- Log out and log back in

### Problem: "Payment settings error"
**Solution:**
- Go to Step 6
- Run the payment settings initialization SQL again

### Problem: Website shows blank page
**Solution:**
- Check browser console for errors (F12)
- Verify `.env` file has correct values
- Make sure `npm install` completed successfully

---

## 🎉 **You're Done!**

Your SevaRise Foundation donation platform is now set up and ready to use!

**Next Steps:**
- Add more campaigns
- Customize content and images
- Test the donation flow end-to-end
- Share your website with donors!

**Need Help?**
- Check the `SETUP_GUIDE.md` for more details
- Review `ADMIN_PRIVILEGES.md` for admin features
- Check Supabase documentation for database help

---

## 📝 **Quick Reference**

**Important URLs:**
- Local website: http://localhost:8080
- Supabase Dashboard: https://supabase.com/dashboard
- Your GitHub repo: https://github.com/sixtyfourbitsquad/SevaRise-Foundation

**Important Files:**
- `.env` - Your API keys (don't commit this!)
- `supabase/*.sql` - Database migrations
- `src/lib/supabaseClient.ts` - Supabase connection

**Common Commands:**
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

