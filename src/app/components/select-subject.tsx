import { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft, Search, Plus, BookMarked, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { StudyCopilotLogo } from './landing-page';
import { Card } from './ui/card';
import { Subject } from '../App';

interface SelectSubjectProps {
  userGrade: number;
  onBack: () => void;
  onSelectExisting: (subject: Subject) => void;
  onCreateNew: () => void;
}

const popularSubjects: { [key: number]: Subject[] } = {
  7: [
    { id: `pop-7-1`, title: 'General Science', icon: '🔬', color: '#10B981', grade: 7, units: [] },
    { id: `pop-7-2`, title: 'Mathematics', icon: '📐', color: '#3B82F6', grade: 7, units: [] },
    { id: `pop-7-3`, title: 'English', icon: '📖', color: '#8B5CF6', grade: 7, units: [] },
    { id: `pop-7-4`, title: 'Social Studies', icon: '🌍', color: '#F59E0B', grade: 7, units: [] },
    { id: `pop-7-5`, title: 'Nepali', icon: '📝', color: '#EF4444', grade: 7, units: [] },
    { id: `pop-7-6`, title: 'Computer Science', icon: '💻', color: '#06B6D4', grade: 7, units: [] },
  ],
  8: [
    { id: `pop-8-1`, title: 'Science', icon: '🔬', color: '#10B981', grade: 8, units: [] },
    { id: `pop-8-2`, title: 'Mathematics', icon: '📐', color: '#3B82F6', grade: 8, units: [] },
    { id: `pop-8-3`, title: 'English', icon: '📖', color: '#8B5CF6', grade: 8, units: [] },
    { id: `pop-8-4`, title: 'Social Studies', icon: '🌍', color: '#F59E0B', grade: 8, units: [] },
    { id: `pop-8-5`, title: 'Nepali', icon: '📝', color: '#EF4444', grade: 8, units: [] },
    { id: `pop-8-6`, title: 'Health & Population', icon: '🏥', color: '#EC4899', grade: 8, units: [] },
  ],
  9: [
    { id: `pop-9-1`, title: 'Science', icon: '🔬', color: '#10B981', grade: 9, units: [] },
    { id: `pop-9-2`, title: 'Opt. Mathematics', icon: '📐', color: '#3B82F6', grade: 9, units: [] },
    { id: `pop-9-3`, title: 'English', icon: '📖', color: '#8B5CF6', grade: 9, units: [] },
    { id: `pop-9-4`, title: 'Social Studies', icon: '🌍', color: '#F59E0B', grade: 9, units: [] },
    { id: `pop-9-5`, title: 'Account', icon: '💰', color: '#EF4444', grade: 9, units: [] },
    { id: `pop-9-6`, title: 'Computer Science', icon: '💻', color: '#06B6D4', grade: 9, units: [] },
  ],
  10: [
    { id: `pop-10-1`, title: 'Science & Technology', icon: '🔬', color: '#10B981', grade: 10, units: [] },
    { id: `pop-10-2`, title: 'Opt. Mathematics', icon: '📐', color: '#3B82F6', grade: 10, units: [] },
    { id: `pop-10-3`, title: 'English', icon: '📖', color: '#8B5CF6', grade: 10, units: [] },
    { id: `pop-10-4`, title: 'Social Studies', icon: '🌍', color: '#F59E0B', grade: 10, units: [] },
    { id: `pop-10-5`, title: 'Account', icon: '💰', color: '#EF4444', grade: 10, units: [] },
    { id: `pop-10-6`, title: 'Computer Science', icon: '💻', color: '#06B6D4', grade: 10, units: [] },
  ],
  11: [
    { id: `pop-11-1`, title: 'Physics', icon: '⚛️', color: '#3B82F6', grade: 11, units: [] },
    { id: `pop-11-2`, title: 'Chemistry', icon: '🧪', color: '#10B981', grade: 11, units: [] },
    { id: `pop-11-3`, title: 'Biology', icon: '🧬', color: '#8B5CF6', grade: 11, units: [] },
    { id: `pop-11-4`, title: 'Mathematics', icon: '📐', color: '#F59E0B', grade: 11, units: [] },
    { id: `pop-11-5`, title: 'English', icon: '📖', color: '#EF4444', grade: 11, units: [] },
    { id: `pop-11-6`, title: 'Computer Science', icon: '💻', color: '#06B6D4', grade: 11, units: [] },
  ],
  12: [
    { id: `pop-12-1`, title: 'Physics', icon: '⚛️', color: '#3B82F6', grade: 12, units: [] },
    { id: `pop-12-2`, title: 'Chemistry', icon: '🧪', color: '#10B981', grade: 12, units: [] },
    { id: `pop-12-3`, title: 'Biology', icon: '🧬', color: '#8B5CF6', grade: 12, units: [] },
    { id: `pop-12-4`, title: 'Mathematics', icon: '📐', color: '#F59E0B', grade: 12, units: [] },
    { id: `pop-12-5`, title: 'English', icon: '📖', color: '#EF4444', grade: 12, units: [] },
    { id: `pop-12-6`, title: 'Computer Science', icon: '💻', color: '#06B6D4', grade: 12, units: [] },
  ],
};

export function SelectSubject({ userGrade, onBack, onSelectExisting, onCreateNew }: SelectSubjectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const subjects = popularSubjects[userGrade] || popularSubjects[9] || [];
    if (searchQuery) {
      setFilteredSubjects(subjects.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredSubjects(subjects);
    }
  }, [searchQuery, userGrade]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-2xl border-b-2 border-primary/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-2.5">
            <StudyCopilotLogo />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground mb-1">Choose a Subject</h1>
            <p className="text-muted-foreground text-sm">Select from popular subjects for Grade {userGrade} or create your own</p>
          </div>
          <Button onClick={onCreateNew} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display shrink-0">
            <Plus className="w-4 h-4 mr-2" />Create Custom Subject
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="text" placeholder="Search subjects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-input-background border-border rounded-xl" />
          </div>
          <div className="flex bg-muted rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredSubjects.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}
            >
              {filteredSubjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="cursor-pointer"
                  onClick={() => {
                    const uniqueSubject = { ...subject, id: `subject-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
                    onSelectExisting(uniqueSubject);
                  }}
                >
                  <Card className="p-5 bg-card border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ backgroundColor: subject.color + '18' }}>
                        {subject.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-display text-foreground truncate">{subject.title}</h3>
                        <p className="text-sm text-muted-foreground font-semibold">Grade {subject.grade}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <BookMarked className="w-14 h-14 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-foreground font-bold font-display mb-2">No subjects found</h3>
              <p className="text-muted-foreground mb-6 text-sm">Try a different search or create a custom subject</p>
              <Button onClick={onCreateNew} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display">
                <Plus className="w-4 h-4 mr-2" />Create Custom Subject
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
