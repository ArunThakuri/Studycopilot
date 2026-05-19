# Quick Ollama Status Check

Run these commands to verify your Ollama setup:

## 1. Check if Ollama is Running

```bash
curl http://localhost:11434/api/tags
```

**Expected:** JSON response with list of models  
**If fails:** Start Ollama with `ollama serve`

## 2. List Installed Models

```bash
ollama list
```

**Look for:** Models with "vision" or llava/minicpm-v/bakllava  
**If empty:** Pull a model (see below)

## 3. Check Current Model in Config

Open `/lib/config.ts` and look at:
```typescript
VISION_MODEL: 'llama3.2-vision:11b'
```

**Make sure this matches a model from `ollama list`!**

## 4. Pull Vision Models (if needed)

Choose ONE:

```bash
# Best quality (7.9GB)
ollama pull llama3.2-vision:11b

# Good balance (4.7GB)
ollama pull llava

# Smallest/fastest (2.3GB)
ollama pull minicpm-v
```

## 5. Test Vision Model

Create a test image (any .jpg or .png) and run:

```bash
ollama run llama3.2-vision:11b "What text do you see in this image?" < test.jpg
```

**Expected:** The model describes the image  
**If fails:** Model doesn't support vision, pull a different one

## Quick Checklist

- [ ] Ollama is installed
- [ ] `ollama serve` is running
- [ ] CORS is enabled (`set OLLAMA_ORIGINS=*`)
- [ ] A vision model is pulled (`ollama list` shows it)
- [ ] `/lib/config.ts` has the correct model name
- [ ] Browser console shows no errors (F12)

## Common Issues

### ✅ Good Output
```bash
$ ollama list
NAME                     SIZE
llama3.2-vision:11b      7.9 GB
```

### ❌ Bad Output (text-only models)
```bash
$ ollama list
NAME                SIZE
gemma3:4b          2.5 GB    <- Text only! Won't work!
mistral:latest     4.1 GB    <- Text only! Won't work!
```

## What the App Needs

StudyCopilot needs:
1. ✅ Ollama running with CORS enabled
2. ✅ A VISION model installed
3. ✅ Config pointing to the right model

Without these, you'll get dummy/placeholder text instead of real content extraction!

---

**Still stuck?** See FIX_DUMMY_TEXT_ISSUE.md for detailed troubleshooting.
