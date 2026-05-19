# 🧪 Quick API Test

## Test Your Gemini API

### Method 1: Console Test (Fast)

1. Open browser console (F12)
2. Paste this code:

```javascript
// Test Gemini API
(async function testGeminiAPI() {
  const apiKey = localStorage.getItem('gemini_api_key');
  
  if (!apiKey) {
    console.error('❌ No API key found! Click AI Config to add it.');
    return;
  }
  
  console.log('🔑 API Key found (length:', apiKey.length, ')');
  console.log('🧪 Testing Gemini API...');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Say "API works!" if you can read this.' }]
          }]
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ API Error:', response.status, error);
      return;
    }
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    console.log('✅ API Response:', text);
    console.log('🎉 Gemini API is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
})();
```

### Expected Output:
```
🔑 API Key found (length: 39)
🧪 Testing Gemini API...
✅ API Response: API works!
🎉 Gemini API is working correctly!
```

### If You See Errors:

#### Error 400: Invalid API Key
```
❌ API Error: 400 Invalid API key
```
**Fix:** Get new API key from https://aistudio.google.com/app/apikey

#### Error 429: Rate Limit
```
❌ API Error: 429 Resource exhausted
```
**Fix:** Wait 10-15 minutes, then try again

#### Error 403: API Not Enabled
```
❌ API Error: 403 Forbidden
```
**Fix:** Enable Gemini API in Google Cloud Console

### Method 2: Check Current Status

In console, type:

```javascript
// Check what's configured
console.log('Provider:', localStorage.getItem('ai_provider') || 'gemini');
console.log('Has API Key:', !!localStorage.getItem('gemini_api_key'));
```

Should show:
```
Provider: gemini
Has API Key: true
```

## Test Single Module

### Create Test Unit

1. Create new unit with this markdown:
```markdown
# Test Unit

## Photosynthesis

Photosynthesis is the process by which plants convert light energy into chemical energy.

The formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

Key terms:
- Chlorophyll: Green pigment
- Glucose: Sugar produced
- Stomata: Tiny pores in leaves
```

2. Watch console for progress
3. Should complete in 3-5 minutes

### Expected Console Output:
```
⏱️ Processing modules SEQUENTIALLY to avoid rate limits...
🚀 Processing: Vocabulary
📚 Starting vocabulary extraction for: Test Unit
🔄 Vocabulary generation - Attempt 1/4
✅ Vocabulary generation - Success on attempt 1
✅ Generated 8 vocabulary words
✅ Completed: Vocabulary
⏸️ Waiting 3 seconds before next module...
🚀 Processing: Audio Lesson
...
```

## If Still Stuck

### Check These:

1. **Markdown Content Exists**
   - Open unit → Click "Source Markdown"
   - Should show your content
   - If empty → text extraction failed

2. **Provider is Correct**
   - Look for: "⏱️ Processing modules SEQUENTIALLY..."
   - If you see "⚡ Processing modules in PARALLEL..." → Wrong provider

3. **API Key is Valid**
   - Run the API test above
   - Should get successful response

4. **Internet Connection**
   - Try: `fetch('https://google.com').then(r => console.log('Internet OK'))`
   - Should log "Internet OK"

## Force Provider to Gemini

If system thinks you're using wrong provider:

```javascript
// In console
localStorage.setItem('ai_provider', 'gemini');
location.reload();
```

## Switch to Ollama (No Rate Limits)

If Gemini keeps failing:

1. Click "AI Config" in header
2. Select "Ollama (Local)"
3. Follow setup: https://ollama.com/download
4. Install: `ollama pull gemma3:4b`
5. Try creating unit again

Ollama is slower but has no rate limits or API issues.

## Emergency: Clear Everything

If completely broken:

```javascript
// WARNING: Deletes all data!
localStorage.clear();
location.reload();
// Log in again and reconfigure
```

## Report Issue

If none of this works, provide:
1. Results of API test (✅ or ❌)
2. Console logs (copy/paste)
3. Which module is stuck
4. How long it's been (minutes)
5. Internet speed (fast/slow/mobile)
