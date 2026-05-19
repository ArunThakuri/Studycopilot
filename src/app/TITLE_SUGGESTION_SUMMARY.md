# 💡 Title Suggestion Feature - Quick Summary

## What It Does

When you create a new unit and upload content (images or markdown), the AI analyzes your content and suggests a better, more descriptive title.

---

## Where It Appears

**ONLY on the Create Unit page**, in a purple banner between the "Unit Title" input and "Upload Content" section.

**NOT** on:
- Unit cards in dashboard
- Inside existing units
- Anywhere after unit creation is complete

---

## How to See It

### Method 1: Upload Markdown File

1. Go to **Create New Unit** page
2. Enter a generic title (e.g., "Test")
3. Upload a `.md` file with content
4. **Wait 2-3 seconds**
5. Purple banner appears with suggestion!

### Method 2: Upload Images (Requires Ollama)

1. Go to **Create New Unit** page
2. Enter a generic title (e.g., "Chapter 5")
3. Upload textbook images
4. Click "Process & Create Unit"
5. **Wait for processing to complete**
6. Purple banner appears with suggestion!

---

## What the Banner Looks Like

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✨ 💡 AI suggests a better title based on   ┃
┃ your content:                               ┃
┃                                             ┃
┃ "Photosynthesis and Plant Energy"          ┃
┃                                             ┃
┃ [ ✓ Use This Title ]  [ Keep Current ]  [X]┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Features:**
- Purple gradient background
- Sparkles icon (✨)
- Clear suggested title
- Two action buttons
- Close button (X)

---

## Your Options

### 1. Accept Suggestion
- Click "Use This Title"
- Title input updates to suggested title
- Banner disappears
- Continue creating unit

### 2. Reject Suggestion
- Click "Keep Current" or X button
- Your original title is kept
- Banner disappears
- Continue creating unit

---

## Requirements

- ✅ Ollama must be installed and running
- ✅ `gemma3:4b` model must be available
- ✅ Must be on Create Unit page
- ✅ Must upload content (images or markdown)

---

## Why You Don't See It

### Common Reasons:

1. **Wrong page** - You're viewing an existing unit, not creating one
2. **No content uploaded** - Banner only appears after uploading
3. **Ollama offline** - Feature requires Ollama to be running
4. **Title already good** - AI agrees with your current title
5. **Didn't wait** - Give it 2-5 seconds after upload

---

## Examples

### Example 1:
- **Your title:** "Unit 1"
- **Content:** Markdown about photosynthesis
- **AI suggests:** "Photosynthesis and Plant Energy"
- **Result:** Banner shows suggestion ✅

### Example 2:
- **Your title:** "Photosynthesis Process"
- **Content:** Markdown about photosynthesis
- **AI suggests:** "Photosynthesis Process" (same!)
- **Result:** No banner (title already good) ❌

### Example 3:
- **Your title:** "Chapter 5"
- **Content:** Images of algebra textbook
- **AI suggests:** "Quadratic Equations and Solutions"
- **Result:** Banner shows suggestion ✅

---

## Technical Details

- **Model:** gemma3:4b (same as text extraction)
- **Analysis:** First 1000 characters of content
- **Response time:** 2-5 seconds
- **Temperature:** 0.3 (focused suggestions)
- **Title length:** 3-8 words typically

---

## Documentation

### Quick Start:
- **TESTING_TITLE_SUGGESTION.md** - How to test it
- **WHERE_TO_FIND_TITLE_SUGGESTION.md** - Exact location

### Detailed:
- **TITLE_SUGGESTION_FEATURE.md** - Full documentation
- **TITLE_SUGGESTION_EXAMPLE.md** - Visual examples

### Technical:
- **LATEST_CHANGES.md** - What was changed in code

---

## Quick Checklist

Before testing:
- [ ] Ollama is running (`ollama serve`)
- [ ] gemma3:4b is available (`ollama list`)
- [ ] On "Create New Unit" page (not viewing existing unit)
- [ ] Have a .md file or images ready to upload

To test:
- [ ] Enter generic title like "Test"
- [ ] Upload content
- [ ] Wait 2-5 seconds
- [ ] Look between title input and file upload sections
- [ ] Try accepting/rejecting suggestion

---

## Troubleshooting

### "I don't see it"
→ Read **WHERE_TO_FIND_TITLE_SUGGESTION.md**

### "How do I test it?"
→ Read **TESTING_TITLE_SUGGESTION.md**

### "It's not working"
→ Check Ollama is running and gemma3:4b is available

### "Suggestion doesn't make sense"
→ Click "Keep Current" and use your own title

---

## Summary

| What | Where | When | How |
|------|-------|------|-----|
| Purple banner with AI title suggestion | Create Unit page | After uploading content | Accept or reject |

**Key Point:** This feature only works **during unit creation**, not on existing units!

---

**Status:** ✅ Implemented and ready to use  
**Location:** Create Unit page only  
**Trigger:** After uploading images or markdown  
**Action Required:** Accept or reject suggestion  

