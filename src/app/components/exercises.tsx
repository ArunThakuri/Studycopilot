import { ArrowLeft, ChevronRight, ChevronLeft, Loader2, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { ExerciseRenderer } from './exercise-renderer';
import { AppHeader } from './app-header';
import { motion } from 'motion/react';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface ExercisesProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onNextModule: () => void;
  onPreviousModule: () => void;
  onRegenerate?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

export function Exercises({ subject, unit, user, onBack, onNextModule, onPreviousModule, onRegenerate, onLogout, onOpenProfile, onNavigateHome }: ExercisesProps) {
  const exercisesModule = unit.content?.exercises;
  const exercisesText = exercisesModule && typeof exercisesModule === 'object' && 'data' in exercisesModule
    ? (typeof exercisesModule.data === 'string' ? exercisesModule.data : null) : null;
  const status = exercisesModule?.status || 'pending';
  const progress = exercisesModule?.progress || 0;
  const error = exercisesModule?.error;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Exercises`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        {status === 'processing' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-10 text-center bg-card rounded-2xl border-2 border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2">Generating Exercises...</h3>
              <p className="text-sm text-muted-foreground font-semibold mb-6">AI is creating exercise solutions</p>
              <Progress value={progress} className="w-48 mx-auto h-2.5 rounded-full" />
            </Card>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-10 text-center bg-card rounded-2xl border-2 border-destructive/20">
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2">Generation Failed</h3>
              <p className="text-sm text-muted-foreground font-semibold mb-6">{error || 'An error occurred'}</p>
              {onRegenerate && <Button onClick={onRegenerate} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display"><RefreshCw className="w-4 h-4 mr-2" />Try Again</Button>}
            </Card>
          </motion.div>
        )}

        {status === 'pending' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-10 text-center bg-card rounded-2xl border-2 border-border">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2">Waiting to Process</h3>
              <p className="text-sm text-muted-foreground font-semibold">Exercise generation will start shortly</p>
            </Card>
          </motion.div>
        )}

        {status === 'completed' && exercisesText && (
          <>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-lg shadow-md shadow-primary/10">
                  {subject.icon || '📚'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">Exercise Solutions</h1>
                  <p className="text-sm text-muted-foreground font-semibold">{unit.title}</p>
                </div>
              </div>
              {onRegenerate && (
                <Button variant="outline" size="sm" onClick={onRegenerate} className="border-2 border-border rounded-xl font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />Regenerate
                </Button>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <ExerciseRenderer content={exercisesText} />
            </motion.div>
          </>
        )}

        {status === 'completed' && !exercisesText && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-10 text-center bg-card rounded-2xl border-2 border-border">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2">No Exercises Available</h3>
              <p className="text-sm text-muted-foreground font-semibold mb-6">The AI couldn't generate exercises</p>
              {onRegenerate && <Button variant="outline" onClick={onRegenerate} className="border-2 border-border rounded-xl"><RefreshCw className="w-4 h-4 mr-2" />Regenerate</Button>}
            </Card>
          </motion.div>
        )}

        {status === 'completed' && (
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onPreviousModule} className="border-2 border-border rounded-xl font-semibold">
              <ChevronLeft className="w-4 h-4 mr-1.5" />Previous: Summary
            </Button>
            <Button onClick={onNextModule} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
              Next: Interactive Quiz<ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
