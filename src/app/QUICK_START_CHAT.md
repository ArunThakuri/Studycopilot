# 💬 Quick Start - AI Chat Feature

## ✅ FIXED! Now Works with Both Ollama & Gemini

### ⚡ Latest Update
Chat now calls AI **directly from your browser** (same as module generation), so **Ollama works perfectly**! No more "Connection refused" errors.

### 🚀 How to Use (3 Steps)

1. **Hard Refresh** your browser
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Open any unit** with markdown content

3. **Click "Ask AI"** button (bottom-right corner)

That's it! 🎉

---

## 🎯 Quick Test

Ask the AI: **"What are the main concepts in this unit?"**

- Should get a response in:
  - **Ollama**: ~5-15 seconds
  - **Gemini**: ~1-3 seconds

---

## 🔧 Current Setup Check

Open browser console (F12) and check:

```javascript
console.log(AI_CONFIG.PROVIDER); 
// Should show: "ollama" or "gemini"
```

**The chat automatically uses this provider!** No extra config needed.

---

## ❓ Not Working?

### If using Ollama:
```bash
# Check Ollama is running
ollama serve

# Check model is pulled
ollama list | grep gemma3
```

### If using Gemini:
- Click Settings (⚙️ icon in header)
- Make sure API key is entered
- Or check `/lib/config.ts` → `GEMINI_CONFIG.API_KEY`

---

## 📍 Features

✅ Context-aware (knows your unit content)
✅ General knowledge (can answer other questions too)
✅ Shows which AI is responding (Ollama/Gemini)
✅ Auto-scrolls to new messages
✅ Press Enter to send
✅ Press Shift+Enter for new line

---

## 🎨 Visual Indicator

Chat header shows:
- **🤖 Ollama • gemma3:4b** (if using Ollama)
- **✨ Gemini • gemma3:4b** (if using Gemini)

---

**For detailed testing:** See `/CHAT_TESTING_GUIDE.md`
**For full documentation:** See `/CHAT_FEATURE_COMPLETE.md`
