# 🔑 Centralized API Key Setup - All Users Share One Key

## ✅ Overview

StudyCopilot is now configured for **centralized API key management**:
- ✅ **One API key** for all students and users
- ✅ **Admin sets it once**, students never see it
- ✅ **Secure** - Not exposed to end users
- ✅ **Simple** - No per-user configuration needed

---

## 🚀 Quick Setup (2 Minutes)

### Option 1: Using config.ts (Simplest)

**For local development and simple deployments:**

1. **Get your Google API key:**
   - Go to: https://aistudio.google.com/app/apikey
   - Click "Create API Key"
   - Copy the key

2. **Add it to config.ts:**
   ```bash
   # Open the file
   nano lib/config.ts
   # or
   code lib/config.ts
   ```

3. **Replace the placeholder:**
   ```typescript
   // lib/config.ts - Line 18
   export const GEMINI_CONFIG = {
     API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
     //                                                ↑ Replace this
   };
   ```

   **Replace with your actual key:**
   ```typescript
   API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD...',
   ```

4. **⚠️ IMPORTANT: Do NOT commit this!**
   ```bash
   # Check what you're about to commit
   git diff lib/config.ts
   
   # If you see your real API key, DO NOT push!
   # Use Option 2 instead (environment variables)
   ```

5. **Test it:**
   ```bash
   npm run dev
   ```
   
   All users will now use your centralized API key! ✅

---

### Option 2: Using .env File (Recommended for Production)

**For secure production deployments:**

1. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API key:**
   ```bash
   # Edit .env
   nano .env
   
   # Add this line:
   VITE_GEMINI_API_KEY=AIzaSyD-your-actual-key-here
   ```

3. **Verify .gitignore:**
   ```bash
   # Make sure .env is in .gitignore
   cat .gitignore | grep .env
   # Should show: .env
   ```

4. **Leave config.ts as-is:**
   ```typescript
   // lib/config.ts - Don't change this
   API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
   ```

5. **Test it:**
   ```bash
   npm run dev
   ```

6. **Deploy:**
   - The `.env` file is in `.gitignore` ✅
   - Safe to commit and push ✅
   - Set `VITE_GEMINI_API_KEY` in your hosting platform's environment variables

---

## 🎯 How It Works

### Priority Order

The system loads the API key in this order:

```
1. Environment Variable (VITE_GEMINI_API_KEY)
   ↓ if not found
2. config.ts hardcoded value
   ↓ if not found
3. localStorage (admin override)
```

### For Different Scenarios

**Local Development:**
```typescript
// config.ts
API_KEY: 'AIzaSy...' // Your key here
```

**Production (Vercel, Netlify, etc.):**
```bash
# Environment variable in hosting platform
VITE_GEMINI_API_KEY=AIzaSy...
```

**Testing:**
```bash
# .env file (not committed)
VITE_GEMINI_API_KEY=AIzaSy...
```

---

## 🔒 Security Best Practices

### ✅ DO This:

1. **Use environment variables for production:**
   ```bash
   # .env (in .gitignore)
   VITE_GEMINI_API_KEY=your-key
   ```

2. **Set environment variables in hosting platforms:**
   - **Vercel:** Settings → Environment Variables
   - **Netlify:** Site settings → Environment variables
   - **Railway:** Settings → Variables
   - **Render:** Environment → Environment Variables

3. **Keep .gitignore updated:**
   ```gitignore
   .env
   .env.local
   .env.*.local
   ```

### ❌ DON'T Do This:

1. **Don't commit API keys:**
   ```typescript
   // ❌ BAD if you push to public repo
   API_KEY: 'AIzaSyD...'
   ```

2. **Don't share your .env file:**
   - Never send it via email
   - Never commit it to Git
   - Never share in screenshots

3. **Don't hardcode in production:**
   - Use environment variables instead
   - Keys in code = security risk

---

## 📋 Deployment Checklist

### Before Deploying to Production:

- [ ] Generate Google API key: https://aistudio.google.com/app/apikey
- [ ] Set `VITE_GEMINI_API_KEY` in hosting platform
- [ ] Test that environment variable is loaded
- [ ] Verify `.env` is in `.gitignore`
- [ ] Check that no keys are hardcoded in committed files
- [ ] Push to repository
- [ ] Test in production

---

## 🎓 Student Experience

### What Students See:

1. Student creates account
2. Student logs in
3. Student uploads images
4. **System automatically uses your API key** ✅
5. Content is generated
6. Student sees their learning materials

### What Students DON'T See:

- ❌ API key input field
- ❌ Configuration settings
- ❌ Setup steps
- ❌ Any technical details

**It just works!** 🎉

---

## 🛠️ Troubleshooting

### Problem: "API key not configured"

**Solution:**

```bash
# Check if key is set
echo $VITE_GEMINI_API_KEY

# Check config.ts
cat lib/config.ts | grep API_KEY

# Check .env file
cat .env | grep VITE_GEMINI_API_KEY

# Restart dev server
npm run dev
```

