# 💬 Chat Feature Testing Guide

## ✅ Confirmed: Works with BOTH Ollama & Gemini

The chat feature automatically uses **whichever AI provider** you have configured in `/lib/config.ts` - the same one used for all other module processing.

## How It Works

### Provider Selection
The chat uses `AI_CONFIG.PROVIDER` from `/lib/config.ts`:
- **`'ollama'`** → Chat uses local Ollama with your configured model
- **`'gemini'`** → Chat uses Google AI Studio with Gemini API

### Configuration
Both providers use the same settings as your module generation:

**Ollama:**
- Model: `gemma3:4b` (current, configurable in `/lib/config.ts`)
- URL: `http://localhost:11434`
- No API key needed

**Gemini:**
- Model: `gemini-2.0-flash` 
- API Key: From localStorage or `/lib/config.ts`
- Cloud-based, fast responses

## Testing Steps

### 1️⃣ Test with Ollama

```bash
# Make sure Ollama is running
ollama serve

# In another terminal, check the model is pulled
ollama list
# Should show: gemma3:4b
```

In `/lib/config.ts`, ensure:
```typescript
export const AI_PROVIDER: AIProvider = 'ollama';
```

**Hard refresh browser:** `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)

**Test the chat:**
1. Open a unit with markdown content
2. Click "Ask AI" button (bottom-right)
3. Ask: "What are the main concepts in this unit?"
4. Watch your Ollama terminal for logs like:
   ```
   [CHAT] Question: What are the main concepts...
   [CHAT] Provider: ollama, Model: gemma3:4b
   [CHAT] Sending request to Ollama...
   [CHAT] Ollama response length: 245 chars
   [CHAT] ✅ Response generated successfully
   ```

### 2️⃣ Test with Gemini

In `/lib/config.ts`, ensure:
```typescript
export const AI_PROVIDER: AIProvider = 'gemini';
```

Make sure your API key is set (one of these):
- In AI Config Dialog (Settings icon in header)
- In localStorage: `gemini_api_key`
- In `/lib/config.ts`: `GEMINI_CONFIG.API_KEY`

**Hard refresh browser:** `Ctrl + Shift + R`

**Test the chat:**
1. Open a unit with markdown content
2. Click "Ask AI" button
3. Ask: "Explain this in simpler terms"
4. Check browser console for:
   ```
   [CHAT] Provider: gemini, Model: gemma3:4b
   [CHAT] Using Gemini API key from request
   [CHAT] Sending request to Gemini...
   [CHAT] Gemini response length: 312 chars
   [CHAT] ✅ Response generated successfully
   ```

## Common Issues & Solutions

### ❌ "GEMINI_API_KEY not configured"
**Solution:** 
- Click Settings (gear icon) in app header
- Enter your Gemini API key
- Or add it to `/lib/config.ts`

### ❌ "Ollama API error"
**Solution:**
- Make sure Ollama is running: `ollama serve`
- Check model is pulled: `ollama pull gemma3:4b`
- Verify URL is correct: `http://localhost:11434`

### ❌ "Sorry, I encountered an error"
**Solution:**
1. Open browser console (F12)
2. Look for error messages starting with `[CHAT]`
3. Check the error details
4. Common causes:
   - API key not set (for Gemini)
   - Ollama not running (for Ollama)
   - Model not pulled (for Ollama)
   - Network/CORS issues

## Example Questions to Test

**Questions about unit content:**
- "What are the main topics covered?"
- "Explain [specific concept] in simple terms"
- "What formulas are mentioned?"
- "Give me a summary of this unit"
- "What are the key vocabulary words?"

**General knowledge questions:**
- "What is photosynthesis?" (if unit isn't about biology)
- "How does gravity work?"
- "What is AI?"

The AI will tell you when answering from general knowledge vs. unit content!

## Features to Test

✅ **Chat Interface**
- [ ] Floating "Ask AI" button appears
- [ ] Chat sidebar slides in from right
- [ ] Welcome message shows unit title
- [ ] Messages display with timestamps
- [ ] Auto-scrolls to newest messages

✅ **Functionality**
- [ ] Enter key sends message
- [ ] Shift+Enter creates new line
- [ ] Loading indicator shows while processing
- [ ] Error messages are helpful
- [ ] Can close and reopen chat

✅ **AI Quality**
- [ ] Answers questions about unit content
- [ ] References specific parts of the unit
- [ ] Provides general knowledge when asked
- [ ] Uses student-appropriate language
- [ ] Gives clear, helpful responses

## Performance Notes

**Ollama (`gemma3:4b`):**
- Response time: ~5-15 seconds
- Depends on: CPU, model size, context length
- Fully private, no API costs

**Gemini (`gemini-2.0-flash`):**
- Response time: ~1-3 seconds
- Cloud-based, very fast
- FREE tier (60 requests/minute)

## Debugging Tips

### Enable Detailed Logging

**Browser Console (F12):**
- All chat requests/responses logged
- Error details shown
- API key status (for Gemini)

**Server Logs:**
For Ollama, watch the terminal running `ollama serve`

**Provider Check:**
```javascript
// In browser console:
console.log(AI_CONFIG.PROVIDER); // Should show 'ollama' or 'gemini'
```

### Test the Backend Directly

```bash
# Test with curl (Ollama example)
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-eac874f3/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "question": "What is this about?",
    "context": "This is a test unit about mathematics.",
    "unitTitle": "Test Unit",
    "provider": "ollama",
    "model": "gemma3:4b"
  }'
```

## Success Indicators

When everything is working:

✅ Chat opens smoothly
✅ Welcome message appears instantly
✅ Questions get responses (check timing based on provider)
✅ Answers are relevant and well-formatted
✅ No error messages in console
✅ Logs show successful API calls

---

**Need Help?**
- Check browser console (F12) for errors
- Review `/supabase/functions/server/index.tsx` logs
- Verify your AI provider configuration in `/lib/config.ts`
- Make sure hard refresh was done after config changes

🎉 **Happy chatting!**
