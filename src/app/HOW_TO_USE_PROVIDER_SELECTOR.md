# 🎯 How to Use the AI Provider Selector

## TL;DR

**New feature on Create Unit page**: Choose between Ollama (local) or Gemini (cloud) with one click!

## Step-by-Step Guide

### 1. Open Create Unit Page

```
Dashboard → Select Subject → Add New Unit
```

You'll see a new card: **"🤖 AI Provider Selection"**

### 2. Choose Your Provider

**Option A: Ollama (Recommended for Testing)**
```
┌─────────────────────────────────────────┐
│ ● Ollama (Local)              ✓ Ready  │
│   ⚡ Fast, private, runs locally        │
│   Model: gemma3:4b                      │
└─────────────────────────────────────────┘

✅ No rate limits
✅ Fast processing
✅ Works offline
❌ Requires Ollama installed
```

**Option B: Google Gemini (If Rate Limited)**
```
┌─────────────────────────────────────────┐
│ ● Google Gemini (Cloud)          Free  │
│   🚀 Very fast, cloud-based             │
│   Model: gemini-2.0-flash-exp          │
└─────────────────────────────────────────┘

✅ Very fast
✅ No installation
✅ Works anywhere
⚠️ May have rate limits
```

### 3. Create Your Unit

After selecting provider:
1. Upload content (images or markdown)
2. Enter unit title
3. Click "Create Unit"
4. Click "Generate All Materials & Continue"
5. Wait 3-6 minutes

**Your selected provider will be used for ALL processing!**

## When to Use Which Provider

### Use Ollama When:

✅ **You hit Gemini rate limits**
```
Error: 429 Resource exhausted
→ Switch to Ollama immediately!
```

✅ **Testing locally**
```
Development/testing → Use Ollama
No worries about rate limits
```

✅ **Creating multiple units**
```
Need to create 5+ units?
→ Ollama has no rate limits
```

✅ **Privacy matters**
```
Sensitive textbook content?
→ Ollama processes locally
```

### Use Gemini When:

✅ **Ollama not installed**
```
Don't have Ollama?
→ Gemini works out of the box
```

✅ **Need maximum speed**
```
Gemini is faster than Ollama
Good for single unit creation
```

✅ **Working on different computer**
```
Not your dev machine?
→ Gemini works anywhere
```

✅ **Deploying to production**
```
Cloud hosting?
→ Gemini is cloud-based
```

## Visual Guide

### What You'll See

```
┌──────────────────────────────────────────────────┐
│ Create New Unit - Science                       │
├──────────────────────────────────────────────────┤
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ 🤖 AI Provider Selection                    │  │
│ │                                             │  │
│ │ Choose which AI to use for generating      │  │
│ │ learning materials                          │  │
│ │                                             │  │
│ │ ○ Ollama (Local)              ✓ Ready      │  │
│ │   ⚡ Fast, private, runs on your computer  │  │
│ │   Model: gemma3:4b                          │  │
│ │                                             │  │
│ │ ● Google Gemini (Cloud)          Free      │  │
│ │   🚀 Very fast, cloud-based                │  │
│ │   Model: gemini-2.0-flash-exp              │  │
│ │                                             │  │
│ │ 💡 Gemini API key is configured.           │  │
│ │    Ready to generate!                       │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Unit Title *                                │  │
│ │ [Introduction to Scientific Learning]      │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Upload Content                              │  │
│ │ [Upload Images or Markdown]                │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│                    [Create Unit]                │
└──────────────────────────────────────────────────┘
```

## Console Messages

### When You Select Ollama

```
🔄 Switched to ollama provider
🤖 Using provider: ollama
📄 Processing with gemma3:4b...
```

### When You Select Gemini

```
🔄 Switched to gemini provider
🤖 Using provider: gemini
📄 Processing with gemini-2.0-flash-exp...
```

### When Processing Starts

```
With Ollama:
  🚀 Starting unit creation...
  🤖 Using provider: ollama
  📄 Extracting text with gemma3:4b...
  🧹 Cleaning text with ollama...
  💡 Generating title with ollama...
  ✅ Processing vocabulary with ollama...
  ✅ Processing summary with ollama...
  [continues for all modules]

With Gemini:
  🚀 Starting unit creation...
  🤖 Using provider: gemini
  📄 Extracting text with gemini-2.0-flash-exp...
  🧹 Cleaning text with Gemini AI...
  💡 Generating title with Gemini...
  ✅ Processing vocabulary with gemini...
  ✅ Processing summary with gemini...
  [continues for all modules]
```

## Common Scenarios

### Scenario 1: You're Rate Limited on Gemini

**Problem**: Creating unit fails with "429 Resource exhausted"

