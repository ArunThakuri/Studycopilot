# 💡 Title Suggestion - Visual Example

## What You'll See

When the AI suggests a better title, a purple banner appears between your title input and file upload section.

---

## Before Processing

```
┌─────────────────────────────────────────────────────┐
│ Unit Title *                                        │
│ ┌───────────────────────────────────────────────┐  │
│ │ Chapter 5                                     │  │
│ └───────────────────────────────────────────────┘  │
│ Enter the title of the unit as it appears in      │
│ your textbook                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Upload Content                                      │
│ Upload textbook images for AI text extraction...   │
│ ┌───────────────────────────────────────────────┐  │
│ │       📤                                      │  │
│ │   Click to upload files                      │  │
│ │   Images (PNG, JPG) or Markdown (.md)        │  │
│ └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## After Processing - Suggestion Appears

```
┌─────────────────────────────────────────────────────┐
│ Unit Title *                                        │
│ ┌───────────────────────────────────────────────┐  │
│ │ Chapter 5                                     │  │ ← Your original title
│ └───────────────────────────────────────────────┘  │
│ Enter the title of the unit as it appears in      │
│ your textbook                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ✨ 💡 AI suggests a better title based on your     │ ← NEW BANNER
│ content:                                           │
│                                                    │
│ "Photosynthesis and Plant Energy Production"      │ ← AI suggestion
│                                                    │
│ [ ✓ Use This Title ]  [ Keep Current ]        [X] │ ← Actions
└─────────────────────────────────────────────────────┘
      ^                        ^                   ^
   Accept                   Reject              Dismiss

┌─────────────────────────────────────────────────────┐
│ Upload Content                                      │
│ ✓ 3 images uploaded                                │
│ [image1.jpg] [image2.jpg] [image3.jpg]            │
└─────────────────────────────────────────────────────┘
```

---

## After Accepting Suggestion

```
┌─────────────────────────────────────────────────────┐
│ Unit Title *                                        │
│ ┌───────────────────────────────────────────────┐  │
│ │ Photosynthesis and Plant Energy Production   │  │ ← Title updated!
│ └───────────────────────────────────────────────┘  │
│ Enter the title of the unit as it appears in      │
│ your textbook                                      │
└─────────────────────────────────────────────────────┘
                                                       ← Banner gone

┌─────────────────────────────────────────────────────┐
│ Upload Content                                      │
│ ✓ 3 images uploaded                                │
│ [image1.jpg] [image2.jpg] [image3.jpg]            │
└─────────────────────────────────────────────────────┘
```

---

## Real-World Examples

### Example 1: Science Textbook

**Your input:**
```
Title: "Unit 3"
Content: [Uploads chapter about cell structure]
```

**AI suggests:**
```
┌──────────────────────────────────────────────┐
│ ✨ 💡 AI suggests a better title based on   │
│ your content:                                │
│                                              │
│ "Cell Structure and Organelles"             │
│                                              │
│ [ ✓ Use This Title ]  [ Keep Current ]  [X] │
└──────────────────────────────────────────────┘
```

---

### Example 2: Math Textbook

**Your input:**
```
Title: "Algebra Lesson"
Content: [Uploads chapter about quadratic equations]
```

**AI suggests:**
```
┌──────────────────────────────────────────────┐
│ ✨ 💡 AI suggests a better title based on   │
│ your content:                                │
│                                              │
│ "Quadratic Equations and Solutions"         │
│                                              │
│ [ ✓ Use This Title ]  [ Keep Current ]  [X] │
└──────────────────────────────────────────────┘
```

---

### Example 3: History Textbook

**Your input:**
```
Title: "Chapter 8"
Content: [Uploads chapter about World War II]
```

**AI suggests:**
```
┌──────────────────────────────────────────────┐
│ ✨ 💡 AI suggests a better title based on   │
│ your content:                                │
│                                              │
│ "World War II and Global Impact"            │
│                                              │
│ [ ✓ Use This Title ]  [ Keep Current ]  [X] │
└──────────────────────────────────────────────┘
```

---

### Example 4: Good Title - No Suggestion

**Your input:**
```
Title: "Photosynthesis Process"
Content: [Uploads chapter about photosynthesis]
```

**AI result:**
```
No banner appears - your title already describes the content well!
```

---

## Color Scheme

The banner uses a beautiful gradient design:

- **Background:** Purple-to-blue gradient (from-purple-50 to-blue-50)
- **Border:** Purple (border-purple-200)
- **Icon:** Purple sparkles ✨
- **Title text:** Bold purple (text-purple-700)
- **Accept button:** Purple (bg-purple-600)
- **Reject button:** Outlined

---

## User Actions

### 1. Use This Title (Accept)
```
Click → Title input updates → Banner disappears → Continue workflow
```

### 2. Keep Current (Reject)
```
Click → Title unchanged → Banner disappears → Continue workflow
```

### 3. X Button (Dismiss)
```
Click → Same as reject → Banner disappears
```

---

## Animation Flow

```
1. Upload content
   ↓
