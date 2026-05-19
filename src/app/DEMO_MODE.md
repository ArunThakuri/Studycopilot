# 🎭 StudyCopilot AI Mode & Demo Mode

## AI Mode with Ollama

StudyCopilot now supports **real AI processing** using Ollama running locally! This allows the system to extract text from textbook images and generate structured markdown content.

### Setting Up Ollama

To enable AI mode, follow these steps:

1. **Install Ollama** (if not already installed)
   - Visit https://ollama.ai and download for your OS
   - Or use: `curl -fsSL https://ollama.com/install.sh | sh` (Linux/Mac)

2. **Pull the Vision Model**
   ```bash
   ollama pull gemma3:4b
   ```

3. **Enable CORS and Start Ollama**
   
   **Windows (PowerShell or CMD):**
   ```cmd
   set OLLAMA_ORIGINS=* 
   ollama serve
   ```
   Or set it permanently in System Environment Variables:
   - Search for "Environment Variables" in Windows
   - Add a new System Variable: `OLLAMA_ORIGINS` with value `*`
   - Restart Command Prompt and run `ollama serve`

   **Mac/Linux:**
   ```bash
   OLLAMA_ORIGINS=* ollama serve
   ```
   Or add to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   export OLLAMA_ORIGINS=*
   ```

4. **Verify Setup**
   - Open http://localhost:11434 in your browser
   - You should see "Ollama is running"
   - The StudyCopilot app will show "🤖 Ollama Ready" banner

### Using AI Mode

Once Ollama is running:
- Upload textbook page images when creating a unit
- Ollama will extract all text and structure it into markdown
- Edit the generated markdown in the "Source Content" module
- The markdown serves as the foundation for all other learning materials

---

## Demo Mode (Fallback)

This version of StudyCopilot also includes **pre-populated example data** as a fallback when Ollama is not available. It's designed to showcase the complete user interface and all features without requiring API keys, external services, or complex setup.

## How It Works

When you create a new unit:

1. **Enter a Unit Title** - Give your unit any name (e.g., "Introduction to Physics")
2. **Upload Files (Optional)** - You can upload images or markdown files for realism
3. **Click "Process & Create Unit"** - Content generates instantly
4. **Explore!** - All learning modules are populated with example content

## What Gets Generated

Every unit includes realistic example content:

### 📄 Unit Text
- Well-formatted educational content
- Structured with headers and paragraphs
- Contextual to your unit title

### 🎧 Audio Lesson
- Conversational transcript
- Suitable for text-to-speech

### 📚 Vocabulary
- 8 important words
- Nepali translations
- Clear definitions

### 📝 Summary
- Key definitions
- Important formulas/rules
- Main concepts

### ✏️ Exercises
- 4 varied exercise types:
  - Multiple choice
  - Fill in the blank
  - True/false
  - Short answer
- Includes answers and explanations

### 🎯 Interactive Quiz
- 10 questions per unit
- 4 answer choices each
- Difficulty levels (easy/medium/hard)
- Correct answers marked

### 💡 Practice Questions
- 4 practice problems
- Different difficulty levels
- Sample answers provided

## Contextual Content

The demo system generates content that matches your unit title:

- **"Introduction to Biology"** → Science-focused content
- **"Algebra Basics"** → Math-oriented content
- **"English Grammar"** → Language-focused content
- **Generic titles** → General educational content

## Perfect For

✅ **UI/UX Demonstrations** - Show off the complete interface  
✅ **Presentations** - No setup required, works immediately  
✅ **Design Reviews** - All features accessible instantly  
✅ **Prototype Testing** - Test user flows without backend  
✅ **Client Demos** - Professional-looking example content  

## Limitations

⚠️ **No Real AI** - Content is template-based, not AI-generated  
⚠️ **No Persistence** - Data resets on page refresh  
⚠️ **No Image OCR** - Uploaded images are for show only  
⚠️ **Fixed Templates** - Content follows predefined patterns  

## Try These Example Titles

Get the best demo experience by using descriptive titles:

**Science:**
- "Introduction to Scientific Method"
- "Properties of Matter"
- "The Water Cycle"

**Math:**
- "Introduction to Algebra"
- "Fractions and Decimals"
- "Geometry Basics"

**English:**
- "Parts of Speech"
- "Reading Comprehension Strategies"
- "Creative Writing Techniques"

**Social Studies:**
- "Ancient Civilizations"
- "Geography of Nepal"
- "Government and Citizenship"

## Benefits of Demo Mode

1. **Zero Setup** - No API keys, no configuration
2. **Instant Results** - Content appears in ~1.5 seconds
3. **Always Works** - No network dependencies
4. **Predictable** - Same quality every time
5. **Showcase Ready** - Professional example content

## Converting to Production

To convert this to a production version with real AI:

1. Add actual AI integration (Gemini, OpenAI, etc.)
2. Implement backend storage (Supabase, Firebase, etc.)
3. Add user authentication
4. Enable real image processing
5. Implement data persistence

---

**Enjoy exploring StudyCopilot! 🚀**
