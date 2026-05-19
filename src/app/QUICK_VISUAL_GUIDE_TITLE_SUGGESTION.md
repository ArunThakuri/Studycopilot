# 🎯 Quick Visual Guide: Finding the Title Suggestion

## Your Screenshots vs Where the Feature Is

### What You're Looking At (Your Screenshots)

#### Screenshot 1: Unit Card
```
┌─────────────────────────────────────┐
│ Unit 1: Test  🔮                    │
│ Not Started                         │
│                                     │
│ Progress             0%             │
│ ────────────────────────────────    │
│                                     │
│ 📖 0/7 modules    🕐 Yesterday      │
│                                     │
│ 🔮 AI-Generated Content             │
└─────────────────────────────────────┘
```

**❌ Title suggestion does NOT appear here**

This is the **Units Dashboard** showing existing units.

---

#### Screenshot 2: Unit Header
```
┌─────────────────────────────────────────────┐
│ 🔵  Test                    🔮 AI Generated │
│     Science • Unit 1                        │
│                                             │
│ Overall Progress                        0%  │
│ ──────────────────────────────────────────  │
└─────────────────────────────────────────────┘
```

**❌ Title suggestion does NOT appear here**

This is **inside an existing unit**.

---

## Where It ACTUALLY Appears

### The Create Unit Page

You need to be on THIS page:

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ← Back to Units                            ┃
┃                                            ┃
┃ Create New Unit                            ┃
┃ Science • Grade 10                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌────────────────────────────────────────────┐
│ 🤖 Ollama Ready                            │
│ Upload textbook images and AI will...     │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ Unit Title *                               │
│ ┌────────────────────────────────────────┐ │
│ │ Test                                   │ │
│ └────────────────────────────────────────┘ │
│ Enter the title of the unit...            │
└────────────────────────────────────────────┘
                   ↓↓↓↓
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃ ✨ 💡 AI suggests a better title   ┃
    ┃ based on your content:             ┃
    ┃                                    ┃
    ┃ "Photosynthesis Process"           ┃
    ┃                                    ┃
    ┃ [Use This Title] [Keep Current] [X]┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                   ↓↓↓↓
┌────────────────────────────────────────────┐
│ Upload Content                             │
│ Upload textbook images for AI text...     │
│ ┌────────────────────────────────────────┐ │
│ │         📤                             │ │
│ │    Click to upload files               │ │
│ │    Images (PNG, JPG) or Markdown       │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ ✨ Auto-Generated Demo Content            │
│ When you create a unit, we'll instantly... │
│ • Unit Text • Audio Lesson • Vocabulary   │
│ • Summary • Exercises • Quiz • Practice   │
└────────────────────────────────────────────┘

       [Cancel]  [Process & Create Unit]
```

---

## How to Get There

### From Units Dashboard (your screenshot 1):

```
┌─────────────────────────┐
│ Science                 │
│                         │
│ 📘 Units Dashboard      │  ← You're here
│                         │
│ Unit 1: Test  🔮        │
│ Unit 2: Another  🔮     │
│                         │
│ [+ Create New Unit]     │  ← Click this!
└─────────────────────────┘
              ↓
        **TAKES YOU TO**
              ↓
┌─────────────────────────┐
│ ← Back to Units         │
│                         │
│ Create New Unit         │  ← Now you're here!
│ Science • Grade 10      │
│                         │
│ Unit Title *            │
│ [____________]          │
│                         │
│ Upload Content          │
└─────────────────────────┘
```

---

### From Inside Unit (your screenshot 2):

```
┌─────────────────────────┐
│ 🔵 Test  🔮             │
│ Science • Unit 1        │  ← You're here
│                         │
│ Progress: 0%            │
│                         │
│ 📖 Unit Text            │
│ 🎧 Audio Lesson         │
└─────────────────────────┘
              ↓
         Click "Back" or go to Units Dashboard
              ↓
         Click "+ Create New Unit"
              ↓
         **NOW YOU'RE ON CREATE PAGE**
