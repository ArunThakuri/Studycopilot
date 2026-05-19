import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, ChevronRight, Check, X, Zap, Target, Award, RefreshCw, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { AppHeader } from './app-header';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface InteractiveLearningProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onNextModule?: () => void;
  onPreviousModule?: () => void;
  onRegenerate?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  hard: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
};

export function InteractiveLearning({ subject, unit, user, onBack, onNextModule, onPreviousModule, onRegenerate, onLogout, onOpenProfile, onNavigateHome }: InteractiveLearningProps) {
  const quizModule = unit.content?.interactiveQuiz;
  const quizData = quizModule && typeof quizModule === 'object' && 'data' in quizModule ? quizModule.data : null;
  const status = quizModule && typeof quizModule === 'object' && 'status' in quizModule ? quizModule.status : 'pending';

  const questionsFromAI: QuizQuestion[] = (Array.isArray(quizData) && quizData.length > 0)
    ? quizData.map((q: any, i: number) => ({
        id: q.id || i + 1,
        question: q.question || '',
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        difficulty: q.difficulty || 'medium',
      })).filter((q: QuizQuestion) => q.question && q.options.length >= 2)
    : [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(Math.max(questionsFromAI.length, 1)).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (showResult) {
      const score = calculateScore();
      if ((score / questionsFromAI.length) * 100 >= 70) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [showResult]);

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setHasSubmitted(true);
    setTimeout(() => {
      if (currentQuestionIndex < questionsFromAI.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setHasSubmitted(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (index < questionsFromAI.length && answer === questionsFromAI[index].correctAnswer) correct++;
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questionsFromAI.length).fill(null));
    setShowResult(false);
    setHasSubmitted(false);
  };

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-10 text-center max-w-md w-full bg-card rounded-2xl border-2 border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-bold font-display text-foreground mb-2">Generating Quiz...</h2>
          <p className="text-muted-foreground font-semibold">AI is creating questions based on your unit content.</p>
        </Card>
      </div>
    );
  }

  if (status === 'error' || (status === 'completed' && questionsFromAI.length === 0)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full bg-card rounded-2xl border-2 border-border">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold font-display text-foreground mb-2">Quiz Not Available</h2>
          <p className="text-muted-foreground font-semibold mb-6">
            {status === 'error' ? 'There was an error generating the quiz. Please try again.' : 'No quiz questions were generated for this unit.'}
          </p>
          <div className="flex gap-3 justify-center">
            {onRegenerate && <Button onClick={onRegenerate} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display"><RefreshCw className="w-4 h-4 mr-2" />Regenerate</Button>}
            <Button variant="outline" onClick={onBack} className="border-2 border-border rounded-xl font-semibold">Go Back</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (questionsFromAI.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full bg-card rounded-2xl border-2 border-border">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold font-display text-foreground mb-2">No Quiz Available</h2>
          <p className="text-muted-foreground font-semibold mb-6">Quiz content hasn't been generated yet.</p>
          <Button onClick={onBack} className="rounded-xl font-semibold">Go Back</Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questionsFromAI[currentQuestionIndex];
  if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / questionsFromAI.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questionsFromAI.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Interactive Quiz`} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
            <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" />Back to Modules
            </button>
          </div>

          <Card className="p-6 sm:p-8 text-center bg-card rounded-2xl border-2 border-border max-w-3xl mx-auto">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold font-display text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground font-semibold mb-8">Great job completing the interactive quiz for "{unit.title}"</p>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white mb-6 shadow-lg shadow-primary/20">
              <div className="text-5xl mb-2 font-bold font-display">{score}/{questionsFromAI.length}</div>
              <p className="text-white/80 font-semibold">Your Score</p>
              <div className="mt-4 text-2xl font-bold font-display">{percentage.toFixed(0)}%</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-500/10 rounded-2xl p-4 border-2 border-emerald-500/20">
                <div className="text-2xl text-emerald-600 dark:text-emerald-400 mb-1 font-bold font-display">{score}</div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold">Correct</p>
              </div>
              <div className="bg-red-500/10 rounded-2xl p-4 border-2 border-red-500/20">
                <div className="text-2xl text-red-600 dark:text-red-400 mb-1 font-bold font-display">{questionsFromAI.length - score}</div>
                <p className="text-sm text-red-700 dark:text-red-300 font-semibold">Incorrect</p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-4 border-2 border-secondary/20">
                <div className="text-2xl text-secondary mb-1 font-bold font-display">{questionsFromAI.length}</div>
                <p className="text-sm text-secondary font-semibold">Total</p>
              </div>
            </div>

            <div className="mb-8">
              {percentage >= 80 && <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4"><p className="text-emerald-800 dark:text-emerald-300 font-bold">Excellent work! You've mastered this topic!</p></div>}
              {percentage >= 60 && percentage < 80 && <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4"><p className="text-amber-800 dark:text-amber-300 font-bold">Good job! Review the questions you missed to improve.</p></div>}
              {percentage < 60 && <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4"><p className="text-orange-800 dark:text-orange-300 font-bold">Keep practicing! Review the material and try again.</p></div>}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="outline" onClick={restartQuiz} className="border-2 border-border rounded-xl font-semibold"><RefreshCw className="w-4 h-4 mr-2" />Try Again</Button>
              {onNextModule && (
                <Button onClick={onNextModule} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
                  Next Module<ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button onClick={onBack} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl font-semibold">Back to Modules</Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Interactive Quiz`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-md shadow-primary/10">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">Interactive Quiz</h1>
              <p className="text-sm text-muted-foreground font-semibold">{unit.title} — {questionsFromAI.length} questions</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-semibold">Progress</p>
            <p className="text-2xl text-secondary font-bold font-display">{currentQuestionIndex + 1}/{questionsFromAI.length}</p>
          </div>
        </div>

        <div className="mb-8 max-w-3xl mx-auto">
          <Progress value={progress} className="h-2.5 rounded-full" />
        </div>

        <Card className="p-6 sm:p-8 shadow-lg border-2 border-border relative overflow-hidden bg-card rounded-2xl max-w-3xl mx-auto">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Badge className="bg-secondary/10 text-secondary rounded-full px-3 py-1 text-sm font-semibold">Question {currentQuestionIndex + 1}</Badge>
              {currentQuestion.difficulty && (
                <Badge className={`${difficultyColors[currentQuestion.difficulty] || difficultyColors.medium} rounded-full uppercase text-xs px-2 font-semibold border`}>{currentQuestion.difficulty}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />{answeredCount} answered
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-display text-foreground mb-8 leading-relaxed">{currentQuestion.question}</h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showFeedback = hasSubmitted;
              let buttonClass = 'w-full p-4 sm:p-5 text-left border-2 rounded-2xl transition-all duration-200 font-semibold';
              if (showFeedback) {
                if (isSelected && isCorrect) buttonClass += ' border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30';
                else if (isSelected && !isCorrect) buttonClass += ' border-red-500 bg-red-50 dark:bg-red-900/30';
                else if (isCorrect) buttonClass += ' border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30';
                else buttonClass += ' border-border bg-card opacity-50';
              } else {
                if (isSelected) buttonClass += ' border-primary bg-primary/5 dark:bg-primary/10 shadow-md';
                else buttonClass += ' border-border bg-card hover:border-primary/30 hover:bg-muted/50 dark:hover:bg-muted/30';
              }
              return (
                <motion.button key={index} whileHover={!hasSubmitted ? { scale: 1.01 } : {}} whileTap={!hasSubmitted ? { scale: 0.99 } : {}} onClick={() => { if (!hasSubmitted) setSelectedAnswer(index); }} disabled={hasSubmitted} className={buttonClass}>
                  <div className="flex items-center justify-between">
                    <span className={`text-base sm:text-lg ${isSelected || (showFeedback && isCorrect) ? 'font-bold text-foreground' : 'text-foreground/80'}`}>{option}</span>
                    {showFeedback && isCorrect && <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-1"><Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>}
                    {showFeedback && isSelected && !isCorrect && <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1"><X className="w-5 h-5 text-red-600 dark:text-red-400" /></div>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground italic font-semibold">
              {hasSubmitted ? "Loading next question..." : "Select an answer to continue"}
            </div>
            <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null || hasSubmitted} size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 disabled:opacity-50 min-w-[140px] rounded-xl font-display font-semibold">
              {hasSubmitted ? <><Zap className="w-4 h-4 mr-2 animate-pulse" />Checking...</> : 'Submit Answer'}
            </Button>
          </div>

          <AnimatePresence>
            {hasSubmitted && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-full"><Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /></div>
                    <div><p className="text-emerald-800 dark:text-emerald-300 font-bold">Correct! Great job!</p><p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">You're mastering this topic.</p></div>
                  </div>
                ) : (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full"><X className="w-6 h-6 text-red-600 dark:text-red-400" /></div>
                    <div><p className="text-red-800 dark:text-red-300 font-bold">Not quite right</p><p className="text-red-600 dark:text-red-400 text-sm font-semibold">Correct answer: <span className="font-bold">{currentQuestion.options[currentQuestion.correctAnswer]}</span></p></div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </main>
    </div>
  );
}
