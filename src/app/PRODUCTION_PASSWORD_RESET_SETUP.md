# 🌐 Production Password Reset Setup
## For studycopilot.figma.site

---

## ✅ Good News!

Your code is **already configured** to work with your production URL! The password reset automatically uses the domain where the user requests it from.

### How It Works:

- **Request from localhost** → Email link goes to `localhost:3000`
- **Request from studycopilot.figma.site** → Email link goes to `studycopilot.figma.site` ✅

---

## 🚨 What You Need To Do

### Step 1: Configure Supabase Redirect URLs

This is **CRITICAL** for password reset to work on your production site!

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard

2. **Select your StudyCopilot project**

3. **Navigate to**: Authentication → URL Configuration

4. **Set Site URL**:
   ```
   https://studycopilot.figma.site
   ```

5. **Add to Redirect URLs** (Add ALL of these):
   ```
   https://studycopilot.figma.site
   https://studycopilot.figma.site/*
   https://studycopilot.figma.site/**
   http://localhost:3000
   http://localhost:3000/*
   ```

6. **Click "Save"**

### Why This Matters:

Without adding your production URL to the allowed redirect URLs, Supabase will **reject** the password reset callback and users will see an error.

---

## 🧪 Testing Password Reset on Production

### Step 1: Test on Live Site

1. **Go to**: https://studycopilot.figma.site

2. **Click "Sign in"** (or go to login page)

3. **Click "Forgot password?"**

4. **Enter your registered email**

5. **Click "Send Reset Link"**

6. **Success message**: "Password reset email sent! Check your inbox."

### Step 2: Check Your Email

1. **Open your email** (check spam folder too!)

2. **Look for email** from Supabase with subject like "Reset your password"

3. **The link should look like**:
   ```
   https://studycopilot.figma.site/#access_token=XXXXX&type=recovery&...
   ```
   ✅ Notice it goes to **studycopilot.figma.site**, NOT localhost!

### Step 3: Click the Reset Link

1. **Click the link** in your email

2. **You should see**: The password reset form automatically!
   - Fields for new password
   - Confirm password field
   - "Update Password" button

3. **If you see an error** like "Invalid or expired reset link":
   - Check that you added the URL to Supabase (Step 1 above)
   - Make sure the link hasn't expired (1 hour limit)
   - Request a new reset link

### Step 4: Set New Password

1. **Enter new password** (at least 6 characters)

2. **Confirm the password**

3. **Click "Update Password"**

4. **Success!**
   - "Password updated successfully!"
   - Automatically logged in
   - Redirected to dashboard

---

## 🔧 Troubleshooting

### Issue: "localhost refused to connect"

**Cause**: You requested the password reset from `localhost`, so the email link points to `localhost`.

**Solution**: 
1. Go to **https://studycopilot.figma.site** (your live site)
2. Request a **new** password reset from there
3. The new email will have the correct production URL

---

### Issue: "Invalid redirect URL"

**Cause**: Your production domain is not added to Supabase allowed redirect URLs.

**Solution**: 
1. Follow Step 1 above to add URLs to Supabase
2. Request a new password reset
3. Try the new link

---

### Issue: "Invalid or expired reset link"

**Causes**:
- Link expired (1 hour limit)
- Link was already used (single-use only)
- Link was tampered with

**Solution**: Request a new password reset from https://studycopilot.figma.site

---

### Issue: Email not arriving

**Solutions**:
1. **Check spam/junk folder**
2. **Wait 5 minutes** - sometimes emails are delayed
3. **Verify email is registered** - must be an existing account
4. **Request again** from https://studycopilot.figma.site

---

## 📧 Supabase Email Configuration (Optional but Recommended)

For better email deliverability in production:

### Option 1: Use Supabase Default (Current Setup)

**Pros**:
- Already configured
- No setup needed
- Works immediately

**Cons**:
- May go to spam
- Generic sender address
- Limited customization

### Option 2: Configure Custom SMTP (Recommended for Production)

1. **Go to Supabase Dashboard** → Your Project
2. **Navigate to**: Project Settings → Auth → SMTP Settings
3. **Enable Custom SMTP**
4. **Configure your email provider** (Gmail, SendGrid, AWS SES, etc.)

**Benefits**:
- Better deliverability
- Custom sender name/email
- Branded emails
- Fewer spam issues

**Popular SMTP Providers**:
- **SendGrid** - Free tier: 100 emails/day
- **Mailgun** - Free tier: 1,000 emails/month
- **AWS SES** - $0.10 per 1,000 emails
- **Gmail** - Free for low volume (up to 500/day)

---

## 🎯 Complete Production Setup Checklist

