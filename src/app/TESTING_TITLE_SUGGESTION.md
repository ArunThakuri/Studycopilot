# 🧪 Testing the Title Suggestion Feature

## Quick Test Guide

### Test 1: Upload Markdown File

1. **Go to** Create New Unit page
2. **Enter a generic title** like "Test" or "Unit 1"
3. **Upload a .md file** with actual content
4. **Wait ~2-5 seconds** after upload
5. **Look for** a purple gradient banner between title input and file upload section
6. **You should see:**
   ```
   💡 AI suggests a better title based on your content:
   "Suggested Title Here"
   [Use This Title] [Keep Current]
   ```

### Test 2: Upload Images (If Ollama is running)

1. **Go to** Create New Unit page
2. **Enter a generic title** like "Chapter 5"  
3. **Upload 1-3 textbook images**
4. **Click** "Process & Create Unit"
5. **Wait** for AI processing to complete
6. **Look for** the purple suggestion banner after "Complete!"

### Test 3: Accept Suggestion

1. **Get a title suggestion** (from Test 1 or 2)
2. **Click** "Use This Title" button
3. **Verify:** Title input field updates to suggested title
4. **Verify:** Banner disappears

### Test 4: Reject Suggestion

1. **Get a title suggestion**
2. **Click** "Keep Current" or the X button  
3. **Verify:** Banner disappears
4. **Verify:** Original title remains unchanged

---

## Where to Look

The title suggestion banner appears **between** these two sections:

```
┌─────────────────────────────┐
│ Unit Title *                │  ← Title input section
│ [Test____________]          │
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│ 💡 AI suggests...           │  ← **BANNER APPEARS HERE**
│ "Better Title"              │
│ [Use] [Keep]                │
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│ Upload Content              │  ← File upload section
│ [Click to upload]           │
└─────────────────────────────┘
```

---

## When Title Suggestion Appears

### ✅ WILL Show:
- After uploading .md file with content
- After AI processes images successfully
- Only if suggested title ≠ current title
- Only if Ollama is available

### ❌ Won't Show:
- If suggested title matches current title
- If Ollama is offline (silent fail)
- If AI can't analyze the content
- Before uploading any content
- On already-created units (only during creation)

---

## Troubleshooting

### "I don't see any banner"

**Check:**
1. Did you upload content? (images or .md file)
2. Is Ollama running? (`ollama serve`)
3. Is gemma3:4b available? (`ollama list`)
4. Did you wait 2-5 seconds after upload?
5. Is your title already good? (AI might agree!)

**Try:**
- Use a very generic title like "Test" or "Unit 1"
- Upload content with clear topic (e.g., photosynthesis article)
- Check browser console for errors (F12)

### "Banner appeared but won't go away"

**Solution:**
- Click the X button in top-right of banner
- Or click "Keep Current"
- Or click "Use This Title"

### "Title suggestion doesn't make sense"

**Why:**
- AI analyzed only first 1000 characters
- Content might be unclear or mixed topics

**Solution:**
- Click "Keep Current" to reject
- Manually edit the title as you like

### "Can I see suggestion for existing unit?"

**No** - Title suggestion only works during unit creation. This is by design to avoid confusion. If you want to change an existing unit's title, you can:
- Delete the unit
- Recreate it with content
- Get new suggestion

---

## Example Test Scenarios

### Scenario A: Good Result

```
1. Enter title: "Science Chapter"
2. Upload: markdown about photosynthesis
3. AI suggests: "Photosynthesis and Plant Energy"
4. Click "Use This Title"
5. ✅ Title updates successfully
```

### Scenario B: Already Good Title

```
1. Enter title: "Photosynthesis Process"
2. Upload: markdown about photosynthesis
3. AI suggests: "Photosynthesis Process" (same!)
4. ❌ No banner shows (title already good)
```

### Scenario C: Reject Suggestion

```
1. Enter title: "My Unit"
2. Upload: markdown about algebra
3. AI suggests: "Algebraic Equations"
4. Click "Keep Current"
5. ✅ Banner closes, original title kept
```

---

## Console Logging

Open browser console (F12) to see:

```
💡 Suggesting title from markdown content...
💡 Suggested title: Photosynthesis and Plant Energy
```

Or if it fails (not critical):
```
Title suggestion failed (not critical): Error message
```

---

## Quick Checklist

Before testing:
- [ ] Ollama is installed
- [ ] Ollama is running (`ollama serve`)
- [ ] gemma3:4b is available (`ollama list`)
- [ ] On "Create New Unit" page
- [ ] Browser console open (F12) to see logs

Test steps:
- [ ] Enter generic title
- [ ] Upload .md file OR images
- [ ] Wait for banner to appear
- [ ] Try accepting suggestion
- [ ] Try rejecting suggestion
- [ ] Verify title updates correctly

---

## Video Walk through (Text Version)

**Step-by-Step:**

1. Navigate to Science subject
2. Click "Create New Unit"
3. Type "Test" as title
4. Click "Upload files"
5. Select a .md file about photosynthesis
6. **WAIT 2-3 seconds**
7. See purple banner appear below title
8. Banner says: "Photosynthesis Process"
9. Click "Use This Title"
10. Title field changes to "Photosynthesis Process"
11. Banner disappears
12. Continue creating unit

---

## Expected Timing

- Markdown upload → **instant**
- Title suggestion → **2-5 seconds** after upload
- Banner animation → **smooth fade-in**
- Title update → **instant** on accept
- Banner close → **instant** on reject/dismiss

---

## Need Help?

1. Check console logs (F12)
2. Verify Ollama status
3. Try with different content
4. Read TITLE_SUGGESTION_FEATURE.md for full docs

---

**Status:** Feature is implemented and ready to test!  
**Model:** gemma3:4b  
**Location:** Create Unit page only  
**Timing:** After content upload  
