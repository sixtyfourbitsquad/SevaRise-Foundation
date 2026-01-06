# Fix Supabase Auth Email Redirect URL

## 🔍 **The Problem**

When you click the email verification link from Supabase, it redirects to:
```
http://localhost:3000
```

But your dev server runs on:
```
http://localhost:8080
```

This causes the redirect to fail or go to the wrong port.

---

## ✅ **Solution: Configure Redirect URL in Supabase**

### **Step 1: Go to Supabase Dashboard**

1. Go to https://supabase.com/dashboard
2. **Select your project** (the one you're using)

### **Step 2: Configure Authentication Settings**

1. **Click** "Authentication" in the left sidebar
2. **Click** "URL Configuration" (or "Settings" → "Auth")
3. **Find** the "Site URL" field
4. **Change it to:** `http://localhost:8080`
5. **Find** the "Redirect URLs" section
6. **Add these URLs** (one per line):
   ```
   http://localhost:8080
   http://localhost:8080/**
   http://localhost:8080/auth
   http://localhost:8080/dashboard
   ```
7. **Click** "Save" or "Update"

### **Step 3: For Production (Later)**

When you deploy your website, also add your production URL:
```
https://yourdomain.com
https://yourdomain.com/**
https://yourdomain.com/auth
https://yourdomain.com/dashboard
```

---

## 🔧 **Alternative: Update Code to Set Redirect URL**

You can also explicitly set the redirect URL in your code when signing up:

### **Update `src/pages/AuthPage.tsx`**

Find the sign up section (around line 76) and update it:

**Before:**
```typescript
const { data, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
});
```

**After:**
```typescript
const { data, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth`,
  },
});
```

This tells Supabase to redirect to your current origin (localhost:8080) instead of the default.

---

## 📝 **Quick Fix Steps**

1. **Go to Supabase Dashboard**
2. **Authentication** → **URL Configuration**
3. **Site URL:** Set to `http://localhost:8080`
4. **Redirect URLs:** Add `http://localhost:8080/**`
5. **Save**

That's it! Now when you click the email verification link, it will redirect to the correct port.

---

## 🧪 **Test It**

1. **Sign up** for a new account on your website
2. **Check your email** for the verification link
3. **Click the link**
4. **It should redirect to:** `http://localhost:8080/auth` (or your homepage)
5. **You should be logged in** automatically

---

## ⚠️ **Important Notes**

- **Site URL** is the default redirect URL
- **Redirect URLs** is a whitelist of allowed redirect URLs (security feature)
- You can add multiple URLs (one per line)
- Use `/**` to allow all paths under that domain
- **Always include** both `http://localhost:8080` and `http://localhost:8080/**`

---

## 🚀 **For Production Deployment**

When you deploy your website:

1. **Add your production domain** to Redirect URLs:
   ```
   https://yourdomain.com
   https://yourdomain.com/**
   ```

2. **Update Site URL** to your production domain:
   ```
   https://yourdomain.com
   ```

3. **Keep localhost URLs** for development:
   ```
   http://localhost:8080
   http://localhost:8080/**
   ```

This way, both development and production will work!

---

## ✅ **Summary**

**The fix is simple:**
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Set Site URL to `http://localhost:8080`
3. Add `http://localhost:8080/**` to Redirect URLs
4. Save

**That's it!** Your email verification links will now redirect to the correct port.

