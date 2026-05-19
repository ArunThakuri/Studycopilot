# 🚀 READ ME FIRST - Title Suggestion Feature

## ⚡ The Feature You're Looking For

When you **create a new unit** and upload content, AI suggests a better title based on your content.

---

## ⚠️ IMPORTANT: Where It Is

### ✅ Title Suggestion Appears HERE:

**Page:** "Create New Unit" page  
**When:** After uploading images or markdown  
**Where:** Purple banner between title input and file upload

```
Create New Unit page:
  ↓
Unit Title input
  ↓
💜 **TITLE SUGGESTION BANNER** ← HERE!
  ↓
Upload Content section
```

---

### ❌ Title Suggestion Does NOT Appear Here:

- ❌ On unit cards in the dashboard (your screenshot #1)
- ❌ Inside existing units (your screenshot #2)
- ❌ Anywhere after the unit is created

**Why?** Because it's a **creation-time feature** that helps you pick a good title BEFORE creating the unit.

---

## 🎯 Quick Start (60 Seconds)

### To See the Title Suggestion:

1. **Navigate:** Dashboard → Select Subject → Click "+ Create New Unit"
2. **Enter:** A generic title like "Test"
3. **Upload:** A .md file with content (or images if Ollama is running)
4. **Wait:** 2-3 seconds
5. **Look:** Between title input and upload section for purple banner
6. **See:** "💡 AI suggests a better title based on your content: [Title]"
7. **Choose:** Click "Use This Title" or "Keep Current"

---

## 📍 Exact Location

```
┌────────────────────────────────────┐
│ ← Back to Units                    │  You must see this
│                                    │
│ Create New Unit                    │  And this
│ Science • Grade 10                 │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Unit Title *                       │  ← Title input
│ [Test____________]                 │
└────────────────────────────────────┘
                ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ✨ 💡 AI suggests...             ┃  ← BANNER APPEARS HERE
┃ "Better Title"                   ┃
┃ [Use This Title] [Keep Current]  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                ↓
┌────────────────────────────────────┐
│ Upload Content                     │  ← Upload section
│ [📤 Click to upload files]         │
└────────────────────────────────────┘
```

---

## 🔍 Your Screenshots Explained

### Screenshot #1: Unit Card
This shows an **existing unit** on the Units Dashboard.
→ Title suggestion **does not** appear here.

### Screenshot #2: Unit Header
This shows **inside an existing unit**.
→ Title suggestion **does not** appear here.

### Why Not?
Because the title suggestion only works **during unit creation**, not after the unit already exists.

---

## ✅ How to Get to the Right Page

### From Your Units Dashboard (Screenshot #1):

```
Units Dashboard
  ↓
Click the "+ Create New Unit" button
  ↓
**CREATE UNIT PAGE** ← You need to be here!
```

### From Inside a Unit (Screenshot #2):

```
Inside Unit
  ↓
Click "Back" or navigate to Units
  ↓
Click "+ Create New Unit"
  ↓
**CREATE UNIT PAGE** ← You need to be here!
```

---

## 🧪 Test It Now (5 Steps)

### Step 1: Navigate
Go to: **Dashboard → Science → "+ Create New Unit"**

### Step 2: Verify
Check you see:
- "Create New Unit" heading
- Empty "Unit Title *" field
- "Upload Content" section

### Step 3: Setup
- Type "Test" in title field
- Have a .md file ready (or textbook images)

### Step 4: Upload
- Click upload button
- Select your .md file
- Wait 2-3 seconds

### Step 5: Look
- Look **between** title input and upload section
- See purple banner with sparkles ✨
- Try clicking "Use This Title"

---

## 🚫 Common Mistakes

### Mistake #1: Wrong Page
**You're on:** Units dashboard or inside a unit  
**You need:** Create New Unit page  
**Fix:** Click "+ Create New Unit" button

### Mistake #2: Already Created
**You're looking at:** An existing unit  
**You need:** To be creating a new unit  
**Fix:** Create a new unit from scratch

### Mistake #3: Didn't Upload
**You did:** Just entered a title  
**You need:** To upload content (images or .md)  
**Fix:** Upload a file first

### Mistake #4: Didn't Wait
**You expected:** Instant result  
**Reality:** Takes 2-3 seconds  
**Fix:** Wait a moment after upload

### Mistake #5: Ollama Offline
**Status:** Ollama not running  
**Result:** Feature won't work  
**Fix:** Run `ollama serve` in terminal

---

## 📚 Documentation to Read

### Start Here (Pick One):

**Option 1: Quick Visual Guide**  
→ `QUICK_VISUAL_GUIDE_TITLE_SUGGESTION.md`  
**Best for:** Understanding where it is with pictures

**Option 2: Location Guide**  
→ `WHERE_TO_FIND_TITLE_SUGGESTION.md`  
**Best for:** Exact navigation instructions

**Option 3: Summary**  
→ `TITLE_SUGGESTION_SUMMARY.md`  
**Best for:** Quick overview of everything

### Then Read:

**Testing Guide**  
→ `TESTING_TITLE_SUGGESTION.md`  
**Best for:** Step-by-step testing instructions

**Full Documentation**  
→ `TITLE_SUGGESTION_FEATURE.md`  
**Best for:** Complete feature explanation

**Visual Examples**  
→ `TITLE_SUGGESTION_EXAMPLE.md`  
**Best for:** See what it looks like

---

## 💡 Key Points to Remember

1. **Only works during unit creation** - Not on existing units
2. **Appears after uploading** - Not just from entering a title
3. **Between title and upload** - Look in the middle
4. **Purple gradient banner** - Hard to miss if you're in the right place
5. **Your choice** - Accept or reject the suggestion

---

## 🔧 Requirements

- ✅ Ollama must be running (`ollama serve`)
- ✅ gemma3:4b model available (`ollama list`)
- ✅ Must be on Create Unit page
- ✅ Must upload content (images or markdown)

---

## ❓ Still Having Trouble?

### Quick Checks:

1. **Am I on the Create Unit page?**
   - Look for "Create New Unit" heading
   - If not, click "+ Create New Unit"

2. **Did I upload anything?**
   - If not, upload a .md file or images

3. **Did I wait 2-3 seconds?**
   - If not, wait a bit longer

4. **Is Ollama running?**
   - Terminal: `ollama serve`
   - Check: `ollama list`

5. **Check browser console (F12)**
   - Look for: "💡 Suggesting title..."
   - Or: "Title suggestion failed..."

---

## 🎓 Understanding the Feature

### What It Does:
Analyzes your uploaded content and suggests a descriptive 3-8 word title.

### Why It's Useful:
Helps you create meaningful titles instead of generic ones like "Chapter 1" or "Unit 5".

### When to Use It:
- You uploaded content but used a generic title
- You want AI help naming your unit
- You're not sure what to call the unit

### When to Ignore It:
- Your title is already good
- AI suggestion doesn't make sense
- You prefer your own title

---

## 🎯 Success Criteria

### You'll Know It's Working When:

1. ✅ You're on Create New Unit page
2. ✅ You uploaded content (.md or images)
3. ✅ Purple banner appears between title and upload
4. ✅ Banner shows suggested title
5. ✅ Clicking "Use This Title" updates the input
6. ✅ Clicking "Keep Current" dismisses banner

---

## 🚀 Next Steps

1. **Read:** `QUICK_VISUAL_GUIDE_TITLE_SUGGESTION.md`
2. **Navigate:** To Create New Unit page
3. **Test:** Upload a .md file and see the banner
4. **Experiment:** Try accepting and rejecting suggestions

---

## 📞 Quick Reference

| Question | Answer |
|----------|---------|
| Where is it? | Create New Unit page only |
| When does it appear? | After uploading content |
| What does it look like? | Purple gradient banner with ✨ |
| How long does it take? | 2-3 seconds after upload |
| Can I see it on existing units? | No, only during creation |
| What if I don't see it? | Check you're on Create page |

---

**Remember:** The feature is **NOT** on your screenshots. You need to navigate to the Create New Unit page first!

**Start here:** Dashboard → Subject → "+ Create New Unit" button → Upload content → Wait → See purple banner!

---

**Files to Read Next:**
1. `QUICK_VISUAL_GUIDE_TITLE_SUGGESTION.md` ← Start here!
2. `WHERE_TO_FIND_TITLE_SUGGESTION.md`
3. `TESTING_TITLE_SUGGESTION.md`
4. `TITLE_SUGGESTION_SUMMARY.md`

