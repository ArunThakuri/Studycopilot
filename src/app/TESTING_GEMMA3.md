# Testing with Gemma 3 12B

## Current Configuration

The app is now configured to use `gemma3:12b` as specified in `/lib/config.ts`:

```typescript
VISION_MODEL: 'gemma3:12b'
```

## What to Expect

Since you mentioned that `gemma3:12b` supports image processing, the app should now:

1. ✅ Connect to Ollama successfully
2. ✅ Detect the `gemma3:12b` model
3. ✅ Process uploaded textbook images
4. ✅ Extract real text from the images
5. ✅ Generate structured markdown content

## How to Test

### Step 1: Make Sure Ollama is Running

```bash
# In Command Prompt/Terminal
set OLLAMA_ORIGINS=*
ollama serve
```

### Step 2: Verify Model is Installed

```bash
ollama list
```

You should see `gemma3:12b` in the list.

### Step 3: Test in the App

1. Open the app in your browser
2. Check the browser console (F12) - you should see:
   ```
   🤖 StudyCopilot Ollama Configuration:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📍 Base URL: http://localhost:11434
   🎯 Vision Model: gemma3:12b
   ```

3. Create a new unit
4. Upload a textbook image (JPG or PNG)
5. Click "Create Unit"

### Step 4: Check the Console Output

Watch for these messages in the console:

**Good Signs:**
```
✅ Ollama is available and CORS is enabled!
🤖 Using Ollama to process images...
Converting images to base64...
Processing images with AI...
📝 Ollama Response Length: [large number like 2500+]
📝 First 500 chars of response: # [Your unit title]
[Real extracted content from image]
```

**Bad Signs:**
```
❌ MODEL ERROR: Text-only model detected!
```
If you see this, it means `gemma3:12b` doesn't actually support vision. You'll need to use a different model.

### Step 5: Download and Check the Markdown

1. After processing completes, click "Download .md File"
2. Open the downloaded file in a text editor
3. Check if it contains:
   - ✅ **Real text from your image** = SUCCESS!
   - ❌ **Generic placeholder text** = Model doesn't support vision

## If It Works

Great! You're all set. The markdown should contain the actual text from your textbook images.

## If It Doesn't Work

This means `gemma3:12b` doesn't actually have vision capabilities. You'll need to:

1. **Pull a proper vision model:**
   ```bash
   ollama pull llava
   ```

2. **Update the config** in `/lib/config.ts`:
   ```typescript
   VISION_MODEL: 'llava:latest'
   ```

3. **Restart Ollama and refresh the browser**

## Alternative Models

If `gemma3:12b` doesn't work, try these proven vision models:

| Model | Size | Best For |
|-------|------|----------|
| llava | 4.7GB | Good balance |
| llama3.2-vision:11b | 7.9GB | Best quality |
| minicpm-v | 2.3GB | Fastest |

## Technical Note

Some Gemma models DO support multimodal (vision) capabilities:
- ✅ Gemma 2 9B (multimodal version) - if available
- ✅ Gemma 3 12B - if it's the vision-enabled variant

But many Gemma models are text-only:
- ❌ Gemma 2B, 7B (standard versions)

The best way to know for sure is to test it! The app will detect and warn you if the model can't process images.

## Quick Test Command

Test the model directly with Ollama:

```bash
ollama run gemma3:12b "What text do you see in this image?" < textbook_page.jpg
```

If it describes the image, it works! If it says "I cannot process images", you need a different model.

---

**Current Status:** App is configured for `gemma3:12b`. Test it now and see if it extracts real text!
