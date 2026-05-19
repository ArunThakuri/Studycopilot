# ✅ Testing Checklist: Improved AI Prompts

## 🎯 Quick Test Guide

Follow this checklist to verify all prompt improvements are working correctly.

---

## Prerequisites

- [ ] Gemini API key configured (recommended for best results)
- [ ] Real textbook content ready (image or .md file)
- [ ] StudyCopilot app running

---

## Module-by-Module Testing

### 1. ✅ Source Markdown Module

**What to test**: No changes, verify it still works

- [ ] Upload a markdown file
- [ ] Verify preview displays correctly
- [ ] Verify content is editable
- [ ] Check that formatting is preserved

**Expected**: ✅ Same as before (editable .md with preview)

---

### 2. 🔄 Unit Text Module - CORE CONTENT ONLY

**What to test**: Should extract ONLY learning content, NO exercises

**Test Steps**:
1. [ ] Upload textbook content that has exercises
2. [ ] Select Gemini provider
3. [ ] Generate Unit Text module
4. [ ] Check output

**What to look for**:
- [ ] ✅ Has main explanations and theory
- [ ] ✅ Has definitions and concepts
- [ ] ✅ Has examples and illustrations
- [ ] ✅ Well-formatted markdown (##, ###)
- [ ] ❌ NO "Exercise" sections
- [ ] ❌ NO "Questions for Discussion"
- [ ] ❌ NO practice problems
- [ ] ❌ NO "Fill in the blanks"
- [ ] ❌ NO "Match the following"

**Expected Output Example**:
```markdown
## Photosynthesis

Photosynthesis is the process by which plants...

### Key Components
- Chlorophyll
- Sunlight
- Carbon dioxide

### The Process
1. Light absorption...
2. Water splitting...

(NO exercises here)
```

**Pass Criteria**: ✅ ZERO exercises in output

---

### 3. 🔄 Audio Lesson Module - COMPREHENSIVE SUMMARY

**What to test**: Should generate detailed paragraph summary

**Test Steps**:
1. [ ] Generate Audio Lesson module
2. [ ] Check text output
3. [ ] Verify dummy audio player displays

**What to look for**:
- [ ] ✅ 150-200 words (count them)
- [ ] ✅ Paragraph format (not bullet points)
- [ ] ✅ Covers main concepts from unit
- [ ] ✅ Conversational, student-friendly tone
- [ ] ✅ Includes key definitions
- [ ] ✅ Has introduction and summary
- [ ] ✅ Dummy audio player shows

**Expected Output Example**:
```
Welcome to this lesson on photosynthesis! Photosynthesis is 
how plants make their own food using sunlight. In this process,
plants take in carbon dioxide from the air and water from the 
soil. Inside special structures called chloroplasts, which 
contain green chlorophyll, the plant uses light energy to 
convert these ingredients into glucose, a type of sugar. As 
a byproduct, plants release oxygen, which we breathe. This 
amazing process happens in two stages: the light-dependent 
reactions where energy is captured, and the light-independent 
reactions where glucose is created. Understanding photosynthesis 
helps us appreciate how plants are essential for life on Earth!
```

**Pass Criteria**: ✅ Comprehensive, useful summary

---

### 4. ✅ Vocabulary Module

**What to test**: No changes, verify it still works

- [ ] Generate Vocabulary module
- [ ] Verify 8-12 words extracted
- [ ] Check Nepali translations present
- [ ] Test "Lookup New Word" feature

**Expected**: ✅ Same as before (working well)

---

### 5. 🔄 Summary Module - EXAM-FOCUSED REVISION

**What to test**: Should create SHORT revision notes

**Test Steps**:
1. [ ] Generate Summary module
2. [ ] Count items in each section
3. [ ] Verify formatting

**What to look for**:
- [ ] ✅ **Definitions**: 4-6 items (not just 3-4)
- [ ] ✅ Each definition SHORT (1-2 sentences max)
- [ ] ✅ Format: "Term: brief definition"
- [ ] ✅ **Formulas**: 2-4 items (or "None")
- [ ] ✅ Format: "Formula name: actual formula"
- [ ] ✅ **Concepts**: 5-8 items (not just 4-5)
- [ ] ✅ Clear, concise statements
- [ ] ✅ Focused on exam prep

**Expected Output Example**:
```
DEFINITIONS:
• Photosynthesis: Process by which plants convert light into food
• Chlorophyll: Green pigment that captures sunlight
• Stomata: Tiny pores for gas exchange
• Glucose: Sugar produced as energy storage

FORMULAS:
• 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
• Rate of photosynthesis ∝ Light intensity

CONCEPTS:
• Plants are primary producers in food chains
• Photosynthesis releases oxygen for respiration
• Light and dark reactions work together
• Temperature affects reaction rate
• Chloroplasts are the site of photosynthesis
```

**Pass Criteria**: ✅ More items, SHORT, exam-focused

---

### 6. 🔄 Exercise Module - SOLVE TEXTBOOK EXERCISES

**What to test**: Should EXTRACT and SOLVE exercises from source

**Test Steps**:
1. [ ] Ensure source .md has exercises
2. [ ] Generate Exercise module
3. [ ] Compare with source content
4. [ ] Verify solutions

**What to look for**:
- [ ] ✅ Exercises are FROM the source content (not random)
- [ ] ✅ Questions are complete (no "What is the main...")
- [ ] ✅ Spelling errors fixed
- [ ] ✅ Each exercise has:
  - [ ] Complete question
  - [ ] Correct answer
  - [ ] Explanation/solution
- [ ] ✅ Organized by type (MCQ, short-answer, etc.)
- [ ] ✅ All exercises from textbook included

**Expected Output Example**:
```
Exercise 1 (multiple-choice):
Question: What is the primary function of chlorophyll in photosynthesis?
A) Absorbing sunlight energy
B) Storing glucose
C) Releasing oxygen
D) Breaking down water
Answer: A
Explanation: Chlorophyll is the green pigment in plants that 
captures light energy from the sun, which is the first essential 
step in the photosynthesis process.

Exercise 2 (short-answer):
Question: Explain why plants need both light and dark reactions 
in photosynthesis.
Answer: Light reactions capture energy from sunlight and produce 
ATP and NADPH. Dark reactions (Calvin cycle) use this energy to 
convert CO₂ into glucose. Both are necessary because dark reactions 
depend on products from light reactions.
Explanation: This shows the interdependence of the two stages.
```

**Pass Criteria**: ✅ Actual textbook exercises with solutions

---

### 7. 🔄 Interactive Quiz - 25 HIGH-QUALITY MCQs

**What to test**: Should generate 25 well-formed questions

**Test Steps**:
1. [ ] Generate Interactive Quiz module
2. [ ] Count questions (should be ~25)
3. [ ] Check each question quality
4. [ ] Verify difficulty distribution

**What to look for**:

**Quantity**:
- [ ] ✅ 20-25 questions generated (not just 8-10)

**Quality Checklist** (check at least 10 questions):
- [ ] ✅ Complete question text (no fragments)
- [ ] ✅ Question mark at end
- [ ] ✅ Proper grammar and spelling
- [ ] ✅ Clear, unambiguous wording
- [ ] ✅ All 4 options present
- [ ] ✅ All options complete (no empty)
- [ ] ✅ Options similar length/style
- [ ] ✅ All options plausible
- [ ] ✅ Only ONE correct answer
- [ ] ✅ No "All of the above"
- [ ] ✅ No "None of the above"

**Difficulty Distribution**:
- [ ] ✅ ~8-10 easy questions
- [ ] ✅ ~10-12 medium questions
- [ ] ✅ ~5-7 hard questions

**Expected Output Example**:
```
Question 1 (easy):
What is the green pigment in plants that captures sunlight?
A) Glucose
B) Chlorophyll
C) Oxygen
D) Carbon dioxide
Correct: B
Difficulty: easy

Question 15 (medium):
Which part of the chloroplast contains chlorophyll molecules?
A) Stroma
B) Outer membrane
C) Thylakoid membrane
D) Matrix
Correct: C
Difficulty: medium

Question 22 (hard):
If a plant is kept in complete darkness for 24 hours, which 
process would be most directly affected first?
A) Cellular respiration in all cells
B) Light-dependent reactions in chloroplasts
C) Glucose transport in phloem
D) Water absorption through roots
Correct: B
Difficulty: hard
```

**Pass Criteria**: ✅ 20-25 quality questions with proper difficulty mix

---

### 8. 🔄 Practice Module - 15 COMPREHENSIVE Q&A

**What to test**: Should generate 15 mixed questions

**Test Steps**:
1. [ ] Generate Practice module
2. [ ] Count questions
3. [ ] Check mix of types
4. [ ] Verify answers

**What to look for**:

**Quantity & Mix**:
- [ ] ✅ 12-15 questions total
- [ ] ✅ ~60% MCQ (8-9 questions)
- [ ] ✅ ~40% short-answer (5-6 questions)

**Quality Checklist**:
- [ ] ✅ All questions complete
- [ ] ✅ Proper grammar
- [ ] ✅ Clear wording
- [ ] ✅ **MCQ**: 4 options each
- [ ] ✅ **MCQ**: Only one correct answer
- [ ] ✅ **Short-answer**: Complete answers (1-3 sentences)
- [ ] ✅ **Short-answer**: All key points included
- [ ] ✅ Show/hide answer button works

**Difficulty Mix**:
- [ ] ✅ ~5 easy questions
- [ ] ✅ ~6 medium questions
- [ ] ✅ ~4 hard questions

**Expected Output Example**:
```
Question 1 (mcq, easy):
Which gas do plants absorb from the air during photosynthesis?
A) Oxygen
B) Nitrogen
C) Carbon dioxide
D) Hydrogen
Answer: Carbon dioxide
[Show Answer button]

Question 10 (short-answer, medium):
Explain why plants appear green to our eyes.
Answer: Plants appear green because chlorophyll, the pigment in 
their leaves, absorbs red and blue wavelengths of light for 
photosynthesis but reflects green wavelengths. Our eyes detect 
this reflected green light, making the plants look green.
[Show Answer button]
```

**Pass Criteria**: ✅ 12-15 questions with complete answers

---

## Overall Quality Checks

After testing all modules, verify:

### Content Quality
- [ ] ✅ No incomplete sentences or fragments
- [ ] ✅ No spelling errors
- [ ] ✅ Proper grammar throughout
- [ ] ✅ Clear, student-friendly language
- [ ] ✅ Appropriate for grade level

### Structural Quality
- [ ] ✅ Consistent formatting
- [ ] ✅ Proper markdown rendering
- [ ] ✅ Organized logically
- [ ] ✅ Easy to read

### Educational Value
- [ ] ✅ Content is accurate
- [ ] ✅ Covers all major topics
- [ ] ✅ Useful for exam preparation
- [ ] ✅ Supports self-study

---

## Provider Comparison Test

### Test with Ollama (Local)
- [ ] Run all modules with Ollama
- [ ] Note quality level: ⭐⭐⭐ (acceptable)
- [ ] Check for parsing issues
- [ ] Verify structure is correct

### Test with Gemini (Cloud)
- [ ] Run all modules with Gemini
- [ ] Note quality level: Should be ⭐⭐⭐⭐⭐ (excellent)
- [ ] Verify JSON parsing works
- [ ] Check completeness

**Expected**: Gemini should produce significantly higher quality

---

## Common Issues to Check

### ❌ Problems to Look For:

1. **Unit Text**:
   - [ ] Still contains exercises? → BUG
   - [ ] Missing main content? → BUG

2. **Exercises**:
   - [ ] Random exercises (not from textbook)? → BUG
   - [ ] Incomplete questions? → BUG
   - [ ] No solutions? → BUG

3. **Quiz**:
   - [ ] Less than 20 questions? → Lower quality
   - [ ] Incomplete options? → BUG
   - [ ] Multiple correct answers? → BUG

4. **Practice**:
   - [ ] Less than 12 questions? → Lower quality
   - [ ] Incomplete answers? → BUG
   - [ ] Show/hide not working? → UI issue

---

## Success Criteria Summary

| Module | Minimum Passing Criteria |
|--------|-------------------------|
| Unit Text | ✅ Zero exercises in output |
| Audio | ✅ 150-200 words, comprehensive |
| Summary | ✅ 4-6 defs, 2-4 formulas, 5-8 concepts |
| Exercises | ✅ From textbook with solutions |
| Quiz | ✅ 20-25 complete MCQs |
| Practice | ✅ 12-15 questions with answers |

---

## Bug Reporting Template

If you find issues, report with this format:

```
MODULE: [Module name]
PROVIDER: [Ollama / Gemini]
ISSUE: [Describe the problem]

EXPECTED:
[What should happen]

ACTUAL:
[What actually happened]

EXAMPLE:
[Paste example output showing the issue]
```

---

## Performance Benchmarks

### Time to Generate (approximate)

| Provider | All Modules | Per Module |
|----------|-------------|------------|
| Ollama | 3-5 minutes | 20-40 sec |
| Gemini | 2-4 minutes | 15-30 sec + 3s delay |

### Quality Scores (expected with good content)

| Provider | Overall Quality |
|----------|----------------|
| Ollama | 70-80% ⭐⭐⭐ |
| Gemini | 90-95% ⭐⭐⭐⭐⭐ |

---

## Final Verification

- [ ] All 8 modules generated successfully
- [ ] Unit Text has NO exercises
- [ ] Exercises are FROM textbook
- [ ] Quiz has 20-25 questions
- [ ] Practice has 12-15 questions
- [ ] Summary is exam-focused
- [ ] Audio summary is comprehensive
- [ ] No incomplete or broken content
- [ ] Quality is significantly improved

---

## ✅ TEST COMPLETE!

If all checks pass:
```
🎉 SUCCESS! Improved prompts are working correctly!
```

If some checks fail:
```
⚠️  ISSUES FOUND - Report using bug template above
```

---

## Next Steps After Testing

1. **If successful**: Start using with real students!
2. **If issues found**: Report for further prompt refinement
3. **Feedback**: Share what works well and what needs improvement

---

**Happy Testing! 🚀**

Remember: Use **Gemini** for best results!