- [ ] **Supabase Site URL** set to `https://studycopilot.figma.site`
- [ ] **Redirect URLs** added to Supabase (production + localhost)
- [ ] **OAuth providers configured** (if using Google/GitHub login)
- [ ] **Test password reset** from production URL
- [ ] **Check email deliverability** (inbox vs spam)
- [ ] **Consider custom SMTP** for better deliverability
- [ ] **Document URLs** for your team

---

## 🔒 Security Notes for Production

### Current Implementation:

✅ **Password reset tokens** are single-use only  
✅ **Tokens expire** after 1 hour  
✅ **Minimum password length** enforced (6 characters)  
✅ **Old password invalidated** after successful reset  
✅ **User automatically logged in** after reset  
✅ **Secure session handling** via Supabase Auth  

### Additional Recommendations:

1. **Monitor auth logs** in Supabase dashboard
2. **Set up email alerts** for suspicious activity
3. **Consider 2FA** for student accounts (optional)
4. **Rate limit password resets** (Supabase does this automatically)
5. **Use HTTPS only** (figma.site already does this ✅)

---

## 📝 What's Already Working

The code I just implemented includes:

✅ **Automatic URL detection** - Uses correct domain based on where reset is requested  
✅ **Password reset form** - Clean UI for setting new password  
✅ **Token validation** - Checks if reset link is valid/expired  
✅ **Error handling** - Clear messages if something goes wrong  
✅ **Success flow** - Auto-login and redirect to dashboard  
✅ **Loading states** - Shows progress during update  
✅ **Password validation** - Must be 6+ chars and match  

---

## 🚀 Deploy Instructions

When you deploy to production (or re-deploy):

1. **Code is already production-ready** - No changes needed! ✅

2. **Just configure Supabase URLs** (Step 1 above)

3. **Test the flow** once on production

4. **You're done!** 🎉

---

## 💡 Quick Test Commands

### For Testing Locally:
```bash
# Start dev server
npm run dev

# Request reset from: http://localhost:3000
# Email link will point to: localhost:3000
```

### For Testing Production:
```bash
# No commands needed!
# Just visit: https://studycopilot.figma.site
# Request reset from there
# Email link will point to: studycopilot.figma.site ✅
```

---

## 🎬 Complete Test Scenario (Production)

### Scenario: Student Forgot Password

1. **Student visits**: https://studycopilot.figma.site

2. **Clicks**: "Sign in" → "Forgot password?"

3. **Enters**: their registered email

4. **Clicks**: "Send Reset Link"

5. **Sees**: "Password reset email sent! Check your inbox."

6. **Receives email** within 1-5 minutes

7. **Clicks link** in email:
   ```
   https://studycopilot.figma.site/#access_token=XXXXX&type=recovery
   ```

8. **Sees**: Password reset form automatically

9. **Enters**: New password (e.g., "newpass123")

10. **Confirms**: Same password

11. **Clicks**: "Update Password"

12. **Sees**: "Password updated successfully!"

13. **Gets**: Automatically logged in

14. **Lands on**: Dashboard - ready to use StudyCopilot! 🎓

---

## 📊 Expected Flow Diagram

```
Student on studycopilot.figma.site
    ↓
Clicks "Forgot password?"
    ↓
Enters email & submits
    ↓
Supabase sends email
    ↓
Email arrives (link to studycopilot.figma.site)
    ↓
Student clicks link
    ↓
studycopilot.figma.site loads
    ↓
App detects #type=recovery
    ↓
Shows password reset form
    ↓
Student sets new password
    ↓
Password updated in Supabase
    ↓
Auto-login with new password
    ↓
Redirect to dashboard ✅
```

---

## 🎯 One More Thing: Testing Right Now

If you want to test password reset on your live site **right now**:

1. **Open**: https://studycopilot.figma.site

2. **Go to**: Settings → Authentication → URL Configuration

3. **Verify** these URLs are added:
   - `https://studycopilot.figma.site`
   - `https://studycopilot.figma.site/**`

4. **Request password reset** from the live site

5. **Check email** and click the link

6. **It should work!** 🎉

---

## ❓ Questions?

### Q: Do I need to change any code?
**A**: No! The code already handles both localhost and production URLs automatically.

### Q: What if I change the domain later?
**A**: Just update the Supabase redirect URLs to include the new domain.

### Q: Can students reset passwords on both localhost and production?
**A**: Yes! As long as both URLs are added to Supabase redirect URLs.

### Q: How long do reset links last?
**A**: 1 hour. After that, student needs to request a new reset link.

### Q: Can a reset link be used multiple times?
**A**: No. Each link is single-use only for security.

---

## ✨ Summary

Your password reset is **production-ready**! Just:

1. ✅ Add `https://studycopilot.figma.site` to Supabase redirect URLs
2. ✅ Test from the live site
3. ✅ Done!

The code automatically uses the correct domain, so students will get reset links that point to `studycopilot.figma.site` when they request resets from there.

🎓 **StudyCopilot is ready for students to safely reset their passwords!**