```

---

## Side-by-Side Comparison

### ❌ WHERE YOU ARE (Wrong Place)

```
UNITS DASHBOARD:
┌───────────────────────┐
│ Science               │
│ Grade 10              │
│                       │
│ Unit 1: Test          │  ← Existing units
│ Unit 2: Another       │
│                       │
│ [+ Create New Unit]   │
└───────────────────────┘

INSIDE UNIT:
┌───────────────────────┐
│ Test                  │
│ Science • Unit 1      │  ← Unit detail view
│                       │
│ Overall Progress: 0%  │
│                       │
│ Modules:              │
│ • Unit Text           │
│ • Audio Lesson        │
└───────────────────────┘
```

### ✅ WHERE YOU NEED TO BE (Right Place)

```
CREATE UNIT PAGE:
┌───────────────────────┐
│ ← Back to Units       │
│                       │
│ Create New Unit       │  ← Page title
│ Science • Grade 10    │
│                       │
│ Unit Title *          │  ← Input field
│ [Test_______]         │
│                       │
│ 💜 SUGGESTION         │  ← Banner here!
│ "Better Title"        │
│ [Use] [Keep]          │
│                       │
│ Upload Content        │  ← Upload section
│ [📤 Upload]           │
└───────────────────────┘
```

---

## The Key Difference

### Existing Units (Your Screenshots)
- **Shows:** List of already-created units
- **Shows:** Unit cards with progress
- **Shows:** Inside unit with modules
- **NO title suggestion** (already created!)

### Create Unit Page (Where Feature Is)
- **Shows:** "Create New Unit" as page title
- **Shows:** Empty title input field
- **Shows:** Upload button
- **SHOWS TITLE SUGGESTION** after upload!

---

## Think of It Like This

```
Creating a Google Doc:        Viewing a Google Doc:
┌──────────���──────────┐      ┌─────────────────────┐
│ New Document        │      │ Document Title      │
│                     │      │ ─────────────────── │
│ [Title___________]  │      │                     │
│ [Type here...]      │      │ Content...          │
│                     │      │ Content...          │
│ [Format] [Insert]   │      │ Content...          │
└─────────────────────┘      └─────────────────────┘
    ↑                            ↑
Title suggestion              NO suggestion
appears HERE                  (already created)
```

---

## How to Test RIGHT NOW

### Step 1: Navigate
```
1. From any page in your app
2. Go to Dashboard
3. Click a subject (e.g., Science)
4. Click "+ Create New Unit" button
```

### Step 2: Verify You're in Right Place
Look for these elements:
- ✅ "← Back to Units" at top
- ✅ "Create New Unit" as heading
- ✅ Empty "Unit Title *" input field
- ✅ "Upload Content" section
- ✅ "Process & Create Unit" button at bottom

If you DON'T see all of these, you're in the wrong place!

### Step 3: Trigger Title Suggestion
```
1. Type "Test" in Unit Title field
2. Click "Click to upload files"
3. Select a .md file with content
4. Wait 2-3 seconds
5. Look between title and upload sections
6. Purple banner should appear!
```

---

## Still Can't Find It?

### Checklist:

1. **Are you on Create Unit page?**
   - Look for "Create New Unit" heading
   - NOT "Units Dashboard"
   - NOT inside an existing unit

2. **Did you upload content?**
   - Must upload .md file OR images
   - Won't appear with just a title

3. **Did you wait?**
   - Wait 2-3 seconds after upload
   - Not instant!

4. **Is Ollama running?**
   - Terminal: `ollama serve`
   - Check: `ollama list` shows gemma3:4b

5. **Check browser console**
   - Press F12
   - Look for: "💡 Suggesting title..."

---

## Summary

**You're looking at:** Existing units (dashboard or detail view)  
**You need to be on:** Create New Unit page  
**Feature appears:** After uploading content (during creation)  
**Feature does NOT appear:** On existing units or dashboards  

**To see it:**
1. Click "+ Create New Unit"
2. Enter a title
3. Upload .md file or images
4. Wait 2-3 seconds
5. Look between title input and file upload

---

**Key Insight:** The title suggestion is a **creation-time feature**, not a **post-creation feature**. It helps you pick a good title BEFORE the unit is created, not after.

