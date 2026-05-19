# 💬 Unit Chat Feature - AI Study Assistant

## ✅ CONFIRMED: Works with Both Ollama & Gemini

## Overview

A collapsible chat interface has been added to the Learning Modules page, allowing students to ask questions and get AI-powered answers based on their unit content.

**The chat automatically uses whichever AI provider you have configured** - the same one used for all other module processing (Ollama or Gemini).

## Features

### 🎯 Context-Aware Responses
- AI answers questions based on the unit's markdown content
- If a question is outside the unit scope, AI provides general knowledge answers
- References specific parts of the unit when relevant

### 🎨 Clean Interface
- **Floating Button**: "Ask AI" button in the bottom-right corner
- **Collapsible Sidebar**: 384px width panel that slides in from the right
- **Chat History**: Scrollable message history with timestamps
- **Real-time Responses**: Loading indicator while AI processes questions

### 💡 User Experience
- **Welcome Message**: Greeting when chat opens for the first time
- **Keyboard Shortcuts**: 
  - `Enter` to send message
  - `Shift + Enter` for new line
- **Auto-scroll**: Automatically scrolls to newest messages
- **Persistent**: Chat stays open while browsing modules

## Technical Implementation

### Components

#### `/components/unit-chat.tsx`
- Main chat component
- Manages message state and UI
- Handles API communication
- Auto-scrolling and keyboard navigation

### Backend Endpoint

#### `/supabase/functions/server/index.tsx`
- **Route**: `POST /make-server-eac874f3/chat`
- **Functionality**: 
  - Receives question and unit context
  - Constructs prompt with instructions
  - Calls Ollama or Gemini based on provider
  - Returns AI-generated answer

### Integration

#### `/components/learning-modules.tsx`
- Chat component integrated on Learning Modules page
- Passes unit title and markdown content
- Only shows when markdown content is available

## How It Works

1. **Student opens a unit** → Chat button appears in bottom-right
2. **Student clicks "Ask AI"** → Chat sidebar slides in from right
3. **AI greets the student** → Welcome message with unit context
4. **Student asks a question** → Message sent to backend
5. **Backend processes** → Combines question + unit content + instructions
6. **AI generates answer** → Based on context or general knowledge
7. **Answer displayed** → Formatted message in chat history

## Example Prompts Used

The AI is instructed to:
1. Answer based on unit content when question is related
2. Use general knowledge for unrelated questions (with disclaimer)
3. Keep answers clear and student-appropriate
4. Reference specific parts of the unit when applicable

## Configuration

✅ **Automatically uses your configured AI provider!**

The chat reads from `/lib/config.ts`:
- **Provider**: `AI_PROVIDER` (either `'ollama'` or `'gemini'`)
- **Ollama Model**: `OLLAMA_CONFIG.VISION_MODEL` (currently `gemma3:4b`)
- **Gemini Model**: `gemini-2.0-flash` (fast, free tier)
- **Temperature**: 0.7 for natural conversation

**No additional setup needed** - if your unit generation works, chat will work too!

### Provider-Specific Details

**With Ollama:**
- Uses local model on your machine
- Same model as unit processing (`gemma3:4b`)
- No API key needed
- Fully private
- Response time: ~5-15 seconds

**With Gemini:**
- Uses Google AI Studio cloud API
- Fast cloud processing (~1-3 seconds)
- Requires API key (from localStorage or config)
- FREE tier (60 req/min)
- API key passed securely from frontend to server

## Design

### Colors
- **Purple theme**: Matches AI-generated content theme
- **User messages**: Purple background (#7C3AED)
- **AI messages**: Gray background (#F3F4F6)
- **Header**: Gradient from purple to blue

### Layout
- **Fixed position**: Right side of screen
- **Full height**: Matches viewport
- **Width**: 384px (w-96)
- **Z-index**: 50 (above content)

## Future Enhancements

Potential improvements:
- [ ] Chat history persistence across sessions
- [ ] Ability to copy AI responses
- [ ] Support for follow-up questions
- [ ] Code syntax highlighting in responses
- [ ] Image/diagram support in answers
- [ ] Export chat history
- [ ] Multiple chat sessions per unit

## Testing

To test the chat feature:

1. **Create a unit** with markdown content
2. **Open Learning Modules** for that unit
3. **Click "Ask AI"** button in bottom-right
4. **Ask a question** related to the unit (e.g., "What are the main concepts?")
5. **Ask an unrelated question** (e.g., "What is AI?")
6. **Verify responses** are appropriate and contextual

## Usage Tips

For best results:
- ✅ Ask specific questions about unit content
- ✅ Request explanations of concepts
- ✅ Ask for examples or clarifications
- ✅ Request summaries of sections
- ⚠️ AI may not answer questions requiring external resources
- ⚠️ Responses are generated based on provided context

---

**Ready to use!** No additional configuration needed. Works with both Ollama and Gemini providers. 🚀
