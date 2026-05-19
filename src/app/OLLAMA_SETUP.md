# Ollama Setup Guide for StudyCopilot

## Prerequisites
1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)
2. **Enable CORS**: Required for web browser access

## Quick Start

### Step 1: Enable CORS (Windows)

Open Command Prompt and run:
```bash
# Set CORS environment variable
set OLLAMA_ORIGINS=*

# Start Ollama server
ollama serve
```

**For permanent CORS setup:**
1. Open Windows Settings → System → About → Advanced System Settings
2. Click "Environment Variables"
3. Under "System Variables", click "New"
4. Variable name: `OLLAMA_ORIGINS`
5. Variable value: `*`
6. Click OK and restart your computer

### Step 2: Pull a Vision Model

**IMPORTANT:** You need a **vision-capable** model to process images!

#### Recommended Models:

**Option 1: Gemma 3 12B (If You Already Have It)**
```bash
ollama pull gemma3:12b
```
- Size: ~7GB
- Good quality if it has vision support
- Fast on good hardware

**Option 2: Llama 3.2 Vision (Best Quality)**
```bash
ollama pull llama3.2-vision:11b
```
- Size: ~7.9GB
- Best quality for text extraction
- Slower but more accurate

**Option 3: Llava (Balanced)**
```bash
ollama pull llava
```
- Size: ~4.7GB  
- Good balance of speed and quality
- Recommended for most users

**Option 4: MiniCPM-V (Fastest)**
```bash
ollama pull minicpm-v
```
- Size: ~2.3GB
- Fastest processing
- Good for quick testing

### Step 3: Configure StudyCopilot

1. Open `/lib/config.ts`
2. Update the `VISION_MODEL` to match your pulled model:

```typescript
export const OLLAMA_CONFIG = {
  BASE_URL: 'http://localhost:11434',
  VISION_MODEL: 'llama3.2-vision:11b', // Change this to your model
};
```

### Step 4: Test It!

1. Start Ollama: `ollama serve`
2. Open StudyCopilot in your browser
3. Create a new unit
4. Upload textbook images
5. Watch the AI extract text!

## Troubleshooting

### "Ollama is not running" Error
- Make sure `ollama serve` is running in Command Prompt
- Check if you can access http://localhost:11434 in your browser

### "CORS Error" in Console
- You need to set the `OLLAMA_ORIGINS` environment variable
- See Step 1 above

### "Model not found" Error
- Run `ollama list` to see installed models
- Pull the model with `ollama pull <model-name>`

### "Getting Dummy Text Instead of Real Content"
- **You're using a text-only model!** (like gemma, mistral, llama without "-vision")
- Pull a vision model (see Step 2)
- Update `VISION_MODEL` in `/lib/config.ts`

### Slow Processing
- Try a smaller model like `llava` or `minicpm-v`
- Vision models need good hardware (8GB+ RAM, GPU recommended)

## Verify Your Setup

Run these commands to check:

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# List installed models
ollama list

# Test a vision model (replace with your model)
ollama run llama3.2-vision:11b "describe this image" < test.jpg
```

## Model Comparison

| Model | Size | Speed | Quality | Recommended For |
|-------|------|-------|---------|----------------|
| gemma3:12b | 7GB | ⭐⭐⭐ | ⭐⭐⭐⭐ | If already installed |
| llama3.2-vision:11b | 7.9GB | ⭐⭐ | ⭐⭐⭐⭐⭐ | Best quality |
| llava:latest | 4.7GB | ⭐⭐⭐ | ⭐⭐⭐⭐ | Balanced |
| llava:13b | 7.3GB | ⭐⭐ | ⭐⭐⭐⭐⭐ | High quality |
| minicpm-v:latest | 2.3GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Fast testing |
| bakllava:latest | 4.7GB | ⭐⭐⭐ | ⭐⭐⭐⭐ | Alternative |

## Important Notes

⚠️ **Text-only models that won't work**:
- ❌ gemma (smaller versions without vision)
- ❌ gemma2:2b, gemma2:9b (text-only)
- ❌ mistral
- ❌ llama3 (without "-vision")
- ❌ codellama
- ❌ phi

✅ **Vision models that work** for image processing:
- ✅ gemma3:12b (if it has vision support)
- ✅ llama3.2-vision
- ✅ llava
- ✅ minicpm-v
- ✅ bakllava

## Next Steps

Once Ollama is set up:
1. Upload textbook images
2. AI will extract and structure the content
3. Download the generated markdown file
4. Edit in the markdown editor
5. All other learning materials auto-generate from the markdown!

Happy learning! 🚀
