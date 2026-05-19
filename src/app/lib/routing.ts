import { Subject } from '../App';
import { Unit } from '../components/units-dashboard';

export type View =
  | 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password'
  | 'dashboard' | 'select-subject' | 'create-subject'
  | 'units-dashboard' | 'create-unit' | 'learning-modules'
  | 'profile' | 'unit-text' | 'audio-lesson' | 'vocabulary'
  | 'summary' | 'exercises' | 'interactive' | 'practice'
  | 'model-question' | 'markdown-editor' | 'admin-panel';

interface RouteInfo {
  view: View;
  subjectId?: string;
  unitId?: string;
}

export function viewToPath(view: View, subjectId?: string, unitId?: string): string {
  switch (view) {
    case 'landing': return '/';
    case 'login': return '/login';
    case 'signup': return '/signup';
    case 'forgot-password': return '/forgot-password';
    case 'reset-password': return '/reset-password';
    case 'dashboard': return '/dashboard';
    case 'select-subject': return '/select-subject';
    case 'create-subject': return '/create-subject';
    case 'units-dashboard': return subjectId ? `/subject/${subjectId}/units` : '/dashboard';
    case 'create-unit': return subjectId ? `/subject/${subjectId}/create-unit` : '/dashboard';
    case 'learning-modules': return unitId ? `/unit/${unitId}/modules` : '/dashboard';
    case 'unit-text': return unitId ? `/unit/${unitId}/unit-text` : '/dashboard';
    case 'audio-lesson': return unitId ? `/unit/${unitId}/audio-lesson` : '/dashboard';
    case 'vocabulary': return unitId ? `/unit/${unitId}/vocabulary` : '/dashboard';
    case 'summary': return unitId ? `/unit/${unitId}/summary` : '/dashboard';
    case 'exercises': return unitId ? `/unit/${unitId}/exercises` : '/dashboard';
    case 'interactive': return unitId ? `/unit/${unitId}/interactive` : '/dashboard';
    case 'practice': return unitId ? `/unit/${unitId}/practice` : '/dashboard';
    case 'model-question': return unitId ? `/unit/${unitId}/model-question` : '/dashboard';
    case 'markdown-editor': return unitId ? `/unit/${unitId}/markdown` : '/dashboard';
    case 'profile': return '/profile';
    case 'admin-panel': return '/admin';
    default: return '/';
  }
}

export function parsePath(path: string): RouteInfo {
  if (path === '/' || path === '') return { view: 'landing' };
  if (path === '/login') return { view: 'login' };
  if (path === '/signup') return { view: 'signup' };
  if (path === '/forgot-password') return { view: 'forgot-password' };
  if (path === '/reset-password') return { view: 'reset-password' };
  if (path === '/dashboard') return { view: 'dashboard' };
  if (path === '/select-subject') return { view: 'select-subject' };
  if (path === '/create-subject') return { view: 'create-subject' };
  if (path === '/profile') return { view: 'profile' };
  if (path === '/admin') return { view: 'admin-panel' };

  const subjectUnitsMatch = path.match(/^\/subject\/([^/]+)\/units$/);
  if (subjectUnitsMatch) return { view: 'units-dashboard', subjectId: subjectUnitsMatch[1] };

  const subjectCreateMatch = path.match(/^\/subject\/([^/]+)\/create-unit$/);
  if (subjectCreateMatch) return { view: 'create-unit', subjectId: subjectCreateMatch[1] };

  const unitModuleMatch = path.match(/^\/unit\/([^/]+)\/modules$/);
  if (unitModuleMatch) return { view: 'learning-modules', unitId: unitModuleMatch[1] };

  const unitTextMatch = path.match(/^\/unit\/([^/]+)\/unit-text$/);
  if (unitTextMatch) return { view: 'unit-text', unitId: unitTextMatch[1] };

  const unitAudioMatch = path.match(/^\/unit\/([^/]+)\/audio-lesson$/);
  if (unitAudioMatch) return { view: 'audio-lesson', unitId: unitAudioMatch[1] };

  const unitVocabMatch = path.match(/^\/unit\/([^/]+)\/vocabulary$/);
  if (unitVocabMatch) return { view: 'vocabulary', unitId: unitVocabMatch[1] };

  const unitSummaryMatch = path.match(/^\/unit\/([^/]+)\/summary$/);
  if (unitSummaryMatch) return { view: 'summary', unitId: unitSummaryMatch[1] };

  const unitExercisesMatch = path.match(/^\/unit\/([^/]+)\/exercises$/);
  if (unitExercisesMatch) return { view: 'exercises', unitId: unitExercisesMatch[1] };

  const unitInteractiveMatch = path.match(/^\/unit\/([^/]+)\/interactive$/);
  if (unitInteractiveMatch) return { view: 'interactive', unitId: unitInteractiveMatch[1] };

  const unitPracticeMatch = path.match(/^\/unit\/([^/]+)\/practice$/);
  if (unitPracticeMatch) return { view: 'practice', unitId: unitPracticeMatch[1] };

  const unitModelMatch = path.match(/^\/unit\/([^/]+)\/model-question$/);
  if (unitModelMatch) return { view: 'model-question', unitId: unitModelMatch[1] };

  const unitMarkdownMatch = path.match(/^\/unit\/([^/]+)\/markdown$/);
  if (unitMarkdownMatch) return { view: 'markdown-editor', unitId: unitMarkdownMatch[1] };

  return { view: 'landing' };
}

export function findSubjectById(subjects: Subject[], subjectId: string): Subject | null {
  return subjects.find(s => s.id === subjectId) || null;
}

export function findUnitById(subjects: Subject[], unitId: string): { subject: Subject; unit: Unit } | null {
  for (const subject of subjects) {
    const unit = subject.units?.find(u => u.id === unitId);
    if (unit) return { subject, unit };
  }
  return null;
}
