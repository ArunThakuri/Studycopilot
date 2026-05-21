// ============================================
// AI Service - Ollama (Direct or via Supabase Edge Function)
// ============================================

import { projectId, publicAnonKey } from '../utils/supabase/info';
import { OLLAMA_CONFIG } from './config';

const USE_DIRECT = OLLAMA_CONFIG.USE_DIRECT;
const DIRECT_URL = OLLAMA_CONFIG.SERVER_URL;
const DIRECT_API_KEY = OLLAMA_CONFIG.API_KEY;

const EDGE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-eac874f3`;

let AI_MODEL = OLLAMA_CONFIG.MODEL;
const VISION_MODEL = OLLAMA_CONFIG.VISION_MODEL;

const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY = 2000;

function isLocalhost(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '::1';
  } catch {
    return false;
  }
}

// Direct browser calls only work for local Ollama. Remote servers (including ollama.com) block CORS.
const DIRECT_VIABLE = USE_DIRECT && isLocalhost(DIRECT_URL);

if (typeof window !== 'undefined') {
  const savedModel = localStorage.getItem('ai_model');
  if (savedModel) {
    AI_MODEL = savedModel;
    console.log('Loaded saved AI model:', AI_MODEL);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run async tasks with limited concurrency, preserving order
async function runWithConcurrency<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: (R | null)[] = new Array(items.length).fill(null);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await processor(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results as R[];
}

function getDirectHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (DIRECT_API_KEY) {
    headers['Authorization'] = `Bearer ${DIRECT_API_KEY}`;
  }
  return headers;
}

function getEdgeHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  };
  if (DIRECT_API_KEY) {
    headers['X-Ollama-Api-Key'] = DIRECT_API_KEY;
  }
  return headers;
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  operation: string = 'API call',
  maxRetries: number = MAX_RETRIES,
  signal?: AbortSignal
): Promise<T> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) console.log(`Retry ${attempt}/${maxRetries} for ${operation}`);
      return await fn();
    } catch (error: any) {
      lastError = error;
      if (error.name === 'AbortError' || signal?.aborted) throw error;
      console.error(`${operation} - Attempt ${attempt + 1} failed:`, error.message);
      if (attempt === maxRetries) throw error;
      const delayMs = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
      console.warn(`${operation} failed. Retrying in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }
  throw lastError || new Error(`${operation} failed`);
}

function extractJSON(text: string): any {
  const trimmed = text.trim();
  try {
    // 1. Markdown code blocks
    const mdMatch = trimmed.match(/```json\n([\s\S]*?)\n```/) ||
                    trimmed.match(/```\n([\s\S]*?)\n```/);
    if (mdMatch) return JSON.parse(mdMatch[1]);

    // 2. Try the whole string first
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return JSON.parse(trimmed);
    }

    // 3. Extract first JSON object or array from mixed text
    const objMatch = trimmed.match(/\{[\s\S]*?\}/);
    if (objMatch) return JSON.parse(objMatch[0]);
    const arrMatch = trimmed.match(/\[[\s\S]*?\]/);
    if (arrMatch) return JSON.parse(arrMatch[0]);

    return JSON.parse(trimmed);
  } catch (e) {
    console.error("Failed to extract JSON from:", trimmed.substring(0, 500));
    return null;
  }
}

// ============================================
// Direct Ollama API Calls (local only)
// ============================================

