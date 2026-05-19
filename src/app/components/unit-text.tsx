import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
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

interface UnitTextProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onNextModule: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

function stripHTMLToMarkdown(text: string): string {
  if (!text.includes('<div') && !text.includes('<p ') && !text.includes('<h2') && !text.includes('<ul')) return text;
  let cleaned = text
    .replace(/<div[^>]*>/gi, '\n').replace(/<\/div>/gi, '\n')
    .replace(/<h2[^>]*>/gi, '\n## ').replace(/<\/h2>/gi, '\n')
    .replace(/<h3[^>]*>/gi, '\n### ').replace(/<\/h3>/gi, '\n')
    .replace(/<p[^>]*>/gi, '\n').replace(/<\/p>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ').replace(/<\/li>/gi, '\n')
    .replace(/<strong[^>]*>/gi, '**').replace(/<\/strong>/gi, '**')
    .replace(/<em[^>]*>/gi, '*').replace(/<\/em>/gi, '*')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  return cleaned;
}

export function UnitText({ subject, unit, user, onBack, onNextModule, onLogout, onOpenProfile, onNavigateHome }: UnitTextProps) {
  let displayContent = unit.content?.markdown || unit.content?.unitText || 'No content available. Please upload images to generate unit content.';
  displayContent = stripHTMLToMarkdown(displayContent);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Unit Text`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-lg shadow-md shadow-primary/10">
              {subject.icon || '📚'}
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">{unit.title}</h1>
          </div>
          <p className="text-sm text-muted-foreground font-semibold ml-[52px]">{subject.title} — Unit {unit.number}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border-2 border-border p-6 sm:p-8 mb-6">
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={displayContent} />
          </div>
        </motion.div>

        <div className="flex justify-end">
          <Button onClick={onNextModule} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
            Next: Audio Lesson
            <ChevronRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </main>
    </div>
  );
}
