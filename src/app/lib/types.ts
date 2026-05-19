// Shared types for StudyCopilot

export type ModuleStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface ModuleData<T> {
  status: ModuleStatus;
  data?: T;
  error?: string;
  progress?: number;
}

export interface AIGeneratedContent {
  markdown?: string;
  unitText: string;

  audioLesson: ModuleData<string>;
  vocabulary: ModuleData<Array<{
    word: string;
    nepali: string;
    definition: string;
  }>>;
  summary: ModuleData<{
    definitions: string[];
    formulas: string[];
    concepts: string[];
  }>;
  exercises: ModuleData<Array<{
    id: number;
    type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'short-answer';
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
  }>>;
  interactiveQuiz: ModuleData<Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>>;
  practiceQuestions: ModuleData<Array<{
    id: number;
    question: string;
    type: string;
    options?: string[];
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>>;

  modelQuestion?: ModuleData<string>;

  audioTranscript?: string;
}