async function directGenerate(
  prompt: string,
  options: {
    systemPrompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    images?: string[];
    signal?: AbortSignal;
  } = {}
): Promise<string> {
  const body: any = {
    model: options.model || AI_MODEL,
    prompt,
    stream: false,
    think: false,
    options: {
      temperature: options.temperature ?? 0.7,
      num_predict: options.maxTokens || 4096,
    },
  };

  if (options.systemPrompt) {
    body.system = options.systemPrompt;
  }
  if (options.images && options.images.length > 0) {
    body.images = options.images;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout for direct Ollama
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const response = await fetch(`${DIRECT_URL}/api/generate`, {
      method: 'POST',
      headers: getDirectHeaders(),
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => `Ollama error ${response.status}`);
      throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.response;

    if (!content) {
      console.error('[OLLAMA DIRECT] Empty response:', JSON.stringify(data));
      throw new Error('Ollama returned an empty response');
    }

    return content;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function directChat(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
  } = {}
): Promise<string> {
  const body: any = {
    model: options.model || AI_MODEL,
    messages,
    stream: false,
    think: false,
    options: {
      temperature: options.temperature ?? 0.7,
      num_predict: options.maxTokens || 4096,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const response = await fetch(`${DIRECT_URL}/api/chat`, {
      method: 'POST',
      headers: getDirectHeaders(),
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => `Ollama chat error ${response.status}`);
      throw new Error(`Ollama chat error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.message?.content;

    if (!content) {
      console.error('[OLLAMA DIRECT CHAT] Empty response:', JSON.stringify(data));
      throw new Error('Ollama returned an empty response');
    }

    return content;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ============================================
// Edge Function API Calls (proxy for remote / cloud)
// ============================================

async function serverGenerate(
  prompt: string,
  options: {
    systemPrompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    images?: string[];
    signal?: AbortSignal;
  } = {}
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 150000); // 150s timeout for Edge Function
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const response = await fetch(`${EDGE_URL}/ai/generate`, {
      method: 'POST',
      headers: getEdgeHeaders(),
      body: JSON.stringify({
        prompt,
        systemPrompt: options.systemPrompt,
        model: options.model || AI_MODEL,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        images: options.images,
      }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `Server error ${response.status}` }));
      throw new Error(errorData.error || `AI request failed (${response.status})`);
    }

    const data = await response.json();
    return data.result;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function serverChat(
  question: string,
  context: string,
  unitTitle: string,
  conversationHistory?: Array<{ role: string; content: string }>,
  signal?: AbortSignal
): Promise<string> {
  const response = await fetch(`${EDGE_URL}/ai/chat`, {
    method: 'POST',
    headers: getEdgeHeaders(),
    body: JSON.stringify({ question, context, unitTitle, model: AI_MODEL, conversationHistory }),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: `Server error ${response.status}` }));
    throw new Error(errorData.error || `Chat request failed (${response.status})`);
  }

  return (await response.json()).answer;
}

// ============================================
// Unified wrappers — auto-route based on server type
// ============================================

async function unifiedGenerate(
  prompt: string,
  options: {
    systemPrompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    images?: string[];
    signal?: AbortSignal;
  } = {}
): Promise<string> {
  if (DIRECT_VIABLE) {
    try {
      return await directGenerate(prompt, options);
    } catch (error: any) {
      if (error.name === 'AbortError') throw error;
      console.warn('[AI] Direct Ollama failed. Falling back to Supabase Edge Function...');
      return await serverGenerate(prompt, options);
    }
  }
  return await serverGenerate(prompt, options);
}

async function unifiedChat(
  question: string,
  context: string,
  unitTitle: string,
  conversationHistory?: Array<{ role: string; content: string }>,
  signal?: AbortSignal
): Promise<string> {
  if (DIRECT_VIABLE) {
    const systemPrompt = `You are a helpful AI study assistant. You are helping a student understand content from their textbook unit titled "${unitTitle}".

UNIT CONTENT:
${context}

Instructions:
1. If the question is related to the unit content above, answer it based on that content. Be specific and reference the relevant parts of the unit.
2. If the question is not related to the unit content, you may answer using your general knowledge, but mention that this is outside the scope of the current unit.
3. Keep your answer clear, concise, and helpful for a student.
4. Use simple language appropriate for the student's level.
5. If the unit content is in Nepali or another language, respond in that same language.`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: 'user', content: question });

    try {
      return await directChat(messages, { model: AI_MODEL, temperature: 0.7, maxTokens: 1500, signal });
    } catch (error: any) {
      if (error.name === 'AbortError') throw error;
      console.warn('[AI] Direct Ollama chat failed. Falling back to Supabase Edge Function...');
      return await serverChat(question, context, unitTitle, conversationHistory, signal);
    }
  }
  return await serverChat(question, context, unitTitle, conversationHistory, signal);
}

// ============================================
// Model Management
// ============================================

export function setAIModel(model: string) {
  AI_MODEL = model;
  if (typeof window !== 'undefined') localStorage.setItem('ai_model', model);
  console.log('AI model set to:', model);
}

export function getAIModel(): string { return AI_MODEL; }

export function isAIConfigured(): boolean { return true; }

export function getAPIKeyStatus() {
  return { hasKey: true, model: AI_MODEL, provider: 'ollama' as const };
}

// ============================================
// Status & Model Discovery
// ============================================

export async function getAIStatus(): Promise<{ available: boolean; message: string }> {
  // Direct check only for local Ollama
  if (DIRECT_VIABLE) {
    try {
      const response = await fetch(`${DIRECT_URL}/api/generate`, {
        method: 'POST',
        headers: getDirectHeaders(),
        body: JSON.stringify({
          model: AI_MODEL,
          prompt: 'Say "OK" and nothing else.',
          stream: false,
          options: { temperature: 0, num_predict: 10 },
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        return { available: false, message: `Ollama server error (${response.status}): ${text}` };
      }

      const data = await response.json();
      return {
        available: true,
        message: `Direct Ollama connected (${DIRECT_URL}) — model: ${AI_MODEL}`,
      };
    } catch (error: any) {
      console.error('[AI STATUS DIRECT] Error:', error);
      return {
        available: false,
        message: `Direct connection failed: ${error.message || 'Network error'} — Start Ollama with OLLAMA_ORIGINS=*`,
      };
    }
  }

  // Edge Function proxy (used for remote / cloud Ollama)
  try {
    const response = await fetch(`${EDGE_URL}/ai/status`, {
      headers: getEdgeHeaders(),
    });

    if (!response.ok) return { available: false, message: 'Edge Function unreachable' };

    const data = await response.json();
    if (data.available) {
      return {
        available: true,
        message: `Ollama Cloud connected via Edge Function — ${data.message || 'OK'}`,
      };
    }
    return { available: false, message: data.message || 'Ollama Cloud unreachable via Edge Function' };
  } catch (error: any) {
    return { available: false, message: `Edge Function connection failed: ${error.message}` };
  }
}

export async function listAvailableModels(): Promise<Array<{ id: string; name: string }>> {
  // Direct check only for local Ollama
  if (DIRECT_VIABLE) {
    try {
      const response = await fetch(`${DIRECT_URL}/api/tags`, {
        headers: getDirectHeaders(),
      });

      if (!response.ok) {
        console.error('Failed to fetch models from direct Ollama:', response.status);
        return [];
      }

      const data = await response.json();
      return (data.models || []).map((m: any) => ({ id: m.name, name: m.name }));
    } catch (error: any) {
      console.error('Error listing models from direct Ollama:', error);
      return [];
    }
  }

  // Edge Function proxy
  try {
    const response = await fetch(`${EDGE_URL}/ai/models`, {
      headers: getEdgeHeaders(),
    });

    if (!response.ok) { console.error('Failed to fetch models via Edge Function:', response.status); return []; }

    const data = await response.json();
    return data.models || [];
  } catch (error: any) {
    console.error('Error listing models via Edge Function:', error);
    return [];
  }
}

// ============================================
// Core AI Functions
// ============================================

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Resize images to reduce payload size before sending to AI.
// Large textbook scans can be 3-5MB each; resizing to 1600px wide at 85% JPEG
// quality keeps text readable while cutting size to ~300-800KB.
function resizeImage(file: File, maxWidth = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      URL.revokeObjectURL(img.src);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = URL.createObjectURL(file);
  });
}

export async function generateMarkdownFromImages(
  images: File[],
  unitTitle: string,
  onProgress?: (step: string) => void,
  signal?: AbortSignal
): Promise<string> {
  if (images.length === 0) throw new Error('No images provided');

  onProgress?.('Resizing and converting images...');
  const imageDataUrls = await Promise.all(images.map(async (img, idx) => {
    const originalSize = Math.round(img.size / 1024);
    try {
      const dataUrl = await resizeImage(img, 1600, 0.85);
      const resizedSize = Math.round((dataUrl.length * 0.75) / 1024); // base64 ≈ 4/3 of binary
      console.log(`📸 Image ${idx + 1}: ${originalSize}KB → ~${resizedSize}KB (${img.name || 'upload'})`);
      return { dataUrl, resized: true };
    } catch (e) {
      console.warn(`Resize failed for image ${idx + 1}, using original:`, e);
      const dataUrl = await fileToDataUrl(img);
      return { dataUrl, resized: false };
    }
  }));

  const base64Images = imageDataUrls.map(img => {
    const match = img.dataUrl.match(/^data:image\/\w+;base64,(.+)$/);
    return match ? match[1] : img.dataUrl;
  });

  // One request per image. Sending all pages in a single request makes the
  // model emit one huge transcription that exceeds the Edge Function's
  // ~150s execution limit on multi-page uploads.
  const buildPrompt = (pageNum: number, total: number) => `CRITICAL INSTRUCTION: You are a text extraction tool. Your ONLY job is to transcribe EVERY SINGLE WORD of the EXACT text you see in this image. Do NOT summarize, shorten, or remove ANY content. Do NOT add, create, or generate any new content.

RULES - FOLLOW EXACTLY:
1. Extract ALL the text that is PHYSICALLY PRESENT in the image
2. Transcribe word-for-word, character-for-character, leaving NO text behind
3. DO NOT summarize or skip paragraphs, lists, tables, or exercises. Transcribe EVERYTHING.
4. DO NOT add explanations, examples, or additional content
5. DO NOT write anything that isn't in the image
6. If you see a heading, transcribe it as a markdown heading (##, ###)
7. If you see lists, transcribe them as lists
8. If you see formulas/equations, transcribe them exactly using LaTeX format (e.g. $E=mc^2$)
9. Preserve the order and structure exactly as it appears
10. SUPPORT ALL LANGUAGES: If the text is in Nepali, Hindi, or any other language, transcribe it EXACTLY in that language. Do NOT translate.
${pageNum === 1 ? `\nStart with: # ${unitTitle}\n` : `\nThis is page ${pageNum} of ${total}. Continue the transcription; do NOT repeat the title.\n`}
Then transcribe the exact text from this image. Nothing more, nothing less.`;

  // Use parallel extraction ONLY for direct local Ollama where there's no proxy
  // bottleneck. For Edge Function proxies, sequential avoids rate limits,
  // server queuing, and retry storms that inflate token consumption.
  const useParallel = DIRECT_VIABLE;
  const MAX_CONCURRENT_IMAGES = useParallel ? 3 : 1;

  if (useParallel) {
    console.log(`⚡ Processing ${base64Images.length} images in parallel (direct Ollama)`);
  } else {
    console.log(`⏱️ Processing ${base64Images.length} images sequentially (Edge Function proxy)`);
  }

  const pages: string[] = [];

  if (MAX_CONCURRENT_IMAGES === 1) {
    // Sequential path — preserves order, avoids rate limits
    for (let i = 0; i < base64Images.length; i++) {
      if (signal?.aborted) throw new Error('Processing cancelled');
      onProgress?.(`Extracting text from page ${i + 1} of ${base64Images.length}...`);
      try {
        const text = await retryWithBackoff(
          () => unifiedGenerate(buildPrompt(i + 1, base64Images.length), {
            model: VISION_MODEL,
            temperature: 0.1,
            maxTokens: 16000,
            images: [base64Images[i]],
            signal,
          }),
          `Image ${i + 1} text extraction`,
          MAX_RETRIES,
          signal
        );
        if (text && text.trim().length > 0) {
          console.log(`📝 Page ${i + 1} extracted: ${text.trim().length} chars`);
          pages.push(text.trim());
        } else {
          console.warn(`⚠️ Page ${i + 1} returned empty text`);
        }
      } catch (error: any) {
        if (error.name === 'AbortError' || signal?.aborted || error.message === 'Processing cancelled') {
          throw new Error('Processing cancelled');
        }
        console.error(`Error extracting page ${i + 1}:`, error);
        pages.push(`\n> **Page ${i + 1}:** Text extraction failed — ${error.message}\n`);
      }
    }
  } else {
    // Parallel path — only for direct local Ollama
    const parallelPages = await runWithConcurrency(base64Images, async (image, i) => {
      if (signal?.aborted) throw new Error('Processing cancelled');
      onProgress?.(`Extracting text from page ${i + 1} of ${base64Images.length}...`);
      try {
        const text = await retryWithBackoff(
          () => unifiedGenerate(buildPrompt(i + 1, base64Images.length), {
            model: VISION_MODEL,
            temperature: 0.1,
            maxTokens: 16000,
            images: [image],
            signal,
          }),
          `Image ${i + 1} text extraction`,
          MAX_RETRIES,
          signal
        );
        if (text && text.trim().length > 0) {
          console.log(`📝 Page ${i + 1} extracted: ${text.trim().length} chars`);
          return text.trim();
        } else {
          console.warn(`⚠️ Page ${i + 1} returned empty text`);
          return '';
        }
      } catch (error: any) {
        if (error.name === 'AbortError' || signal?.aborted || error.message === 'Processing cancelled') {
          throw error;
        }
        console.error(`Error extracting page ${i + 1}:`, error);
        return `\n> **Page ${i + 1}:** Text extraction failed — ${error.message}\n`;
      }
    }, MAX_CONCURRENT_IMAGES);
    pages.push(...parallelPages);
  }

  const combined = pages.filter(p => p && p.length > 0).join('\n\n');
  if (!combined || combined.trim().length === 0) throw new Error('AI returned empty response');

  console.log(`✅ Generated markdown: ${combined.length} chars from ${pages.length} pages`);
  onProgress?.('Markdown generated successfully!');
  return combined;
}

export async function generateChatResponse(
  question: string,
  context: string,
  unitTitle: string,
  conversationHistory?: Array<{ role: string; content: string }>,
  signal?: AbortSignal
): Promise<string> {
  try {
    return await retryWithBackoff(
      () => unifiedChat(question, context, unitTitle, conversationHistory, signal),
      'Chat response',
      MAX_RETRIES,
      signal
    );
  } catch (error: any) {
    console.error('[AI CHAT] Error:', error);
    throw error;
  }
}

export async function cleanAndStructureText(
  markdown: string,
  onProgress?: (message: string) => void,
  signal?: AbortSignal
): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  onProgress?.('Formatting and structuring full content...');

  // For long documents, skip the AI cleaning step entirely.
  // The per-page extraction already produces well-formatted markdown.
  // Re-processing a 17-page document through the AI with a 4096-8192 token
  // output limit causes truncation — content from later pages gets cut off.
  const MAX_SAFE_CLEAN_LENGTH = 4000;
  if (markdown.length > MAX_SAFE_CLEAN_LENGTH) {
    console.log(`[cleanAndStructureText] Document is ${markdown.length} chars — skipping AI cleaning to avoid truncation.`);
    onProgress?.('Content preserved (skipped re-formatting for large document)');
    return markdown;
  }

  const prompt = `You are an expert document formatting assistant. Format this raw textbook transcription into clean, well-structured markdown while PRESERVING ALL CONTENT EXACTLY.

CRITICAL: Keep EVERY SINGLE WORD. Do NOT summarize, shorten, or remove anything.
- Use ONLY plain text and markdown syntax. NO HTML tags.
- Use ## for main sections, ### for subsections, **text** for bold.
- PRESERVE the original language (Nepali, Hindi, English, etc.)
- PRESERVE all formulas in LaTeX format.

SOURCE CONTENT:
${markdown}

STRUCTURED COMPLETE CONTENT:`;

  try {
    let cleanedText = await unifiedGenerate(prompt, { temperature: 0.3, maxTokens: 8192, model: OLLAMA_CONFIG.MODEL, signal });
    cleanedText = cleanedText.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\w*\s*/, '').replace(/```\s*$/, '').trim();
    }
    if (cleanedText.includes('<div') || cleanedText.includes('<p ') || cleanedText.includes('<h2')) {
      cleanedText = cleanedText
        .replace(/<div[^>]*>/gi, '\n').replace(/<\/div>/gi, '\n')
        .replace(/<h2[^>]*>/gi, '\n## ').replace(/<\/h2>/gi, '\n')
        .replace(/<h3[^>]*>/gi, '\n### ').replace(/<\/h3>/gi, '\n')
        .replace(/<p[^>]*>/gi, '\n').replace(/<\/p>/gi, '\n')
        .replace(/<ul[^>]*>/gi, '\n').replace(/<\/ul>/gi, '\n')
        .replace(/<li[^>]*>/gi, '- ').replace(/<\/li>/gi, '\n')
        .replace(/<strong[^>]*>/gi, '**').replace(/<\/strong>/gi, '**')
        .replace(/<[^>]+>/g, '').replace(/\n\s*\n\s*\n/g, '\n\n').trim();
    }
    onProgress?.('Text cleaned and structured!');
    return cleanedText;
  } catch (error: any) {
    console.error('Error cleaning text:', error);
    onProgress?.('Using original text (cleaning failed)');
    return markdown;
  }
}

export async function generateVocabulary(markdown: string, signal?: AbortSignal): Promise<Array<{
  word: string;
  nepali: string;
  definition: string;
}>> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `Extract 8-12 DIFFICULT or ACADEMIC vocabulary words from this content.
Return ONLY a valid JSON array:
[{ "word": "exact word from text", "definition": "clear explanation", "nepali": "Nepali translation" }]

CONTENT:
${markdown}

JSON Array:`;

  try {
    return await retryWithBackoff(async () => {
      const text = await unifiedGenerate(prompt, { temperature: 0.3, model: OLLAMA_CONFIG.MODEL, signal });
      const vocab = extractJSON(text);
      if (Array.isArray(vocab) && vocab.length > 0) { console.log(`Generated ${vocab.length} vocabulary words`); return vocab; }
      throw new Error('No vocabulary parsed');
    }, 'Vocabulary generation', MAX_RETRIES, signal);
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    console.error('Error generating vocabulary:', error);
    return [
      { word: "Analysis", definition: "The detailed examination of something", nepali: "विश्लेषण" },
      { word: "Process", definition: "A series of steps to achieve an end", nepali: "प्रक्रिया" }
    ];
  }
}

export async function generateAudioTranscript(markdown: string, unitTitle: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `Create a concise 150-200 word summary for audio narration. Conversational tone, cover main concepts, use same language as content.

Unit: ${unitTitle}
Content: ${markdown}
AUDIO SUMMARY:`;

  try {
    const text = await unifiedGenerate(prompt, { temperature: 0.7, model: OLLAMA_CONFIG.MODEL, signal });
    if (text.length < 50) throw new Error('Response too short');
    return text.trim();
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    return `Welcome to ${unitTitle}. In this lesson, we'll explore the fundamental concepts and practical applications.`;
  }
}

export async function generateSummary(markdown: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `You are an expert study assistant. Read the following unit content and write a concise, well-structured summary.

Rules:
- Use the SAME LANGUAGE as the content (do not translate).
- Highlight key concepts, formulas, and important definitions.
- Use markdown formatting: bullet points, bold text, and short paragraphs.
- Do NOT repeat the entire text; focus on the most important points.

CONTENT:
${markdown}

SUMMARY (markdown formatted):`;

  try {
    return await retryWithBackoff(async () => {
      let text = await unifiedGenerate(prompt, { temperature: 0.3, maxTokens: 4096, model: OLLAMA_CONFIG.MODEL, signal });
      text = text.trim();
      if (text.startsWith('```')) text = text.replace(/^```\w*\s*/, '').replace(/```\s*$/, '').trim();
      if (!text || text.length < 20) throw new Error('Summary too short or empty');
      return text;
    }, 'Summary generation', MAX_RETRIES, signal);
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    console.error('Summary generation failed:', error);
    return '**Key Concepts**: Unable to generate summary. Please try again.';
  }
}

export async function generateExercises(markdown: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `You are an expert tutor. Find EVERY exercise, question, or problem in the following textbook content and provide a complete, step-by-step solution for each.

OUTPUT RULES — FOLLOW EXACTLY:
1. Use the SAME LANGUAGE as the content. Do NOT translate.
2. Do NOT invent questions that are not in the content.
3. Group exercises by their original section using markdown headings:
   ### Section 1: Fill in the blanks
   ### Section 2: Short Answer Questions
   etc.
4. Format each sub-question on its own line starting with **Q.**
5. Provide the solution immediately after the question, starting with **Solution:**
6. For math/science problems, show ALL working steps clearly.
7. Add a blank line between every question and its solution for clean parsing.
8. Keep the original question numbering (a, b, c, 1, 2, 3, etc.).

EXAMPLE FORMAT:
### Section 1: Fill in the blanks
**Q. a. Water boils at ______ °C.**

**Solution:** 100°C

**Q. b. The SI unit of force is ______.**

**Solution:** Newton (N)

### Section 2: Short Answer Questions
**Q. 1. Define photosynthesis.**

**Solution:** Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.

CONTENT:
${markdown}

ALL SOLVED EXERCISES:`;

  try {
    return await retryWithBackoff(async () => {
      let text = await unifiedGenerate(prompt, { temperature: 0.3, maxTokens: 16000, model: OLLAMA_CONFIG.MODEL, signal });
      text = text.trim();
      if (text.startsWith('```')) text = text.replace(/^```\w*\s*/, '').replace(/```\s*$/, '').trim();
      if (!text || text.length < 50) throw new Error('Exercises response too short');
      return text;
    }, 'Exercises generation', MAX_RETRIES, signal);
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    console.error('Exercises generation failed:', error);
    return '## No Exercises Found\n\nUnable to extract exercises from this content.';
  }
}

export async function generateQuiz(markdown: string, signal?: AbortSignal): Promise<any[]> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `You are a quiz creator. Create exactly 10 multiple-choice questions based on the content below.

CRITICAL: Your entire response must be ONE valid JSON array. Do NOT include markdown code blocks, explanations, or any text outside the JSON.

Required format for each question:
{
  "id": number (1-10),
  "question": "the question text",
  "options": ["option A", "option B", "option C", "option D"],
  "correctAnswer": number (0-3),
  "difficulty": "easy" | "medium" | "hard"
}

Content:
${markdown}

JSON OUTPUT (array only):`;

  try {
    return await retryWithBackoff(async () => {
      const text = await unifiedGenerate(prompt, { temperature: 0.2, maxTokens: 4096, model: OLLAMA_CONFIG.MODEL, signal });
      console.log('[QUIZ] raw response:', text.substring(0, 300));
      const quiz = extractJSON(text);
      if (Array.isArray(quiz) && quiz.length > 0) {
        // Validate structure
        const valid = quiz.filter((q: any) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          typeof q.correctAnswer === 'number'
        );
        if (valid.length > 0) return valid;
      }
      throw new Error('Failed to parse quiz');
    }, 'Quiz generation', MAX_RETRIES, signal);
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    console.error('Quiz generation failed:', error);
    return [];
  }
}

export async function generatePracticeQuestions(markdown: string, signal?: AbortSignal): Promise<any[]> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `You are an exam preparation assistant. Create 5-8 practice questions based on the content below.

CRITICAL: Your entire response must be ONE valid JSON array. Do NOT include markdown code blocks, explanations, or any text outside the JSON.

Required format for each question:
{
  "id": "q1",
  "question": "the question text",
  "answer": "the correct answer or solution",
  "type": "conceptual" | "factual" | "problem-solving"
}

Content:
${markdown}

JSON OUTPUT (array only):`;

  try {
    return await retryWithBackoff(async () => {
      const text = await unifiedGenerate(prompt, { temperature: 0.2, maxTokens: 4096, model: OLLAMA_CONFIG.MODEL, signal });
      console.log('[PRACTICE] raw response:', text.substring(0, 300));
      const practice = extractJSON(text);
      if (Array.isArray(practice) && practice.length > 0) {
        const valid = practice.filter((q: any) => q.question && q.answer);
        if (valid.length > 0) return valid;
      }
      throw new Error('Failed to parse practice questions');
    }, 'Practice questions', MAX_RETRIES, signal);
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    console.error('Practice questions generation failed:', error);
    return [];
  }
}

export async function generateModelQuestion(markdown: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `Create a model question paper. Include Time, Full Marks, Pass Marks. Sections: Group A (Very Short), B (Short), C (Long), D (Higher Ability). Format with Markdown.

Content: ${markdown}
MODEL QUESTION PAPER:`;

  try {
    let text = await unifiedGenerate(prompt, { temperature: 0.6, model: OLLAMA_CONFIG.MODEL, signal });
    text = text.trim();
    if (text.startsWith('```')) text = text.replace(/^```\w*\s*/, '').replace(/```\s*$/, '').trim();
    return text;
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    return '# Model Question Paper\n\nUnable to generate.';
  }
}

export async function suggestTitleFromMarkdown(markdownContent: string, currentTitle?: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `Suggest a short (3-7 word) title for this content. Just the title, nothing else.
${currentTitle ? `Current: ${currentTitle}` : ''}
Content: ${markdownContent}
TITLE:`;

  try {
    let title = await unifiedGenerate(prompt, { temperature: 0.5, model: OLLAMA_CONFIG.MODEL, signal });
    return title.trim().replace(/^["']|["']$/g, '');
  } catch (error: any) {
    if (signal?.aborted || error.message === 'Processing cancelled') throw error;
    return '';
  }
}

export async function lookupVocabulary(word: string, context: string, signal?: AbortSignal): Promise<{
  word: string; definition: string; nepali: string; examples?: string[];
}> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  const prompt = `You are a vocabulary assistant. Your ONLY output must be a single valid JSON object — no markdown, no explanations, no preamble.

Define the word "${word}"${context ? ` using this context:\n${context.substring(0, 1000)}` : '.'}

Respond with EXACTLY this JSON object:
{"word":"${word}","definition":"clear English definition","nepali":"Nepali translation","examples":["example sentence"]}`;

  try {
    const text = await retryWithBackoff(
      () => unifiedGenerate(prompt, { temperature: 0.1, model: OLLAMA_CONFIG.MODEL, signal }),
      'Vocabulary lookup',
      MAX_RETRIES,
      signal
    );
    console.log('[LOOKUP VOCAB] raw response for', word, ':', text.substring(0, 400));

    // Try JSON parsing first
    const data = extractJSON(text);
    if (data?.word && data?.definition) {
      return {
        word: data.word,
        definition: data.definition,
        nepali: data.nepali || '-',
        examples: Array.isArray(data.examples) ? data.examples : [],
      };
    }

    // Fallback: parse plain text for definition / nepali
    const defMatch = text.match(/definition[:\s]+["']?([^"\n]+)["']?/i) ||
                     text.match(/mean[s]?[:\s]+([^\n]+)/i);
    const nepMatch = text.match(/nepali[:\s]+["']?([^"\n]+)["']?/i) ||
                     text.match(/translation[:\s]+["']?([^"\n]+)["']?/i);

    if (defMatch) {
      return {
        word,
        definition: defMatch[1].trim(),
        nepali: nepMatch ? nepMatch[1].trim() : '-',
        examples: [],
      };
    }

    console.warn('[LOOKUP VOCAB] Could not parse response for', word);
    return { word, definition: 'Unable to fetch definition', nepali: '-', examples: [] };
  } catch (error: any) {
    console.error('[LOOKUP VOCAB] Network/AI error for word:', word, error.message);
    return { word, definition: 'Unable to fetch definition', nepali: '-', examples: [] };
  }
}

console.log(`AI Service initialized — ${DIRECT_VIABLE ? 'Direct local Ollama' : `Edge Function proxy → ${DIRECT_URL}`}`);
