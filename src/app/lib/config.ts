// ============================================
// StudyCopilot Configuration
// ============================================

export type AIProvider = 'ollama';

export const AI_PROVIDER: AIProvider = 'ollama';

// Ollama Cloud / Direct Configuration
export const OLLAMA_CONFIG = {
  SERVER_URL: (import.meta.env.VITE_OLLAMA_SERVER_URL || 'http://localhost:11434').replace(/\/$/, ''),
  API_KEY: import.meta.env.VITE_OLLAMA_API_KEY || '',
  USE_DIRECT: import.meta.env.VITE_USE_DIRECT_OLLAMA !== 'false',
  MODEL: 'kimi-k2.6:cloud',
  VISION_MODEL: 'kimi-k2.6:cloud',
};

export const AI_CONFIG = {
  PROVIDER: AI_PROVIDER,
  MODEL: OLLAMA_CONFIG.MODEL,
  VISION_MODEL: OLLAMA_CONFIG.VISION_MODEL,
};
