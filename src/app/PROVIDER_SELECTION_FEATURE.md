# ✅ AI Provider Selection Feature

## What Was Added

Added a user-friendly **AI Provider Selection** interface on the Create Unit page, allowing users to choose between **Ollama (local)** and **Google Gemini (cloud)** for generating learning materials.

## Why This Feature?

**Problem**: 
- User hit Gemini rate limits during testing
- Wanted to switch to Ollama but had to edit config files
- No way to choose provider per unit

**Solution**:
- ✅ Visual provider selector with radio buttons
- ✅ Auto-detects which providers are available
- ✅ Shows status (Ready, Not detected, etc.)
- ✅ Instant switching - no config file editing needed
- ✅ Smart defaults (uses Ollama if detected, else Gemini)

## UI Components

### Provider Selection Card

Located on the Create Unit page, between AI Status Banner and Unit Title:

```
┌─────────────────────────────────────────┐
│ 🤖 AI Provider Selection                │
│                                         │
│ Choose which AI to use for generating  │
│ learning materials                      │
│                                         │
│ ○ Ollama (Local)              ✓ Ready  │
│   ⚡ Fast, private, runs on your       │
│   computer. Requires Ollama installed.  │
│   Model: gemma3:4b                      │
│                                         │
│ ● Google Gemini (Cloud)          Free  │
│   🚀 Very fast, cloud-based. May have  │
│   rate limits.                          │
│   Model: gemini-2.0-flash-exp          │
│                                         │
│ 💡 Gemini API key is configured.       │
│    Ready to generate!                   │
└─────────────────────────────────────────┘
```

## Features

### 1. Smart Auto-Detection

On page load, the system checks both providers:

```typescript
useEffect(() => {
  async function checkStatus() {
    const status = await getAIProviderStatus();
    
    // Auto-select based on availability
    if (status.ollamaConfigured) {
      setSelectedProvider('ollama');
      console.log('🤖 Defaulting to Ollama (detected running)');
    } else {
      setSelectedProvider('gemini');
      console.log('🤖 Defaulting to Gemini (Ollama not detected)');
    }
  }
  checkStatus();
}, []);
```

**Result**: Always defaults to the best available option!

### 2. Visual Status Indicators

**Ollama Ready**:
```
○ Ollama (Local)              ✓ Ready
  ⚡ Fast, private, runs on your computer
  Model: gemma3:4b
```

**Ollama Not Detected**:
```
○ Ollama (Local)
  ⚡ Fast, private, runs on your computer
  Model: gemma3:4b

⚠️ Ollama not detected. Make sure it's running on localhost:11434
   See OLLAMA_SETUP.md for installation instructions
```

**Gemini Selected**:
```
● Google Gemini (Cloud)          Free
  🚀 Very fast, cloud-based. May have rate limits.
  Model: gemini-2.0-flash-exp

💡 Gemini API key is configured. Ready to generate!
```

### 3. Instant Provider Switching

When you select a provider:

```typescript
onValueChange={(value: 'ollama' | 'gemini') => {
  setSelectedProvider(value);
  setProvider(value);  // Updates global provider
  console.log(`🔄 Switched to ${value} provider`);
}}
```

**Console Output**:
```
🔄 Switched to ollama provider
```

**Effect**: All future AI operations use the selected provider!

### 4. Per-Provider Information

**Ollama Card**:
- ✅ Name: "Ollama (Local)"
- ✅ Badge: "✓ Ready" (if detected)
- ✅ Description: Fast, private, local processing
- ✅ Model: gemma3:4b
- ✅ Warning: Shown if not detected

**Gemini Card**:
- ✅ Name: "Google Gemini (Cloud)"
- ✅ Badge: "Free"
- ✅ Description: Fast, cloud-based
- ✅ Model: gemini-2.0-flash-exp
- ✅ Status: Shows API key configured

## How It Works

### Step 1: User Opens Create Unit Page

