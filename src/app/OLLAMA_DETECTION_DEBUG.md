# 🔍 Ollama Detection Debugging Guide

## Issue
Ollama is running but not being detected on the Create Unit page.

## What I Fixed

### 1. Updated `getAIProviderStatus()` Function

**Location**: `/lib/ai-provider.ts`

**Problem**: The function wasn't checking both Ollama and Gemini separately. It only checked the current provider.

**Fix**: Updated to check BOTH providers and return detailed status:

```typescript
export async function getAIProviderStatus(): Promise<{
  provider: AIProvider;
  available: boolean;
  message: string;
  ollamaConfigured: boolean;  // ← NEW!
  geminiConfigured: boolean;  // ← NEW!
}> {
  // Check Ollama status
  let ollamaConfigured = false;
  try {
    const ollamaStatus = await OllamaService.getOllamaStatus();
    ollamaConfigured = ollamaStatus.available;
    console.log('🤖 Ollama status:', ollamaStatus);
  } catch (error) {
    console.log('⚠️ Ollama check failed:', error);
  }
  
  // Check Gemini status
  let geminiConfigured = false;
  try {
    const geminiStatus = await GeminiService.getGeminiStatus();
    geminiConfigured = geminiStatus.available;
    console.log('🤖 Gemini status:', geminiStatus);
  } catch (error) {
    console.log('⚠️ Gemini check failed:', error);
  }
  
  // Return comprehensive status
  return {
    provider: currentProvider,
    available: status.available,
    message: status.message,
    ollamaConfigured,
    geminiConfigured
  };
}
```

## How to Debug

### Step 1: Check Browser Console

Open your browser's Developer Console (F12) and look for these messages:

**If Ollama is detected**:
```
🤖 Ollama status: {available: true, hasModel: true, message: "Ollama ready with gemma3:4b"}
🤖 Defaulting to Ollama (detected running)
```

**If Ollama is NOT detected**:
```
❌ Ollama not available: TypeError: Failed to fetch
🔧 CORS ERROR DETECTED!
🤖 Ollama status: {available: false, hasModel: false, message: "Ollama is not running..."}
🤖 Defaulting to Gemini (Ollama not detected)
```

### Step 2: Verify Ollama is Running

Open Command Prompt and run:

```bash
curl http://localhost:11434/api/tags
```

**Expected Output** (if working):
```json
{
  "models": [
    {
      "name": "gemma3:4b",
      "model": "gemma3:4b",
      ...
    }
  ]
}
```

**If you get an error**, Ollama is not running. Start it:
```bash
ollama serve
```

### Step 3: Check CORS Settings

**Test CORS** by opening Developer Console and running:

```javascript
fetch('http://localhost:11434/api/tags')
  .then(r => r.json())
  .then(d => console.log('✅ Ollama CORS works!', d))
  .catch(e => console.error('❌ CORS error:', e))
```

**If you see CORS error**:

```
Access to fetch at 'http://localhost:11434/api/tags' from origin 'https://...' has been blocked by CORS policy
```

**Fix**:
1. Stop Ollama (Ctrl+C in CMD)
2. Set CORS environment variable:
   ```bash
   set OLLAMA_ORIGINS=*
   ```
3. Start Ollama again:
   ```bash
   ollama serve
   ```

### Step 4: Check Model Availability

The system checks if the `gemma3:4b` model is installed.

**List installed models**:
```bash
ollama list
```

**If gemma3:4b is missing**:
```bash
ollama pull gemma3:4b
```

