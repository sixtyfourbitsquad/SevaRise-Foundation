# Admin Privileges - SevaRise Foundation

Complete list of all admin privileges and capabilities in the system.

---

## 🔐 Admin Access

**How Admin is Determined:**
- User must have `role: "admin"` in their Supabase auth metadata
- Set via Supabase Dashboard → Authentication → Users → Edit → User Metadata
- Or via SQL: `UPDATE auth.users SET raw_user_meta_data = jsonb_build_object('role', 'admin') WHERE email = 'admin@email.com';`

**Admin Routes:**
- `/admin` - Direct admin panel access
- `/dashboard` - Redirects to Admin Panel if user is admin (otherwise shows regular dashboard)

**Security:**
- Admin panel checks `role !== "admin"` and redirects to home if not admin
- Database Row Level Security (RLS) policies enforce admin-only operations

---

## 📊 Admin Panel Overview

The Admin Panel has **5 main tabs**:

1. **Campaigns** - Manage fundraising campaigns
2. **Donations** - View and manage all donations
3. **Content** - Manage homepage content
4. **Payments** - Payment settings and moderation
5. **Fundraisers** - Moderate user-created fundraisers

---

## 🎯 1. CAMPAIGNS MANAGEMENT

### Create New Campaigns
- ✅ **Create campaigns directly** (no approval needed)
- ✅ Set campaign title, subtitle, description
- ✅ Set fundraising goal (₹)
- ✅ Choose campaign type:
  - `org` - Organization-based campaign
  - `monthly` - Monthly Mission (auto-sets organizer as "SevaRise Foundation")
- ✅ Upload campaign image (via URL or file upload to Supabase Storage)
- ✅ Campaigns created by admin are **immediately approved** (status: `approved`)

### Manage Existing Campaigns
- ✅ **View all approved campaigns**
- ✅ **Delete campaigns** (permanent deletion)
- ✅ **View campaign details** (title, description, goal, raised, donations, status)
- ✅ **Update campaign statistics** inline:
  - Amount raised (₹)
  - Number of donations
  - Days left
- ✅ **View campaign** (opens in new tab)

### Campaign Statistics Dashboard
- ✅ View **Total Raised** across all campaigns
- ✅ View **Total Donations** count
- ✅ View **Active Campaigns** count

---

## 💰 2. DONATIONS MANAGEMENT

### View All Donations
- ✅ **View ALL manual payments** (not just own)
- ✅ See payment details:
  - Amount (₹)
  - Campaign name
  - Donor name/email/mobile (or "Anonymous")
  - Status (pending/approved/rejected)
  - Receipt URL (if uploaded)
  - Created date
- ✅ **Filter by status** (all statuses visible)

### Moderate Payments
- ✅ **Approve pending payments**
- ✅ **Reject pending payments**
- ✅ **View payment receipts** (download/view uploaded screenshots)
- ✅ See donor information (unless anonymous)

**Note:** Currently, approving a payment only updates status. To automatically create a donation record, you may need to add a database trigger (see WEBSITE_ANALYSIS.md).

---

## 📝 3. CONTENT MANAGEMENT

### Hero Carousel Management
- ✅ **Add new hero slides** to homepage carousel
- ✅ Set slide properties:
  - Image (URL or upload to Supabase Storage)
  - Title
  - Description
  - CTA button text (default: "Donate Now")
  - CTA link (default: "/donate")
  - Sort order (for ordering slides)
  - Active/Inactive status
- ✅ **Delete hero slides**
- ✅ **View all slides** with their order and status
- ✅ Slides are displayed on homepage in sort_order sequence

### Future Content Management
- ⚠️ **Impact Stories** - Placeholder (not yet implemented)
- ⚠️ **FAQ Section** - Placeholder (not yet implemented)

---

## 💳 4. PAYMENT SETTINGS

### Configure Payment Methods
- ✅ **Set UPI ID** (for UPI payments)
- ✅ **Set Bank Details:**
  - Bank name
  - Account number
  - IFSC code
- ✅ **Upload QR Code** (for UPI QR code payments)
  - Upload image to Supabase Storage
  - Or provide image URL
- ✅ **Save payment settings** (persisted to database)
- ✅ Settings are **publicly readable** (shown on payment page)
- ✅ Only admin can **write/update** settings

