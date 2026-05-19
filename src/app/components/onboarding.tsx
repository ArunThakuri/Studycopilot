import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    emoji: '📸',
    title: 'Snap Your Textbooks',
    description: 'Upload photos or scanned pages of your textbooks. Any subject, any language — StudyCopilot handles it all.',
    color: 'from-amber-400 to-orange-500',
    bg: 'from-amber-500/10 to-orange-500/5',
  },
  {
    emoji: '🤖',
    title: 'AI Works Its Magic',
    description: 'Our AI reads your images, extracts the text, and transforms it into structured, easy-to-read lessons automatically.',
    color: 'from-primary to-secondary',
    bg: 'from-primary/10 to-secondary/5',
  },
  {
    emoji: '📚',
    title: 'Explore Learning Modules',
    description: 'Get vocabulary with translations, audio lessons, summaries, step-by-step exercise solutions, and much more for every unit.',
    color: 'from-emerald-400 to-teal-500',
    bg: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    emoji: '🎯',
    title: 'Practice & Master Topics',
    description: 'Test yourself with interactive quizzes, get instant feedback, earn achievements, and track your progress over time.',
    color: 'from-violet-400 to-purple-500',
    bg: 'from-violet-500/10 to-purple-500/5',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const current = slides[step];
  const isLast = step === slides.length - 1;

  const next = () => {
    if (isLast) onComplete();
    else setStep(s => s + 1);
  };

  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl border-2 border-border shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-muted">
          <motion.div
            className={`h-full bg-gradient-to-r ${current.color} rounded-r-full`}
            initial={{ width: `${(step / slides.length) * 100}%` }}
            animate={{ width: `${((step + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        <div className="flex justify-end mb-2 pt-1">
          <button onClick={onComplete} className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted">
            Skip
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className={`w-24 h-24 bg-gradient-to-br ${current.bg} rounded-3xl flex items-center justify-center mb-6 border-2 border-border`}
            >
              <span className="text-5xl">{current.emoji}</span>
            </motion.div>

            <h2 className="text-2xl font-bold font-display text-foreground mb-3">{current.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-semibold max-w-sm">{current.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={step === 0}
            className="w-10 h-10 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all ${
                  i === step
                    ? `w-7 h-2.5 bg-gradient-to-r ${slides[i].color}`
                    : 'w-2.5 h-2.5 bg-muted hover:bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={next}
            className={`rounded-xl font-display font-semibold ${
              isLast
                ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
            }`}
          >
            {isLast ? "Let's Go!" : <><span>Next</span><ChevronRight className="w-4 h-4 ml-1" /></>}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
