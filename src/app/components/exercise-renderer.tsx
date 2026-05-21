import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { BookOpen, Lightbulb, Hash, ChevronRight, CheckCircle } from 'lucide-react';
import { MarkdownRenderer } from './markdown-renderer';

interface ExerciseSection {
  id: string;
  title: string;
  index: number;
  questions: ExerciseQuestion[];
}

interface ExerciseQuestion {
  id: string;
  raw: string;
  questionHtml: string;
  solutionHtml: string;
  label: string;
}

interface ExerciseRendererProps {
  content: string;
}

function parseExercises(markdown: string): ExerciseSection[] {
  const lines = markdown.split('\n');
  const sections: ExerciseSection[] = [];
  let currentSection: ExerciseSection | null = null;
  let currentQuestion: ExerciseQuestion | null = null;
  let buffer: string[] = [];

  const flushQuestion = () => {
    if (!currentQuestion || buffer.length === 0) return;
    const raw = buffer.join('\n').trim();
    const parts = raw.split(/\n\*\*Solution:\*\*/i);
    currentQuestion.questionHtml = parts[0]?.trim() || raw;
    currentQuestion.solutionHtml = parts[1]?.trim() || '';
    currentQuestion.raw = raw;
    if (currentSection) currentSection.questions.push(currentQuestion);
    currentQuestion = null;
    buffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // New section heading: ### Section 1: Title
    if (/^###\s+/i.test(trimmed)) {
      flushQuestion();
      if (currentSection) sections.push(currentSection);

      const title = trimmed.replace(/^###\s+/, '');
      currentSection = {
        id: `section-${sections.length + 1}`,
        title,
        index: sections.length + 1,
        questions: [],
      };
      continue;
    }

    // New question: **Q.**
    if (/^\*\*Q\.\s*/i.test(trimmed)) {
      flushQuestion();
      const labelMatch = trimmed.match(/^\*\*Q\.\s*([^*]+)\*\*/);
      const label = labelMatch ? labelMatch[1].trim() : '';
      currentQuestion = {
        id: `q-${currentSection?.questions.length || 0}`,
        raw: '',
        questionHtml: '',
        solutionHtml: '',
        label,
      };
      buffer.push(line);
      continue;
    }

    // Legacy bold-question format: **a. Question**
    if (/^\*\*[^*]+\*\*/.test(trimmed) && !/^\*\*Q\.\s*/i.test(trimmed) && !currentQuestion) {
      flushQuestion();
      const labelMatch = trimmed.match(/^\*\*([^*]+)\*\*/);
      const label = labelMatch ? labelMatch[1].trim() : '';
      currentQuestion = {
        id: `q-${currentSection?.questions.length || 0}`,
        raw: '',
        questionHtml: '',
        solutionHtml: '',
        label,
      };
      buffer.push(line);
      continue;
    }

    if (currentQuestion) {
      buffer.push(line);
    }
  }

  flushQuestion();
  if (currentSection) sections.push(currentSection);

  // Fallback: if no sections parsed, create one synthetic section
  if (sections.length === 0) {
    // Try to split by blank lines into generic blocks
    const blocks = markdown.split(/\n\s*\n/).filter(b => b.trim().length > 0);
    const questions: ExerciseQuestion[] = blocks.map((block, i) => {
      const parts = block.split(/\n\*\*Solution:\*\*/i);
      return {
        id: `q-${i}`,
        raw: block,
        questionHtml: parts[0]?.trim() || block,
        solutionHtml: parts[1]?.trim() || '',
        label: `${i + 1}`,
      };
    });
    sections.push({ id: 'section-1', title: 'Exercises', index: 1, questions });
  }

  return sections;
}

function getSectionColor(index: number): string {
  const colors = [
    'border-l-4 border-l-blue-500',
    'border-l-4 border-l-emerald-500',
    'border-l-4 border-l-violet-500',
    'border-l-4 border-l-amber-500',
    'border-l-4 border-l-rose-500',
    'border-l-4 border-l-cyan-500',
    'border-l-4 border-l-orange-500',
    'border-l-4 border-l-pink-500',
  ];
  return colors[(index - 1) % colors.length];
}

function getBadgeColor(index: number): string {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  ];
  return colors[(index - 1) % colors.length];
}

export function ExerciseRenderer({ content }: ExerciseRendererProps) {
  const sections = useMemo(() => parseExercises(content), [content]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  const toggleReveal = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const revealAll = () => {
    const all = new Set<string>();
    sections.forEach(s => s.questions.forEach(q => all.add(q.id)));
    setRevealed(all);
  };

  const hideAll = () => setRevealed(new Set());

  const totalQuestions = sections.reduce((s, sec) => s + sec.questions.length, 0);
  const revealedCount = revealed.size;

  return (
    <div className="space-y-8">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-3">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeSection === sec.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            {sec.title.replace(/^Section\s+\d+:\s*/i, '')}
            <span className={`ml-0.5 text-xs px-1.5 py-0.5 rounded-full ${activeSection === sec.id ? 'bg-white/20 text-white' : 'bg-background text-muted-foreground'}`}>
              {sec.questions.length}
            </span>
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-semibold">
            {revealedCount}/{totalQuestions} revealed
          </span>
          <button
            onClick={revealedCount === totalQuestions ? hideAll : revealAll}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {revealedCount === totalQuestions ? 'Hide all' : 'Reveal all'}
          </button>
        </div>
      </div>

      {sections.map((section, secIdx) => (
        <motion.div
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: secIdx * 0.08 }}
          className={activeSection && activeSection !== section.id ? 'hidden' : ''}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${getBadgeColor(section.index)}`}>
              {section.index}
            </div>
            <h2 className="text-lg font-bold font-display text-foreground">
              {section.title.replace(/^Section\s+\d+:\s*/i, '')}
            </h2>
            <Badge variant="secondary" className="text-xs font-semibold">
              {section.questions.length} Q
            </Badge>
          </div>

          <div className="space-y-4">
            {section.questions.map((q, qIdx) => {
              const isRevealed = revealed.has(q.id);
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.04 }}
                >
                  <Card className={`overflow-hidden rounded-2xl border-2 border-border bg-card ${getSectionColor(section.index)}`}>
                    {/* Question */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {q.label.replace(/[.):].*$/, '').substring(0, 3)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="prose prose-sm max-w-none text-foreground">
                            <MarkdownRenderer content={q.questionHtml.replace(/^\*\*Q\.\s*/i, '').replace(/\*\*/g, '')} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Solution toggle */}
                    <div className="px-5 sm:px-6 pb-4">
                      <button
                        onClick={() => toggleReveal(q.id)}
                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                          isRevealed
                            ? 'bg-primary text-white shadow-md hover:opacity-90'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {isRevealed ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Hide Solution
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-4 h-4" />
                            Show Solution
                          </>
                        )}
                      </button>
                    </div>

                    {/* Solution content */}
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-border bg-muted/40"
                      >
                        <div className="p-5 sm:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary uppercase tracking-wide">Solution</span>
                          </div>
                          <div className="prose prose-sm max-w-none text-foreground">
                            <MarkdownRenderer content={q.solutionHtml} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
