# ⚡ Quick API Key Setup - 2 Minutes

## 🎯 Goal

Set up **one API key** that all students will use automatically.

---

## 📍 Step 1: Get Your Google API Key

1. Go to: **https://aistudio.google.com/app/apikey**
2. Click **"Create API Key"**
3. Copy the key (starts with `AIzaSy...`)

---

## 📍 Step 2: Add Key to Your App

### Option A: Simple (config.ts) ⚡

**Best for:** Quick local development

```bash
# Open the config file
code lib/config.ts
# or
nano lib/config.ts
```

**Find line 18:**
```typescript
API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
                                                 ↑ REPLACE THIS
```

**Replace with your key:**
```typescript
API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD-Pk4zLiWJZm9vxYZUPnEUvXfNAjtYtM',
                                                 ↑ Your actual key here
```

**Save and restart:**
```bash
npm run dev
```

**✅ Done! All users now use your key!**

---

### Option B: Secure (.env file) 🔒

**Best for:** Production deployments, keeping secrets safe

```bash
# Create .env file
cp .env.example .env

# Edit it
nano .env
```

**Add your key:**
```bash
VITE_GEMINI_API_KEY=AIzaSyD-Pk4zLiWJZm9vxYZUPnEUvXfNAjtYtM
                    ↑ Your actual key here (no quotes needed)
```

**Save and restart:**
```bash
npm run dev
```

**✅ Done! Key is secure and won't be committed to Git!**

---

## 📍 Step 3: Test It

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Open browser console (F12):**
   Look for:
   ```
   🔑 Loaded Gemini API key from config.ts (centralized for all users)
   ```

3. **Try it:**
   - Create a unit
   - Upload images
   - Generate content
   - Should work! ✅

---

## ⚠️ IMPORTANT Security Note

### If you used Option A (config.ts):

**DO NOT commit your API key to GitHub!**

```bash
# Before you push to Git:
git diff lib/config.ts

# If you see your real API key, STOP!
# Use Option B instead (create .env file)
```

### If you used Option B (.env):

**You're safe!** The `.env` file is in `.gitignore` and won't be committed. ✅

---

## 🔍 Quick Check

### ✅ It's Working If:

- Console shows: `🔑 Loaded Gemini API key from config.ts`
- Students can generate content without entering a key
- No "API key not configured" errors

### ❌ It's NOT Working If:

- Error: "API key not configured"
- Students are asked for an API key
- Content generation fails

**Fix:** Check that you:
1. Pasted the correct key
2. Restarted the dev server
3. Refreshed your browser

---

## 🎓 What Students Experience

### Before (OLD - Each user enters key):
```
1. Student logs in
2. Sees "Enter API key" prompt ❌
3. Has to get their own key
4. Complex setup
```

### After (NEW - Centralized):
```
1. Student logs in
2. Uploads images
3. Content generates automatically ✅
4. No setup needed!
```

**Students never see or need an API key!** 🎉

---

## 🚀 Deployment (Production)

### When you deploy (Vercel, Netlify, etc.):

1. **Don't commit your API key in config.ts**
2. **Set environment variable in hosting platform:**

**Vercel:**
```
Settings → Environment Variables
Add: VITE_GEMINI_API_KEY = your-key
```

**Netlify:**
```
Site settings → Environment variables
Add: VITE_GEMINI_API_KEY = your-key
```

**Railway/Render:**
```
Environment → Add variable
VITE_GEMINI_API_KEY = your-key
```

3. **Redeploy**
4. **Done!** ✅

---

## 📋 Quick Reference

### Location of API Key Configuration:
```
/lib/config.ts (Line 18)
```

### Environment Variable Name:
```
VITE_GEMINI_API_KEY
```

### Where to Get API Key:
```
https://aistudio.google.com/app/apikey
```

---

## 💡 Which Option Should I Choose?

| Scenario | Option | Why |
|----------|--------|-----|
| Just testing locally | A (config.ts) | Fastest |
| Local dev, private repo | A (config.ts) | Simple |
| Local dev, public repo | B (.env) | Secure |
| Production deployment | B (.env + platform vars) | Most secure |
| Team collaboration | B (.env) | Each dev has their own |

---

## ✅ Done!

Your API key is now centralized! All students can use the app without any setup.

**Next:** Test by creating a unit and generating content! 🚀

---

**Need more details?** See: `CENTRALIZED_API_KEY_SETUP.md`
