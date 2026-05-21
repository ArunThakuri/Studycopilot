// AI Provider for StudyCopilot
// Uses Ollama cloud via server proxy for all AI operations

import { AIGeneratedContent } from './types';
import { type AIProvider } from './config';
import * as AIService from './ai-service';

let currentProvider: AIProvider = 'ollama';

export function initializeAIProvider(provider: AIProvider) {
  currentProvider = provider;
  console.log(`AI Provider initialized: ${provider}`);
}

export function setProvider(provider: AIProvider) {
  currentProvider = provider;
  console.log(`Switched to provider: ${provider}`);
  if (typeof window !== 'undefined') {
    localStorage.setItem('ai_provider', provider);
  }
}

export function getCurrentProvider(): AIProvider {
  return currentProvider;
}

export async function checkProviderAvailability(): Promise<{
  available: boolean;
  message: string;
}> {
  return await AIService.getAIStatus();
}

// ============================================
// QUICK UNIT PROCESSING
// ============================================

export async function processUnitQuickly(
  images: File[],
  unitTitle: string,
  markdownContent?: string,
  onProgress?: (step: string, progress: number) => void,
  signal?: AbortSignal
): Promise<{
  markdown: string;
  unitText: string;
}> {
  if (signal?.aborted) throw new Error('Processing cancelled');

  if (markdownContent && markdownContent.trim().length > 0) {
    console.log('Markdown file provided - Processing...');
    onProgress?.('Processing your markdown file...', 30);

    let processedMarkdown = markdownContent;

    try {
      onProgress?.('Cleaning with AI...', 60);
      processedMarkdown = await AIService.cleanAndStructureText(
        markdownContent,
        (msg) => onProgress?.(msg, 80),
        signal
      );
    } catch (error) {
      if (signal?.aborted || (error as Error).message === 'Processing cancelled') throw error;
      console.error('Could not clean text:', error);
    }

    onProgress?.('Formatting text...', 90);
    const formattedHtml = markdownToHtml(processedMarkdown);
    onProgress?.('Ready!', 100);

    return {
      markdown: processedMarkdown,
      unitText: formattedHtml
    };
  }

  if (images.length > 0) {
    try {
      console.log('Extracting text from images using AI...');
      onProgress?.('Processing images with AI...', 40);

      const extractedMarkdown = await AIService.generateMarkdownFromImages(
        images,
        unitTitle,
        (step) => onProgress?.(step, 60),
        signal
      );

      console.log('Text extracted successfully!');
      onProgress?.('Text extracted!', 70);

      let processedMarkdown = extractedMarkdown;
      try {
        onProgress?.('Cleaning and structuring text...', 80);
        processedMarkdown = await AIService.cleanAndStructureText(
          extractedMarkdown,
          (msg) => onProgress?.(msg, 90),
          signal
        );
        console.log('Text cleaned and structured!');
      } catch (error) {
        if (signal?.aborted || (error as Error).message === 'Processing cancelled') throw error;
        console.error('Could not clean text, using extracted version:', error);
      }

      onProgress?.('Formatting text...', 95);
      const formattedHtml = markdownToHtml(processedMarkdown);
      onProgress?.('Ready!', 100);

      return {
        markdown: processedMarkdown,
        unitText: formattedHtml
      };
    } catch (error) {
      console.error('Error extracting text:', error);
      throw error;
    }
  }

  throw new Error('No markdown content or images provided');
}

// ============================================
// MODULE PROCESSING
// ============================================

export type ModuleName =
  | 'vocabulary'
  | 'audioLesson'
  | 'summary'
  | 'modelQuestion'
  | 'exercises'
  | 'interactiveQuiz'
  | 'practiceQuestions';

