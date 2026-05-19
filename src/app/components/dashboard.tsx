import { BookOpen, Plus, LayoutGrid, List, TrendingUp, CheckCircle, Flame, ArrowRight, Sparkles, Upload, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Subject } from '../App';
import { AppHeader } from './app-header';
import { SubjectCard } from './subject-card';
import { useState, useMemo } from 'react';
import { Activity } from './recent-activity';
import { motion } from 'motion/react';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  onOpenProfile: () => void;
  subjects: Subject[];
  activities: Activity[];
  onAddNewSubject: () => void;
  onViewSubject: (subject: Subject) => void;
  onEditSubject?: (subjectId: string, newTitle: string) => void;
  onDeleteSubject?: (subjectId: string) => void;
}

function getStudyStreak(): { current: number; longest: number; todayDone: boolean } {
  const data = localStorage.getItem('studycopilot_streak');
  if (!data) return { current: 0, longest: 0, todayDone: false };
  try { return JSON.parse(data); } catch { return { current: 0, longest: 0, todayDone: false }; }
}

function updateStudyStreak(activities: Activity[]): { current: number; longest: number; todayDone: boolean } {
  if (activities.length === 0) return { current: 0, longest: 0, todayDone: false };
  const today = new Date().toDateString();
  const activityDays = [...new Set(activities.map(a => new Date(a.timestamp).toDateString()))];
  const todayDone = activityDays.includes(today);
  let streak = 0;
  const sortedDays = activityDays.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
  if (sortedDays.length > 0) {
    const diffFromToday = Math.floor((new Date().getTime() - sortedDays[0].getTime()) / (1000 * 60 * 60 * 24));
    if (diffFromToday <= 1) {
      streak = 1;
      for (let i = 1; i < sortedDays.length; i++) {
        const diff = Math.floor((sortedDays[i - 1].getTime() - sortedDays[i].getTime()) / (1000 * 60 * 60 * 24));
        if (diff === 1) streak++; else break;
      }
    }
  }
  const prev = getStudyStreak();
  const result = { current: streak, longest: Math.max(streak, prev.longest), todayDone };
  localStorage.setItem('studycopilot_streak', JSON.stringify(result));
  return result;
}

