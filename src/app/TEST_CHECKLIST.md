# ✅ Test Checklist: Exact Text Extraction

Use this checklist to verify the system is extracting text correctly.

---

## Pre-Test Setup

- [ ] Ollama is installed
- [ ] `gemma3:12b` is installed (or llava, llama3.2-vision)
- [ ] CORS is enabled (`set OLLAMA_ORIGINS=*`)
- [ ] Ollama server is running (`ollama serve`)
- [ ] Browser console shows no errors (F12)

---

## Test 1: Simple Page Test

**Goal:** Verify basic extraction works

### Prepare
- [ ] Find a textbook page with 5-10 lines of clear text
- [ ] Take photo or screenshot (good quality, readable)
- [ ] Save the image

### Test
- [ ] Open the app
- [ ] Create new unit (give it any title)
- [ ] Upload the test image
- [ ] Click "Create Unit"
- [ ] Wait for processing to complete
- [ ] Download the .md file

### Verify
- [ ] Open .md file in text editor
- [ ] Compare side-by-side with original image
- [ ] Check: Does every word match?
- [ ] Check: Are words in the same order?
- [ ] Check: Is there any extra content? (should be NO)
- [ ] Check: Is all the text from image present?

### Result
- [ ] ✅ PASS - Text matches exactly
- [ ] ❌ FAIL - See troubleshooting section

---

## Test 2: Structured Content Test

**Goal:** Verify formatting is preserved

### Prepare
- [ ] Find a page with:
  - A heading or title
  - A few paragraphs
  - A list (bulleted or numbered)
  - OR a formula/equation

### Test
- [ ] Upload and process as before
- [ ] Download .md file

### Verify
- [ ] Headings are marked with ## or ###
- [ ] Lists are formatted as markdown lists
- [ ] Formulas/equations are transcribed as-is
- [ ] Structure matches original

### Result
- [ ] ✅ PASS - Structure preserved
- [ ] ❌ FAIL - See troubleshooting section

---

## Test 3: Multiple Pages Test

**Goal:** Verify multiple images work together

### Prepare
- [ ] Select 2-3 consecutive textbook pages
- [ ] Take clear photos/screenshots of each

### Test
- [ ] Upload all images at once
- [ ] Process and download

### Verify
- [ ] All pages are transcribed
- [ ] Pages are in correct order
- [ ] No pages skipped
- [ ] No duplicate content

### Result
- [ ] ✅ PASS - Multiple pages work
- [ ] ❌ FAIL - See troubleshooting section

---

## Troubleshooting Guide

### ❌ FAIL: AI Adding Extra Content

**Symptom:** Output has explanations, examples, or content not in image

**Solutions:**
1. Try different model:
   ```bash
   ollama pull llava
   ```
   Then update `/lib/config.ts` to use `llava:latest`

2. Restart Ollama and refresh browser

3. Test again with same image

### ❌ FAIL: Text is Garbled or Wrong

**Symptom:** Words are incorrect, jumbled, or unreadable

**Solutions:**
1. Check image quality:
   - Is text clear and readable?
   - Is image high resolution enough?
   - Is there good contrast?

2. Preprocess image:
   - Crop to just text area
   - Increase contrast/brightness
   - Ensure text is horizontal
   - Remove busy backgrounds

3. Try different model (llama3.2-vision is very accurate)

### ❌ FAIL: Model Error

**Symptom:** Error message about model can't process images

**Solutions:**
1. Verify you have a vision model:
   ```bash
   ollama list
   ```

2. If using text-only model, pull vision model:
   ```bash
   ollama pull llava
   ```

3. Update config to use vision model

4. Restart and test

### ❌ FAIL: Connection Error

**Symptom:** "Ollama not available" or connection refused

**Solutions:**
1. Check Ollama is running:
   ```bash
   ollama list
   ```

2. Restart with CORS:
   ```bash
   set OLLAMA_ORIGINS=*
   ollama serve
   ```

3. Check browser console (F12) for specific errors

---

## Success Criteria Summary

| Test | Pass Criteria |
|------|--------------|
| Simple Page | Text matches exactly, no additions |
| Structured Content | Formatting preserved (headings, lists, formulas) |
| Multiple Pages | All pages transcribed in order |

---

## What to Report if Tests Fail

If tests fail after troubleshooting, gather this info:

1. **Which test failed?**
   - Test 1, 2, or 3?

2. **What model are you using?**
   ```bash
   ollama list
   ```

3. **What's in the image?**
   - Describe the content
   - Or share a screenshot

4. **What's in the output?**
   - Copy the downloaded markdown
   - Highlight differences

5. **What's different?**
   - Extra content added?
   - Text missing?
   - Garbled text?
   - Structure wrong?

---

## When All Tests Pass ✅

Congratulations! Your system is ready for production use.

**Next steps:**
1. Start extracting real textbook content
2. Create units for your actual subjects
3. Generate learning materials from accurate extracted text
4. Review and edit as needed in markdown editor

---

## Quick Reference

**Good extraction looks like:**
```
Image → Extract → Output matches exactly ✅
```

**Bad extraction looks like:**
```
Image → Extract → Output has extra content ❌
Image → Extract → Output is garbled ❌
Image → Extract → Error message ❌
```

---

**Remember:** The goal is exact transcription, like a copy machine turning images into text. Not content generation, not elaboration, just pure text extraction.
