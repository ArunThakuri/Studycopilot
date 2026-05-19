# 📍 Where to Find the Title Suggestion

## Location: Create Unit Page ONLY

The title suggestion feature appears **during unit creation**, not after the unit is created.

---

## Navigation Path

```
Dashboard
   ↓
Select Subject (e.g., Science)
   ↓
Units Dashboard
   ↓
Click "Create New Unit" button
   ↓
**CREATE UNIT PAGE** ← YOU MUST BE HERE
```

---

## On the Create Unit Page

The banner appears in this exact position:

```
┌──────────────────────────────────────────────────────┐
│ [Back to Units]                                      │
│                                                      │
│ Create New Unit                                      │
│ Science • Grade 10                                   │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ AI Status Banner (Ollama Ready / Demo Mode)         │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ Unit Title *                                         │
│ ┌──────────────────────────────────────────┐        │
│ │ Test                                      │        │
│ └──────────────────────────────────────────┘        │
│ Enter the title of the unit...                      │
└──────────────────────────────────────────────────────┘
                        ↓↓↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✨ 💡 AI suggests a better title based on         ┃  ← **BANNER**
┃ your content:                                     ┃  ← **APPEARS**
┃                                                   ┃  ← **HERE!**
┃ "Photosynthesis and Plant Energy Production"     ┃
┃                                                   ┃
┃ [ ✓ Use This Title ]  [ Keep Current ]       [X] ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                        ↓↓↓
┌──────────────────────────────────────────────────────┐
│ Upload Content                                       │
│ Upload textbook images...                            │
│ ┌────────────────────────────────────────┐          │
│ │      📤 Click to upload files          │          │
│ └────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────┘
```

---

## NOT Here (Common Mistakes)

### ❌ NOT on the Units Dashboard

This page shows existing units:
```
┌─────────────────────────────┐
│ Unit 1: Test  🔮            │ ← NO suggestion here
│ Not Started                 │
│ Progress: 0%                │
└─────────────────────────────┘
```

The title suggestion does NOT appear on unit cards.

---

### ❌ NOT inside an existing unit

This page shows unit content:
```
┌─────────────────────────────┐
│ Test                        │ ← NO suggestion here
│ Science • Unit 1            │
│ Overall Progress: 0%        │
└─────────────────────────────┘
```

The title suggestion does NOT appear in unit detail view.

---

### ❌ NOT after clicking "Continue to Dashboard"

Once you complete unit creation and go to dashboard, the suggestion is gone. It only appears **during** the creation process.

---

## When Does It Appear?

### Timeline for Markdown Upload:

```
1. You're on Create Unit page
2. You enter title: "Test"
3. You upload .md file
   ↓
   [Wait 2-3 seconds...]
   ↓
4. Banner appears! 💜
```

### Timeline for Image Upload:

```
1. You're on Create Unit page
2. You enter title: "Chapter 5"
3. You upload images
4. You click "Process & Create Unit"
   ↓
   [AI processes images...]
   ↓
   [Extracting text...]
   ↓
   [Analyzing content for title...]
   ↓
5. Processing complete!
6. Banner appears! 💜
```

---

## Visual Markers

### How to Identify the Banner:

1. **Color:** Purple gradient background (purple-to-blue)
2. **Icon:** Sparkles (✨) on the left
3. **Text:** "💡 AI suggests a better title based on your content:"
4. **Buttons:** Two buttons (purple + outline)
5. **Close button:** X in top-right corner

### Banner Appearance:
- **Width:** Full width of the content area
- **Height:** Auto (fits content)
- **Position:** Between "Unit Title" and "Upload Content"
- **Animation:** Fades in smoothly

---

## Step-by-Step Visual Guide

### Step 1: Go to Create Unit Page

Look for this at the top:
```
← Back to Units

Create New Unit
Science • Grade 10
```

If you don't see this, you're not on the right page!

---

### Step 2: Enter a Title

```
Unit Title *
┌────────────────────────┐
│ Test                   │
└────────────────────────┘
```

Use a generic title like "Test" or "Unit 1" for best results.

---

### Step 3: Upload Content

```
Upload Content
┌────────────────────────┐
│   📤                   │
│   Click to upload      │
└────────────────────────┘
```

Upload either:
- Markdown (.md) file
- Images (PNG, JPG)

---

### Step 4: Wait & Look for Banner

After upload (markdown) or after processing (images):

```
                 SCROLL TO HERE
                       ↓
┌──────────────────────────────┐
│ Unit Title *                 │ ← Just below this
└──────────────────────────────┘
         ↓↓↓
    **BANNER IS HERE**
         ↓↓↓
┌──────────────────────────────┐
│ Upload Content               │ ← Just above this
└──────────────────────────────┘
```

If you're scrolled down, **scroll up** to see it!

---

## Troubleshooting: "I Still Don't See It"

### Check #1: Are you on the Create Unit page?

**YES if you see:**
- "Create New Unit" header
- "Unit Title *" input field
- "Upload Content" section
- "Process & Create Unit" button at bottom

**NO if you see:**
- List of existing units
- Unit detail view with modules
- Dashboard with subjects

---

### Check #2: Did you upload content?

Banner only appears AFTER:
- Markdown file is uploaded
- OR images are processed

It won't appear if you just entered a title.

---

### Check #3: Did you wait long enough?

- **Markdown:** Wait 2-3 seconds after upload
- **Images:** Wait until "Processing Complete!"

Don't expect instant results.

---

### Check #4: Is Ollama running?

```bash
# Terminal
ollama serve

# Check if gemma3:4b is available
ollama list
```

If Ollama is not running, title suggestion won't work.

---

### Check #5: Check browser console

Press F12, look for:
```
💡 Suggesting title from markdown content...
💡 Suggested title: [Your Title]
```

Or:
```
Title suggestion failed (not critical): [Error]
```

---

## Summary

**WHERE:** Create Unit page (during creation)  
**WHEN:** After uploading content  
**BETWEEN:** Title input and File upload sections  
**LOOK FOR:** Purple gradient banner with sparkles  
**IF NOT VISIBLE:** Check you're on Create page, uploaded content, and Ollama is running  

---

## Quick Reference

```
RIGHT PAGE:
✅ /create-unit (or similar URL)
✅ Shows "Create New Unit"
✅ Has title input + upload section
✅ Has "Process & Create Unit" button

WRONG PAGE:
❌ /dashboard
❌ /units
❌ /unit/:id (inside a unit)
❌ Any page showing existing units
```

---

**Need more help?** Read:
- `TESTING_TITLE_SUGGESTION.md` - How to test
- `TITLE_SUGGESTION_FEATURE.md` - Full documentation
- `TITLE_SUGGESTION_EXAMPLE.md` - Visual examples

