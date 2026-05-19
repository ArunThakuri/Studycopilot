# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
```

No test or lint commands are configured.

## Architecture Overview

**Stack**: React 18.3 + TypeScript + Vite 6.3 + Tailwind CSS v4 + Supabase

### Routing

There is **no client-side router** for the main app. Navigation is handled by a `currentView` state variable in `src/app/App.tsx` (line 33, type `View` with 22 string literal values). The App component uses a large `if/else if` chain to render one screen component at a time. `react-router` is in dependencies but only used sparingly, not for primary navigation.

### URL Hash Parameters

The app checks `window.location.hash` on load for special modes:

| Param | Purpose |
|-------|---------|
| `#view=<name>` | Screenshot mode — renders a specific view directly |
| `#demo=1` | Auto-login with demo data (works with `view` param) |
| `#admin=1` | Auto-login as admin user |
| `#theme=light\|dark` | Force theme override (added in theme-provider.tsx) |

These are parsed via `new URLSearchParams(hash.replace('#', ''))` in App.tsx:215 and theme-provider.tsx:20.

### Core Data Models

- **`Subject`** (`App.tsx:35`): id, title, icon, color, grade, units, progress tracking
- **`Unit`** (`units-dashboard.tsx`): id, title, status, source content, AI-generated modules
- **`User`** (`App.tsx:50`): name, email, grade, plan, isAdmin, isDemo

### Directory Structure

```
src/
  main.tsx                    # React entry point
  app/
    App.tsx                   # Root component (~1500 lines), state-based routing
    components/
      ui/                     # shadcn/ui primitives (button, card, dialog, etc.)
      landing-page.tsx        # Public landing page
      dashboard.tsx           # Main dashboard after login
      create-unit.tsx         # Unit creation with AI processing pipeline
      learning-modules.tsx    # Module hub (9 learning modules per unit)
      theme-provider.tsx      # Light/dark theme context
      [other view components] # One file per screen
    lib/
      config.ts               # AI provider constants (OpenRouter models, keys)
      ai-provider.ts          # AI abstraction layer (provider switching, availability)
      ai-service.ts           # AI calls via Supabase serverless function → OpenRouter
      auth-service.ts         # Supabase auth (login, signup, OAuth, session mgmt)
      data-service.ts         # CRUD for subjects/units via Supabase backend
      demo-user-data.ts       # Demo mode data generator
    imports/                  # Generated Figma imports (SVGs, screen layouts)
    utils/
      supabase/info.ts        # Supabase project credentials
    supabase/functions/       # Hono-based serverless backend
  styles/
    globals.css               # Brand theme variables (green/blue palette), dark mode
    index.css                 # Tailwind v4 CSS-first config entry
```

### AI Processing Flow

1. User creates a unit by uploading images, Markdown files, or raw text
2. Content is sent to Supabase serverless function → proxied to **OpenRouter API**
3. The AI model (default: `google/gemini-2.5-flash` for vision, `google/gemini-3.1-flash-lite-preview` for text) extracts text or generates learning modules
4. Generated modules: Unit Text, Audio Lesson, Vocabulary, Summary, Exercises, Interactive Quiz, Practice Questions, Model Question
5. If AI is unavailable, falls back to **demo mode** with pre-generated content

### Theme System

- `theme-provider.tsx` wraps the app, provides `useTheme()` hook (`{ theme, toggleTheme, setTheme }`)
- Dark mode uses the `dark` class on `<html>`, Tailwind's `dark:` variant via `@custom-variant dark (&:is(.dark *))` in `globals.css`
- Persisted to `localStorage` key `'sc-theme'`
- Can be forced via URL hash `#theme=light` or `#theme=dark`

### Module Resolution

- `@` alias → `src/app/` (configured in `vite.config.ts`)
- `figma:asset/` prefix → `src/assets/` (custom Vite plugin)

### Key Dependencies

- **motion** (Framer Motion) — used extensively in landing page and UI components
- **Radix UI** — accessible primitives (dialog, tabs, select, accordion, etc.)
- **Material UI** (`@mui/material`, `@mui/icons-material`) — some components
- **Lucide React** — icon library
- **Supabase** — auth and data backend
- **Sonner** — toast notifications (`toast.info()`, `toast.error()`, etc.)
