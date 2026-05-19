# 🚨 QUICK SETUP: Configure Supabase for studycopilot.figma.site

## ⚡ Do This Right Now (2 Minutes)

Password reset is failing because Supabase doesn't recognize `studycopilot.figma.site` as an allowed redirect URL.

---

## 📋 Step-by-Step Instructions

### 1. Open Supabase Dashboard
Go to: **https://supabase.com/dashboard**

### 2. Select Your StudyCopilot Project
Click on your project from the list

### 3. Navigate to URL Configuration
- Click **Authentication** (in left sidebar with shield icon 🛡️)
- Click **URL Configuration**

### 4. Update Site URL
Find the **"Site URL"** field and set it to:
```
https://studycopilot.figma.site
```

### 5. Add Redirect URLs
Scroll down to **"Redirect URLs"** section.

**Add these URLs** (one per line):
```
https://studycopilot.figma.site
https://studycopilot.figma.site/*
https://studycopilot.figma.site/**
http://localhost:3000
http://localhost:3000/*
```

### 6. Save Changes
Click the **"Save"** button at the bottom

---

## ✅ What This Does

✓ Allows password reset emails to link to `studycopilot.figma.site`  
✓ Enables OAuth logins (Google/GitHub) on production  
✓ Permits authentication callbacks from your domain  
✓ Keeps localhost working for local development  

---

## 🧪 Test It Now

1. **Go to**: https://studycopilot.figma.site

2. **Click**: "Sign in" → "Forgot password?"

3. **Enter your email** and click "Send Reset Link"

4. **Check your email** (including spam folder)

5. **Click the reset link** - it should work now! ✨

6. **Set your new password** and you'll be logged in

---

## 🎯 Quick Reference

### What URLs to Add:

| URL | Purpose |
|-----|---------|
| `https://studycopilot.figma.site` | Main production URL |
| `https://studycopilot.figma.site/*` | All production pages (wildcard) |
| `https://studycopilot.figma.site/**` | All production routes (double wildcard) |
| `http://localhost:3000` | Local development |
| `http://localhost:3000/*` | Local dev pages |

### Where to Add Them:

**Supabase Dashboard** → Your Project → **Authentication** → **URL Configuration** → **Redirect URLs**

---

## 🚨 Common Mistakes to Avoid

❌ **Don't** add the URL with a trailing slash: ~~`https://studycopilot.figma.site/`~~  
✅ **Do** add it without trailing slash: `https://studycopilot.figma.site`

❌ **Don't** forget the `https://` prefix  
✅ **Do** include the full protocol: `https://studycopilot.figma.site`

❌ **Don't** forget to click "Save"  
✅ **Do** save your changes after adding URLs

---

## 🔍 Visual Guide

### What You're Looking For in Supabase:

```
┌─────────────────────────────────────────┐
│  Authentication Settings                │
├─────────────────────────────────────────┤
│                                         │
│  Site URL                               │
│  ┌───────────────────────────────────┐ │
│  │ https://studycopilot.figma.site   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Redirect URLs                          │
│  ┌───────────────────────────────────┐ │
│  │ https://studycopilot.figma.site   │ │
│  │ https://studycopilot.figma.site/* │ │
│  │ http://localhost:3000             │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [Save]                                 │
└─────────────────────────────────────────┘
```

---

## 💡 Why This is Needed

When a student requests a password reset:

1. **Email is sent** with a link like:
   ```
   https://studycopilot.figma.site/#access_token=XXXXX&type=recovery
   ```

2. **Student clicks** the link

3. **Supabase checks**: "Is studycopilot.figma.site allowed?"
   - ❌ **Not in list** → Shows error
   - ✅ **In list** → Allows password reset

Without adding the URL, Supabase **blocks** the password reset for security reasons.

---

## 🎬 After You Add the URLs

### What Happens:

1. ✅ **Password reset works** on studycopilot.figma.site
2. ✅ **OAuth login works** on studycopilot.figma.site  
3. ✅ **Email links work** properly
4. ✅ **Still works** on localhost for development

### What Students See:

1. **Request reset** on studycopilot.figma.site
2. **Get email** with correct link
3. **Click link** → Automatic password reset form
4. **Set new password** → Logged in!
5. **Continue learning** 🎓

---

## ⏱️ How Long Does This Take?

- **Setup time**: 2 minutes
- **Takes effect**: Immediately
- **Need to redeploy code**: No!

---

## 🆘 Still Having Issues?

### After adding URLs, if password reset still fails:

1. **Wait 1 minute** for Supabase to process the changes

2. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)

3. **Request a NEW reset link** (don't reuse old email)

4. **Check spam folder** for the new email

5. **Try from an incognito window** to rule out cache issues

### If email doesn't arrive:

1. **Check spam/junk folder**
2. **Wait 5 minutes** (sometimes delayed)
3. **Verify email is registered** in StudyCopilot
4. **Request again** after 5 minutes

---

## ✅ Checklist

Before requesting password reset, make sure:

- [ ] Supabase Site URL = `https://studycopilot.figma.site`
- [ ] Production URLs added to Redirect URLs
- [ ] Localhost URLs added to Redirect URLs (for development)
- [ ] Changes saved in Supabase
- [ ] Waited 1 minute for changes to take effect

---

## 🎉 You're Done!

Once you add these URLs to Supabase:

✨ Password reset will work on **studycopilot.figma.site**  
✨ OAuth login will work on **studycopilot.figma.site**  
✨ All authentication features will work properly  
✨ Students can safely reset their passwords  

**Go add those URLs now and test it!** 🚀

---

## 📞 Need the URLs Again?

Copy and paste these into Supabase Redirect URLs:

```
https://studycopilot.figma.site
https://studycopilot.figma.site/*
https://studycopilot.figma.site/**
http://localhost:3000
http://localhost:3000/*
```

**Location**: Supabase Dashboard → Authentication → URL Configuration → Redirect URLs

---

That's it! This is the only configuration needed to make password reset work on your production site. The code is already ready! 🎓
