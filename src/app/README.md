# 🎓 StudyCopilot - AI-Powered Learning Platform

A modern learning management system designed for students in grades 4-12. Features **real AI processing** using Ollama to extract text from textbook images and generate comprehensive learning materials.

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Exact Text Extraction** - Upload textbook images and Ollama extracts the EXACT text (like OCR)
- **Direct Markdown Upload** - Already have content? Upload .md files to skip AI processing
- **No Hallucinations** - AI extracts only what's in the image, no additions
- **Structured Markdown** - Preserves the original structure and formatting
- **Markdown Editor** - Edit and refine extracted content with live preview
- **Local Processing** - All AI runs on your machine (no cloud APIs needed)

### 📚 Learning Modules
- **📄 Unit Text** - Clean, formatted educational content
- **🎧 Audio Lessons** - Conversational transcripts for listening
- **📚 Vocabulary** - Important terms with Nepali translations
- **📝 Summaries** - Key concepts and formulas
- **✏️ Exercises** - Solved practice problems
- **🎯 Interactive Quizzes** - 10 questions with instant feedback
- **💡 Practice Questions** - Mixed difficulty levels

### 📊 Organization & Tracking
- **Subject Management** - Organize units by grade and subject
- **Progress Tracking** - Monitor learning across subjects
- **Recent Activity** - Quick access to recently viewed content

### 🎨 User Experience
- **Modern UI** - Colorful gradient cards and smooth animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light themes** - Easy on the eyes

## 🚀 Getting Started

### Option 1: AI Mode (Recommended)

1. **Install Ollama**
   - Download from https://ollama.ai
   - Or: `curl -fsSL https://ollama.com/install.sh | sh` (Linux/Mac)

2. **Pull the Vision Model**
   ```bash
   # Default model (configured in the app)
   ollama pull gemma3:4b
   
   # Or use alternatives
   ollama pull llava          # smaller, faster
   ollama pull gemma3:12b     # larger, more accurate
   ```

3. **Enable CORS and Start Ollama**
   
   **Windows (PowerShell or CMD):**
   ```cmd
   set OLLAMA_ORIGINS=*
   ollama serve
   ```
   
   To set permanently:
   - Search "Environment Variables" in Windows
   - Add System Variable: `OLLAMA_ORIGINS` = `*`
   - Restart Command Prompt and run `ollama serve`
   
   **Mac/Linux:**
   ```bash
   OLLAMA_ORIGINS=* ollama serve
   ```
   
   Or add to `~/.bashrc` or `~/.zshrc`:
   ```bash
   export OLLAMA_ORIGINS=*
   ```

4. **Verify Setup**
   - Open http://localhost:11434 in browser
   - Should see "Ollama is running"
   - StudyCopilot will show "🤖 Ollama Ready" green banner

5. **Use the App**
   - Create an account
   - Add a subject (e.g., "Science - Grade 10")
   - Create a unit and upload textbook images
   - AI will extract and structure the content!
   - Edit the generated markdown in "Source Content" module

### Option 2: Demo Mode (Fallback)

If Ollama is not running, the app automatically uses demo data:
- Pre-populated example content
- Instant generation (no processing)
- Perfect for testing the UI
- Works without any setup

Try titles like "Introduction to Biology", "Algebra Basics", etc.

## 🔧 Troubleshooting

### "Ollama not detected" even though it's running

**Problem:** Browser blocks requests due to CORS policy

**Solution:** You must set the `OLLAMA_ORIGINS` environment variable before starting Ollama:

**Windows:**
```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

**Mac/Linux:**
```bash
OLLAMA_ORIGINS=* ollama serve
```

**Verify it works:**
1. Open http://localhost:11434 in browser
2. Should see "Ollama is running" text
3. Refresh StudyCopilot - should show green "🤖 Ollama Ready" banner

### Model not found

If you see "Model gemma3:4b not found":
```bash
ollama pull gemma3:4b
```

### Still not working?

1. Stop Ollama completely
2. Set environment variable
3. Start Ollama again: `ollama serve`
4. Refresh the web app

## 📂 Project Structure

```
/components        - React components
  /ui             - Shadcn UI components
  create-unit.tsx - Unit creation with AI processing
  markdown-editor.tsx - Edit generated markdown
  dashboard.tsx   - Main dashboard
  [other components...]
  
/lib              - Services and utilities
  ollama-service.ts  - Ollama API integration
  ai-provider.ts     - AI provider with fallback
  demo-data.ts       - Example data generator
  config.ts          - App configuration
  
/styles           - Global styles
```

## 🛠️ Built With

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Lucide Icons** - Icon system
- **Ollama** - Local AI processing
- **Gemma 3 4B** - Vision language model

## 📝 How It Works

1. **Upload Images** - Take photos of textbook pages
2. **AI Processing** - Ollama's gemma3:4b vision model reads the images
3. **Extract & Structure** - AI pulls out all text and organizes it into markdown
4. **Edit & Refine** - Use the markdown editor to make adjustments
5. **Generate Modules** - System creates vocabulary, quizzes, exercises, etc.
6. **Learn!** - Access all learning materials in one place

## 🎨 Design Features

- Gradient color schemes for each subject
- Smooth animations and transitions
- Card-based layouts for easy scanning
- Progress indicators and stats
- Interactive components with feedback
- Fully responsive design

## 📧 About

StudyCopilot helps students learn more effectively by converting textbook content into comprehensive, organized learning materials with AI assistance. All processing happens locally on your machine for privacy and speed.

---

**AI-Powered Education** - Transform textbook images into interactive learning experiences.
