import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  status: string;
  color: 'slate' | 'indigo' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red' | 'yellow';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const colorStyles: Record<string, { bg: string; border: string; accent: string; glow: string }> = {
  slate:  { bg: 'bg-card', border: 'border-border hover:border-slate-400/50', accent: 'bg-slate-100 text-slate-600', glow: 'hover:shadow-slate-200/50' },
  indigo: { bg: 'bg-card', border: 'border-border hover:border-indigo-400/50', accent: 'bg-indigo-50 text-indigo-600', glow: 'hover:shadow-indigo-200/50' },
  blue:   { bg: 'bg-card', border: 'border-border hover:border-blue-400/50', accent: 'bg-blue-50 text-blue-600', glow: 'hover:shadow-blue-200/50' },
  green:  { bg: 'bg-card', border: 'border-border hover:border-primary/40', accent: 'bg-primary/10 text-primary', glow: 'hover:shadow-primary/20' },
  purple: { bg: 'bg-card', border: 'border-border hover:border-purple-400/50', accent: 'bg-purple-50 text-purple-600', glow: 'hover:shadow-purple-200/50' },
  orange: { bg: 'bg-card', border: 'border-border hover:border-orange-400/50', accent: 'bg-orange-50 text-orange-600', glow: 'hover:shadow-orange-200/50' },
  pink:   { bg: 'bg-card', border: 'border-border hover:border-pink-400/50', accent: 'bg-pink-50 text-pink-600', glow: 'hover:shadow-pink-200/50' },
  red:    { bg: 'bg-card', border: 'border-border hover:border-red-400/50', accent: 'bg-red-50 text-red-600', glow: 'hover:shadow-red-200/50' },
  yellow: { bg: 'bg-card', border: 'border-border hover:border-amber-400/50', accent: 'bg-amber-50 text-amber-600', glow: 'hover:shadow-amber-200/50' },
};

export function ModuleCard({ icon, title, description, status, color, onClick, disabled, className }: ModuleCardProps) {
  const styles = colorStyles[color] || colorStyles.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!disabled ? { scale: 1.02, y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={disabled ? undefined : onClick}
      className={`${styles.bg} border-2 ${styles.border} rounded-2xl p-5 relative group transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : `cursor-pointer hover:shadow-xl ${styles.glow}`
      } ${className || ''}`}
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${styles.accent} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
          {icon}
        </div>
        <div className="rounded-full p-2 bg-muted/50 group-hover:bg-accent transition-all">
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-foreground font-bold text-sm mb-1 font-display">{title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>

      {/* Status Badge */}
      <div className="flex items-center">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${
          status === 'Coming Soon'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            : styles.accent
        }`}>
          {status === 'Ready' && <Sparkles className="w-3 h-3" />}
          {status === 'Coming Soon' && <Clock className="w-3 h-3" />}
          {status}
        </span>
      </div>
    </motion.div>
  );
}
