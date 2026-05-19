# Rate Limit Handling for Gemini API

## Problem

Google AI Studio's Gemini API (free tier) has strict rate limits:
- **Error 429**: "Resource exhausted" - Too many requests in a short time
- Processing 6 modules simultaneously often hits this limit
- Can cause module generation failures

## Solution Implemented

### 1. Retry Logic with Exponential Backoff

Added automatic retry mechanism in `/lib/gemini-service.ts`:

```typescript
// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRY_DELAY = 30000; // 30 seconds

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  operation: string,
  maxRetries: number = MAX_RETRIES
): Promise<T>
```

**How it works:**
- If API call fails with 429 error, automatically retry
- Wait 2 seconds before first retry
- Wait 4 seconds before second retry
- Wait 8 seconds before third retry
- Maximum 3 retry attempts
- Only retries for rate limit errors (429)

### 2. Sequential Processing for Gemini

Modified `/App.tsx` to process modules one at a time when using Gemini:

**Before** (Parallel Processing):
```
Vocabulary → Start
Summary → Start          } All 6 modules start at once
Exercises → Start        } → Rate limit hit! ❌
Quiz → Start
Practice → Start
```

**After** (Sequential Processing):
```
Vocabulary → Complete (30-60s)
↓ Wait 3 seconds
Summary → Complete (30-60s)
↓ Wait 3 seconds
Exercises → Complete (30-60s)
↓ Wait 3 seconds
Quiz → Complete (30-60s)
↓ Wait 3 seconds
Practice → Complete (30-60s)
✅ All modules complete (3-5 minutes total)
```

### 3. Smart Provider Detection

The system automatically:
- Uses **sequential processing** for Gemini (to avoid rate limits)
- Uses **parallel processing** for Ollama (no rate limits)
- Adds 3-second delays between Gemini requests

### 4. Enhanced Error Recovery

If rate limit is still hit during sequential processing:
1. Shows user-friendly error message
2. Waits 60 seconds automatically
3. Retries the failed module
4. Continues with remaining modules

## Configuration

All retry settings are in `/lib/gemini-service.ts`:

```typescript
const MAX_RETRIES = 3;              // Number of retry attempts
const INITIAL_RETRY_DELAY = 2000;   // First retry delay (2s)
const MAX_RETRY_DELAY = 30000;      // Maximum delay (30s)
```

Inter-module delay in `/App.tsx`:
```typescript
await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds
```

## User Experience

### With Gemini API:
1. Create unit → Markdown extracted quickly
2. Modules process **one at a time** (visible in UI)
3. Toast notification: "Processing modules one at a time to avoid rate limits"
4. Each module takes 30-60 seconds
5. Total time: 3-5 minutes for all modules
6. **Reliable** - No rate limit errors

### With Ollama:
1. Create unit → Markdown extracted
2. Modules process **in parallel** (all at once)
3. Each module takes 3-5 minutes
4. Total time: 3-5 minutes (parallel execution)
5. No rate limits (local processing)

## Updated Functions

### `/lib/gemini-service.ts`
- ✅ `generateVocabulary()` - With retry logic
- ✅ `generateSummary()` - With retry logic
- ✅ `generateExercises()` - With retry logic
- ✅ `generateQuiz()` - With retry logic
- ✅ `generatePracticeQuestions()` - With retry logic
- ✅ `retryWithBackoff()` - New helper function

### `/App.tsx`
- ✅ `processModulesInBackground()` - Sequential for Gemini, parallel for Ollama
- ✅ Added delay between modules for Gemini
- ✅ Enhanced error handling with auto-retry

## Testing the Fix

### Test Case 1: Create New Unit with Gemini
1. Upload textbook images or markdown
2. Click "Create Unit"
3. **Expected**: Modules process one at a time
4. **Expected**: No 429 errors
5. **Expected**: All modules complete successfully

### Test Case 2: Regenerate Single Module
1. Open existing unit
2. Click regenerate on any module
3. **Expected**: Module regenerates with retry logic
4. **Expected**: If rate limited, automatically retries

### Test Case 3: Rate Limit Recovery
1. If you see "Rate limit exceeded" error:
2. **Expected**: System waits 60 seconds automatically
3. **Expected**: Retries the module
4. **Expected**: Continues processing remaining modules

## Rate Limit Best Practices

### For Free Tier Users:
1. ✅ Use sequential processing (automatic)
2. ✅ Wait 3 seconds between modules (automatic)
3. ✅ Process one unit at a time
4. ⚠️ Don't create multiple units simultaneously
5. ⚠️ If you hit limits, wait 1-2 minutes before next unit

### To Upgrade:
- **Google AI Studio Pro**: Higher rate limits
- **Vertex AI**: Enterprise-grade quotas
- **Local Ollama**: No rate limits (but slower)

## Monitoring

Watch the console for these messages:

```
⏱️ Processing modules SEQUENTIALLY to avoid rate limits...
🚀 Processing: Vocabulary
✅ Completed: Vocabulary
⏸️ Waiting 3 seconds before next module...
🚀 Processing: Summary
```

If you see retry attempts:
```
⚠️ Vocabulary generation rate limited (attempt 1/4). Retrying in 2000ms...
```

## Fallback Options

If Gemini rate limits persist:
1. Switch to Ollama (local, no limits)
2. Wait 10-15 minutes before creating next unit
3. Upgrade to paid Gemini API tier
4. Process modules manually one at a time (regenerate button)

## Summary

✅ **Sequential processing** prevents most rate limit issues
✅ **Automatic retries** handle occasional rate limits
✅ **Smart delays** between requests
✅ **No user action required** - all automatic
✅ **Reliable module generation** with Gemini free tier
