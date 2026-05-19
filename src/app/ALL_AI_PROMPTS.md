# 📝 All AI Prompts Used in StudyCopilot

This document shows **ALL** the prompts used to generate learning materials using AI (both Ollama and Gemini).

---

## Table of Contents

1. [Text Extraction & Cleaning](#1-text-extraction--cleaning)
2. [Vocabulary Extraction](#2-vocabulary-extraction)
3. [Summary Generation](#3-summary-generation)
4. [Exercises Generation](#4-exercises-generation)
5. [Interactive Quiz Generation](#5-interactive-quiz-generation)
6. [Practice Questions Generation](#6-practice-questions-generation)
7. [Audio Lesson Transcript](#7-audio-lesson-transcript)
8. [Title Suggestion](#8-title-suggestion)

---

## ⚠️ IMPORTANT: PROMPTS HAVE BEEN UPDATED!

**Last Update**: All prompts were completely rewritten for higher quality on [date]

**See Also**:
- `/IMPROVED_PROMPTS_UPDATE.md` - Detailed explanation of all changes
- `/BEFORE_AFTER_COMPARISON.md` - Visual before/after comparison

---

## 1. Text Extraction & Cleaning

### Purpose
Extract exact text from textbook images and extract CORE CONTENT ONLY (no exercises).

### Image Text Extraction (Gemini Vision)

**Temperature**: 0.1 (very low for accuracy)

```
CRITICAL INSTRUCTION: You are a text extraction tool. Your ONLY job is to transcribe the EXACT text you see in the image(s). Do NOT add, create, or generate any new content.

RULES - FOLLOW EXACTLY:
1. Extract ONLY the text that is PHYSICALLY PRESENT in the image(s)
2. Transcribe word-for-word, character-for-character
3. DO NOT add explanations, examples, or additional content
4. DO NOT create educational content
5. DO NOT write anything that isn't in the image
6. If you see a heading, transcribe it as a markdown heading (##, ###)
7. If you see lists, transcribe them as lists
8. If you see formulas/equations, transcribe them exactly as shown
9. Preserve the order and structure exactly as it appears
10. If there are multiple images, transcribe them in order

Start with: # [Unit Title]

Then transcribe the exact text from the image(s). Nothing more, nothing less.
```

### Text Cleaning & Structuring

**Temperature**: 0.3 (low for accuracy)

```
You are a professional educational content editor. Your task is to clean and structure educational content for students.

INSTRUCTIONS:
1. Remove all unnecessary metadata like:
   - Book titles (e.g., "Science and Technology, Grade 7")
   - Page numbers
   - Headers/footers that don't belong to the main content
   - Publishing information
   - Author names (unless they're part of the educational content)
   - Practice exercises or problem sets (these will be generated separately)
   - "Questions for discussion" sections
   - "Activities" or "Exercises" sections

2. Fix all spelling and grammar errors

3. Structure the content properly with:
   - Clear section headings using ## for main sections
   - Subsections using ### 
   - Proper paragraphs with good spacing
   - Bullet points where appropriate
   - Numbered lists for sequential steps

4. Keep all educational content:
   - Keep all definitions, explanations, examples
   - Keep all learning objectives
   - Keep all important terminology
   - Keep all procedural steps
   - Keep all theory and concepts

5. Format the output as clean markdown that's ready for students to read

6. DO NOT add any extra content or commentary
7. DO NOT change the meaning or educational value
8. DO NOT include exercises or practice questions
9. Just clean, fix, and structure what's already there

Here is the content to clean and structure:

[markdown content]

Now provide the cleaned and structured version in markdown format:
```

**Used in**: 
- Processing uploaded markdown files
- Cleaning text extracted from images
- Unit Text module

---

## 2. Vocabulary Extraction

### Purpose
Extract **difficult** academic vocabulary words with definitions and Nepali translations.

### Prompt

**Temperature**: 0.3 (low for focused extraction)

#### Gemini Version (JSON output)

```
You are an expert educational content analyzer. Extract DIFFICULT or ACADEMIC vocabulary words from the educational content below.

CRITICAL RULES:
1. Extract ONLY words that are ACTUALLY present in the text
2. Focus on DIFFICULT, ACADEMIC, or TECHNICAL terms (not common everyday words)
3. Prioritize subject-specific terminology
4. Extract 8-12 challenging words that students should learn
5. DO NOT include simple common words like "the", "and", "process", "method" unless they are technical terms

For EACH difficult word, provide in this EXACT format:
{
  "word": "exact word from text",
  "definition": "clear, student-friendly explanation",
  "nepali": "नेपाली अनुवाद in Devanagari script"
}

Return ONLY a valid JSON array, nothing else.

EDUCATIONAL CONTENT:
[markdown content - first 3000 characters]

JSON Array:
```

#### Ollama Version (Natural Language output)

```
You are an expert educational content analyzer. Your task is to identify DIFFICULT or ACADEMIC vocabulary words from the educational content below.

CRITICAL RULES:
1. Extract ONLY words that are ACTUALLY present in the text
2. Focus on DIFFICULT, ACADEMIC, or TECHNICAL terms (not common everyday words)
3. Prioritize subject-specific terminology
4. Extract 8-12 challenging words that students should learn
5. DO NOT include simple common words like "the", "and", "process", "method" unless they are technical terms

SELECTION CRITERIA - Choose words that are:
• Subject-specific technical terms
• Academic vocabulary (Grade 4-12 level)
• Key concepts central to understanding the topic
• Words students might not know
• Important terminology worth memorizing

For EACH difficult word you extract, provide:
1. Word: The EXACT word from the text (single word or short phrase)
2. Definition: A clear, student-friendly explanation in context
3. Nepali: Accurate Nepali translation in Devanagari script

FORMAT (strictly follow):
Word: [exact word from text]
Definition: [clear, concise definition]
Nepali: [नेपाली अनुवाद]

(Leave a blank line between entries)

EDUCATIONAL CONTENT:
[markdown content - first 3000 characters]

Now extract the DIFFICULT vocabulary words from above:
```

**Output**: 8-12 vocabulary words with definitions and Nepali translations

**Used in**: Vocabulary module

---

## 3. Summary Generation

### Purpose
Create structured summary with definitions, formulas, and key concepts.

### Prompt

**Temperature**: 0.4 (moderate for creativity)

#### Gemini Version (JSON output)

```
Create a structured summary of this educational content.

For each section, use this format:
{
  "definitions": ["term: definition", "term: definition"],
  "formulas": ["formula or rule", "formula or rule"],
  "concepts": ["main concept", "main concept"]
}

Guidelines:
- Extract 3-5 key definitions
- List 2-4 important formulas or rules (write "None" if no formulas)
- Identify 4-6 main concepts or ideas
- Keep each item clear and concise
- Focus on student understanding

Return ONLY valid JSON, nothing else.

Content:
[markdown content - first 2500 characters]

JSON Object:
```

#### Ollama Version (Natural Language output)

```
Create a structured summary of this educational content.

Organize your summary into three sections:

DEFINITIONS:
List 3-4 key terms and their definitions

FORMULAS:
List 2-3 important formulas or rules (write "None" if no formulas)

CONCEPTS:
List 4-5 main concepts or ideas

Content:
[markdown content - first 2500 characters]

Summary:
```

**Output**: Structured summary with definitions, formulas, concepts

**Used in**: Summary module

---

## 4. Exercises Generation

### Purpose
Generate practice exercises with answers and explanations.

### Prompt

**Temperature**: 0.5 (balanced)

#### Gemini Version (JSON output)

```
Generate 6 practice exercises based on this educational content.

Create a variety of question types:
- Multiple choice (4 options)
- Fill in the blank
- True/False
- Short answer

For each exercise:
{
  "id": 1,
  "type": "multiple-choice" | "fill-blank" | "true-false" | "short-answer",
  "question": "question text",
  "options": ["A", "B", "C", "D"] (for MCQ only),
  "answer": "correct answer",
  "explanation": "why this is correct"
}

Return ONLY a valid JSON array of 6 exercises.

Content:
[markdown content - first 2500 characters]

JSON Array:
```

#### Ollama Version (Natural Language output)

```
Generate 5 practice exercises based on this educational content.

Create a mix of question types:
- Multiple choice (with 4 options)
- Fill in the blank
- True/False
- Short answer

For each exercise, provide:
1. The question
2. The answer
3. A brief explanation

Content:
[markdown content - first 2500 characters]

Exercises:
```

**Output**: 5-6 practice exercises with solutions

**Used in**: Exercises module

---

## 5. Interactive Quiz Generation

### Purpose
Generate multiple-choice quiz questions for interactive learning.

### Prompt

**Temperature**: 0.6 (moderate-high for variety)

#### Gemini Version (JSON output)

```
Generate 10 multiple choice quiz questions based on this content.

For each question:
{
  "id": 1,
  "question": "question text",
  "options": ["option A", "option B", "option C", "option D"],
  "correctAnswer": 0,
  "difficulty": "easy" | "medium" | "hard"
}

Return ONLY a valid JSON array of 10 questions.

Content:
[markdown content - first 2500 characters]

JSON Array:
```

#### Ollama Version (Natural Language output)

```
Generate 8 multiple-choice quiz questions based on this educational content.

For each question:
- Write a clear question
- Provide 4 answer options (A, B, C, D)
- Mark which option is correct
- Indicate difficulty (easy, medium, or hard)

Format:
Question 1: [question text]
A) [option]
B) [option]
C) [option]
D) [option]
Correct: A
Difficulty: easy

Content:
[markdown content - first 2500 characters]

Quiz questions:
```

**Output**: 8-10 multiple-choice questions

**Used in**: Interactive Quiz module

---

## 6. Practice Questions Generation

### Purpose
Generate mix of MCQ and short-answer practice questions.

### Prompt

**Temperature**: 0.5-0.6 (balanced)

#### Gemini Version (JSON output)

```
Generate 8 practice questions (mix of MCQ and short answer) based on this content.

For each question:
{
  "id": 1,
  "type": "mcq" or "short-answer",
  "question": "question text",
  "options": ["A", "B", "C", "D"] (for MCQ only),
  "answer": "correct answer",
  "difficulty": "easy" | "medium" | "hard"
}

Return ONLY a valid JSON array of 8 questions.

Content:
[markdown content - first 2500 characters]

JSON Array:
```

#### Ollama Version (Natural Language output)

```
Generate 6 practice questions based on this educational content.

Create a mix of:
- Multiple choice questions (with 4 options labeled A-D)
- Short answer questions

For each question, provide:
- The question
- Answer options (if multiple choice)
- The correct answer
- Difficulty level (easy, medium, or hard)

Format:
Question 1 (multiple-choice, medium):
[Question text]
A) [option]
B) [option]
C) [option]
D) [option]
Answer: A

Question 2 (short-answer, easy):
[Question text]
Answer: [answer text]

Content:
[markdown content - first 2500 characters]

Practice questions:
```

**Output**: 6-8 practice questions (mixed types)

**Used in**: Practice Questions module

---

## 7. Audio Lesson Transcript

### Purpose
Generate conversational transcript for audio lessons.

### Prompt

**Temperature**: 0.7 (high for natural speech)

```
Write a 150-word audio lesson transcript about this content. Write as if speaking to a student.

Title: [Unit Title]

Content:
[markdown content - first 1500 characters]

Transcript:
```

**Output**: ~150 word conversational transcript

**Used in**: Audio Lesson module (currently using dummy content)

---

## 8. Title Suggestion

### Purpose
Suggest a concise, descriptive title for the unit based on content.

### Prompt

**Temperature**: 0.3 (low for focused suggestions)
**Max Tokens**: 30

```
Analyze this educational content and suggest a concise, descriptive title.

RULES:
1. Title should be 3-8 words maximum
2. Should describe the main topic clearly
3. Should be suitable for a student learning unit
4. Do NOT use phrases like "Introduction to" unless necessary
5. Be specific (e.g., "Photosynthesis Process" not "Biology Chapter")
6. Return ONLY the title, nothing else

Content to analyze:
[first 1000 characters of content]

Suggested Title:
```

**Output**: 3-8 word title suggestion

**Used in**: Create Unit page (optional feature)

---

## Prompt Engineering Techniques Used

### 1. **Role Assignment**
```
"You are an expert educational content analyzer..."
"You are a professional educational content editor..."
```
Establishes context and expected expertise level.

### 2. **Clear Instructions**
All prompts have numbered steps and explicit rules.

### 3. **Format Specification**
- Gemini: Always requests JSON output
- Ollama: Uses structured natural language

### 4. **Constraints**
```
"Extract ONLY words that are ACTUALLY present"
"DO NOT add any extra content"
"Return ONLY a valid JSON array"
```

### 5. **Examples**
Many prompts include format examples to guide output.

### 6. **Content Limiting**
- Vocabulary: First 3000 chars
- Summary/Exercises/Quiz: First 2500 chars
- Audio: First 1500 chars
- Title: First 1000 chars

Prevents token overload and focuses AI on most important content.

### 7. **Temperature Control**

| Task | Temperature | Reason |
|------|-------------|--------|
| Text Extraction | 0.1 | Exact accuracy needed |
| Cleaning | 0.3 | Minimal creativity |
| Vocabulary | 0.3 | Focused extraction |
| Title | 0.3 | Focused suggestion |
| Summary | 0.4 | Some interpretation |
| Exercises | 0.5 | Balanced |
| Quiz | 0.6 | Variety needed |
| Audio | 0.7 | Natural speech |

---

## Response Parsing

### Gemini (JSON)
```typescript
// Extract JSON from markdown code blocks
const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                  text.match(/\[[\s\S]*\]/);
const data = JSON.parse(jsonMatch[1] || jsonMatch[0]);
```

### Ollama (Natural Language)
Custom parsers for each module:
- `parseVocabularyFromText()` - Extracts Word/Definition/Nepali
- `parseSummaryFromText()` - Splits into sections
- `parseExercisesFromText()` - Parses question/answer pairs
- `parseQuizFromText()` - Extracts questions with options
- `parsePracticeFromText()` - Handles mixed question types

---

## Sequential Processing (Gemini)

To avoid rate limits, modules are processed **sequentially** with 3-second delays:

```typescript
for (const moduleName of moduleNames) {
  await processModuleAsync(moduleName, markdown, unitTitle, onProgress);
  
  if (currentProvider === 'gemini') {
    await delay(3000); // Wait 3 seconds before next module
  }
}
```

---

## Retry Logic (Gemini)

All Gemini API calls use exponential backoff:

```typescript
async function retryWithBackoff(fn, operation, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await withTimeout(fn(), 120000, operation);
    } catch (error) {
      if (error.message.includes('429')) {
        const delay = Math.min(
          2000 * Math.pow(2, attempt),
          30000
        );
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}
```

**Retry delays**: 2s → 4s → 8s → 16s (max 30s)

---

## Provider Differences

| Feature | Ollama | Gemini |
|---------|--------|--------|
| Output Format | Natural Language | JSON |
| Parsing | Custom parsers | JSON.parse |
| Temperature | Same as Gemini | Well-tuned |
| Retry Logic | ❌ No | ✅ Yes (exponential backoff) |
| Rate Limiting | ❌ None (local) | ✅ Yes (managed) |
| Sequential Processing | ❌ Not needed | ✅ 3s delays |
| Vision Support | ✅ Yes (llama3.2-vision, etc) | ✅ Yes (gemini-2.0-flash-exp) |
| Speed | Slower (local) | Faster (cloud) |
| Cost | Free (local) | Free (with limits) |

---

## Customization Guide

### How to Modify Prompts

1. **Vocabulary**: Edit lines 592-623 in `/lib/ollama-service.ts` or 352-373 in `/lib/gemini-service.ts`
2. **Summary**: Edit lines 784-800 in `/lib/ollama-service.ts` or similar in Gemini
3. **Exercises**: Edit lines 875-891 in `/lib/ollama-service.ts`
4. **Quiz**: Edit lines 991-1011 in `/lib/ollama-service.ts`
5. **Practice**: Edit lines 1099-1127 in `/lib/ollama-service.ts`

### Tips for Prompt Modification

1. **Keep format specification** - Especially for JSON output
2. **Test with both providers** - Ensure Ollama and Gemini work
3. **Adjust temperature** - Lower for accuracy, higher for creativity
4. **Content length** - Limit to avoid token overload
5. **Clear constraints** - Use "DO NOT" and "ONLY" for boundaries

---

## Example API Call (Ollama)

```typescript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gemma3:4b',
    prompt: '[your prompt here]',
    stream: false,
    options: {
      temperature: 0.5
    }
  })
});

const data = await response.json();
const result = data.response;
```

## Example API Call (Gemini)

```typescript
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.5
  }
});

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
```

---

## Summary

**Total Prompts**: 8 main prompts (×2 for Ollama & Gemini = 16 variations)

**Modules Generated**:
1. ✅ Vocabulary (8-12 words)
2. ✅ Summary (definitions, formulas, concepts)
3. ✅ Exercises (5-6 questions)
4. ✅ Interactive Quiz (8-10 MCQ)
5. ✅ Practice Questions (6-8 mixed)
6. ⏸️ Audio Lesson (currently dummy)
7. ✅ Text Cleaning (preprocessing)
8. ✅ Title Suggestion (optional)

**All prompts are designed to**:
- Extract accurate, relevant information
- Maintain academic quality
- Be student-friendly
- Work with both AI providers
- Handle errors gracefully
- Respect rate limits

---

**Need to customize a prompt?** Find it in:
- `/lib/ollama-service.ts` - Ollama prompts
- `/lib/gemini-service.ts` - Gemini prompts
- `/lib/ai-provider.ts` - Provider routing logic