export function Dashboard({ user, onLogout, onOpenProfile, subjects, activities, onAddNewSubject, onViewSubject, onEditSubject, onDeleteSubject }: DashboardProps) {
  const [viewMode, setViewMode] = useState<'card' | 'list'>(() => {
    const saved = localStorage.getItem('dashboard-view-mode');
    return (saved as 'card' | 'list') || 'card';
  });

  const streak = useMemo(() => updateStudyStreak(activities), [activities]);

  const totalSubjects = subjects.length;
  const totalUnits = subjects.reduce((sum, s) => sum + (s.units?.length || 0), 0);
  const totalCompleted = subjects.reduce((sum, s) => sum + (s.units?.filter(u => u.progress === 100).length || 0), 0);
  const overallProgress = totalUnits > 0 ? Math.round(subjects.reduce((sum, s) => sum + (s.units || []).reduce((uSum, u) => uSum + (u.progress || 0), 0), 0) / totalUnits) : 0;

  const greetingName = user?.name?.split(' ')[0] || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const recentUnit = useMemo(() => {
    let latest: { subject: Subject; unit: any; time: string } | null = null;
    for (const subject of subjects) {
      for (const unit of (subject.units || [])) {
        if (unit.lastAccessed && (!latest || unit.lastAccessed > latest.time)) {
          latest = { subject, unit, time: unit.lastAccessed };
        }
      }
    }
    return latest;
  }, [subjects]);

  const isNewUser = subjects.length === 0 && activities.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} onNavigateHome={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Greeting + Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 rounded-2xl border-2 border-primary/10 p-6 sm:p-8 mb-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                {greeting}, {greetingName} <span className="inline-block animate-float">👋</span>
              </h1>
              <p className="text-muted-foreground mt-1.5">
                {isNewUser
                  ? "Welcome! Let's set up your first subject."
                  : totalUnits > 0
                  ? `You have ${totalUnits} unit${totalUnits !== 1 ? 's' : ''} across ${totalSubjects} subject${totalSubjects !== 1 ? 's' : ''}.`
                  : 'Start by creating your first subject.'}
              </p>
            </div>
            {!isNewUser && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-5 py-3 shrink-0"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${streak.todayDone ? 'bg-primary/15' : 'bg-muted'}`}>
                  <Flame className={`w-5 h-5 ${streak.todayDone ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <div className="text-lg font-bold font-display text-foreground leading-none">{streak.current} day{streak.current !== 1 ? 's' : ''}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-semibold">
                    {streak.todayDone ? 'Streak active! 🔥' : 'Study today to keep streak'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* New User Onboarding */}
        {isNewUser && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="p-0 bg-card border-2 border-border overflow-hidden mb-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {[
                  { step: 1, icon: BookOpen, title: 'Create a Subject', desc: 'Pick from popular subjects or create your own (e.g., Physics, Math).' },
                  { step: 2, icon: Upload, title: 'Add a Unit', desc: 'Upload textbook photos or paste markdown. AI extracts the content.' },
                  { step: 3, icon: Sparkles, title: 'Learn with AI', desc: 'Get 8 AI modules: vocabulary, summary, quizzes, exercises, and more.' },
                ].map((item, idx) => (
                  <div key={item.step} className={`p-6 ${idx === 0 ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-display ${idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {item.step}
                      </div>
                      <h3 className="font-bold font-display text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-muted/30 border-t border-border">
                <Button onClick={onAddNewSubject} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display">
                  <Plus className="w-4 h-4 mr-2" />Create Your First Subject<ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Continue Learning */}
        {recentUnit && !isNewUser && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card
              className="p-5 bg-gradient-to-r from-secondary/10 to-primary/5 border-2 border-border hover:border-primary/30 transition-all cursor-pointer group rounded-2xl"
              onClick={() => onViewSubject(recentUnit.subject)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-2xl shrink-0">
                  {recentUnit.subject.icon || '📚'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-semibold mb-0.5">Continue where you left off</p>
                  <h3 className="font-bold font-display text-foreground truncate">{recentUnit.unit.title}</h3>
                  <p className="text-xs text-muted-foreground">{recentUnit.subject.title}</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shrink-0 gap-1.5 rounded-xl font-display">
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stats */}
        {!isNewUser && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { label: 'Subjects', value: totalSubjects, icon: BookOpen, color: 'bg-primary/10 text-primary' },
              { label: 'Units', value: totalUnits, icon: Target, color: 'bg-secondary/10 text-secondary' },
              { label: 'Completed', value: totalCompleted, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
              { label: 'Progress', value: `${overallProgress}%`, icon: TrendingUp, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 bg-card border-2 border-border rounded-2xl hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display text-foreground leading-none">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Subjects Section */}
        {!isNewUser && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-display text-foreground">Your Subjects</h2>
              <div className="flex items-center gap-2">
                <div className="flex bg-muted rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'card' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <Button size="sm" onClick={onAddNewSubject} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display">
                  <Plus className="w-4 h-4 mr-1.5" />Add Subject
                </Button>
              </div>
            </div>

            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject, i) => {
                  const unitCount = subject.units?.length || 0;
                  const completed = subject.units?.filter(u => u.progress === 100).length || 0;
                  const progress = unitCount > 0 ? Math.round(subject.units.reduce((s, u) => s + (u.progress || 0), 0) / unitCount) : 0;
                  return (
                    <motion.div key={subject.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <SubjectCard
                        title={subject.title} units={unitCount} completed={completed} progress={progress}
                        viewMode="card" icon={subject.icon} color={subject.color} grade={subject.grade}
                        onClick={() => onViewSubject(subject)}
                        onEdit={(newTitle) => onEditSubject?.(subject.id, newTitle)}
                        onDelete={() => onDeleteSubject?.(subject.id)}
                      />
                    </motion.div>
                  );
                })}
                <Card
                  className="p-5 bg-card border-2 border-dashed border-border hover:border-primary/40 transition-all cursor-pointer flex items-center justify-center min-h-[200px] rounded-2xl group"
                  onClick={onAddNewSubject}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-all group-hover:scale-110">
                      <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Add Subject</p>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-2">
                {subjects.map((subject) => {
                  const unitCount = subject.units?.length || 0;
                  const completed = subject.units?.filter(u => u.progress === 100).length || 0;
                  const progress = unitCount > 0 ? Math.round(subject.units.reduce((s, u) => s + (u.progress || 0), 0) / unitCount) : 0;
                  return (
                    <SubjectCard
                      key={subject.id} title={subject.title} units={unitCount} completed={completed} progress={progress}
                      viewMode="list" icon={subject.icon} color={subject.color} grade={subject.grade}
                      onClick={() => onViewSubject(subject)}
                      onEdit={(newTitle) => onEditSubject?.(subject.id, newTitle)}
                      onDelete={() => onDeleteSubject?.(subject.id)}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Recent Activity */}
        {activities.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold font-display text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-2">
              {activities.slice(0, 5).map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border-2 border-border hover:border-primary/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-semibold truncate">
                      {activity.type.replace(/_/g, ' ')} in <span className="text-primary">{activity.subjectTitle}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleDateString()}</p>
                  </div>
                  {activity.score !== undefined && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{activity.score}%</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