### Moderate Manual Payments
- ✅ **View pending payments** awaiting approval
- ✅ **Approve payments** (changes status to "approved")
- ✅ **Reject payments** (changes status to "rejected")
- ✅ **View payment receipts** (screenshots uploaded by donors)

---

## 🎗️ 5. FUNDRAISER MODERATION

### Moderate User-Created Fundraisers
- ✅ **View all pending fundraisers** (created by users)
- ✅ See fundraiser details:
  - Title
  - Goal amount
  - Amount raised
  - Status
- ✅ **Approve fundraisers** (changes status to "approved", makes them visible publicly)
- ✅ **Reject fundraisers** (changes status to "rejected")
- ✅ Approved fundraisers appear in the campaigns list

---

## 🔒 Database Permissions (RLS Policies)

Admins have special database access via Row Level Security:

### Manual Payments
- ✅ **Select:** Can view ALL payments (not just own)
- ✅ **Update:** Can approve/reject payments
- ✅ Regular users can only see their own payments

### Fundraisers
- ✅ **Select:** Can view ALL fundraisers (including draft/pending)
- ✅ **Update:** Can modify any fundraiser
- ✅ **Delete:** Can delete any fundraiser
- ✅ Regular users can only see their own fundraisers or published ones

### Payment Settings
- ✅ **Select:** Public (everyone can read)
- ✅ **Update/Insert:** Admin only
- ✅ Regular users cannot modify payment settings

### Hero Slides
- ✅ **Select:** Public (everyone can read active slides)
- ✅ **Insert/Update/Delete:** Admin only
- ✅ Regular users cannot modify hero slides

### Donations
- ⚠️ **Note:** Currently, only users can insert their own donations
- ⚠️ Admin can view via manual_payments table

---

## 📈 Admin Dashboard Statistics

The admin panel shows:
- **Total Raised:** Sum of all `raised` amounts from approved campaigns
- **Total Donations:** Sum of all `donations` counts from approved campaigns
- **Active Campaigns:** Count of approved campaigns

---

## 🚫 What Admins CANNOT Do

- ❌ Cannot change their own role (must be done via Supabase Dashboard)
- ❌ Cannot delete user accounts (must be done via Supabase Dashboard)
- ❌ Cannot modify user authentication data
- ❌ Cannot access Supabase project settings
- ❌ Cannot modify database schema (must be done via SQL Editor)

---

## 🔄 Admin vs Regular User Comparison

| Feature | Regular User | Admin |
|---------|-------------|-------|
| View own donations | ✅ | ✅ |
| View all donations | ❌ | ✅ |
| Create fundraiser | ✅ (pending) | ✅ (approved) |
| Approve/reject payments | ❌ | ✅ |
| Create campaigns | ❌ | ✅ |
| Delete campaigns | ❌ | ✅ |
| Update campaign stats | ❌ | ✅ |
| Manage hero slides | ❌ | ✅ |
| Configure payment settings | ❌ | ✅ |
| Moderate fundraisers | ❌ | ✅ |
| Access admin panel | ❌ | ✅ |

---

## 🛠️ How to Grant Admin Access

### Method 1: Via Supabase Dashboard
1. Go to Supabase Dashboard → Authentication → Users
2. Find the user you want to make admin
3. Click "Edit" or the user
4. Scroll to "User Metadata"
5. Add: `{ "role": "admin" }`
6. Save

### Method 2: Via SQL
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'admin@sevarisefoundation.org';
```

### Method 3: During User Creation
When creating a user via Supabase Dashboard, add metadata:
```json
{
  "role": "admin"
}
```

---

## ⚠️ Important Notes

1. **Role is stored in JWT:** The role is read from `user_metadata.role` in the JWT token
2. **Session refresh needed:** After changing role, user may need to log out and log back in
3. **Multiple admins:** You can have multiple admin users
4. **Security:** Admin checks happen both in frontend (redirect) and backend (RLS policies)
5. **No super-admin:** All admins have the same privileges

---

## 📝 Quick Reference

**Admin Panel URL:** `/admin` or `/dashboard` (if logged in as admin)

**Key Admin Actions:**
- Create campaigns → Admin Panel → Campaigns tab
- Approve payments → Admin Panel → Payments tab
- Manage content → Admin Panel → Content tab
- Configure payments → Admin Panel → Payments tab
- Moderate fundraisers → Admin Panel → Fundraisers tab

---

**Last Updated:** Based on current codebase structure

