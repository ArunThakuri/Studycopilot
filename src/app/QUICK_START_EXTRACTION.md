# ⚡ Quick Start: Test Exact Text Extraction

## 5-Minute Test

### 1️⃣ Start Ollama with CORS
```bash
set OLLAMA_ORIGINS=*
ollama serve
```

### 2️⃣ Verify Your Model
```bash
ollama list
```
You should see `gemma3:12b` (or llava, llama3.2-vision)

### 3️⃣ Prepare Test Image
- Find a textbook page with **5-10 lines of clear text**
- Take a photo or screenshot
- Make sure text is readable

### 4️⃣ Test in App
1. Open browser → Create new unit
2. Upload your test image
3. Click "Create Unit"
4. Wait for processing
5. Download the .md file

### 5️⃣ Verify Result
Open the .md file and compare with your image:

**✅ SUCCESS if:**
- Text matches exactly
- Same words, same order
- No extra content

**❌ PROBLEM if:**
- Extra explanations added
- Different words
- Content not in image

## If Extraction is Perfect ✅

🎉 **You're ready!** Start extracting your textbook content.

**Next steps:**
1. Upload real textbook chapters
2. Review extracted text
3. Make minor edits if needed
4. Generate learning materials

## If Extraction Adds Extra Content ❌

**Quick fix:**

```bash
# Try llava (better at pure extraction)
ollama pull llava
```

Update `/lib/config.ts`:
```typescript
VISION_MODEL: 'llava:latest'
```

Restart Ollama, refresh browser, test again.

## If Text is Garbled ❌

**Image quality issues:**
- Use higher resolution image
- Ensure good lighting/contrast
- Crop to just text area
- Make text horizontal

## If Model Error ❌

```bash
# You need a vision model
ollama pull llava
```

Then update config and restart.

## Expected Output Example

**Your image shows:**
```
Chapter 3: Photosynthesis

Plants make their own food through photosynthesis.
This process requires light, water, and carbon dioxide.
```

**Downloaded .md should have:**
```markdown
# Test Unit

## Chapter 3: Photosynthesis

Plants make their own food through photosynthesis.
This process requires light, water, and carbon dioxide.
```

**Should NOT have:**
```markdown
# Test Unit

## Chapter 3: Photosynthesis

Plants make their own food through photosynthesis. This remarkable process 
is one of the most important biological mechanisms on Earth...
[EXTRA CONTENT - NOT IN IMAGE!]
```

## One-Line Check

> **"If I can't point to the text in my image, it shouldn't be in the output."**

## More Help

- 📖 **TEXT_EXTRACTION_MODE.md** - Full explanation
- 📖 **VERIFY_EXTRACTION_ACCURACY.md** - Detailed testing guide
- 📖 **EXACT_TEXT_EXTRACTION_UPDATE.md** - What changed and why

## Model Recommendations

| Model | Extraction Quality | Speed | Command |
|-------|-------------------|-------|---------|
| llava | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | `ollama pull llava` |
| llama3.2-vision:11b | ⭐⭐⭐⭐⭐ | ⭐⭐ | `ollama pull llama3.2-vision:11b` |
| gemma3:12b | ⭐⭐⭐⭐ | ⭐⭐⭐ | Already installed? |

---

**Goal:** Get exact text from images in under 5 minutes!
