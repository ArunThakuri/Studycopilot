import { BookOpen, Plus, ArrowLeft, CheckCircle, Clock, TrendingUp, LayoutGrid, List, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { UnitCard } from './unit-card';
import { Subject } from '../App';
import { AIGeneratedContent } from '../lib/types';
import { AppHeader } from './app-header';
import { useState } from 'react';
import { Input } from './ui/input';
import { motion } from 'motion/react';

export interface Unit {
  id: string;
  title: string;
  number: number;
  progress: number;
  totalModules: number;
  completedModules: number;
  lastAccessed?: string;
  aiGenerated?: boolean;
  content?: AIGeneratedContent;
  suggestedTitle?: string;
  imageCount?: number;
}

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface UnitsDashboardProps {
  subject: Subject;
  user: User | null;
  onBack: () => void;
  onAddUnit: () => void;
  onSelectUnit: (unit: Unit) => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onEditUnit?: (unitId: string, newTitle: string, images?: File[], markdownFile?: File, markdownContent?: string) => void;
  onDeleteUnit?: (unitId: string) => void;
  onAcceptSuggestion?: (unitId: string) => void;
  onRejectSuggestion?: (unitId: string) => void;
}

export function UnitsDashboard({ subject, user, onBack, onAddUnit, onSelectUnit, onLogout, onOpenProfile, onEditUnit, onDeleteUnit, onAcceptSuggestion, onRejectSuggestion }: UnitsDashboardProps) {
  const units = subject.units || [];
  const totalUnits = units.length;
  const completedUnits = units.filter(u => u.progress === 100).length;
  const inProgressUnits = units.filter(u => u.progress > 0 && u.progress < 100).length;
  const overallProgress = totalUnits > 0 ? Math.round(units.reduce((sum, u) => sum + u.progress, 0) / totalUnits) : 0;

  const [viewMode, setViewMode] = useState<'card' | 'list'>(() => {
    const saved = localStorage.getItem('units-view-mode');
    return (saved as 'card' | 'list') || 'card';
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = units.filter(unit =>
    unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (unit.number && unit.number.toString().includes(searchQuery))
  );

  const stats = [
    { icon: BookOpen, label: 'Total Units', value: totalUnits.toString(), color: 'bg-secondary/10 text-secondary' },
    { icon: CheckCircle, label: 'Completed', value: completedUnits.toString(), color: 'bg-primary/10 text-primary' },
    { icon: Clock, label: 'In Progress', value: inProgressUnits.toString(), color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
    { icon: TrendingUp, label: 'Overall Progress', value: `${overallProgress}%`, color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} currentPage={`${subject.icon} ${subject.title}`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />Back to Dashboard
        </button>

        {/* Subject Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-primary/10">
              {subject.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">{subject.title}</h1>
              <p className="text-sm text-muted-foreground font-semibold">Grade {subject.grade} &bull; {subject.publication || 'Custom Subject'}</p>
            </div>
          </div>
          <Button onClick={onAddUnit} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />Add New Unit
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-semibold tracking-wide">{stat.label}</p>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}><Icon className="w-5 h-5" /></div>
                </div>
                <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Overall Progress */}
        {totalUnits > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 border-2 border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold font-display text-foreground">Overall Progress</h2>
              <span className="text-sm text-muted-foreground font-semibold">{overallProgress}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-2.5 rounded-full" />
          </motion.div>
        )}

        {/* Units Section */}
        {totalUnits > 0 ? (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <h2 className="text-lg font-bold font-display text-foreground">Units ({filteredUnits.length})</h2>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search units..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 bg-input-background border-border rounded-xl" />
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1 flex-shrink-0">
                  <button onClick={() => setViewMode('card')} className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} onClick={() => onSelectUnit(unit)}
                    onEdit={(newTitle, images, markdownFile, markdownContent) => onEditUnit?.(unit.id, newTitle, images, markdownFile, markdownContent)}
                    onDelete={() => onDeleteUnit?.(unit.id)} onAcceptSuggestion={onAcceptSuggestion} onRejectSuggestion={onRejectSuggestion} />
                )) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground font-semibold">No units found matching "{searchQuery}"</div>
                )}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} onClick={() => onSelectUnit(unit)} viewMode="list"
                    onEdit={(newTitle, images, markdownFile, markdownContent) => onEditUnit?.(unit.id, newTitle, images, markdownFile, markdownContent)}
                    onDelete={() => onDeleteUnit?.(unit.id)} onAcceptSuggestion={onAcceptSuggestion} onRejectSuggestion={onRejectSuggestion} />
                )) : (
                  <div className="text-center py-12 text-muted-foreground font-semibold">No units found matching "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 sm:p-12 text-center border-2 border-border">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h2 className="text-foreground font-bold font-display text-lg mb-2">No units added yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm leading-relaxed">
              Start by adding your first unit. Upload textbook images and let AI create interactive learning content for you.
            </p>
            <Button onClick={onAddUnit} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display">
              <Plus className="w-4 h-4 mr-2" />Add Your First Unit
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
