# How to Verify Extraction Accuracy

## Quick Test Process

Follow these steps to verify the AI is extracting text accurately:

### Step 1: Prepare a Simple Test Image

**Best for first test:**
- A single textbook page
- Clear, printed text
- 5-10 lines of text
- No complex layouts or columns
- Good image quality (sharp, clear)

**Example:** A page with a chapter title and a few paragraphs

### Step 2: Upload and Process

1. Open the app
2. Create a new unit
3. Give it a simple title (e.g., "Test Unit")
4. Upload your test image
5. Click "Create Unit"
6. Wait for processing to complete

### Step 3: Download and Compare

1. Click "Download .md File"
2. Open the downloaded file in a text editor (Notepad, VS Code, etc.)
3. Open your original image side-by-side
4. **Compare line by line**

### Step 4: Check These Things

✅ **GOOD SIGNS (System Working Correctly):**

- [ ] Every word in the output appears in the image
- [ ] Text is in the same order as the image
- [ ] Headings are preserved correctly
- [ ] No extra explanations or content added
- [ ] Formulas/equations transcribed as-is
- [ ] List formatting preserved

❌ **BAD SIGNS (System Not Working Correctly):**

- [ ] Extra sentences not in the image
- [ ] Explanations like "Let's understand this concept..."
- [ ] Educational elaborations
- [ ] Examples that aren't in the image
- [ ] Different wording than the original
- [ ] Reorganized content

## Example Comparison

### Image Contains:
```
Chapter 5: Cell Structure

The cell is the basic unit of life. All living organisms are made of cells.

Types of Cells:
- Prokaryotic cells
- Eukaryotic cells
```

### ✅ CORRECT Output (Exact Extraction):
```markdown
# Test Unit

## Chapter 5: Cell Structure

The cell is the basic unit of life. All living organisms are made of cells.

Types of Cells:
- Prokaryotic cells
- Eukaryotic cells
```

### ❌ INCORRECT Output (AI Adding Content):
```markdown
# Test Unit

## Chapter 5: Cell Structure

The cell is the basic unit of life. All living organisms are made of cells. 
Cells contain various organelles that perform specific functions necessary 
for survival and reproduction.

Types of Cells:
- Prokaryotic cells - These are simple cells without a nucleus, like bacteria
- Eukaryotic cells - These are complex cells with a nucleus, found in plants and animals

Understanding cell structure is crucial for biology students as it forms the 
foundation for understanding how organisms function at the molecular level.
```

**Problem:** The AI added explanations and content not in the original image.

## What to Do Based on Results

### Result 1: Perfect Match ✅

**Action:** You're all set! The system is working correctly.

**Next steps:**
- Test with more complex images
- Try multiple pages at once
- Start using it for real textbook content

### Result 2: AI Adding Extra Content ❌

**Problem:** The model is being "helpful" and adding explanations.

**Solutions:**
1. **Try a different vision model:**
   ```bash
   # Models that are usually better at pure extraction
   ollama pull llava
   ollama pull llama3.2-vision:11b
   ```
   
2. **Update config** to use the new model

3. **Test again** with the same simple image

### Result 3: Text is Garbled or Wrong ❌

**Problem:** OCR quality is poor.

**Solutions:**
1. **Check image quality:**
   - Is it clear and readable?
   - High enough resolution?
   - Good contrast?

2. **Try preprocessing the image:**
   - Crop to just the text area
   - Increase contrast
   - Remove backgrounds
   - Ensure text is horizontal

3. **Try a different model** - Some are better at OCR

### Result 4: Model Can't Process Images ❌

**Problem:** Not a vision model.

**Solution:**
```bash
# Pull a proven vision model
ollama pull llava
```

Then update `/lib/config.ts`:
```typescript
VISION_MODEL: 'llava:latest'
```

## Advanced Testing

Once basic extraction works, test with:

1. **Multiple pages** - Upload 2-3 images at once
2. **Complex layouts** - Pages with columns, sidebars
3. **Mixed content** - Text + diagrams + formulas
4. **Different subjects** - Math, science, history, etc.

## Reporting Issues

If extraction isn't working correctly, gather this info:

1. **What model are you using?**
   - Check `/lib/config.ts`
   - Run `ollama list` to see installed models

2. **What's in the image?**
   - Take a screenshot or photo
   - Note key text that should be extracted

3. **What did you get in the output?**
   - Copy the downloaded markdown
   - Highlight what's different

4. **What's the difference?**
   - Extra content added?
   - Missing content?
   - Garbled text?
   - Wrong order?

## Expected Behavior

The system should work like:
- ✅ A copy machine that turns images into text
- ✅ An OCR scanner
- ✅ A transcription service

NOT like:
- ❌ A content generator
- ❌ An AI tutor adding explanations
- ❌ An educational content creator

## Quick Reference

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| Perfect match | ✅ Working correctly | Keep using it! |
| Extra content added | Model being "creative" | Try different model (llava) |
| Garbled text | Poor OCR | Check image quality |
| Model error | Not a vision model | Pull vision model |
| Empty output | Connection issue | Check Ollama is running |

---

**Goal:** The downloaded .md file should be a faithful, exact transcription of the text in your textbook images. Nothing more, nothing less.
