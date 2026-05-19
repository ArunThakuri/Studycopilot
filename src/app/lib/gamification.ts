interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

interface LevelThreshold {
  level: number;
  xpRequired: number;
  title: string;
}

export const LEVELS: LevelThreshold[] = [
  { level: 1, xpRequired: 0, title: 'Novice Learner' },
  { level: 2, xpRequired: 100, title: 'Curious Mind' },
  { level: 3, xpRequired: 250, title: 'Knowledge Seeker' },
  { level: 4, xpRequired: 500, title: 'Study Warrior' },
  { level: 5, xpRequired: 1000, title: 'Brain Master' },
  { level: 6, xpRequired: 2000, title: 'Wisdom Sage' },
  { level: 7, xpRequired: 4000, title: 'Learning Legend' },
  { level: 8, xpRequired: 7000, title: 'Genius Level' },
  { level: 9, xpRequired: 12000, title: 'Scholar Supreme' },
  { level: 10, xpRequired: 20000, title: 'Grandmaster' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-unit', title: 'First Steps', description: 'Create your first unit', icon: '🚀', xp: 50 },
  { id: 'first-module', title: 'Module Explorer', description: 'Complete your first learning module', icon: '📚', xp: 30 },
  { id: 'five-modules', title: 'Getting Serious', description: 'Complete 5 learning modules', icon: '📝', xp: 100 },
  { id: 'all-modules', title: 'Completionist', description: 'Complete all 9 modules in a unit', icon: '🏆', xp: 200 },
  { id: 'quiz-ace', title: 'Quiz Ace', description: 'Score 100% on an interactive quiz', icon: '🎯', xp: 150 },
  { id: 'quiz-good', title: 'Quiz Star', description: 'Score 80%+ on an interactive quiz', icon: '⭐', xp: 75 },
  { id: 'three-units', title: 'Unit Trio', description: 'Create 3 units', icon: '📖', xp: 120 },
  { id: 'ten-units', title: 'Double Digits', description: 'Create 10 units', icon: '💪', xp: 300 },
  { id: 'daily-streak-3', title: 'Streak Builder', description: '3-day learning streak', icon: '🔥', xp: 80 },
  { id: 'daily-streak-7', title: 'Weekly Warrior', description: '7-day learning streak', icon: '⚡', xp: 200 },
  { id: 'daily-streak-30', title: 'Monthly Master', description: '30-day learning streak', icon: '🌟', xp: 500 },
  { id: 'subject-master', title: 'Subject Expert', description: 'Complete all units in a subject', icon: '🎓', xp: 400 },
  { id: 'vocab-star', title: 'Word Collector', description: 'Add 20 custom vocabulary words', icon: '📗', xp: 100 },
];

export function getLevel(xp: number): LevelThreshold {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number): LevelThreshold | null {
  const current = getLevel(xp);
  const idx = LEVELS.indexOf(current);
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

export function getLevelProgress(xp: number): number {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  return Math.round(((xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100);
}

export function getXPForAction(action: string): number {
  const xpMap: Record<string, number> = {
    create_unit: 25,
    complete_module: 30,
    complete_quiz: 50,
    perfect_quiz: 100,
    complete_unit: 100,
    add_vocabulary: 5,
    daily_login: 10,
  };
  return xpMap[action] || 0;
}

export function calculateTotalXP(achievements: string[]): number {
  return achievements.reduce((total, id) => {
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    return total + (achievement?.xp || 0);
  }, 0);
}

export function checkAchievements(stats: {
  totalUnits: number;
  completedModules: number;
  quizScore?: number;
  streak?: number;
  vocabWords?: number;
  completedUnits?: number;
}): Achievement[] {
  const unlocked: Achievement[] = [];

  if (stats.totalUnits >= 1) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'first-unit')!);
  if (stats.completedModules >= 1) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'first-module')!);
  if (stats.completedModules >= 5) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'five-modules')!);
  if (stats.completedModules >= 9) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'all-modules')!);
  if (stats.quizScore === 100) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'quiz-ace')!);
  if (stats.quizScore && stats.quizScore >= 80) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'quiz-good')!);
  if (stats.totalUnits >= 3) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'three-units')!);
  if (stats.totalUnits >= 10) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'ten-units')!);
  if (stats.streak && stats.streak >= 3) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'daily-streak-3')!);
  if (stats.streak && stats.streak >= 7) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'daily-streak-7')!);
  if (stats.streak && stats.streak >= 30) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'daily-streak-30')!);
  if (stats.vocabWords && stats.vocabWords >= 20) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'vocab-star')!);
  if (stats.completedUnits && stats.completedUnits >= 1) unlocked.push(ACHIEVEMENTS.find(a => a.id === 'subject-master')!);

  return unlocked.filter(a => a !== undefined);
}
