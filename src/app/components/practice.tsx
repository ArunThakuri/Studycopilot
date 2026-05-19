import { useState } from 'react';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { MarkdownRenderer } from './markdown-renderer';
import { AppHeader } from './app-header';
import { motion } from 'motion/react';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface PracticeProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onPreviousModule: () => void;
  onRegenerate?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

interface PracticeQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'long-answer';
  options?: string[];
  answer: string | string[];
  difficulty: 'easy' | 'medium' | 'hard';
  showAnswer: boolean;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  hard: 'bg-red-100 text-red-700 border-red-200',
};

export function Practice({ subject, unit, user, onBack, onPreviousModule, onLogout, onOpenProfile, onNavigateHome }: PracticeProps) {
  const practiceModule = unit.content?.practiceQuestions;
  const practiceData = practiceModule && typeof practiceModule === 'object' && 'data' in practiceModule ? practiceModule.data : null;
  const status = practiceModule?.status || 'pending';

  const aiQuestions: PracticeQuestion[] = Array.isArray(practiceData) ? practiceData.map((q: any) => ({ ...q, showAnswer: false })) : [];
  const [questions, setQuestions] = useState<PracticeQuestion[]>(aiQuestions);

  const toggleAnswer = (id: number) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, showAnswer: !q.showAnswer } : q));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Practice Questions`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center text-xl shadow-md shadow-red-400/20">📝</div>
              <div>
                <h1 className="text-foreground font-bold font-display text-xl">Practice Questions</h1>
                <p className="text-sm text-muted-foreground font-semibold">Test yourself • {questions.length} questions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-2 border-border rounded-xl font-semibold">All Difficulties</Button>
              <Button variant="outline" size="sm" className="border-2 border-border rounded-xl font-semibold">🔀 Shuffle</Button>
            </div>
          </div>
        </motion.div>

        {status === 'processing' && (
          <Card className="p-8 mb-6 bg-card rounded-2xl border-2 border-border">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <div><h3 className="text-foreground font-bold font-display mb-2">Generating Practice Questions</h3><p className="text-sm text-muted-foreground font-semibold">Creating personalized practice questions...</p></div>
            </div>
          </Card>
        )}

        {status === 'pending' && (
          <Card className="p-8 mb-6 bg-card rounded-2xl border-2 border-border">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 text-muted-foreground text-3xl">⏳</div>
              <div><h3 className="text-foreground font-bold font-display mb-2">Waiting to Process</h3><p className="text-sm text-muted-foreground font-semibold">Practice questions generation will start shortly</p></div>
            </div>
          </Card>
        )}

        {status === 'completed' && questions.length > 0 && (
          <div className="space-y-6 mb-6">
            {questions.map((question, index) => (
              <motion.div key={question.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="p-6 bg-card rounded-2xl border-2 border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary rounded-full font-semibold">Question {question.id}</Badge>
                      <Badge className={`${difficultyColors[question.difficulty]} rounded-full font-semibold border`}>{question.difficulty}</Badge>
                    </div>
                    <button onClick={() => toggleAnswer(question.id)} className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 font-semibold">
                      <span className="text-lg">👁</span>Show Answer
                    </button>
                  </div>

                  <div className="text-foreground mb-4">
                    <MarkdownRenderer content={question.question} />
                  </div>

                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, i) => (
                        <div key={i} className="p-3 bg-muted rounded-xl border-2 border-border"><span className="text-foreground/80 font-semibold">{String.fromCharCode(65 + i)}. {option}</span></div>
                      ))}
                    </div>
                  )}

                  {question.type === 'long-answer' && !question.showAnswer && (
                    <Textarea placeholder="Write your answer here..." className="min-h-[120px] mb-4 rounded-xl border-2 border-border" />
                  )}

                  {question.showAnswer && (
                    <div className="mt-4 p-4 bg-primary/5 border-2 border-primary/20 rounded-2xl">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-primary text-xs font-bold">✓</span></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground/70 font-semibold mb-2">Answer:</p>
                          <div className="text-sm text-foreground/80">
                            {Array.isArray(question.answer) ? (
                              <ul className="space-y-1.5">{question.answer.map((ans, i) => <li key={i} className="flex gap-2"><span>•</span><MarkdownRenderer content={ans} /></li>)}</ul>
                            ) : <MarkdownRenderer content={question.answer} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {status === 'completed' && questions.length === 0 && (
          <Card className="p-8 mb-6 bg-card rounded-2xl border-2 border-border">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 text-muted-foreground text-3xl">📝</div>
              <div><h3 className="text-foreground font-bold font-display mb-2">No Practice Questions</h3><p className="text-sm text-muted-foreground font-semibold">No practice questions were generated for this unit</p></div>
            </div>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onPreviousModule} className="border-2 border-border rounded-xl font-semibold">
            <ChevronLeft className="w-4 h-4" />Previous: Interactive Quiz
          </Button>
          <Button onClick={onBack} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">Back to Modules</Button>
        </div>
      </main>
    </div>
  );
}