```
1. Page loads
2. System checks provider availability
3. Auto-selects best provider:
   - Ollama if running → selects Ollama
   - Ollama not running → selects Gemini
4. Shows status indicators
```

### Step 2: User Selects Provider

```
User clicks radio button → Provider switches immediately
└─→ setProvider() called
    └─→ Global provider updated
        └─→ All AI operations use new provider
```

### Step 3: User Creates Unit

```
1. Upload content
2. Click "Create Unit"
3. System uses SELECTED provider for:
   - Text extraction
   - Text cleaning
   - Title suggestion
   - Module generation
```

### Step 4: Processing

```
Using Ollama:
  🤖 Processing with Ollama...
  📄 gemma3:4b extracting text...
  ✅ Completed

Using Gemini:
  🤖 Processing with Gemini...
  📄 gemini-2.0-flash-exp extracting text...
  ✅ Completed
```

## Code Changes

### Files Modified

1. **components/create-unit.tsx**
   - Added `selectedProvider` state
   - Added `RadioGroup` UI component
   - Added auto-detection logic
   - Imported `setProvider` from ai-provider

2. **lib/ai-provider.ts**
   - Already had `setProvider()` function
   - Already supported dynamic provider switching
   - No changes needed!

### New Imports

```typescript
import { 
  processUnitQuickly, 
  getAIProviderStatus, 
  suggestTitleFromMarkdown, 
  createInitialContentStructure, 
  setProvider  // ← NEW!
} from '../lib/ai-provider';

import { RadioGroup, RadioGroupItem } from './ui/radio-group';  // ← NEW!
```

### New State

```typescript
const [selectedProvider, setSelectedProvider] = useState<'ollama' | 'gemini'>('ollama');
```

## Usage Examples

### Example 1: Testing with Ollama

```
1. Make sure Ollama is running:
   ollama serve

2. Open Create Unit page
   → See "✓ Ready" next to Ollama
   → Ollama auto-selected

3. Upload content and create unit
   → Uses Ollama for all processing
   → Fast local processing
   → No rate limits!
```

### Example 2: Hit Gemini Rate Limit

```
1. Creating unit with Gemini
   → Hit rate limit error
   
2. Switch to Ollama:
   - Click "Ollama (Local)" radio button
   - See console: "🔄 Switched to ollama provider"
   
3. Create unit again
   → Uses Ollama
   → No rate limits!
   → Processing continues
```

### Example 3: No Ollama Installed

```
1. Open Create Unit page
   → Ollama shows "⚠️ Ollama not detected"
   → Gemini auto-selected (default fallback)

2. Can still use Gemini
   → Cloud processing
   → Fast results
   → Free tier available
```

## Console Output

### When Page Loads (Ollama Available)

```
🤖 Checking AI provider status...
✅ Ollama detected at localhost:11434
✅ Model available: gemma3:4b
🤖 Defaulting to Ollama (detected running)
```

### When Page Loads (Ollama Not Available)

```
🤖 Checking AI provider status...
⚠️ Ollama not detected at localhost:11434
✅ Gemini API key configured
🤖 Defaulting to Gemini (Ollama not detected)
```

### When User Switches Provider

```
User clicks Gemini:
  🔄 Switched to gemini provider

User clicks Ollama:
  🔄 Switched to ollama provider
```

### During Processing

```
🚀 Starting unit creation...
🤖 Using provider: ollama
📄 Extracting text with gemma3:4b...
✅ Text extracted successfully
🧹 Cleaning text with ollama...
✅ Text cleaned
💡 Generating title with ollama...
✅ Title suggested: "Scientific Inquiry"
```

## Benefits

### ✅ User Experience

- **No config editing**: Switch providers with one click
- **Visual feedback**: See which providers are available
- **Smart defaults**: Auto-selects best option
- **Clear warnings**: Shows if Ollama not detected
- **Instant switching**: No page reload needed

### ✅ Development