export async function processModuleAsync(
  moduleName: ModuleName,
  markdown: string,
  unitTitle: string,
  onProgress?: (message: string, progress: number) => void,
  signal?: AbortSignal
): Promise<any> {
  if (signal?.aborted) throw new Error('Processing cancelled');
  console.log(`Processing module: ${moduleName}`);

  try {
    let result: any;

    switch (moduleName) {
      case 'vocabulary':
        onProgress?.('Extracting vocabulary...', 30);
        result = await AIService.generateVocabulary(markdown, signal);
        break;

      case 'audioLesson':
        onProgress?.('Preparing audio lesson...', 50);
        result = `Welcome to ${unitTitle}. In this audio lesson, we'll explore the key concepts from this unit.`;
        onProgress?.('Audio lesson ready!', 100);
        break;

      case 'summary':
        onProgress?.('Creating summary...', 30);
        result = await AIService.generateSummary(markdown, signal);
        break;

      case 'exercises':
        onProgress?.('Generating exercises...', 30);
        result = await AIService.generateExercises(markdown, signal);
        break;

      case 'interactiveQuiz':
        onProgress?.('Creating quiz...', 30);
        result = await AIService.generateQuiz(markdown, signal);
        break;

      case 'practiceQuestions':
        onProgress?.('Generating practice questions...', 30);
        result = await AIService.generatePracticeQuestions(markdown, signal);
        break;

      case 'modelQuestion':
        onProgress?.('Creating model question paper...', 30);
        result = await AIService.generateModelQuestion(markdown, signal);
        break;

      default:
        throw new Error(`Unknown module: ${moduleName}`);
    }

    onProgress?.('Module completed!', 100);
    return result;
  } catch (error) {
    console.error(`Error processing ${moduleName}:`, error);
    throw error;
  }
}

export async function regenerateModule(
  moduleName: ModuleName,
  markdown: string,
  unitTitle: string,
  onProgress?: (message: string, progress: number) => void,
  signal?: AbortSignal
): Promise<any> {
  return await processModuleAsync(moduleName, markdown, unitTitle, onProgress, signal);
}

export async function suggestTitleFromMarkdown(
  markdownContent: string,
  currentTitle?: string,
  signal?: AbortSignal
): Promise<string> {
  try {
    return await AIService.suggestTitleFromMarkdown(markdownContent, currentTitle, signal);
  } catch (error) {
    console.error('Error suggesting title:', error);
    return '';
  }
}

export function createInitialContentStructure(markdown: string, unitText: string): AIGeneratedContent {
  return {
    markdown,
    unitText,
    audioLesson: { status: 'completed', progress: 100, data: '🎧 Coming Soon' },
    vocabulary: { status: 'pending' },
    summary: { status: 'pending' },
    exercises: { status: 'pending' },
    interactiveQuiz: { status: 'pending' },
    practiceQuestions: { status: 'pending' },
    modelQuestion: { status: 'completed', progress: 100, data: '📋 Coming Soon' },
  };
}

function markdownToHtml(markdown: string): string {
  let html = markdown;

  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4">$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-4 mb-2">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-gray-800 mt-3 mb-2">$1</h4>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  html = html.replace(/^\* (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');

  html = html.replace(/(<li class="ml-4">.*?<\/li>\n?)+/gs, (match) => {
    return `<ul class="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-4">${match}</ul>`;
  });

  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');

  html = html.replace(/(<li class="ml-4">.*?<\/li>\n?)+/gs, (match) => {
    if (match.includes('<ul')) return match;
    return `<ol class="list-decimal list-inside space-y-1 text-gray-700 mb-4 ml-4">${match}</ol>`;
  });

  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line || line.startsWith('<')) {
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      processedLines.push(lines[i]);
      continue;
    }

    if (!inParagraph) {
      processedLines.push('<p class="text-gray-700 leading-relaxed mb-4">');
      inParagraph = true;
    }
    processedLines.push(line);

    if (i === lines.length - 1 || !lines[i + 1].trim() || lines[i + 1].trim().startsWith('<')) {
      processedLines.push('</p>');
      inParagraph = false;
    }
  }

  html = processedLines.join('\n');
  html = `<div class="space-y-4">${html}</div>`;

  return html;
}

export async function getAIProviderStatus(): Promise<{
  provider: AIProvider;
  available: boolean;
  message: string;
  aiConfigured: boolean;
}> {
  try {
    const status = await AIService.getAIStatus();
    return {
      provider: 'ollama',
      available: status.available,
      message: status.message,
      aiConfigured: status.available,
    };
  } catch (error) {
    console.log('AI check failed:', error);
    return {
      provider: 'ollama',
      available: false,
      message: 'Could not check AI status',
      aiConfigured: false,
    };
  }
}

export { AIService };
