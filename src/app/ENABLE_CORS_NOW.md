# ⚡ ENABLE CORS NOW - 2 Minute Fix

## 🚨 You're seeing this error:

```
❌ Ollama not available: TypeError: Failed to fetch
🔧 CORS ERROR DETECTED!
```

## ✅ Fix it RIGHT NOW:

### Windows (Copy & Paste These Commands)

1. **Open a NEW Command Prompt** (Win+R, type `cmd`, Enter)

2. **Copy and paste this:**
```cmd
set OLLAMA_ORIGINS=*
```
Press Enter

3. **Then copy and paste this:**
```cmd
ollama serve
```
Press Enter

4. **Keep that window open!**

5. **Go back to your browser and press F5**

6. **Done!** ✅

---

### Mac/Linux (Copy & Paste These Commands)

1. **Open Terminal**

2. **Copy and paste this:**
```bash
export OLLAMA_ORIGINS=*
```
Press Enter

3. **Then copy and paste this:**
```bash
ollama serve
```
Press Enter

4. **Keep that terminal window open!**

5. **Go back to your browser and press F5**

6. **Done!** ✅

---

## 🎯 What Should Happen

### In Your Terminal:
```
Ollama is running on http://localhost:11434
```

### In Browser Console (Press F12):
```
✅ Ollama is available and CORS is enabled!
```

### In Your App:
- Vocabulary word lookup now works
- Real AI definitions and translations
- No more error messages

---

## 🧪 Test It

1. Go to any unit's **Vocabulary** module
2. Type a word in "Look Up New Word": `photosynthesis`
3. Click **"Add to Vocab"**
4. Should show:
   - ⏳ Spinner: "Looking up..."
   - ✅ Success: "Added 'Photosynthesis' to vocabulary!"
   - Real definition + Nepali translation

---

## ❓ Still Not Working?

### Check #1: Is the variable set?

**Windows:**
```cmd
echo %OLLAMA_ORIGINS%
```
Should show: `*`

**Mac/Linux:**
```bash
echo $OLLAMA_ORIGINS
```
Should show: `*`

### Check #2: Is Ollama running?

You should see this in your terminal:
```
Ollama is running on http://localhost:11434
```

If not, run: `ollama serve`

### Check #3: Did you refresh the browser?

Press `F5` or `Ctrl+F5` (hard refresh)

---

## 🔄 Every Time You Restart Your Computer

You'll need to run these commands again:

**Windows:**
```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

**Mac/Linux:**
```bash
export OLLAMA_ORIGINS=*
ollama serve
```

**Or** set it permanently (see `/FIX_CORS_ERROR.md`)

---

## 📸 Visual Guide

### Step 1: Open Command Prompt
```
Windows: Press Win+R → Type "cmd" → Enter
Mac/Linux: Open Terminal app
```

### Step 2: Run Commands
```
> set OLLAMA_ORIGINS=*          (press Enter)
> ollama serve                   (press Enter)

You should see:
Ollama is running on http://localhost:11434
```

### Step 3: Keep Window Open
```
⚠️ DON'T CLOSE THIS WINDOW!
Ollama needs to keep running.
```

### Step 4: Refresh Browser
```
Go to your app → Press F5
```

### Step 5: Check Console
```
Press F12 → Look for:
✅ Ollama is available and CORS is enabled!
```

### Step 6: Test Vocabulary
```
Vocabulary → Look Up New Word → Type anything → Add
Should work now! ✅
```

---

## 🎉 Success!

**Before:**
- ❌ CORS errors everywhere
- ❌ Word lookup fails
- ❌ Placeholder definitions

**After:**
- ✅ No CORS errors
- ✅ Word lookup works
- ✅ Real AI definitions
- ✅ Nepali translations
- ✅ All features working

---

## 📚 More Help

- **Detailed CORS guide:** `/FIX_CORS_ERROR.md`
- **Vocabulary feature docs:** `/VOCABULARY_FIXED.md`
- **Quick troubleshooting:** `/VOCABULARY_QUICK_FIX.md`

---

## 🚀 That's It!

You just fixed the CORS issue in 2 minutes.

Now go test your vocabulary lookup! 🎯