2. [Processing with spinner...]
   ↓
3. "Analyzing content for title suggestion..."
   ↓
4. [Banner slides in]
   ↓
5. User sees suggestion
   ↓
6. User clicks action
   ↓
7. [Banner fades out]
   ↓
8. Continue to dashboard
```

---

## Mobile View

On smaller screens, the banner adapts:

```
┌─────────────────────────┐
│ ✨ AI suggests:         │
│                         │
│ "Photosynthesis and    │
│  Plant Energy"         │
│                         │
│ [ ✓ Use This ]         │
│ [ Keep Current ]    [X]│
└─────────────────────────┘
```

Buttons stack vertically if needed.

---

## Edge Cases

### Empty Content
```
Content: [Empty file]
Result: No suggestion (nothing to analyze)
```

### Very Short Content
```
Content: "Chapter 5 Exercise Solutions"
Result: May suggest simple title like "Exercise Solutions"
```

### Multiple Topics
```
Content: [Multiple chapters uploaded]
Result: Suggests based on first/main topic
```

### Technical Content
```
Content: [Advanced physics formulas]
Result: Suggests technical but readable title
```

---

## Tips for Best Results

### ✅ Good Practices

1. **Upload complete content** - More context = better suggestion
2. **Use temporary title** - Let AI suggest the final one
3. **Review suggestion** - Make sure it makes sense
4. **Edit if needed** - You can still manually edit

### ❌ What to Avoid

1. Don't stress about initial title - AI will help
2. Don't accept without reading - Review first
3. Don't re-upload just for title - One suggestion per upload

---

## Comparison

### Before This Feature

```
User thinks: "What should I name this unit?"
User enters: "Science Unit 5" (generic)
Result: Unclear what the unit contains
```

### After This Feature

```
User enters: "Unit 5" (temporary)
AI analyzes: [Content about photosynthesis]
AI suggests: "Photosynthesis and Plant Energy"
User accepts: Clear, descriptive title!
Result: Easy to find and understand later
```

---

## Success Stories

### Student Perspective
> "I used to name my units 'Chapter 1', 'Chapter 2', etc. Now the AI helps me create meaningful titles that actually describe what I'm learning. Much easier to find stuff later!"

### Teacher Perspective
> "The AI title suggestions are spot-on. Saves me time and ensures consistent, professional naming across all units. Love it!"

---

## Technical Implementation

### How It Looks in Code

```typescript
// After content is processed
if (content.markdown) {
  // Suggest a title
  const suggested = await suggestTitleFromMarkdown(
    content.markdown, 
    unitTitle
  );
  
  // Show banner if different
  if (suggested !== unitTitle) {
    setSuggestedTitle(suggested);
    setShowTitleSuggestion(true);
  }
}
```

### Banner Component

```tsx
{showTitleSuggestion && suggestedTitle && (
  <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
    <Sparkles icon />
    <p>AI suggests: "{suggestedTitle}"</p>
    <Button onClick={acceptTitle}>Use This Title</Button>
    <Button onClick={rejectTitle}>Keep Current</Button>
  </Card>
)}
```

---

## Keyboard Shortcuts (Future)

Planned shortcuts:
- `Enter` - Accept suggestion
- `Esc` - Reject/dismiss
- `Tab` - Navigate buttons

---

## Summary

The title suggestion feature:

✅ **Appears automatically** after processing  
✅ **Analyzes your content** intelligently  
✅ **Suggests better titles** in 3-8 words  
✅ **Shows purple banner** with clear actions  
✅ **Lets you decide** accept or reject  
✅ **Updates instantly** when accepted  
✅ **Disappears cleanly** when dismissed  

**It's smart, beautiful, and helpful!** 💜✨

---

**Feature:** Title Suggestion  
**Status:** ✅ Active  
**Design:** Purple gradient banner  
**Actions:** Accept / Reject / Dismiss  
**Model:** gemma3:4b  
**Speed:** 2-5 seconds  
