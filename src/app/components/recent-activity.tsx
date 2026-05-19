import { Sparkles, Clock, Trophy, BookOpen, Brain, MessageCircle, PenLine, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export interface Activity {
  id: string;
  type: 'module_completed' | 'quiz_completed' | 'unit_completed' | 'vocabulary_practiced' | 'exercise_solved';
  subjectTitle: string;
  unitTitle?: string;
  moduleTitle?: string;
  score?: number;
  itemsCount?: number;
  timestamp: number;
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeConfig: Record<string, { icon: typeof BookOpen; color: string; bg: string }> = {
  unit_completed:        { icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  module_completed:      { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  quiz_completed:        { icon: Brain, color: 'text-secondary', bg: 'bg-secondary/10' },
  vocabulary_practiced:  { icon: MessageCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  exercise_solved:       { icon: PenLine, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityText = (activity: Activity): string => {
    switch (activity.type) {
      case 'unit_completed': return `Completed ${activity.unitTitle} in ${activity.subjectTitle}`;
      case 'module_completed': return `Finished ${activity.moduleTitle} for ${activity.unitTitle}`;
      case 'quiz_completed': return `Scored ${activity.score}% in ${activity.subjectTitle} Quiz`;
      case 'vocabulary_practiced': return `Practiced ${activity.itemsCount} words in ${activity.subjectTitle}`;
      case 'exercise_solved': return `Solved ${activity.itemsCount} exercises in ${activity.unitTitle}`;
      default: return 'Activity recorded';
    }
  };

  const getTimeAgo = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const sortedActivities = [...activities].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-lg font-bold font-display text-foreground">Recent Activity</h2>
      </div>

      <div className="bg-card rounded-2xl border-2 border-border p-5">
        {sortedActivities.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h3 className="text-foreground font-bold font-display mb-2">No Activity Yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Start learning to see your recent activities here. Complete modules, practice vocabulary, and take quizzes!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-1">
            {sortedActivities.map((activity, idx) => {
              const config = typeConfig[activity.type] || typeConfig.module_completed;
              const Icon = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/50 transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-semibold truncate">{getActivityText(activity)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold flex-shrink-0">{getTimeAgo(activity.timestamp)}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
