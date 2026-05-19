# ⚡ Test Authentication - Quick Guide

## 🎯 Quick Test (2 Minutes)

### Test 1: Sign Up ✅

1. **Open your app**
2. **Click "Get Started"**
3. **Fill the form:**
   ```
   Name: Test Student
   Email: test@example.com
   Grade: 8
   Password: password123
   Confirm: password123
   ✓ Check "I agree to terms"
   ```
4. **Click "Create Account"**
5. **✅ Should see:** "Welcome to StudyCopilot, Test Student!" toast
6. **✅ Should redirect:** To Dashboard

---

### Test 2: Logout ✅

1. **From Dashboard** → Click Profile icon (top right)
2. **Click "Logout"** button
3. **✅ Should see:** "Logged out successfully" toast
4. **✅ Should redirect:** To Landing page

---

### Test 3: Login ✅

1. **From Landing page** → Click "Login"
2. **Enter credentials:**
   ```
   Email: test@example.com
   Password: password123
   ```
3. **Click "Sign In"**
4. **✅ Should see:** "Welcome back, Test Student!" toast
5. **✅ Should redirect:** To Dashboard

---

### Test 4: Session Persistence ✅

1. **Make sure you're logged in**
2. **Close the browser tab**
3. **Open a new tab** → Go to your app
4. **✅ Should see:** Dashboard immediately (auto-logged in!)
5. **No login required!** ✅

---

### Test 5: Logout Clears Session ✅

1. **Login** to app
2. **Logout**
3. **Refresh the page** (F5)
4. **✅ Should see:** Landing page (NOT auto-logged in)

---

## 🔍 What to Look For

### Console Messages

**On Sign Up:**
```
🔐 Creating new account...
✅ Account created successfully!
✅ Session saved to localStorage
```

**On Login:**
```
🔐 Signing in...
✅ Signed in successfully!
✅ Session saved to localStorage
```

**On App Load (with session):**
```
🔐 Checking for existing session...
✅ Valid session found, logging in user: test@example.com
```

**On Logout:**
```
🔓 Signing out...
✅ Signed out successfully!
🔓 Session cleared
```

---

## 🎯 Success Criteria

| Test | Expected Result |
|------|-----------------|
| Sign Up | ✅ Account created, redirected to dashboard |
| Login | ✅ Logged in, redirected to dashboard |
| Logout | ✅ Logged out, redirected to landing |
| Session Persistence | ✅ Auto-login on browser reopen |
| Error Handling | ✅ Shows user-friendly error messages |
| Loading States | ✅ Shows "Loading..." during auth |

---

## 🐛 Common Issues

### Issue: "Authentication failed"

**Cause:** Email might already exist  
**Fix:** Use a different email or login with existing credentials

### Issue: Stuck on landing page after login

**Cause:** Session not saving  
**Fix:**
```javascript
// Open browser console (F12)
localStorage.clear();
// Refresh page and try again
```

### Issue: Not auto-logging in

**Cause:** Session expired or cleared  
**Fix:** This is normal! Just login again

---

## ✅ Verification Checklist

- [ ] Can create new account
- [ ] Can login with existing account
- [ ] Can logout
- [ ] Auto-login works (session persistence)
- [ ] Logout clears session (no auto-login after logout)
- [ ] Error messages are user-friendly
- [ ] Loading spinners show during auth
- [ ] Toast notifications work
- [ ] Dashboard shows user name
- [ ] Profile shows correct user info

---

## 🎉 All Tests Pass?

Your authentication is **working perfectly**! 🚀

**What's Next:**
1. ✅ Students can create accounts
2. ✅ Students can login/logout
3. ✅ Sessions persist across visits
4. ✅ Ready for production!

---

**Need More Details?** Read `AUTHENTICATION_SETUP_COMPLETE.md`

**Found a Bug?** Check browser console for error messages
