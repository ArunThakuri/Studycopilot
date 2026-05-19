# 💡 AI Title Suggestion Feature

## Overview

StudyCopilot now includes an intelligent title suggestion feature that analyzes your uploaded content and suggests a better, more descriptive title for your learning unit.

---

## How It Works

### 1. **When It Activates**

The AI title suggestion activates automatically after:
- ✅ You upload images and AI extracts the text
- ✅ You upload a markdown file

### 2. **The Process**

```
Upload Content → AI Extracts/Loads Text → AI Analyzes Content → Suggests Title
                                                                      ↓
                                              User Reviews Suggestion ←
                                                                      ↓
                                              Accept ↔ Reject ↔ Close
```

### 3. **What Happens**

1. **User uploads content** (images or .md file)
2. **System processes** the content
3. **AI analyzes** first 1000 characters
4. **AI generates** a concise title (3-8 words)
5. **System compares** with your current title
6. **If different**: Shows suggestion banner
7. **If same**: No banner (your title is already good!)

---

## Features

### ✨ Smart Suggestions

- **Analyzes actual content** - Not random guesses
- **Concise titles** - 3-8 words maximum
- **Descriptive** - Tells you what the unit is about
- **Student-friendly** - Appropriate for learning materials

### 🎯 User Control

- **Accept** - Use the suggested title
- **Reject** - Keep your original title
- **Dismiss** - Close the banner (same as reject)

### 🚀 Automatic

- No extra clicks needed
- Happens in the background
- Shows only if suggestion is different
- Non-intrusive banner design

---

## UI Components

### Title Suggestion Banner

Appears between the "Unit Title" input and "File Upload" section:

```
┌─────────────────────────────────────────────────────────┐
│ ✨ 💡 AI suggests a better title based on your content: │
│                                                          │
│ "Photosynthesis and Plant Energy Production"           │
│                                                          │
│ [ Use This Title ]  [ Keep Current ]               [X] │
└─────────────────────────────────────────────────────────┘
```

**Visual Design:**
- Purple gradient background (from-purple-50 to-blue-50)
- Sparkles icon (✨)
- Prominent suggested title in purple
- Two clear action buttons
- Dismiss button (X) in corner

---

## Example Scenarios

### Scenario 1: Generic Title → Specific Title

**Your title:** "Science Chapter 5"  
**Content:** Detailed explanation of photosynthesis process...  
**AI suggests:** "Photosynthesis and Plant Energy"  
**Result:** More descriptive and searchable!

### Scenario 2: Vague Title → Clear Title

**Your title:** "Biology Unit"  
**Content:** Discussion of cell structure and organelles...  
**AI suggests:** "Cell Structure and Organelles"  
**Result:** Clear topic identification!

### Scenario 3: Good Title → No Suggestion

**Your title:** "Photosynthesis Process"  
**Content:** Explanation of photosynthesis...  
**AI suggests:** "Photosynthesis Process" (same)  
**Result:** No banner shown - title is already good!

---

## Technical Details

### Model Used

- **Model:** gemma3:4b (same as text extraction)
- **Temperature:** 0.3 (focused, consistent suggestions)
- **Max Tokens:** 30 (keeps suggestions concise)
- **Analysis:** First 1000 characters of content

### Prompt Design

The AI is instructed to:
1. Analyze educational content
2. Suggest 3-8 word titles
3. Be specific and descriptive
4. Avoid generic phrases like "Introduction to"
5. Make it student-friendly
6. Return ONLY the title

### Error Handling

