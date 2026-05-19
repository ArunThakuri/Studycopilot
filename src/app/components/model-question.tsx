import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, Printer, Loader2, RefreshCw } from 'lucide-react';
import { MarkdownRenderer } from './markdown-renderer';
import { Button } from './ui/button';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { AppHeader } from './app-header';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface ModelQuestionProps {
  subject: Subject;
  unit: Unit;
  user: User | null;
  onBack: () => void;
  onRegenerate: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export function ModelQuestion({ subject, unit, user, onBack, onRegenerate, onLogout, onOpenProfile }: ModelQuestionProps) {
  const [modelQuestionData, setModelQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = unit.content?.modelQuestion;
    if (data && typeof data === 'object' && 'data' in data) {
      if (data.status === 'completed') setModelQuestionData(data.data);
    } else if (typeof data === 'string') {
      setModelQuestionData(data);
    }
    setIsLoading(false);
  }, [unit]);

  const handlePrint = () => {
    window.print();
    toast.success('Opening print dialog...');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([modelQuestionData || ''], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${unit.title}_model_question.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Downloading model question...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} currentPage={`${unit.title} • Model Question`} />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
            <p className="text-muted-foreground font-semibold">Loading model question...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!modelQuestionData) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} currentPage={`${unit.title} • Model Question`} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-foreground font-bold font-display text-lg mb-2">Model Question Not Available</h2>
            <p className="text-muted-foreground font-semibold mb-6">This module is still being generated or encountered an error.</p>
            <Button onClick={onRegenerate} variant="outline" className="border-2 border-border rounded-xl font-semibold">
              <RefreshCw className="w-4 h-4 mr-2" />Regenerate
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} currentPage={`${unit.title} • Model Question`} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6 print:hidden">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 mb-6 print:shadow-none">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-xl shadow-md shadow-amber-400/20">
                📋
              </div>
              <div>
                <h1 className="text-foreground font-bold font-display text-xl">Model Question</h1>
                <p className="text-muted-foreground text-sm font-semibold">Exam-style practice paper • {unit.title}</p>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={onRegenerate} className="border-2 border-border rounded-xl font-semibold">
                <RefreshCw className="w-4 h-4 mr-2" />Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="border-2 border-border rounded-xl font-semibold">
                <Download className="w-4 h-4 mr-2" />Download
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="border-2 border-border rounded-xl font-semibold">
                <Printer className="w-4 h-4 mr-2" />Print
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border-2 border-border print:shadow-none">
          <div className="prose prose-sm sm:prose max-w-none p-8">
            <MarkdownRenderer content={modelQuestionData} />
          </div>
        </motion.div>

        <div className="mt-6 bg-secondary/5 border-2 border-secondary/15 rounded-2xl p-4 print:hidden">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-foreground font-bold font-display text-sm mb-1">How to use this model question:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 font-semibold">
                <li>• Print this page to create a physical test paper</li>
                <li>• Use it for timed practice sessions</li>
                <li>• Compare your answers with the solved exercises module</li>
                <li>• Click "Regenerate" to get a different set of questions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
