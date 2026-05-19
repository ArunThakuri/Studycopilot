# Quick Test Guide - AI Module Generation

## 🚀 Fixed & Ready to Test!

Both critical errors have been fixed:
- ✅ Avatar import error resolved
- ✅ JSON parsing issues resolved with natural language approach

## ⚡ Quick Start (5 Minutes)

### 1. Start Ollama (30 seconds)

```bash
# Terminal 1
set OLLAMA_ORIGINS=*
ollama serve
```

### 2. Open App & Create Unit (1 minute)

1. Login/Signup
2. Add a subject (e.g., "Science")
3. Click "Create Unit"
4. Upload 2-3 textbook images
5. Enter title (e.g., "Photosynthesis")
6. Click "Process & Create Unit"

### 3. Wait for Processing (3-5 minutes)

Watch the progress bar:
- 0-40%: Extracting text from images
- 40-65%: Generating markdown
- 65-95%: Generating 6 learning modules
- 100%: Done!

### 4. Check Results (1 minute)

Click "Continue to Dashboard" and verify:

| Module | What to Check | Expected |
|--------|--------------|----------|
| 📖 Unit Text | Shows extracted text | Your textbook content |
| 🎙️ Audio | Has transcript | 150-300 word lesson |
| 📚 Vocabulary | Has words | 6-10 words with Nepali |
| 📝 Summary | Has sections | Definitions, Formulas, Concepts |
| ✏️ Exercises | Has questions | 5-6 mixed questions |
| 🎯 Quiz | Has MCQs | 6-10 questions with options |
| 📖 Practice | Has questions | 6-8 mixed questions |

## ✅ Success Checklist

**You're successful if:**
- ✅ No crashes or blank screens
- ✅ All 7 modules display content
- ✅ Unit Text shows your textbook content
- ✅ At least 4 modules have relevant content
- ✅ Console shows "✅ All module content generated!"

**It's OK if:**
- ⚠️ Some modules use fallback data (generic content)
- ⚠️ Takes 5+ minutes on slower machines
- ⚠️ Quality varies between modules

**Report issues if:**
- ❌ App crashes or shows blank screens
- ❌ All modules show generic content (but Ollama is running)
- ❌ Gets stuck at a certain percentage
- ❌ Console shows repeated errors

## 📊 What the Console Should Show

### ✅ Good (Expected)
```
🤖 Using Ollama to process images...
✅ Markdown generated successfully!
📚 Generating vocabulary from markdown...
✅ Generated 8 vocabulary words
🎙️ Generating audio transcript from markdown...
✅ Audio generated
📝 Generating summary from markdown...
✅ Generated summary with 4 definitions, 2 formulas, 5 concepts
✏️ Generating exercises from markdown...
✅ Generated 5 exercises
🎯 Generating interactive quiz from markdown...
✅ Generated 8 quiz questions
📖 Generating practice questions from markdown...
✅ Generated 6 practice questions
✅ All module content generated successfully!
```

### ⚠️ OK (Some Fallbacks)
```
📚 Generating vocabulary from markdown...
⚠️ Error generating vocabulary: No vocabulary parsed
⚠️ Using fallback vocabulary
✅ Vocabulary (fallback) ready
```

### ❌ Bad (Should Not Happen)
```
ReferenceError: Avatar is not defined
Failed to parse JSON: SyntaxError...
Uncaught Error: Could not parse...
```

## 🎯 Quick Examples

### Example 1: Science (Photosynthesis)

**Upload:** Pages from biology textbook about photosynthesis

**Expected Vocabulary:**
- Photosynthesis, Chlorophyll, Glucose
- Carbon dioxide, Oxygen, Chloroplast

**Expected Quiz Question:**
```
What is the main function of chlorophyll in plants?
A) Store water
B) Absorb sunlight
C) Produce oxygen
D) Release carbon dioxide
Correct: B
```

### Example 2: Math (Algebra)

**Upload:** Pages about quadratic equations

**Expected Vocabulary:**
- Quadratic, Coefficient, Variable
- Parabola, Discriminant, Root

**Expected Summary:**
```
FORMULAS:
• Standard form: ax² + bx + c = 0
• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a

CONCEPTS:
• A quadratic equation has degree 2
• Solutions are called roots
• Graph forms a parabola
```

### Example 3: English (Literature)

**Upload:** Pages from a story or poem

**Expected Vocabulary:**
- Metaphor, Simile, Imagery
- Theme, Character, Plot

**Expected Exercise:**
```
Question: What literary device compares two things using "like" or "as"?
Answer: Simile
Explanation: A simile is a figure of speech that directly compares...
```

## 🐛 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| "Ollama not available" | `ollama serve` in terminal |
| "Model not found" | `ollama pull gemma3:4b` |
| Very slow | Normal on CPU, wait it out |
| All generic content | Check Ollama is running with CORS |
| Blank Unit Text | Images unclear, try better photos |

## 📞 Getting Help

If you encounter issues:

1. **Check Console** (F12 → Console tab)
2. **Copy error messages**
3. **Note which modules failed**
4. **Share:**
   - Console output
   - What you were testing
   - Your Ollama model

## 🎓 What to Try Next

After basic test works:

1. **Different subjects:**
   - Math (equations, formulas)
   - Science (diagrams, processes)
   - English (stories, grammar)
   - History (dates, events)

2. **Different content:**
   - Single page vs multiple pages
   - Text-heavy vs diagram-heavy
   - Simple vs complex topics

3. **Edge cases:**
   - Very short text (1 paragraph)
   - Very long text (5+ pages)
   - Mixed languages
   - Poor image quality

## 📚 More Information

- **Technical Details:** `/RAW_AI_GENERATION.md`
- **Full Testing Guide:** `/TEST_NATURAL_LANGUAGE_AI.md`
- **Current Status:** `/CURRENT_STATUS.md`
- **What Was Fixed:** `/FIXES_APPLIED.md`

## 🎉 That's It!

You're ready to test the new AI-powered module generation!

**Remember:**
- ✅ It's OK if some modules use fallbacks
- ✅ It's OK if it takes 5 minutes
- ✅ Quality will improve as we refine prompts
- ✅ The important thing is: NO CRASHES!

Happy testing! 🚀
