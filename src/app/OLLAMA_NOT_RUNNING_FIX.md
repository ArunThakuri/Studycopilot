# ⚠️ Quick Fix: "Connection Refused" Error

## The Problem
You tried to use the chat and got:
```
Connection refused (os error 111)
```

## The Cause
**Ollama is not running!** Your app is configured to use Ollama, but it's not started.

---

## ✅ Solution 1: Start Ollama (30 seconds)

### 1. Open a Terminal/Command Prompt

### 2. Run this command:
```bash
ollama serve
```

### 3. You should see:
```
Listening on 127.0.0.1:11434
```

### 4. Keep this window open!

### 5. Go back to your browser and hard refresh:
- **Windows/Linux**: Press `Ctrl + Shift + R`
- **Mac**: Press `Cmd + Shift + R`

### 6. Try the chat again!

The chat should now work! ✅

---

## ✅ Solution 2: Switch to Gemini (2 minutes)

If you don't want to run Ollama locally, use cloud-based Gemini instead:

### 1. Get a free API key:
Visit: https://aistudio.google.com/app/apikey

### 2. In StudyCopilot:
- Click the **Settings (⚙️)** icon in the top-right header
- Select **"Google AI Studio (Gemini)"**
- Paste your API key
- Click **Save**

### 3. Hard refresh browser:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 4. Try the chat again!

You'll get faster responses (~1-3 seconds) with Gemini! ⚡

---

## 🔍 How to Tell Which One You're Using

Look at the **chat header** when you open it:
- **"🤖 Ollama • gemma3:4b"** = Local Ollama
- **"✨ Gemini • gemma3:4b"** = Cloud Gemini

---

## 💡 Pro Tip

**Using Ollama?** Make it auto-start:

### Mac/Linux:
Add to your `~/.bashrc` or `~/.zshrc`:
```bash
# Auto-start Ollama (optional)
# ollama serve &
```

### Windows:
Create a shortcut to run `ollama serve` at startup.

---

## 📊 Quick Comparison

| | Ollama | Gemini |
|---|---|---|
| **Setup** | Run `ollama serve` | Just API key |
| **Speed** | 5-15 seconds | 1-3 seconds ⚡ |
| **Privacy** | 100% local ✅ | Cloud |
| **Cost** | Free ✅ | Free ✅ |
| **Internet** | Not needed | Required |

---

## ✅ Verification

Chat is working when:
- ✅ No "Connection refused" error
- ✅ Questions get answered
- ✅ No errors in browser console (F12)

---

**That's it!** Choose whichever solution works best for you. Both work great! 🎉