**Solution**:
```
1. Switch to Ollama:
   - Click "Ollama (Local)" radio button
   - See: "🔄 Switched to ollama provider"

2. Make sure Ollama is running:
   - Terminal: ollama serve
   - Should see: "✓ Ready" badge

3. Try creating unit again:
   - Upload content
   - Click "Generate All Materials & Continue"
   - Wait 3-6 minutes
   - Success! ✅
```

### Scenario 2: Ollama Not Detected

**Problem**: "⚠️ Ollama not detected" warning shown

**Solution**:
```
Option A: Start Ollama
  1. Open terminal
  2. Run: ollama serve
  3. In another terminal: set OLLAMA_ORIGINS=*
  4. Refresh page
  5. Should see "✓ Ready"

Option B: Use Gemini Instead
  1. Click "Google Gemini (Cloud)"
  2. See: "💡 Gemini API key is configured"
  3. Create unit with Gemini
```

### Scenario 3: Testing Multiple Units

**Best Practice**: Use Ollama

```
Why? No rate limits!

1. Switch to Ollama
2. Create 10 units in a row
3. No "429 Resource exhausted" errors
4. Fast, reliable processing
```

### Scenario 4: Quick Single Unit

**Best Practice**: Use Gemini

```
Why? Slightly faster!

1. Keep Gemini selected (default if Ollama not running)
2. Create one unit
3. Fast cloud processing
4. Switch to Ollama if you hit rate limit
```

## Troubleshooting

### Provider Not Switching?

**Check**:
1. Look for console message: "🔄 Switched to [provider]"
2. If not appearing, refresh page
3. Try clicking radio button again

### Ollama Shows "Not Ready"?

**Fix**:
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Enable CORS
set OLLAMA_ORIGINS=*

# Refresh browser page
```

### Wrong Provider Being Used?

**Verify**:
```javascript
// In browser console:
console.log('Current provider:', /* check logs */);

// Look for these in console during processing:
// "🤖 Using provider: ollama" or
// "🤖 Using provider: gemini"
```

## Pro Tips

### 💡 Tip 1: Default Provider

The system auto-selects based on availability:
- Ollama running? → Auto-selects Ollama
- Ollama not running? → Auto-selects Gemini

### 💡 Tip 2: Switching Mid-Session

You can switch providers between units:
- Unit 1 with Gemini → Rate limited
- Switch to Ollama
- Unit 2 with Ollama → Success!

### 💡 Tip 3: Check Before Processing

Before clicking "Generate All Materials":
- Check which radio button is selected
- Verify the status message below it
- Ollama should show "✓ Ready"
- Gemini should show "💡 API key configured"

### 💡 Tip 4: Console Debugging

If unsure which provider is being used:
```javascript
// Watch console during processing
// You'll see clear messages like:
🤖 Using provider: ollama
// or
🤖 Using provider: gemini
```

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│ Provider Selection Quick Reference          │
├─────────────────────────────────────────────┤
│                                             │
│ 🤖 OLLAMA                                   │
│ ├─ When: Testing, multiple units           │
│ ├─ Pros: No rate limits, private           │
│ ├─ Cons: Requires installation             │
│ └─ Setup: ollama serve                      │
│                                             │
│ 🚀 GEMINI                                   │
│ ├─ When: Single unit, no Ollama            │
│ ├─ Pros: Fast, works anywhere              │
│ ├─ Cons: Rate limits possible              │
│ └─ Setup: API key (already configured)     │
│                                             │
│ 🔄 SWITCHING                                │
│ └─ Just click the radio button!            │
│                                             │
│ ⚠️ RATE LIMITED?                            │
│ └─ Switch to Ollama immediately!           │
│                                             │
└─────────────────────────────────────────────┘
```

## Success Checklist

Before creating a unit, verify:

- [ ] Provider selected (radio button checked)
- [ ] Status shows "Ready" or "API key configured"
- [ ] Content uploaded
- [ ] Unit title entered
- [ ] No error warnings shown

Then:

- [ ] Click "Create Unit"
- [ ] Wait for text extraction
- [ ] Click "Generate All Materials & Continue"
- [ ] Wait 3-6 minutes
- [ ] All modules generated! ✅

## Summary

**What Changed**:
- ✅ New provider selector on Create Unit page
- ✅ Choose Ollama or Gemini with one click
- ✅ Auto-detects which providers are available
- ✅ Shows clear status indicators

**Why It Matters**:
- ✅ No config file editing
- ✅ Switch providers easily when rate limited
- ✅ Use Ollama for testing (no limits)
- ✅ Use Gemini for production (fast)

**How to Use**:
1. Open Create Unit page
2. Click your preferred provider
3. Create unit
4. Selected provider handles all processing

**That's it! Simple, visual, and effective!** 🎉
