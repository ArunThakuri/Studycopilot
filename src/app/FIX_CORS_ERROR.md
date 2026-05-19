# 🔧 Fix Ollama CORS Error

## The Error

```
❌ Ollama not available: TypeError: Failed to fetch

🔧 CORS ERROR DETECTED!
Ollama is running but CORS is not enabled.
```

## What This Means

Ollama is running on your computer, but your web browser is blocking the connection because **CORS (Cross-Origin Resource Sharing)** is not enabled.

CORS is a security feature that prevents websites from making unauthorized requests to local servers.

## ✅ Quick Fix (Temporary)

### Windows

1. **Stop Ollama** (if running)
   - Press `Ctrl+C` in the terminal where Ollama is running

2. **Enable CORS for this session**
   ```cmd
   set OLLAMA_ORIGINS=*
   ```

3. **Start Ollama**
   ```cmd
   ollama serve
   ```

4. **Refresh your browser**
   - The vocabulary AI lookup should now work!

### macOS/Linux

1. **Stop Ollama** (if running)
   - Press `Ctrl+C` in the terminal

2. **Enable CORS for this session**
   ```bash
   export OLLAMA_ORIGINS=*
   ```

3. **Start Ollama**
   ```bash
   ollama serve
   ```

4. **Refresh your browser**

## ✅ Permanent Fix (Recommended)

### Windows

1. **Open System Properties**
   - Press `Win + R`
   - Type `sysdm.cpl` and press Enter

2. **Add Environment Variable**
   - Go to "Advanced" tab
   - Click "Environment Variables"
   - Under "User variables" or "System variables", click "New"
   - Variable name: `OLLAMA_ORIGINS`
   - Variable value: `*`
   - Click OK

3. **Restart Command Prompt**
   - Close all CMD windows
   - Open new CMD and run: `ollama serve`

4. **Done!** CORS is now permanently enabled

### macOS/Linux

1. **Add to your shell profile**

   For bash (`~/.bashrc` or `~/.bash_profile`):
   ```bash
   echo 'export OLLAMA_ORIGINS=*' >> ~/.bashrc
   source ~/.bashrc
   ```

   For zsh (`~/.zshrc`):
   ```bash
   echo 'export OLLAMA_ORIGINS=*' >> ~/.zshrc
   source ~/.zshrc
   ```

2. **Restart Ollama**
   ```bash
   ollama serve
   ```

3. **Done!** CORS is now permanently enabled

## 🔐 Security Note

Setting `OLLAMA_ORIGINS=*` allows **any website** to access your local Ollama server.

**For development**, this is fine.

**For production**, you might want to restrict it:
```bash
# Only allow specific domains
set OLLAMA_ORIGINS=http://localhost:3000,http://localhost:5173
```

But for a learning app running locally, `*` is perfectly safe.

## 🧪 Test If It Worked

1. **Open your browser console** (F12)

2. **Check for success message:**
   ```
   ✅ Ollama is available and CORS is enabled!
   ```

3. **Try the vocabulary lookup:**
   - Go to any unit's Vocabulary module
   - Type a word in "Look Up New Word"
   - Click "Add to Vocab"
   - Should show spinner and add word with real definition!

## 📊 What Happens Without CORS

### Before (CORS Disabled) ❌

```
User types "photosynthesis" → Clicks "Add to Vocab"
     ↓
Browser tries to call Ollama API
     ↓
❌ CORS Error: "Failed to fetch"
     ↓
Word added with placeholder:
{
  word: "photosynthesis",
  definition: "AI lookup not available. Please enable CORS...",
  nepali: "शब्द"
}
     ↓
Toast: "Ollama CORS error. Check console for fix."
```

### After (CORS Enabled) ✅

```
User types "photosynthesis" → Clicks "Add to Vocab"
     ↓
Browser calls Ollama API successfully
     ↓
AI generates definition and translation
     ↓
Word added with real data:
{
  word: "Photosynthesis",
  definition: "The process by which green plants convert sunlight...",
  nepali: "प्रकाश संश्लेषण"
}
     ↓
Toast: "Added 'Photosynthesis' to vocabulary!"
```

## 🔍 Troubleshooting

### Issue 1: Still Getting CORS Error After Setting Variable

**Solution:**
- Make sure you **closed and reopened** Command Prompt
- Check if variable is set: `echo %OLLAMA_ORIGINS%` (Windows) or `echo $OLLAMA_ORIGINS` (Mac/Linux)
- Should show: `*`

### Issue 2: Ollama Not Running

**Check:**
```bash
# Test if Ollama is running
curl http://localhost:11434/api/tags
```

**Should see:** JSON response with models

**If not running:**
```bash
ollama serve
```

### Issue 3: Port Already in Use

**Error:** `address already in use`

**Solution:**
```bash
# Kill existing Ollama process
taskkill /F /IM ollama.exe  # Windows
pkill ollama  # Mac/Linux

# Then start again
ollama serve
```

### Issue 4: Variable Not Persisting

**Windows:**
- Make sure you added it to "User variables" or "System variables"
- NOT just in the CMD session
- Restart CMD after setting

**Mac/Linux:**
- Make sure you added it to the correct shell profile file
- Run `source ~/.bashrc` (or `~/.zshrc`) after editing
- Restart terminal

## 🎯 Verification Steps

### Step 1: Check Environment Variable

**Windows:**
```cmd
echo %OLLAMA_ORIGINS%
```

**Mac/Linux:**
```bash
echo $OLLAMA_ORIGINS
```

**Expected:** `*`

### Step 2: Check Ollama is Running

```bash
curl http://localhost:11434/api/tags
```

**Expected:** JSON response with your models

### Step 3: Check Browser Console

1. Open your app
2. Press F12
3. Look for:
   ```
   ✅ Ollama is available and CORS is enabled!
   ```

### Step 4: Test Vocabulary Lookup

1. Create a unit (if you haven't)
2. Go to Vocabulary module
3. Type any word
4. Click "Add to Vocab"
5. Should see spinner and then success message

## 🚀 Complete Workflow

### First Time Setup:

```bash
# 1. Stop any running Ollama
Ctrl+C

# 2. Set CORS (temporary)
set OLLAMA_ORIGINS=*        # Windows
export OLLAMA_ORIGINS=*     # Mac/Linux

# 3. Start Ollama
ollama serve

# 4. In another terminal, pull model if needed
ollama pull gemma3:4b

# 5. Open your app and test!
```

### Every Time (If Permanent Fix Not Done):

```bash
# 1. Set CORS
set OLLAMA_ORIGINS=*        # Windows
export OLLAMA_ORIGINS=*     # Mac/Linux

# 2. Start Ollama
ollama serve

# 3. Use your app!
```

### Every Time (After Permanent Fix):

```bash
# Just start Ollama!
ollama serve

# CORS is already enabled
```

## 📝 Summary

**Problem:** Browser blocks Ollama API calls (CORS error)

**Cause:** Ollama's default security settings

**Quick Fix:** `set OLLAMA_ORIGINS=* && ollama serve`

**Permanent Fix:** Add `OLLAMA_ORIGINS=*` to environment variables

**Verification:** Console shows "✅ Ollama is available and CORS is enabled!"

**Test:** Vocabulary word lookup works with real AI definitions

**Time:** 2 minutes to fix permanently

Now your vocabulary AI lookup will work perfectly! 🎉
