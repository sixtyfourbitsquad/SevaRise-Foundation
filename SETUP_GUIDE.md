# Quick Setup Guide

## Prerequisites
- Node.js installed
- Supabase account (free tier works)

## Step 1: Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for initialization (~2 minutes)

2. **Get API Credentials**
   - Go to **Settings → API**
   - Copy **Project URL** and **anon public key**

## Step 2: Environment Configuration

Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Database Setup

Go to **Supabase Dashboard → SQL Editor** and run these files **in order**:

1. `supabase/001_schema.sql` - Main tables and policies
2. `supabase/003_fundraisers_extend.sql` - Fundraiser fields
3. `supabase/004_manual_payments_extend.sql` - Payment fields
4. `supabase/005_fundraisers_type.sql` - Campaign type
5. `supabase/006_create_hero_slides.sql` - Hero carousel
6. `supabase/002_storage.sql` - Storage policies

**Note**: `000_storage.sql` creates basic tables (already in 001_schema.sql)

## Step 4: Storage Buckets

1. Go to **Storage** in Supabase dashboard
2. Create bucket: `receipts` (Public: ✅)
3. Create bucket: `images` (Public: ✅)

Or run this SQL:
```sql
-- Create receipts bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Create images bucket  
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;
```

## Step 5: Initialize Payment Settings

Run in SQL Editor:
```sql
INSERT INTO public.payment_settings (id, upi, bank, account, ifsc, qr_url)
VALUES (1, '', '', '', '', '')
ON CONFLICT (id) DO NOTHING;
```

## Step 6: Create Admin User

1. **Sign up** via the website `/auth` page
2. Go to **Supabase Dashboard → Authentication → Users**
3. Find your user → Click **Edit**
4. In **User Metadata**, add:
   ```json
   {
     "role": "admin"
   }
   ```
5. Save

**Or use SQL:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

## Step 7: Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Step 8: Configure Payment Settings

1. Log in as admin
2. Go to **Admin Panel → Payments** tab
3. Enter:
   - UPI ID
   - Bank name
   - Account number
   - IFSC code
   - Upload QR code (optional)
4. Click **Save Settings**

## Step 9: Test Everything

✅ Homepage loads  
✅ Can sign up/login  
✅ Can browse campaigns  
✅ Can fill donation form  
✅ Can submit payment  
✅ Admin can approve payments  
✅ Admin can create campaigns  
✅ Images upload successfully  

## Troubleshooting

**"Supabase client not initialized"**
→ Check `.env` file exists and has correct values

**"Storage bucket not found"**
→ Create `receipts` and `images` buckets

**"Permission denied"**
→ Verify all SQL migrations ran successfully

**"Admin panel not accessible"**
→ Set user metadata `role: "admin"`

**"Payment settings error"**
→ Run payment settings initialization SQL

## Next Steps

- Add hero slides via Admin Panel → Content
- Create campaigns via Admin Panel → Campaigns
- Test donation flow end-to-end
- Configure email notifications (optional)

