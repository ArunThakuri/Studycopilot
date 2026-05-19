# 🔍 Module Generation Debugging Guide

## Quick Diagnosis

### Step 1: Open Browser Console
Press **F12** or **Right-click → Inspect → Console**

### Step 2: Look for These Messages

#### ✅ **Normal Sequential Processing:**
```
⏱️ Processing modules SEQUENTIALLY to avoid rate limits...
🚀 Processing: Vocabulary
🔄 Vocabulary generation - Attempt 1/4
✅ Vocabulary generation - Success on attempt 1
✅ Generated 12 vocabulary words
✅ Completed: Vocabulary
⏸️ Waiting 3 seconds before next module...
🚀 Processing: Audio Lesson
...
```

#### ❌ **Stuck/Hanging (Problem):**
```
🚀 Processing: Vocabulary
🔄 Vocabulary generation - Attempt 1/4
[Nothing else for minutes...]
```

#### ❌ **Timeout Error:**
```
🚀 Processing: Vocabulary
🔄 Vocabulary generation - Attempt 1/4
❌ Vocabulary generation - Attempt 1 failed: Vocabulary generation timed out after 120000ms
⚠️ Vocabulary generation timed out. Retrying in 2000ms...
```

#### ❌ **Rate Limit Error:**
```
🚀 Processing: Vocabulary
🔄 Vocabulary generation - Attempt 1/4
❌ Vocabulary generation - Attempt 1 failed: [429] Resource exhausted
⚠️ Vocabulary generation rate limited. Retrying in 2000ms...
```

## Common Issues & Solutions

### Issue 1: Module Stuck on "Processing..." Forever

**Symptoms:**
- Module shows "Processing..." for more than 5 minutes
- No console messages appearing
- No errors shown

**Solution:**
1. Refresh the page
2. Check if markdown content exists (view Source Markdown module)
3. Try regenerating that specific module
4. Check your internet connection

### Issue 2: API Timeout Errors

**Symptoms:**
```
❌ Vocabulary generation timed out after 120000ms
```

**Solutions:**
1. **Check Internet Connection**
   - Slow connection can cause timeouts
   - Try on faster network

2. **Verify API Key**
   - Click "AI Config" in header
   - Make sure Gemini API key is valid
   - Test with a simple unit first

3. **Try Shorter Content**
   - Long markdown files take longer
   - Try with 1-2 pages first

### Issue 3: Rate Limit Errors (429)

**Symptoms:**
```
❌ [429] Resource exhausted
```

**Solutions:**
1. **Wait 5-10 Minutes**
   - Free tier has limits
   - Let the quota reset

2. **Don't Create Multiple Units Simultaneously**
   - Create one unit at a time
   - Wait for all modules to complete

3. **Sequential Processing Should Handle This**
   - System should automatically retry
   - Wait for the retry to complete

### Issue 4: All Modules Fail

**Symptoms:**
- All modules show red error icon
- Multiple errors in console

**Solutions:**
1. **Check API Key**
   ```
   Open Console → Look for:
   "🔑 Loaded Gemini API key from localStorage"
   ```
   - If missing, reconfigure API key

2. **Check Provider**
   ```
   Look for:
   "⏱️ Processing modules SEQUENTIALLY..." ← Gemini
   "⚡ Processing modules in PARALLEL..." ← Ollama
   ```

3. **Verify Content**
   - Open Source Markdown module
   - Check if markdown was extracted
   - If empty, the issue is with text extraction

## Manual Testing Steps

### Test 1: Single Module Regeneration
1. Open a unit with failed modules
2. Click regenerate (🔄) on ONE module
3. Watch console for progress
4. Should complete in 30-120 seconds

### Test 2: Small Content Test
1. Create new unit with 1 small image
2. Or paste short markdown (1 paragraph)
3. Watch all modules process
4. Should complete in 3-5 minutes

### Test 3: Provider Check
1. Open console
2. Type: `localStorage.getItem('gemini_api_key')`
3. Should show your API key (keep it secret!)
4. If null, reconfigure in AI Config dialog

## Console Commands for Debugging

### Check Current Provider:
```javascript
// In browser console
localStorage.getItem('ai_provider') || 'gemini'
```

### Check API Key Status:
```javascript
// Check if key exists (don't log the actual key!)
!!localStorage.getItem('gemini_api_key')
// Should return: true
```

### Clear Cache (if modules stuck):
```javascript
// Clear saved state
localStorage.removeItem('studycopilot_subjects')
// Then refresh page
```

## Expected Timings

### Per Module (Gemini):
- Vocabulary: 30-60 seconds
- Audio Lesson: Instant (dummy content)
- Summary: 30-60 seconds
- Exercises: 45-90 seconds
- Interactive Quiz: 45-90 seconds
- Practice Questions: 45-90 seconds

### Total Time:
- **Gemini Sequential:** 3-6 minutes for all modules
- **If Stuck Longer:** Something is wrong

## Error Messages Explained

### "Gemini API key not configured"
**Fix:** Click AI Config → Enter your API key

### "[429] Resource exhausted"
**Fix:** Wait 10 minutes, or switch to Ollama

### "timed out after 120000ms"
**Fix:** Check internet, try smaller content, or increase timeout

### "Cannot regenerate - no markdown content found"
**Fix:** Text extraction failed - check Source Markdown module

## Advanced: Increase Timeout

If you have slow internet, edit `/lib/gemini-service.ts`:

```typescript
// Line 14: Change from 120000 to 300000 (5 minutes)
const API_TIMEOUT = 300000; // 5 minutes
```

## Get Help

**When asking for help, provide:**
1. Screenshot of module status page
2. Console log messages (copy/paste)
3. Which module is stuck
4. How long it's been stuck
5. Your internet speed (fast/slow)

## Quick Fix: Force Reset

If completely stuck:
1. Open Console (F12)
2. Run: `localStorage.clear()`
3. Refresh page
4. Log in again
5. Try creating a simple unit

**⚠️ Warning:** This deletes all your subjects/units!

## Status Check

Current implementation has:
- ✅ 2-minute timeout per API call
- ✅ 3 retry attempts
- ✅ Exponential backoff (2s → 4s → 8s)
- ✅ Sequential processing for Gemini
- ✅ Better error logging

If modules still hang, there might be:
- Network issues
- API key problems
- Content that's too long
- Gemini API service issues
