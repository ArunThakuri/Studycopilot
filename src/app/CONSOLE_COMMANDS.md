# 🔧 Emergency Console Commands

## Run These in Browser Console (F12)

### 1. See What's Happening
```javascript
// Check if processing started
console.log('Checking localStorage...');
const subjects = JSON.parse(localStorage.getItem('studycopilot_subjects') || '[]');
const lastSubject = subjects[subjects.length - 1];
const lastUnit = lastSubject?.units[lastSubject.units.length - 1];

console.log('Last unit:', lastUnit?.title);
console.log('Markdown exists:', !!lastUnit?.content?.markdown);
console.log('\nModule statuses:');
if (lastUnit?.content?.modules) {
  Object.entries(lastUnit.content.modules).forEach(([name, data]) => {
    console.log(`  ${name}:`, data.status, `${data.progress || 0}%`, data.error || '');
  });
} else {
  console.log('  ❌ No modules found!');
}
```

### 2. Test Gemini API Right Now
```javascript
// Quick API test
(async () => {
  const key = localStorage.getItem('gemini_api_key');
  if (!key) {
    console.error('❌ No API key!');
    return;
  }
  
  console.log('🧪 Testing API...');
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contents: [{parts: [{text: 'test'}]}]
        })
      }
    );
    console.log('Status:', res.status, res.ok ? '✅' : '❌');
    if (!res.ok) {
      console.error('Error:', await res.text());
    } else {
      console.log('✅ API WORKS!');
    }
  } catch (e) {
    console.error('❌ Failed:', e);
  }
})();
```

### 3. Check Provider
```javascript
console.log('Provider:', localStorage.getItem('ai_provider') || 'gemini');
console.log('Has API key:', !!localStorage.getItem('gemini_api_key'));
```

### 4. Force Retry Processing
```javascript
// This will trigger a page reload and retry
location.reload();
```

### 5. See Full Console History
```javascript
// Type this to see all past messages
console.log('Check the console above for these messages:');
console.log('- "⏱️ Processing modules SEQUENTIALLY..."');
console.log('- "🚀 Processing: Vocabulary"');
console.log('- "🔄 Vocabulary generation - Attempt 1/4"');
console.log('- "📡 Calling Gemini API..."');
console.log('- "⏳ Waiting for API response..."');
console.log('');
console.log('If you see NONE of these messages, processing never started!');
```

### 6. Emergency: Force Complete a Module
```javascript
// WARNING: Only use if you want to skip a stuck module
const subjects = JSON.parse(localStorage.getItem('studycopilot_subjects') || '[]');
const lastSubject = subjects[subjects.length - 1];
const lastUnit = lastSubject.units[lastSubject.units.length - 1];

// Change 'vocabulary' to whichever module is stuck
lastUnit.content.modules.vocabulary = {
  status: 'completed',
  progress: 100,
  data: [
    { word: 'Test', definition: 'Manually completed', nepali: 'परीक्षण' }
  ]
};

localStorage.setItem('studycopilot_subjects', JSON.stringify(subjects));
console.log('✅ Module marked as complete. Refresh the page.');
location.reload();
```

### 7. Check Internet Connection
```javascript
fetch('https://www.google.com')
  .then(() => console.log('✅ Internet is working'))
  .catch(() => console.error('❌ No internet connection'));
```

### 8. See Raw Markdown
```javascript
const subjects = JSON.parse(localStorage.getItem('studycopilot_subjects') || '[]');
const lastUnit = subjects[subjects.length - 1]?.units[subjects[subjects.length - 1].units.length - 1];
console.log('Markdown length:', lastUnit?.content?.markdown?.length || 0);
console.log('First 500 chars:', lastUnit?.content?.markdown?.substring(0, 500));
```

## What to Look For

### ✅ Good Signs:
```
⏱️ Processing modules SEQUENTIALLY to avoid rate limits...
🚀 Processing: Vocabulary
📚 Starting vocabulary extraction for: [unit name]
🔄 Vocabulary generation - Attempt 1/4
📡 Calling Gemini API for vocabulary...
⏳ Waiting for API response...
📨 Got response, parsing...
✅ Generated 12 vocabulary words
✅ Completed: Vocabulary
⏸️ Waiting 3 seconds before next module...
```

### ❌ Bad Signs:
```
❌ [429] Resource exhausted
❌ Vocabulary generation timed out after 120000ms
❌ Gemini API key not configured
❌ No markdown content found
[Nothing - no messages at all]
```

### 🤔 Stuck Signs:
```
🚀 Processing: Vocabulary
📡 Calling Gemini API for vocabulary...
⏳ Waiting for API response...
[Stuck here for 5+ minutes - API call hung]
```

## If API Call is Hung

The API call might be stuck waiting forever. This can happen if:
1. Slow internet connection
2. Gemini API is having issues
3. Request is too large
4. Network firewall blocking

**Solution:**
1. Refresh the page
2. Try again with smaller content (1 page instead of 5)
3. Check internet speed
4. Try switching to Ollama (local, no network issues)