- **Flexible testing**: Switch between providers easily
- **Rate limit handling**: Switch to Ollama if Gemini limited
- **Local development**: Use Ollama when offline
- **Cloud deployment**: Use Gemini for production

### ✅ Robustness

- **Fallback support**: Gemini works if Ollama unavailable
- **Status detection**: Shows real-time provider availability
- **Error prevention**: Warns before using unavailable provider
- **Clear feedback**: Console logs for debugging

## Testing Checklist

### Test 1: Auto-Detection

- [ ] Start with Ollama running
- [ ] Open Create Unit page
- [ ] Verify Ollama is selected
- [ ] Verify "✓ Ready" badge shown

### Test 2: Manual Switch to Gemini

- [ ] Click Gemini radio button
- [ ] See console: "🔄 Switched to gemini provider"
- [ ] See blue info box: "Gemini API key configured"
- [ ] Create unit → verify uses Gemini

### Test 3: Manual Switch to Ollama

- [ ] Click Ollama radio button
- [ ] See console: "🔄 Switched to ollama provider"
- [ ] Create unit → verify uses Ollama
- [ ] Check console for ollama logs

### Test 4: Ollama Not Running

- [ ] Stop Ollama
- [ ] Refresh page
- [ ] Verify Gemini auto-selected
- [ ] Verify warning shown for Ollama
- [ ] Create unit → works with Gemini

### Test 5: Rate Limit Handling

- [ ] Start with Gemini selected
- [ ] Create unit → hit rate limit
- [ ] Switch to Ollama
- [ ] Create unit again → works!

## Troubleshooting

### Issue: Ollama Shows "Not Detected"

**Cause**: Ollama not running or CORS not enabled

**Fix**:
1. Start Ollama: `ollama serve`
2. Enable CORS: `set OLLAMA_ORIGINS=*`
3. Refresh page

### Issue: Can't Switch Provider

**Cause**: Radio button not responding

**Fix**:
1. Check browser console for errors
2. Refresh page
3. Try hard refresh (Ctrl+Shift+R)

### Issue: Wrong Provider Used

**Cause**: Provider not actually switching

**Fix**:
1. Check console for "🔄 Switched to..." message
2. Verify setProvider() is imported
3. Create unit and check which provider logs appear

## Future Enhancements

Possible improvements:

1. **Provider Performance Stats**
   - Show avg processing time per provider
   - Compare speed: Ollama vs Gemini

2. **Automatic Rate Limit Handling**
   - Auto-switch to Ollama if Gemini hits limit
   - Retry with fallback provider

3. **Provider Preferences**
   - Remember user's preferred provider
   - Save in localStorage

4. **Model Selection**
   - Choose different Ollama models
   - Choose different Gemini models

5. **Batch Processing**
   - Use Ollama for multiple units (no rate limits)
   - Use Gemini for single unit (faster)

## Summary

**What You Get**:
- ✅ Visual provider selector on Create Unit page
- ✅ Auto-detection of available providers
- ✅ Smart defaults (Ollama → Gemini fallback)
- ✅ Instant switching with one click
- ✅ Clear status indicators
- ✅ No config file editing needed

**Perfect For**:
- ✅ Testing with Ollama (no rate limits)
- ✅ Switching when Gemini rate limited
- ✅ Local development (offline with Ollama)
- ✅ Production use (fast with Gemini)

**Just refresh your browser and you'll see the new provider selector!** 🚀

## Quick Reference

### Switch to Ollama
```
1. Open Create Unit page
2. Click "Ollama (Local)" radio button
3. Create unit → uses Ollama
```

### Switch to Gemini
```
1. Open Create Unit page
2. Click "Google Gemini (Cloud)" radio button
3. Create unit → uses Gemini
```

### Check Current Provider
```javascript
// In browser console
import { getCurrentProvider } from './lib/ai-provider'
console.log(getCurrentProvider())
// Output: 'ollama' or 'gemini'
```

That's it! Provider selection made easy! 🎉