**Alternative models** (if gemma3:4b doesn't work):
```bash
ollama pull llama3.2-vision
ollama pull llava
ollama pull minicpm-v
```

Then update `/lib/config.ts`:
```typescript
export const OLLAMA_CONFIG = {
  BASE_URL: 'http://localhost:11434',
  VISION_MODEL: 'llama3.2-vision',  // ← Change this
};
```

### Step 5: Manual Status Check

You can manually trigger the status check by running this in the browser console:

```javascript
// Import the function (only works if you're on the Create Unit page)
const { getAIProviderStatus } = await import('./lib/ai-provider');

// Check status
const status = await getAIProviderStatus();
console.log('AI Provider Status:', status);
```

**Expected Output**:
```javascript
{
  provider: "ollama",  // or "gemini"
  available: true,
  message: "Ollama ready with gemma3:4b",
  ollamaConfigured: true,  // ← Should be true if Ollama works
  geminiConfigured: true   // ← Depends on Gemini API key
}
```

## Common Issues & Solutions

### Issue 1: "Failed to fetch" Error

**Cause**: CORS not enabled

**Solution**:
```bash
# Windows (CMD)
set OLLAMA_ORIGINS=*
ollama serve

# Windows (PowerShell)
$env:OLLAMA_ORIGINS="*"
ollama serve

# Mac/Linux
OLLAMA_ORIGINS=* ollama serve
```

**Permanent Fix** (Windows):
1. Search "Environment Variables" in Windows
2. Add new System Variable:
   - Name: `OLLAMA_ORIGINS`
   - Value: `*`
3. Restart computer
4. Run `ollama serve`

### Issue 2: Model Not Found

**Symptoms**:
```
🤖 Ollama status: {available: true, hasModel: false, message: "Model gemma3:4b not found..."}
```

**Solution**:
```bash
ollama pull gemma3:4b
```

**Verify**:
```bash
ollama list
```

Should show:
```
NAME            ID              SIZE
gemma3:4b       xxx             2.7 GB
```

### Issue 3: Port Already in Use

**Symptoms**:
```
Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address...
```

**Solution**:
```bash
# Find what's using port 11434
netstat -ano | findstr :11434

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Start Ollama again
ollama serve
```

### Issue 4: Wrong Model Type

**Symptoms**:
Ollama is detected but image processing fails

**Cause**: Using a text-only model (e.g., `gemma2`, `llama3`, `mistral`)

**Solution**: Use a **vision-capable** model:

```bash
# ✅ THESE WORK (vision models)
ollama pull gemma3:4b
ollama pull llama3.2-vision
ollama pull llava
ollama pull minicpm-v

# ❌ THESE DON'T WORK (text-only)
ollama pull gemma2
ollama pull llama3
ollama pull mistral
```

## Testing Checklist

Use this checklist to verify everything works:

### ✅ Pre-Checks
- [ ] Ollama is installed (`ollama --version`)
- [ ] Ollama is running (`ollama serve`)
- [ ] CORS is enabled (`set OLLAMA_ORIGINS=*`)
- [ ] Vision model is installed (`ollama list`)

### ✅ Browser Console Checks
- [ ] No CORS errors in console
- [ ] See "✅ Ollama is available and CORS is enabled!"
- [ ] See "🤖 Ollama status: {available: true, hasModel: true, ...}"
- [ ] See "🤖 Defaulting to Ollama (detected running)"

### ✅ UI Checks
- [ ] Create Unit page loads
- [ ] Provider selection shows Ollama option
- [ ] Ollama shows "✓ Ready" badge (green)
- [ ] No yellow warning about Ollama not detected
- [ ] Ollama is selected by default

### ✅ Functional Checks
- [ ] Upload an image
- [ ] Click "Create Unit"
- [ ] See "Extracting text from images..."
- [ ] Processing completes successfully
- [ ] Unit appears in dashboard

## Still Not Working?

If you've tried everything above and it still doesn't work:

### 1. Check Ollama Logs

Look at the Ollama server output where you ran `ollama serve`:

```
time=... level=INFO msg="GET /api/tags" status=200 latency=...
```

If you see requests coming in, CORS is working!

### 2. Test Direct API Call

Open a new terminal and run:

```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "gemma3:4b",
  "prompt": "Say hello",
  "stream": false
}'
```

Should return JSON with a response.

### 3. Restart Everything

```bash
# 1. Stop Ollama (Ctrl+C)
# 2. Close browser
# 3. Set CORS
set OLLAMA_ORIGINS=*

# 4. Start Ollama
ollama serve

# 5. Open browser in NEW window
# 6. Go to Create Unit page
# 7. Check console
```

### 4. Check Browser Extensions

Some extensions block requests:
- Disable ad blockers
- Disable privacy extensions
- Try incognito mode

### 5. Network/Firewall

Check if Windows Firewall is blocking localhost:
1. Windows Security → Firewall & network protection
2. Allow an app through firewall
3. Make sure your browser is allowed

## Quick Test Script

Copy and paste this into browser console on Create Unit page:

```javascript
// Test Ollama Detection
async function testOllama() {
  console.log('🔍 Testing Ollama...');
  
  // Test 1: Direct API
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Ollama API works!', data);
    } else {
      console.error('❌ Ollama API returned error:', response.status);
    }
  } catch (error) {
    console.error('❌ Ollama API failed:', error);
  }
  
  // Test 2: Status Function
  try {
    const { getAIProviderStatus } = await import('./lib/ai-provider');
    const status = await getAIProviderStatus();
    console.log('📊 Provider Status:', status);
    
    if (status.ollamaConfigured) {
      console.log('✅ Ollama is configured and ready!');
    } else {
      console.log('❌ Ollama is NOT configured');
    }
  } catch (error) {
    console.error('❌ Status check failed:', error);
  }
}

testOllama();
```

## What Changed in the Code

### Before (Broken)
```typescript
export async function getAIProviderStatus() {
  const status = await checkProviderAvailability();
  return {
    provider: currentProvider,
    available: status.available,
    message: status.message
    // ❌ Missing ollamaConfigured!
  };
}
```

### After (Fixed)
```typescript
export async function getAIProviderStatus() {
  // Check BOTH providers
  let ollamaConfigured = false;
  try {
    const ollamaStatus = await OllamaService.getOllamaStatus();
    ollamaConfigured = ollamaStatus.available;
  } catch (error) {
    console.log('⚠️ Ollama check failed:', error);
  }
  
  let geminiConfigured = false;
  try {
    const geminiStatus = await GeminiService.getGeminiStatus();
    geminiConfigured = geminiStatus.available;
  } catch (error) {
    console.log('⚠️ Gemini check failed:', error);
  }
  
  return {
    provider: currentProvider,
    available: status.available,
    message: status.message,
    ollamaConfigured,  // ✅ Now included!
    geminiConfigured   // ✅ Now included!
  };
}
```

## Expected Console Output (Success)

When everything works, you should see this in the console:

```
🤖 StudyCopilot Ollama Configuration:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Base URL: http://localhost:11434
🎯 Vision Model: gemma3:4b

🎯 MODE: Exact Text Extraction (OCR-like)
   • Extracts ONLY text from images
   • No additions or elaborations
   • Word-for-word transcription

⚠️  IMPORTANT: Must use a VISION-capable model!
   ✅ Works: gemma3:4b, gemma3:12b, llama3.2-vision, llava, minicpm-v
   ❌ Won't work: gemma2, mistral, llama3 (text-only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Ollama is available and CORS is enabled!
🤖 Ollama status: {available: true, hasModel: true, message: "Ollama ready with gemma3:4b"}
🤖 Gemini status: {available: true, message: "Gemini API ready"}
🤖 Defaulting to Ollama (detected running)
```

## Summary

**What I Did**:
1. ✅ Fixed `getAIProviderStatus()` to check both Ollama and Gemini
2. ✅ Added detailed logging for debugging
3. ✅ Function now returns `ollamaConfigured` and `geminiConfigured`

**What You Need to Do**:
1. Refresh your browser
2. Check the console for status messages
3. If Ollama still not detected, follow the debugging steps above
4. Most common issue: CORS not enabled (fix with `set OLLAMA_ORIGINS=*`)

**After the fix, the Create Unit page should**:
- Show Ollama with "✓ Ready" badge if detected
- Auto-select Ollama if available
- Show warning if Ollama not detected
- Still work with Gemini as fallback

Let me know what you see in the console! 🔍