- If AI fails → No banner (silent fail)
- If Ollama unavailable → No suggestion
- If title same → No banner
- Non-critical feature (doesn't block unit creation)

---

## Code Implementation

### Files Modified

1. **`/lib/ollama-service.ts`**
   - Added `suggestTitleFromMarkdown()` function
   - Handles API call to Ollama
   - Cleans up response

2. **`/lib/ai-provider.ts`**
   - Re-exports `suggestTitleFromMarkdown`
   - Makes it available to components

3. **`/components/create-unit.tsx`**
   - Added state for suggestion
   - Added suggestion UI banner
   - Added accept/reject handlers
   - Integrated into workflow

### Key Functions

```typescript
// Suggest title from markdown
suggestTitleFromMarkdown(
  markdownContent: string,
  currentTitle?: string
): Promise<string>

// Accept suggestion
handleAcceptTitleSuggestion()

// Reject/dismiss suggestion
handleRejectTitleSuggestion()
```

---

## User Experience Flow

### Complete Workflow

```
1. User enters unit title: "Chapter 5"
   ↓
2. User uploads textbook images
   ↓
3. AI extracts text from images
   ↓
4. System: "Analyzing content for title suggestion..."
   ↓
5. AI analyzes content and suggests: "Laws of Motion"
   ↓
6. Banner appears with suggestion
   ↓
7. User clicks "Use This Title"
   ↓
8. Title input updates to "Laws of Motion"
   ↓
9. Banner disappears
   ↓
10. User continues to dashboard
```

---

## Benefits

### For Students

- ✅ Better organized units
- ✅ Easier to find content later
- ✅ Clearer understanding of topics
- ✅ Professional-looking unit titles

### For Teachers

- ✅ Consistent naming conventions
- ✅ Descriptive unit organization
- ✅ Less time thinking about titles
- ✅ AI-assisted content curation

### For the System

- ✅ Better searchability
- ✅ Improved organization
- ✅ Enhanced user experience
- ✅ Leverages existing AI infrastructure

---

## Configuration

### Requirements

- Ollama must be running
- gemma3:4b model must be available
- Same setup as text extraction

### No Additional Setup Needed

The title suggestion uses the same:
- Model (gemma3:4b)
- API endpoint (localhost:11434)
- Configuration file (/lib/config.ts)

---

## Best Practices

### For Users

1. **Enter a temporary title first** - Can be generic
2. **Upload your content** - Images or markdown
3. **Wait for AI processing** - Takes a few seconds
4. **Review suggestion** - Does it make sense?
5. **Accept or keep** - You decide!

### For Titles

✅ **Good Titles:**
- "Photosynthesis Process"
- "Newton's Laws of Motion"
- "Cell Structure and Function"
- "Water Cycle and Weather"

❌ **Avoid:**
- "Chapter 1"
- "Unit 5"
- "Science Lesson"
- "Biology Notes"

---

## Troubleshooting

### "No suggestion appears"

**Possible reasons:**
1. Your title already matches the content well
2. Ollama is not running
3. gemma3:4b model not available
4. AI failed (silent fail - not critical)

**Solution:** Your current title works fine! Continue.

### "Suggestion doesn't make sense"

**Why:** AI analyzed a small preview (1000 chars)

**Solution:** Click "Keep Current" to use your title.

### "Want to see suggestion again"

**Issue:** Banner dismissed accidentally

**Solution:** Delete title, re-upload, get new suggestion.

---

## Future Enhancements

Possible improvements:
- Manual "Suggest Title" button
- Multiple title options
- Title based on subject context
- Learning from user preferences
- Bilingual title suggestions

---

## Testing

### Test Cases

**Test 1: Generic Title**
```
Title: "Unit 1"
Content: Photosynthesis explanation...
Expected: Shows suggestion like "Photosynthesis Process"
```

**Test 2: Good Title**
```
Title: "Photosynthesis"
Content: Photosynthesis explanation...
Expected: No suggestion (or same title)
```

**Test 3: Markdown File**
```
Title: "Random"
Upload: pre-written markdown about algebra
Expected: Shows suggestion like "Algebraic Equations"
```

**Test 4: Accept Suggestion**
```
1. Get suggestion
2. Click "Use This Title"
Expected: Title input updates
```

**Test 5: Reject Suggestion**
```
1. Get suggestion
2. Click "Keep Current"
Expected: Banner disappears, original title kept
```

---

## Performance

- **Suggestion time:** 2-5 seconds
- **Impact on workflow:** Minimal (runs in background)
- **API calls:** 1 additional call per unit creation
- **Model:** Uses same gemma3:4b (already loaded)

---

## Privacy & Data

- ✅ All processing is local (Ollama)
- ✅ No cloud APIs used
- ✅ No data sent externally
- ✅ Content stays on your machine

---

## Summary

The AI Title Suggestion feature:

1. **Automatically** analyzes your content
2. **Suggests** a better title if needed
3. **Lets you decide** whether to use it
4. **Improves** unit organization
5. **Uses** the same local AI setup
6. **Requires** no extra configuration

**It's smart, optional, and designed to help!** 🚀

---

## Quick Reference

| Action | Result |
|--------|--------|
| Upload content | AI suggests title |
| Click "Use This Title" | Title updates |
| Click "Keep Current" | Keep your title |
| Click X | Dismiss banner |
| Same title | No banner shows |
| Ollama offline | No suggestion |

---

**Feature Status:** ✅ Ready to use  
**Model Used:** gemma3:4b  
**Setup Required:** None (uses existing Ollama)  
**User Action Required:** Optional (can accept/reject)
