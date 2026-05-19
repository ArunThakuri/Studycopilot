# How to Fix the "Dummy Text Instead of Real Content" Issue

## The Problem

You're seeing generic dummy text in the markdown editor instead of the actual text extracted from your uploaded images.

## Root Cause

**You're using a text-only model instead of a vision model!**

The model `gemma3:4b` that was initially configured is a **text-only** model. It cannot process or "see" images, so it just returns generic responses.

## The Solution

### Step 1: Pull a Vision Model

You need to download a **vision-capable** model. Run ONE of these commands:

#### Option A: Gemma 3 12B (If Already Installed)
```bash
ollama pull gemma3:12b
```
**Size:** ~7GB  
**Best for:** If you already have it installed

#### Option B: Llama 3.2 Vision (Best Quality)
```bash
ollama pull llama3.2-vision:11b
```
**Size:** ~7.9GB  
**Best for:** Accurate text extraction from textbook images

#### Option C: Llava (Good Balance)
```bash
ollama pull llava
```
**Size:** ~4.7GB  
**Best for:** Faster processing with good quality

#### Option D: MiniCPM-V (Smallest & Fastest)
```bash
ollama pull minicpm-v
```
**Size:** ~2.3GB  
**Best for:** Quick testing, lower resource usage

### Step 2: Update the Configuration

Open `/lib/config.ts` and change the `VISION_MODEL` to match what you downloaded:

```typescript
export const OLLAMA_CONFIG = {
  BASE_URL: 'http://localhost:11434',
  VISION_MODEL: 'llama3.2-vision:11b', // Change this to your model
};
```

Examples:
- If you pulled `gemma3:12b`: Change to `'gemma3:12b'`
- If you pulled `llava`: Change to `'llava:latest'`
- If you pulled `minicpm-v`: Change to `'minicpm-v:latest'`
- If you pulled `llama3.2-vision:11b`: Change to `'llama3.2-vision:11b'`

### Step 3: Restart Everything

1. **Stop Ollama** (Ctrl+C in the terminal where it's running)
2. **Restart Ollama** with CORS enabled:
   ```bash
   set OLLAMA_ORIGINS=*
   ollama serve
   ```
3. **Refresh your browser** (F5 or Ctrl+R)

### Step 4: Test It!

1. Create a new unit
2. Upload a textbook image
3. Click "Create Unit"
4. Watch the console (F12) - you should see:
   ```
   🤖 Using Ollama to process images...
   📝 Ollama Response Length: [actual number]
   📝 First 500 chars of response: [actual extracted text]
   ```

## How to Verify Your Model

Check which models you have installed:
```bash
ollama list
```

Look for models with **"vision"** in the name or these models:
- ✅ gemma3:12b (if it has vision support)
- ✅ llama3.2-vision
- ✅ llava
- ✅ minicpm-v
- ✅ bakllava

**NOT** these (they're text-only):
- ❌ gemma2 (smaller versions)
- ❌ mistral
- ❌ llama3 (without "-vision")
- ❌ codellama

## What to Expect

### Before (with text-only model):
```markdown
# Unit Title

## Introduction

Welcome to this comprehensive study of Unit Title...
[Generic dummy content]
```

### After (with vision model):
```markdown
# Chapter 5: Photosynthesis

## 5.1 Introduction

Photosynthesis is the process by which green plants...
[Actual text extracted from your textbook images]
```

## Troubleshooting

### "Model not found" error
- Run `ollama list` to see what you have
- Pull a vision model (see Step 1)
- Update config.ts to match (see Step 2)

### Still getting dummy text
- Check the browser console (F12)
- Look for warning: "Model may not support vision"
- Verify you pulled a VISION model, not a text model
- Make sure config.ts has the correct model name

### Ollama not connecting
- Make sure `ollama serve` is running
- Check that CORS is enabled: `set OLLAMA_ORIGINS=*`
- Visit http://localhost:11434 in browser - should see "Ollama is running"

### Processing very slow
- Vision models are larger and slower than text models
- Try a smaller model like `llava` or `minicpm-v`
- Make sure you have enough RAM (8GB+ recommended)
- GPU helps but not required

## Quick Reference

| Model | Size | Speed | Quality | Command |
|-------|------|-------|---------|---------|
| gemma3:12b | 7GB | Medium | ⭐⭐⭐⭐ | `ollama pull gemma3:12b` |
| llama3.2-vision:11b | 7.9GB | Slow | ⭐⭐⭐⭐⭐ | `ollama pull llama3.2-vision:11b` |
| llava:latest | 4.7GB | Medium | ⭐⭐⭐⭐ | `ollama pull llava` |
| minicpm-v:latest | 2.3GB | Fast | ⭐⭐⭐ | `ollama pull minicpm-v` |

## Need More Help?

See the full setup guide: **OLLAMA_SETUP.md**

---

**TL;DR:** If you have `gemma3:12b` installed, update `/lib/config.ts` to use it. Otherwise, pull a vision model with `ollama pull llava`, restart Ollama, and refresh your browser!
