# StudyCopilot Workflows

## Two Ways to Create Units

---

## 📸 Workflow 1: Upload Images (AI Text Extraction)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. USER: Upload textbook images (PNG, JPG)                   │
│           ↓                                                     │
│  2. SYSTEM: "Processing images with Ollama..."                │
│           ↓                                                     │
│  3. AI (gemma3:4b): Extract EXACT text from images           │
│           ↓                                                     │
│  4. SYSTEM: Generate markdown file                            │
│           ↓                                                     │
│  5. USER: Review/edit extracted text (optional)              │
│           ↓                                                     │
│  6. USER: Click "Continue to Dashboard"                       │
│           ↓                                                     │
│  7. ✅ Unit created with extracted content                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Time: ~10-30 seconds (depends on image count and quality)
AI Used: Yes (gemma3:4b for text extraction)
Output: Markdown with exact text from images
```

---

## 📄 Workflow 2: Upload Markdown File (Direct Use)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. USER: Upload .md file with prepared content               │
│           ↓                                                     │
│  2. SYSTEM: "Using your markdown file..."                     │
│           ↓                                                     │
│  3. SYSTEM: Load file content AS-IS                           │
│           ↓  (NO AI PROCESSING)                               │
│  4. USER: Review content (optional)                           │
│           ↓                                                     │
│  5. USER: Click "Continue to Dashboard"                       │
│           ↓                                                     │
│  6. ✅ Unit created with your content                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Time: ~2-3 seconds (just file loading)
AI Used: No (direct file use)
Output: Your exact markdown content
```

---

## 🔄 Comparison

| Aspect | Image Upload | Markdown Upload |
|--------|-------------|-----------------|
| **Input** | Textbook images | .md text file |
| **AI Processing** | ✅ Yes (gemma3:4b) | ❌ No |
| **Time** | 10-30 seconds | 2-3 seconds |
| **Accuracy** | Depends on image quality | 100% (your content) |
| **Use Case** | Extract from textbooks | Pre-prepared content |
| **Editing** | May need corrections | Already perfect |
| **Model Required** | Yes (gemma3:4b) | No |

---

## 💡 When to Use Which?

### Use Image Upload When:
- ✅ You have textbook photos/scans
- ✅ Content exists only in physical/PDF format
- ✅ You want AI to extract text automatically
- ✅ You're okay with minor corrections afterward

### Use Markdown Upload When:
- ✅ You already typed out the content
- ✅ You prepared content from another source
- ✅ You want 100% control over content
- ✅ You want faster unit creation
- ✅ You want to avoid AI processing

---

## 🎯 Example Scenarios

### Scenario A: Student with Textbook
**Problem:** I have a physical science textbook, Chapter 5  
**Solution:** Take photos of pages → Upload images → AI extracts text  
**Result:** Markdown file with chapter content

### Scenario B: Teacher with Prepared Notes
**Problem:** I already have lesson notes in a Word doc  
**Solution:** Save as .md file → Upload markdown → Done  
**Result:** Unit with your exact notes

### Scenario C: Student Creating Study Guide
**Problem:** I want to create notes from multiple sources  
**Solution:** Write notes in markdown → Upload file  
**Result:** Organized study unit

---

## 📊 Visual Flow

```
                        START
                          │
                          ▼
                  Create New Unit
                          │
                          ▼
              ┌───────────┴───────────┐
              ▼                       ▼
        Upload Images          Upload .md File
              │                       │
              ▼                       ▼
      "Processing with AI..."   "Using your file..."
              │                       │
              ▼                       ▼
      gemma3:4b extracts        Load content as-is
              │                       │
              ▼                       ▼
      Markdown generated        Content loaded
              │                       │
              └───────────┬───────────┘
                          ▼
                Download .md (optional)
                          │
                          ▼
                Continue to Dashboard
                          │
                          ▼
                  ✅ Unit Created!
```

---

## 🔧 Technical Details

### Image Processing Path
```
User uploads → create-unit.tsx
              ↓
         processUnitWithAI() in ai-provider.ts
              ↓
         generateMarkdownFromImages() in ollama-service.ts
              ↓
         Ollama API (gemma3:4b model)
              ↓
         Returns extracted text
              ↓
         User downloads/continues
```

### Markdown Processing Path
```
User uploads → create-unit.tsx
              ↓
         processUnitWithAI() in ai-provider.ts
              ↓
         EARLY RETURN (if markdownContent exists)
              ↓
         Use content as-is
              ↓
         User continues
```

---

## ⚙️ Configuration

**Current settings in `/lib/config.ts`:**
```typescript
VISION_MODEL: 'gemma3:4b'
```

**For Image Processing:**
- Model: gemma3:4b (vision-capable)
- Temperature: 0.1 (factual extraction)
- Mode: Exact text extraction

**For Markdown Processing:**
- No model needed
- No AI processing
- Direct file use

---

## 🎓 Best Practices

### For Image Upload:
1. Use clear, high-resolution images
2. Good lighting and contrast
3. Straight/horizontal text
4. One or few pages at a time
5. Review extracted text for accuracy

### For Markdown Upload:
1. Use proper markdown formatting
2. Include headings (##, ###)
3. Structure content logically
4. Preview before uploading
5. Name file meaningfully

---

## 📝 File Format Examples

### Markdown File (.md)
```markdown
# Chapter 5: Photosynthesis

## Introduction
Photosynthesis is the process by which plants...

## Key Concepts
- Chlorophyll
- Light reactions
- Dark reactions

## Formula
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
```

### Image File (PNG, JPG)
- Photo of textbook page
- Scanned document
- Screenshot of PDF
- Clear, readable text

---

## 🚀 Quick Start

### Test Both Workflows:

**Test 1: Image Upload**
```
1. Take photo of a textbook page (or use test image)
2. Upload to StudyCopilot
3. Wait for AI extraction
4. Download and verify markdown
5. Create unit
```

**Test 2: Markdown Upload**
```
1. Create test.md file:
   # Test Unit
   This is test content.

2. Upload to StudyCopilot
3. See instant loading
4. Create unit
```

---

**Both workflows lead to the same result: a unit with learning materials!**

Choose the workflow that fits your situation. 🎯
