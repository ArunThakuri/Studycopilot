# 💬 Chat Troubleshooting Guide

## ❌ "Connection refused" Error

### Problem
You see this error in the chat:
```
Connection refused (os error 111)
```

### Cause
**Ollama is not running** on your system.

### Solution (Pick ONE)

---

## ✅ Option 1: Start Ollama (Recommended for Local/Private)

### Step 1: Open Terminal
- **Mac/Linux**: Open Terminal app
- **Windows**: Open Command Prompt or PowerShell

### Step 2: Start Ollama
```bash
ollama serve
```

You should see:
```
Listening on 127.0.0.1:11434
```

**Keep this terminal window open!** Ollama needs to run in the background.

### Step 3: Test in Another Terminal
```bash
ollama list
```

Should show your models (e.g., `gemma3:4b`).

### Step 4: Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Step 5: Try Chat Again
Open the chat and ask a question. Should work now! ✅

---

## ✅ Option 2: Switch to Gemini (Cloud-based, Faster)

### Step 1: Get Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 2: Configure in App
1. Click Settings (⚙️ icon) in StudyCopilot header
2. Select "Google AI Studio (Gemini)"
3. Paste your API key
4. Click Save

### Step 3: Hard Refresh Browser
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Step 4: Try Chat Again
Should work with fast cloud processing! ✅

---

## 🔍 How to Check Which Provider You're Using

### In Chat
Look at the chat header:
- **"🤖 Ollama"** = Using local Ollama
- **"✨ Gemini"** = Using cloud Gemini

### In Code
Check `/lib/config.ts`:
```typescript
export const AI_PROVIDER: AIProvider = 'ollama'; // or 'gemini'
```

---

## 🆚 Provider Comparison

| Feature | Ollama | Gemini |
|---------|--------|--------|
| **Speed** | ~5-15 seconds | ~1-3 seconds ⚡ |
| **Privacy** | 100% local ✅ | Cloud-based |
| **Cost** | Free ✅ | Free tier (60 req/min) ✅ |
| **Setup** | Requires installation | Just API key |
| **Internet** | Not required ✅ | Required |
| **Quality** | Good | Excellent |

---

## 📋 Quick Checklist

### For Ollama Users:
- [ ] Ollama is installed
- [ ] Terminal shows: `ollama serve` is running
- [ ] Model is pulled: `ollama list` shows `gemma3:4b`
- [ ] Config shows: `AI_PROVIDER = 'ollama'`
- [ ] Hard refreshed browser

### For Gemini Users:
- [ ] API key obtained from Google AI Studio
- [ ] API key entered in Settings
- [ ] Config shows: `AI_PROVIDER = 'gemini'`
- [ ] Internet connection is working
- [ ] Hard refreshed browser

---

## 🆘 Still Not Working?

### Check Browser Console
1. Press `F12` to open DevTools
2. Go to Console tab
3. Look for errors starting with `[CHAT]`
4. Share the error message for help

### Common Issues

**"Ollama serve" command not found**
- Ollama is not installed
- Install from: https://ollama.com/download

**"Model not found"**
```bash
ollama pull gemma3:4b
```

**"GEMINI_API_KEY not configured"**
- Enter API key in Settings (⚙️ icon)
- Or add to `/lib/config.ts`

**Chat opens but no response**
- Check browser console for errors
- Verify provider is running/configured
- Try asking a simpler question

---

## 🎯 Recommended Setup

**For Best Experience:**

1. **Use Gemini** for fast development/testing
   - Quick responses (~1-3 seconds)
   - No local setup required
   - Free tier is generous

2. **Use Ollama** for privacy/offline work
   - Keep data local
   - No API limits
   - Works without internet

3. **Switch between them** as needed!
   - Change in Settings (⚙️)
   - Hard refresh browser
   - Both work the same way

---

## ✅ Success Indicators

When chat is working correctly:

✅ Chat opens instantly
✅ Welcome message appears
✅ Questions get responses (within expected time)
✅ No errors in console
✅ Provider indicator shows in header

---

**Need more help?** Check:
- `/QUICK_START_CHAT.md` - Quick start guide
- `/CHAT_TESTING_GUIDE.md` - Detailed testing
- `/CHAT_FEATURE_COMPLETE.md` - Full documentation
