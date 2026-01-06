# How to Make Yourself Admin in Supabase

This guide shows you exactly how to add the `admin` role to your user account in Supabase.

---

## ⚡ **QUICKEST METHOD (Recommended)**

**If you can't find the edit button in the UI, use SQL - it's faster and always works!**

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Paste this (replace with YOUR email):

```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

4. Click **"Run"**
5. **Log out and log back in** on your website
6. Done! ✅

**That's it!** Scroll down for detailed instructions if needed.

---

## 🎯 **Method 1: Using Supabase Dashboard (Visual Method)**

### **Step 1: Go to Supabase Dashboard**
1. Open your browser
2. Go to **https://supabase.com/dashboard**
3. **Log in** to your Supabase account
4. **Click** on your project (the one you created for SevaRise Foundation)

### **Step 2: Navigate to Authentication**
1. In the **left sidebar**, look for **"Authentication"** (it has a key icon 🔑)
2. **Click** on "Authentication"

### **Step 3: Go to Users**
1. You'll see several tabs: **Users**, **Policies**, **Providers**, etc.
2. **Click** on the **"Users"** tab (it should be selected by default)
3. You'll see a list of all users who have signed up

### **Step 4: Find Your User**
1. **Look for your email address** in the list
2. If you have many users, you can use the **search box** at the top to find your email
3. Once you find your email, you'll see it in a row with columns like: Email, Created, Last Sign In, etc.

### **Step 5: Edit Your User**

**Option A: Click on the User Row**
1. **Click directly on your email address** or anywhere on your user row
2. This should open the user details/edit panel

**Option B: Look for Edit Button**
1. **Look to the right** of your user row for any button or icon
2. You might see:
   - An **"Edit"** button
   - A **pencil icon** ✏️
   - A **gear icon** ⚙️
   - Or just **click on the user's email** itself

**Option C: Right-Click Menu**
1. **Right-click** on your user row
2. See if a context menu appears with "Edit" option

**If none of these work, use Method 2 (SQL) below - it's faster and more reliable!**

### **Step 6: Add Admin Role**
1. A popup/modal window will open showing user details
2. **Scroll down** in this window until you see **"User Metadata"** section
3. You'll see a section that might be empty or have some fields
4. **Click** the **"Add row"** button (or **"+"** button) in the User Metadata section
5. Two input fields will appear:
   - **Key field:** Type `role` (all lowercase, exactly as shown)
   - **Value field:** Type `admin` (all lowercase, exactly as shown)
6. **Click** the **"Save"** button at the bottom of the popup

### **Step 7: Verify**
1. The popup should close
2. Your user row should still be visible
3. You can verify by clicking the three dots again and "Edit user" - you should see `role: admin` in the User Metadata section

### **Step 8: Test on Your Website**
1. **Go back** to your website: http://localhost:8080
2. **Log out** if you're logged in (click your avatar → Logout)
3. **Log in again** with your email and password
4. **Click** your avatar (top right)
5. You should now see **"Dashboard"** option
6. **Click** "Dashboard"
7. You should see **"Admin Panel"** instead of regular dashboard!

---

## 💻 **Method 2: Using SQL Editor (RECOMMENDED - Easiest & Most Reliable)**

**This is the easiest method!** Use this if you can't find the edit button in the UI:

### **Step 1: Go to SQL Editor**
1. In Supabase Dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button

### **Step 2: Run SQL Command**
1. **Copy and paste** this SQL command (replace `your-email@example.com` with YOUR actual email):

```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

**Example:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'john@example.com';
```

2. **Click** the **"Run"** button (or press Ctrl+Enter)
3. You should see a success message like "Success. No rows returned" or "UPDATE 1"

### **Step 3: Test**
1. Go to your website
2. Log out and log back in
3. Check if you can access Admin Panel

---

## 🔍 **Troubleshooting**

### **Problem: Can't find "Edit user" option**
- Make sure you're in the **Users** tab under Authentication
- Try clicking directly on the user's email address - some versions open the edit panel this way
- Look for an **"Edit"** button or icon next to the user

### **Problem: "Add row" button not visible**
- Make sure you're in the **User Metadata** section
- Try scrolling down in the edit popup
- Some versions have a **"+"** button or **"Add"** button instead

### **Problem: Still can't access Admin Panel after adding role**
1. **Log out** completely from your website
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Log in again**
4. The role is stored in your session token, so you need to log out/in to refresh it

### **Problem: SQL method shows "UPDATE 0"**
- This means no user was found with that email
- **Check your email spelling** - it must match exactly (case-sensitive)
- Try this to see all users:
```sql
SELECT email FROM auth.users;
```

### **Problem: Role shows but Admin Panel still not accessible**
1. **Check the role value** - it must be exactly `admin` (lowercase, no quotes in the value field)
2. **Verify in Supabase:**
   - Go to Authentication → Users
   - Edit your user
   - Check User Metadata shows: `role: admin` (not `"admin"` or `Admin`)

---

## ✅ **Quick Verification**

To verify your admin role is set correctly, run this SQL:

```sql
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

You should see:
```
email                    | raw_user_meta_data
-------------------------|-------------------
your-email@example.com   | {"role": "admin"}
```

---

## 📝 **Summary**

**The easiest way:**
1. Supabase Dashboard → Authentication → Users
2. Find your email → Click three dots (⋮) → Edit user
3. Scroll to User Metadata → Add row
4. Key: `role`, Value: `admin`
5. Save
6. Log out and log back in on your website
7. Access Admin Panel!

**Alternative (SQL):**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

---

## 🎉 **Once You're Admin**

After setting the admin role and logging back in, you can:
- ✅ Access Admin Panel (click avatar → Dashboard)
- ✅ Create campaigns
- ✅ Approve/reject payments
- ✅ Manage hero slides
- ✅ Configure payment settings
- ✅ View all donations