### Problem: Key is in localStorage instead

**Solution:**

```javascript
// Open browser console (F12)
localStorage.removeItem('gemini_api_key');
// Refresh page
```

Now it will use config.ts/environment variable.

### Problem: Need to change the key

**Option A: Update config.ts**
```typescript
API_KEY: 'new-key-here'
```

**Option B: Update .env**
```bash
VITE_GEMINI_API_KEY=new-key-here
```

**Then restart:**
```bash
npm run dev
```

---

## 🌐 Hosting Platform Setup

### Vercel

1. Go to your project settings
2. Environment Variables
3. Add:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSy...` (your key)
4. Redeploy

### Netlify

1. Site settings → Environment variables
2. Add variable:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSy...`
3. Rebuild site

### Railway

1. Project → Settings → Variables
2. Add:
   - Variable: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSy...`
3. Redeploy

### Other Platforms

All platforms have "Environment Variables" or "Config Vars" section.
Just add `VITE_GEMINI_API_KEY=your-key` and redeploy.

---

## 📊 Key Loading Logic

```typescript
// lib/gemini-service.ts

// Priority 1: Environment variable
if (import.meta.env.VITE_GEMINI_API_KEY) {
  GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  console.log('🔑 Using environment variable');
}
// Priority 2: config.ts
else if (GEMINI_CONFIG.API_KEY !== 'YOUR_API_KEY_HERE') {
  GEMINI_API_KEY = GEMINI_CONFIG.API_KEY;
  console.log('🔑 Using config.ts key');
}
// Priority 3: localStorage (admin override)
else if (localStorage.getItem('gemini_api_key')) {
  GEMINI_API_KEY = localStorage.getItem('gemini_api_key');
  console.log('🔑 Using localStorage override');
}
```

---

## ✅ Verification

### Check if it's working:

1. **Open browser console (F12)**

2. **Look for this message:**
   ```
   🔑 Loaded Gemini API key from config.ts (centralized for all users)
   ```

3. **Try generating content:**
   - Upload images
   - Generate modules
   - Should work without asking for API key ✅

4. **Check API status:**
   ```javascript
   // In browser console
   console.log(import.meta.env.VITE_GEMINI_API_KEY);
   // Should show your key (only visible to you)
   ```

---

## 🎉 Benefits

### For Administrators:

- ✅ Set once, works for everyone
- ✅ Easy to update
- ✅ Centralized billing
- ✅ Full control

### For Students:

- ✅ No setup needed
- ✅ No API key required
- ✅ Just works out of the box
- ✅ Simple, clean experience

### For Developers:

- ✅ Easy to deploy
- ✅ Environment variable support
- ✅ Fallback to config.ts
- ✅ Admin override via localStorage

---

## 🔄 Updating the Key

### Method 1: config.ts (Quick)

```bash
# Edit file
nano lib/config.ts

# Update line 18
API_KEY: 'new-key-here',

# Restart
npm run dev
```

### Method 2: .env (Secure)

```bash
# Edit .env
nano .env

# Update
VITE_GEMINI_API_KEY=new-key-here

# Restart
npm run dev
```

### Method 3: Hosting Platform

1. Update environment variable in platform settings
2. Redeploy application
3. Done! ✅

---

## 📁 Files Modified

| File | Purpose |
|------|---------|
| `/lib/config.ts` | Centralized API key configuration |
| `/lib/gemini-service.ts` | Load key from config/env first |
| `/.env.example` | Template for environment variables |
| `/.gitignore` | Prevent .env from being committed |

---

## 💡 Pro Tips

1. **Use .env for development:**
   - Keeps secrets out of code
   - Easy to change
   - Won't get committed

2. **Use environment variables for production:**
   - Most secure method
   - Easy to update without code changes
   - Platform-specific

3. **Keep a backup of your key:**
   - Save in password manager
   - Document where it's used
   - Easy to rotate if needed

4. **Monitor usage:**
   - Check Google AI Studio dashboard
   - Set usage limits
   - Track costs

---

## ✅ Current Status

| Item | Status |
|------|--------|
| Centralized API key support | ✅ Implemented |
| Environment variable support | ✅ Added |
| .env.example created | ✅ Done |
| .gitignore updated | ✅ Done |
| Priority loading (env > config > localStorage) | ✅ Implemented |
| Documentation | ✅ Complete |

---

## 🚀 Next Steps

1. **Choose your setup method:**
   - Quick: Use config.ts (Option 1)
   - Secure: Use .env file (Option 2)

2. **Add your API key**

3. **Test it:**
   ```bash
   npm run dev
   ```

4. **Deploy to production** (if needed)

5. **Enjoy!** All students can now use the app without any setup! 🎉

---

**Questions?** Check the troubleshooting section above!

**Last Updated:** Just now  
**Status:** 🟢 Ready to use!
