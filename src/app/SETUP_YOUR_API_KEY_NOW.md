# ⚡ Setup Your API Key NOW - 30 Seconds

## 🔴 Error Fixed!

I fixed the `import.meta.env` error. Now you just need to add your API key.

---

## 🚀 Quick Setup (30 seconds)

### Step 1: Get Your Google API Key

Go to: **https://aistudio.google.com/app/apikey**
- Click "Create API Key"
- Copy the key (starts with `AIzaSy...`)

### Step 2: Add Key to config.ts

1. **Open:** `/lib/config.ts`

2. **Go to line 26** - Find this:
   ```typescript
   API_KEY: getEnvVar('VITE_GEMINI_API_KEY') || 'YOUR_API_KEY_HERE',
   ```

3. **Replace `'YOUR_API_KEY_HERE'` with your actual key:**
   ```typescript
   API_KEY: getEnvVar('VITE_GEMINI_API_KEY') || 'AIzaSyD...',
                                                ↑ Your key here
   ```

4. **Save the file**

### Step 3: Restart

```bash
# Hard refresh browser
Ctrl + Shift + R

# or restart dev server
npm run dev
```

---

## ✅ Done!

Your app now works with:
- ✅ One centralized API key
- ✅ All students use the same key
- ✅ No per-user setup needed

---

## 🔍 Verify It Works

1. **Check browser console (F12)**
   Look for:
   ```
   🔑 Loaded Gemini API key from config.ts (centralized for all users)
   ```

2. **Test it:**
   - Create a unit
   - Upload images
   - Should generate content! ✅

---

## ⚠️ Important

If you're using **Ollama** (not Gemini), you can ignore this and just use:
```typescript
// lib/config.ts - Line 13
export const AI_PROVIDER: AIProvider = 'ollama';
```

Then no API key is needed! Ollama runs locally.

---

**Get API Key:** https://aistudio.google.com/app/apikey  
**File to edit:** `/lib/config.ts` (line 26)  
**Time needed:** 30 seconds
