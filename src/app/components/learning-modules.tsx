import { useState } from 'react';
import { Sparkles, ArrowLeft, BookOpen, Loader2, RefreshCw, AlertCircle, CheckCircle2, MessageSquare, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { ModuleCard } from './module-card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { AppHeader } from './app-header';
import { UnitChat } from './unit-chat';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { hasUnitImages } from '../lib/unit-images-store';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface LearningModulesProps {
  subject: Subject;
  unit: Unit;
  user: User | null;
  onBack: () => void;
  onOpenModule: (moduleTitle: string) => void;
  onRegenerateModule: (moduleName: string) => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export function LearningModules({ subject, unit, user, onBack, onOpenModule, onRegenerateModule, onLogout, onOpenProfile }: LearningModulesProps) {
  const isComingSoonModule = (moduleName: string): boolean => {
    const moduleData = unit.content?.[moduleName];
    if (typeof moduleData === 'object' && moduleData?.data) {
      const data = moduleData.data;
      return typeof data === 'string' && data.includes('Coming Soon');
    }
    return false;
  };

  const getModuleStatus = (moduleName: string): string => {
    if (isComingSoonModule(moduleName)) return 'Coming Soon';
    const moduleData = unit.content?.[moduleName];
    if (!moduleData) return 'Not Available';
    if (typeof moduleData === 'object' && 'status' in moduleData) {
      switch (moduleData.status) {
        case 'pending': return 'Waiting...';
        case 'processing': return `Processing ${moduleData.progress || 0}%`;
        case 'error': return 'Error - Click to retry';
        case 'completed':
          if (Array.isArray(moduleData.data)) return `${moduleData.data.length} items`;
          return 'Ready';
        default: return 'Unknown';
      }
    }
    if (Array.isArray(moduleData)) return `${moduleData.length} items`;
    if (moduleData) return 'Ready';
    return 'Not Available';
  };

  const canOpenModule = (moduleName: string): boolean => {
    const moduleData = unit.content?.[moduleName];
    if (!moduleData) return false;
    if (typeof moduleData === 'object' && 'status' in moduleData) return moduleData.status === 'completed';
    return !!moduleData;
  };

  const isModuleProcessing = (moduleName: string): boolean => {
    const moduleData = unit.content?.[moduleName];
    return moduleData && typeof moduleData === 'object' && 'status' in moduleData && moduleData.status === 'processing';
  };

  const hasModuleError = (moduleName: string): boolean => {
    const moduleData = unit.content?.[moduleName];
    return moduleData && typeof moduleData === 'object' && 'status' in moduleData && moduleData.status === 'error';
  };

  const getModuleProgress = (moduleName: string): number => {
    const moduleData = unit.content?.[moduleName];
    return (moduleData && typeof moduleData === 'object' && moduleData.progress) || 0;
  };

  const handleModuleClick = (title: string, moduleName: string) => {
    if (isComingSoonModule(moduleName)) {
      toast.info('This module is coming soon! Stay tuned.');
      return;
    }
    if (canOpenModule(moduleName)) {
      onOpenModule(title);
    } else if (hasModuleError(moduleName)) {
      onRegenerateModule(moduleName);
      toast.info('Retrying module generation...');
    } else {
      toast.info('Module is still processing...');
    }
  };

  const modules = [
    { icon: '📚', title: 'Unit Text', moduleName: 'unitText', description: 'Read the complete unit content with audio support', color: 'indigo' as const, canRegenerate: false },
    { icon: '🎧', title: 'Audio Lesson', moduleName: 'audioLesson', description: 'Listen to AI-generated audio for every unit', color: 'blue' as const, canRegenerate: true },
    { icon: '📗', title: 'Vocabulary', moduleName: 'vocabulary', description: 'Learn difficult words with Nepali translations', color: 'green' as const, canRegenerate: true },
    { icon: '📋', title: 'Summary', moduleName: 'summary', description: 'Quick review of key concepts and formulas', color: 'purple' as const, canRegenerate: true },
    { icon: '📝', title: 'Exercises', moduleName: 'exercises', description: 'AI-solved exercises with step-by-step solutions', color: 'orange' as const, canRegenerate: true },
    { icon: '🎮', title: 'Interactive', moduleName: 'interactiveQuiz', description: 'Engaging quizzes with instant feedback', color: 'pink' as const, canRegenerate: true },
    { icon: '🎯', title: 'Practice', moduleName: 'practiceQuestions', description: 'Test your knowledge with practice questions', color: 'red' as const, canRegenerate: true },
    { icon: '📋', title: 'Model Question', moduleName: 'modelQuestion', description: 'Exam-style practice paper with mark distribution', color: 'yellow' as const, canRegenerate: true },
  ];

  // Admin-only modules
  const adminModules = [
    { icon: '📄', title: 'Source Markdown', moduleName: 'markdown', description: 'View and edit the structured content source', color: 'slate' as const, canRegenerate: false },
  ];

  const visibleModules = user?.isAdmin ? [...adminModules, ...modules] : modules;
  const totalModules = visibleModules.length;
  const completedModules = visibleModules.filter(m => canOpenModule(m.moduleName)).length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);
  const markdownContent = unit.content?.markdown?.data || unit.content?.markdown || '';
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} currentPage={`Grade ${subject.grade} • ${unit.title}`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Units
          </button>
        </div>

        {/* Unit Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6 border-2 border-border">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-primary/10">
                {subject.icon}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">{unit.title}</h1>
                <p className="text-sm text-muted-foreground font-semibold">{subject.title} &bull; Unit {unit.number}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unit.aiGenerated && (
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">AI Generated</span>
                </div>
              )}
              {markdownContent && (
                <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10 text-primary rounded-xl font-semibold">
                      <MessageSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">Ask AI</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[100%] sm:w-[500px] p-0 border-l-2 border-primary/10 shadow-2xl bg-card">
                    <div className="h-full flex flex-col">
                      <SheetHeader className="px-6 py-4 border-b border-border">
                        <SheetTitle className="flex items-center gap-2 text-foreground font-display">
                          <Sparkles className="w-5 h-5 text-primary" />Study Assistant
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex-1 overflow-hidden">
                        <UnitChat unitTitle={unit.title} markdownContent={markdownContent} embedded={true} />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-semibold">Overall Progress</span>
              <span className="text-foreground font-bold">{completedModules} / {totalModules} modules</span>
            </div>
            <Progress value={overallProgress} className="h-2.5 rounded-full" />
            {overallProgress < 100 && (
              <p className="text-sm text-muted-foreground flex items-center gap-2 font-semibold">
                <Loader2 className="w-3 h-3 animate-spin" />Modules are being generated in the background...
              </p>
            )}
          </div>
        </motion.div>

        {/* Learning Modules Grid */}
        <div>
          <h2 className="text-lg font-bold font-display text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />Learning Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {visibleModules.map((module, idx) => {
              const status = getModuleStatus(module.moduleName);
              const canOpen = canOpenModule(module.moduleName);
              const isProcessing = isModuleProcessing(module.moduleName);
              const hasError = hasModuleError(module.moduleName);
              const progress = getModuleProgress(module.moduleName);

              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative"
                >
                  <ModuleCard
                    {...module}
                    status={status}
                    onClick={() => handleModuleClick(module.title, module.moduleName)}
                    disabled={!canOpen && !isProcessing && !hasError}
                  />

                  {isProcessing && (
                    <div className="absolute inset-0 bg-card/90 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground font-semibold">Processing...</span>
                      {progress > 0 && <div className="w-3/4"><Progress value={progress} className="h-1.5 rounded-full" /></div>}
                    </div>
                  )}

                  {hasError && (
                    <div className="absolute inset-0 bg-destructive/5 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-destructive/20">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                      <span className="text-sm text-destructive font-semibold">Error occurred</span>
                      <Button size="sm" variant="outline" className="text-xs rounded-xl" onClick={() => { onRegenerateModule(module.moduleName); toast.info('Retrying...'); }}>
                        <RefreshCw className="w-3 h-3 mr-1" />Retry
                      </Button>
                    </div>
                  )}

                  {canOpen && module.canRegenerate && !isProcessing && !isComingSoonModule(module.moduleName) && (
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-card/90 hover:bg-card rounded-lg" onClick={(e) => { e.stopPropagation(); onRegenerateModule(module.moduleName); toast.info(`Regenerating ${module.title}...`); }}>
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  {canOpen && !isProcessing && !isComingSoonModule(module.moduleName) && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-primary rounded-full p-1 shadow-sm"><CheckCircle2 className="w-3 h-3 text-primary-foreground" /></div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Unit Images Card — admin only */}
            {user?.isAdmin && hasUnitImages(unit.id) && (
              <motion.div
                key="Unit Images"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: visibleModules.length * 0.05 }}
                className="relative"
              >
                <ModuleCard
                  icon="🖼️"
                  title="Unit Images"
                  moduleName="unitImages"
                  description="View the textbook images uploaded for this unit"
                  color="teal"
                  canRegenerate={false}
                  status="Ready"
                  onClick={() => onOpenModule('Unit Images')}
                />
                <div className="absolute top-2 left-2">
                  <div className="bg-primary rounded-full p-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
