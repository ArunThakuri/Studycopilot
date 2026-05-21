import { useState, useEffect } from 'react';
import { LandingPage } from './components/landing-page';
import { Dashboard } from './components/dashboard';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { ForgotPassword } from './components/forgot-password';
import { ResetPassword } from './components/reset-password';
import { CreateSubject } from './components/create-subject';
import { UnitsDashboard, Unit } from './components/units-dashboard';
import { CreateUnit } from './components/create-unit';
import { LearningModules } from './components/learning-modules';
import { Profile } from './components/profile';
import { UnitText } from './components/unit-text';
import { Vocabulary } from './components/vocabulary';
import { Summary } from './components/summary';
import { Exercises } from './components/exercises';
import { InteractiveLearning } from './components/interactive-learning';
import { Practice } from './components/practice';
import { AudioLesson } from './components/audio-lesson';
import { ModelQuestion } from './components/model-question';
import { SelectSubject } from './components/select-subject';
import { MarkdownEditor } from './components/markdown-editor';
import { UnitImages } from './components/unit-images';
import { AdminPanel } from './components/admin-panel';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { initializeAIProvider } from './lib/ai-provider';
import { AI_PROVIDER } from './lib/config';
import { validateSession, signOut, getStoredUser, setupAutoRefresh, handleOAuthCallback, deleteAccount, cleanupExpiredDeletedAccounts, checkDeletedAccount, recoverAccount } from './lib/auth-service';
import { saveUserData, loadUserData } from './lib/data-service';

import { Onboarding } from './components/onboarding';
import { ThemeProvider } from './components/theme-provider';
import { viewToPath, parsePath, findSubjectById, findUnitById, generateSlug, View as RouteView } from './lib/routing';

type View = RouteView;

export interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
  grade: number;
  publication?: string;
  author?: string;
  isPreloaded?: boolean;
  units: Unit[];
  progress?: number;
  totalUnits?: number;
  completedUnits?: number;
  slug?: string;
}

export interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
  plan?: 'free' | 'pro' | 'premium';
  isAdmin?: boolean;

  district?: string;
  school?: string;
  dateOfBirth?: string;
}

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

// Admin email configuration - CHANGE THIS TO YOUR EMAIL
// NOTE: Emails must be in lowercase
const ADMIN_EMAILS = [
  'winnerarun5@gmail.com',
  'looserarun5@gmail.com',
];

// Helper function to check if user is admin
const isUserAdmin = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pendingAdminRedirect, setPendingAdminRedirect] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    // Load subjects from localStorage on initial mount
    const saved = localStorage.getItem('studycopilot_subjects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading subjects from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [urlProcessed, setUrlProcessed] = useState(false);

  // Migrate existing subjects to add slugs once data is loaded
  useEffect(() => {
    if (!isSessionChecked) return;
    const needsMigration = subjects.some(s => !s.slug);
    if (needsMigration) {
      const existingSlugs = subjects.map(s => s.slug).filter(Boolean) as string[];
      const migrated = subjects.map(s => {
        if (s.slug) return s;
        const slug = generateSlug(s.title, existingSlugs);
        existingSlugs.push(slug);
        return { ...s, slug };
      });
      setSubjects(migrated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSessionChecked, subjects]);
  const [activities, setActivities] = useState<Activity[]>(() => {
    // Load activities from localStorage on initial mount
    const saved = localStorage.getItem('studycopilot_activities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading activities from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  
  // Persist subjects to localStorage and backend whenever they change
  useEffect(() => {
    if (subjects.length > 0 && user) {
      localStorage.setItem('studycopilot_subjects', JSON.stringify(subjects));
      saveUserData(subjects).catch(err => {
        console.error('Failed to save to backend:', err);
      });
    }
  }, [subjects, user]);

  // Persist activities to localStorage whenever they change
  useEffect(() => {
    if (activities.length > 0 && user) {
      localStorage.setItem('studycopilot_activities', JSON.stringify(activities));
    }
  }, [activities, user]);

  // Function to add a new activity
  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setActivities(prev => [newActivity, ...prev]);
  };
  
  // Keep selectedUnit in sync with subjects state
  useEffect(() => {
    if (selectedUnit && selectedSubject && subjects.length > 0) {
      // Find the updated subject in the subjects array
      const updatedSubject = subjects.find(s => s.id === selectedSubject.id);
      if (updatedSubject && updatedSubject.units) {
        // Find the updated unit
        const updatedUnit = updatedSubject.units.find(u => u.id === selectedUnit.id);
        if (updatedUnit) {
          // Check if unit data has changed
          const currentUnitStr = JSON.stringify(selectedUnit);
          const updatedUnitStr = JSON.stringify(updatedUnit);
          
          if (currentUnitStr !== updatedUnitStr) {
            console.log('🔄 Syncing selected unit with latest data');
            setSelectedUnit(updatedUnit);
            setSelectedSubject(updatedSubject);
          }
        }
      }
    }
  }, [subjects]);
  
  // On initial mount, restore from localStorage
  useEffect(() => {
    const savedSubjectId = localStorage.getItem('selected_subject_id');
    const savedUnitId = localStorage.getItem('selected_unit_id');
    
    if (savedSubjectId && subjects.length > 0 && !selectedSubject) {
      const subject = subjects.find(s => s.id === savedSubjectId);
      if (subject) {
        setSelectedSubject(subject);
        console.log('✅ Restored selected subject:', subject.title);
        
        if (savedUnitId) {
          const unit = subject.units.find(u => u.id === savedUnitId);
          if (unit) {
            setSelectedUnit(unit);
            console.log('✅ Restored selected unit:', unit.title);
          }
        }
      }
    }
  }, [subjects, selectedSubject]);

  // Initialize AI provider on app load
  useEffect(() => {
    console.log('🚀 Initializing StudyCopilot AI...');
    
    initializeAIProvider('ollama');
    console.log('AI Provider: Ollama (Kimi 2.6)');
  }, []);

  // Check for existing session on app load and handle OAuth/reset callbacks
  useEffect(() => {
    console.log('🔐 Checking for existing session...');
    
    // Clean up expired deleted accounts on app load
    cleanupExpiredDeletedAccounts();
    
    const checkSession = async () => {
      const hash = window.location.hash;

      // Screenshot mode: check for view parameter in hash
      const hashParams = new URLSearchParams(hash.replace('#', ''));

      // Auto admin login via #admin=1 (bypasses Supabase auth)
      if (hashParams.get('admin') === '1') {
        console.log('🔑 Auto admin login via #admin=1');
        setUser({
          name: 'Admin User',
          email: 'winnerarun5@gmail.com',
          grade: 10,
          isAdmin: true,
          plan: 'premium',
        });
        setCurrentView('admin-panel');
        window.history.replaceState(null, '', window.location.pathname);
        setIsSessionChecked(true);
        return;
      }

      const screenshotView = hashParams.get('view') as View;
      if (screenshotView) {
        console.log('📸 Screenshot mode:', screenshotView);

        setCurrentView(screenshotView);
        setIsSessionChecked(true);
        return;
      }

      // Admin panel direct URL (#admin)
      if (hash.includes('admin') && !hash.includes('type=recovery') && !hash.includes('access_token')) {
        console.log('🔑 Admin panel URL detected');
        const validUser = await validateSession();
        if (validUser) {
          const isAdmin = isUserAdmin(validUser.email);
          if (isAdmin) {
            setUser({
              name: validUser.name,
              email: validUser.email,
              grade: validUser.grade,
              isAdmin: true,
            });
            setCurrentView('admin-panel');
          } else {
            toast.error('Access denied. Admin only area.');
            setCurrentView('dashboard');
          }
        } else {
          setPendingAdminRedirect(true);
          setCurrentView('login');
        }
        window.history.replaceState(null, '', window.location.pathname);
        setIsSessionChecked(true);
        return;
      }

      // Check if this is a password reset callback (type=recovery)
      if (hash.includes('type=recovery') || hash.includes('recovery')) {
        console.log('🔄 Password reset callback detected');
        console.log('📍 Full URL:', window.location.href);

        // Handle the OAuth callback to get the session
        const resetUser = await handleOAuthCallback();

        if (resetUser) {
          console.log('✅ Password reset session established for:', resetUser.email);
          setUser({
            name: resetUser.name,
            email: resetUser.email,
            grade: resetUser.grade,
            isAdmin: isUserAdmin(resetUser.email),
          });
          setCurrentView('reset-password');
          toast.info('Please set your new password', {
            description: 'Your password reset link is valid',
          });
          // Clean up URL hash
          window.history.replaceState(null, '', window.location.pathname);
          setIsSessionChecked(true);
          return;
        } else {
          console.error('❌ Failed to establish reset session');
          console.error('🔍 This could mean:');
          console.error('  - Reset link has expired (links expire after 1 hour)');
          console.error('  - Reset link was already used');
          console.error('  - Reset link is invalid');
          toast.error('Invalid or expired reset link', {
            description: 'Please request a new password reset email',
            duration: 5000,
          });
          setCurrentView('forgot-password');
          window.history.replaceState(null, '', window.location.pathname);
          setIsSessionChecked(true);
          return;
        }
      }
      
      // Check if this is an OAuth login callback (access_token without type=recovery)
      if (hash.includes('access_token') && !hash.includes('type=recovery')) {
        console.log('🔄 OAuth callback detected, processing...');
        const oauthUser = await handleOAuthCallback();
        
        if (oauthUser) {
          console.log('✅ OAuth login successful:', oauthUser.email);
          setUser({
            name: oauthUser.name,
            email: oauthUser.email,
            grade: oauthUser.grade,
            isAdmin: isUserAdmin(oauthUser.email),
          });
          
          // Load user's subjects and units from backend
          try {
            const backendData = await loadUserData();
            if (backendData !== null) {
              setSubjects(backendData);
            }
          } catch (error) {
            console.error('Error loading user data:', error);
          }
          
          // Show onboarding for first-time OAuth users
          const onboardingSeen = localStorage.getItem('studycopilot_onboarding_seen');
          if (!onboardingSeen) {
            setShowOnboarding(true);
          }
          setCurrentView('dashboard');
          toast.success(`Welcome, ${oauthUser.name}!`);
          // Clean up URL hash
          window.history.replaceState(null, '', window.location.pathname);
          setIsSessionChecked(true);
          return;
        }
      }
      
      // Check for existing session
      const validUser = await validateSession();
      
      if (validUser) {
        console.log('✅ Valid session found, logging in user:', validUser.email);
        const isAdmin = isUserAdmin(validUser.email);
        console.log(`👑 Admin status for ${validUser.email}: ${isAdmin}`);
        
        setUser({
          name: validUser.name,
          email: validUser.email,
          grade: validUser.grade,
          isAdmin: isAdmin,
        });
        
        // Load user's subjects and units from backend
        try {
          console.log('📥 Loading user data from backend...');
          const backendData = await loadUserData();
          
          if (backendData !== null) {
            console.log(`✅ Loaded ${backendData.length} subjects from backend`);
            setSubjects(backendData);
          } else {
            // Try loading from localStorage as fallback
            const localData = localStorage.getItem('studycopilot_subjects');
            if (localData) {
              try {
                const parsedData = JSON.parse(localData);
                if (parsedData.length > 0) {
                  console.log(`📦 Loaded ${parsedData.length} subjects from localStorage`);
                  // Ensure all subjects have units array initialized
                  const normalizedData = parsedData.map((subject: Subject) => ({
                    ...subject,
                    units: subject.units || [],
                  }));
                  setSubjects(normalizedData);
                }
              } catch (e) {
                console.error('Error parsing localStorage data:', e);
              }
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          // Fallback to localStorage
          const localData = localStorage.getItem('studycopilot_subjects');
          if (localData) {
            try {
              const parsedData = JSON.parse(localData);
              setSubjects(parsedData);
            } catch (e) {
              console.error('Error parsing localStorage data:', e);
            }
          }
        }
        
        // Show onboarding for first-time users
        const onboardingSeen = localStorage.getItem('studycopilot_onboarding_seen');
        if (!onboardingSeen) {
          setShowOnboarding(true);
        }
        setCurrentView('dashboard');
      } else {
        console.log('ℹ️ No valid session, showing landing page');
        setCurrentView('landing');
      }
      setIsSessionChecked(true);
    };

    checkSession();

    // Setup auto-refresh for session
    const cleanup = setupAutoRefresh(() => {
      console.log('⚠️ Session expired');
      toast.error('Your session has expired. Please log in again.');
      handleLogout();
    });

    return cleanup;
  }, []);

  // ─────────────────── URL ROUTING ───────────────────

  // 1. On initial load, after session + subjects are ready, restore view from URL
  useEffect(() => {
    if (urlProcessed) return;
    // Wait until session check has completed
    if (!isSessionChecked) return; // Still loading session

    const route = parsePath(window.location.pathname);

    // If not logged in, allow public routes
    if (!user) {
      const publicViews = ['landing', 'login', 'signup', 'forgot-password'];
      if (publicViews.includes(route.view)) {
        setCurrentView(route.view);
      } else {
        setCurrentView('landing');
      }
      setUrlProcessed(true);
      return;
    }

    // If URL is the default path, let the session check's default stand
    if (route.view === 'landing' || route.view === 'dashboard') {
      setUrlProcessed(true);
      return;
    }

    // Try to resolve subject/unit from URL
    let targetView = route.view;
    let targetSubject: Subject | null = selectedSubject;
    let targetUnit: Unit | null = selectedUnit;

    if (route.subjectId) {
      const subject = findSubjectById(subjects, route.subjectId);
      if (subject) {
        targetSubject = subject;
      } else {
        targetView = 'dashboard'; // Subject not found
      }
    }

    if (route.unitId) {
      const result = findUnitById(subjects, route.unitId);
      if (result) {
        targetSubject = result.subject;
        targetUnit = result.unit;
      } else {
        targetView = 'dashboard'; // Unit not found
      }
    }

    if (targetSubject) setSelectedSubject(targetSubject);
    if (targetUnit) setSelectedUnit(targetUnit);
    setCurrentView(targetView);
    setUrlProcessed(true);
  }, [user, subjects, urlProcessed, selectedSubject, selectedUnit, isSessionChecked]);

  // 2. Keep URL in sync with current view (after initial load is processed)
  useEffect(() => {
    if (!urlProcessed) return;
    const path = viewToPath(currentView, selectedSubject?.slug || selectedSubject?.id, selectedUnit?.id);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [currentView, selectedSubject, selectedUnit, urlProcessed]);

  // 3. Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const route = parsePath(window.location.pathname);
      if (route.subjectId) {
        const subject = findSubjectById(subjects, route.subjectId);
        if (subject) setSelectedSubject(subject);
      }
      if (route.unitId) {
        const result = findUnitById(subjects, route.unitId);
        if (result) {
          setSelectedSubject(result.subject);
          setSelectedUnit(result.unit);
        }
      }
      setCurrentView(route.view);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [subjects]);

  const handleLogin = async (email: string) => {
    // Get user data from stored session
    const storedUser = getStoredUser();
    
    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
        grade: storedUser.grade,
        isAdmin: isUserAdmin(storedUser.email),
      });
      
      // Load user's subjects and units from backend
      try {
        console.log('📥 Loading user data from backend...');
        const backendData = await loadUserData();
        
        if (backendData !== null) {
          console.log(`✅ Loaded ${backendData.length} subjects from backend`);
          setSubjects(backendData);
          toast.success('Your data has been restored', {
            description: `${backendData.length} subject${backendData.length !== 1 ? 's' : ''} loaded`,
          });
        } else {
          // Try loading from localStorage as fallback
          const localData = localStorage.getItem('studycopilot_subjects');
          if (localData) {
            try {
              const parsedData = JSON.parse(localData);
              if (parsedData.length > 0) {
                console.log(`📦 Loaded ${parsedData.length} subjects from localStorage`);
                setSubjects(parsedData);
              }
            } catch (e) {
              console.error('Error parsing localStorage data:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to localStorage
        const localData = localStorage.getItem('studycopilot_subjects');
        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            setSubjects(parsedData);
          } catch (e) {
            console.error('Error parsing localStorage data:', e);
          }
        }
      }
      
      // If user came from #admin URL, redirect to admin panel (if admin)
      if (pendingAdminRedirect) {
        setPendingAdminRedirect(false);
        if (isUserAdmin(storedUser.email)) {
          setCurrentView('admin-panel');
          return;
        } else {
          toast.error('Access denied. Admin only area.');
        }
      }

      const onboardingSeen = localStorage.getItem('studycopilot_onboarding_seen');
      if (!onboardingSeen) {
        setShowOnboarding(true);
      }
      setCurrentView('dashboard');
    }
  };

  const handleSignup = async (email: string) => {
    // Get user data from stored session
    const storedUser = getStoredUser();

    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
        grade: storedUser.grade,
        isAdmin: isUserAdmin(storedUser.email),
      });

      // New users start with empty subjects
      setSubjects([]);

      // Show onboarding for new signups
      setShowOnboarding(true);
      setCurrentView('dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('studycopilot_onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setSubjects([]);
      setSelectedSubject(null);
      setSelectedUnit(null);
      // Clear user-specific data from localStorage
      localStorage.removeItem('studycopilot_subjects');
      localStorage.removeItem('selected_subject_id');
      localStorage.removeItem('selected_unit_id');
      
      setCurrentView('landing');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };



  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      // Get all user data to store with deleted account
      const userData = {
        subjects,
        activities,
      };

      await deleteAccount(user.id || user.email, user.email, userData);
      
      // Clear app state
      setUser(null);
      setSubjects([]);
      setSelectedSubject(null);
      setSelectedUnit(null);
      setActivities([]);
      
      // Clear localStorage
      localStorage.removeItem('studycopilot_subjects');
      localStorage.removeItem('selected_subject_id');
      localStorage.removeItem('selected_unit_id');
      
      setCurrentView('landing');
      
      toast.success('Account deleted', {
        description: 'You can recover your account within 30 days by logging in.',
        duration: 6000,
      });
    } catch (error: any) {
      console.error('Delete account error:', error);
      toast.error(error.message || 'Failed to delete account');
    }
  };

  const handleAddSubject = () => {
    setCurrentView('select-subject');
  };

  const handleCreateSubject = (subject: Subject) => {
    setSubjects([...subjects, subject]);
    setSelectedSubject(subject);
    setCurrentView('units-dashboard');
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    localStorage.setItem('selected_subject_id', subject.id);
    setCurrentView('units-dashboard');
  };

  const handleUpdateSubject = (updatedSubject: Subject) => {
    setSubjects(subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s));
    setSelectedSubject(updatedSubject);
  };

  const handleEditSubject = (subjectId: string, newTitle: string) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, title: newTitle } : s
    ));
    if (selectedSubject && selectedSubject.id === subjectId) {
      setSelectedSubject({ ...selectedSubject, title: newTitle });
    }
  };

  const handleDeleteSubject = (subjectId: string) => {
    const updatedSubjects = subjects.filter(s => s.id !== subjectId);
    setSubjects(updatedSubjects);
    
    // Explicitly handle persistence here since the useEffect won't trigger if length becomes 0
    if (user) {
      localStorage.setItem('studycopilot_subjects', JSON.stringify(updatedSubjects));
      saveUserData(updatedSubjects).catch(err => {
        console.error('Failed to save to backend:', err);
      });
    }

    if (selectedSubject && selectedSubject.id === subjectId) {
      setSelectedSubject(null);
    }
  };

  const handleAddUnit = () => {
    setCurrentView('create-unit');
  };

  const handleCreateUnit = async (
    unit: Unit,
    shouldProcessModules?: boolean,
    signal?: AbortSignal
  ) => {
    if (selectedSubject) {
      // If we should process modules, do it BEFORE adding the unit
      if (shouldProcessModules && unit.content?.markdown) {
        console.log('🎬 Processing all modules before navigation...');

        // Process all modules and wait for completion
        await processAllModulesBeforeNavigation(unit, selectedSubject, signal);
      } else {
        // Just add the unit and navigate
        const updatedSubject = {
          ...selectedSubject,
          units: [...selectedSubject.units, unit],
        };
        handleUpdateSubject(updatedSubject);
        setCurrentView('units-dashboard');
      }
    }
  };

  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    localStorage.setItem('selected_unit_id', unit.id);
    setCurrentView('learning-modules');
  };

  const handleEditUnit = async (
    unitId: string, 
    newTitle: string, 
    images?: File[], 
    markdownFile?: File, 
    markdownContent?: string
  ) => {
    if (selectedSubject) {
      // Find the unit to edit
      const unitToEdit = selectedSubject.units.find(u => u.id === unitId);
      if (!unitToEdit) return;

      let updatedUnit = { ...unitToEdit, title: newTitle };

      // If files were uploaded, regenerate content
      if ((images && images.length > 0) || markdownFile) {
        const { processUnitQuickly } = await import('./lib/ai-provider');
        
        try {
          // Generate new content with the uploaded files
          const newContent = await processUnitQuickly(
            images || [],
            newTitle,
            markdownContent || ''
          );
          
          updatedUnit = {
            ...updatedUnit,
            content: {
              ...updatedUnit.content,
              markdown: newContent.markdown,
              unitText: newContent.unitText,
            },
            aiGenerated: true,
            lastAccessed: new Date().toISOString(),
          };
        } catch (error) {
          console.error('Error regenerating content:', error);
          // Continue with just the title update if processing fails
        }
      }

      const updatedSubject = {
        ...selectedSubject,
        units: selectedSubject.units.map(u => 
          u.id === unitId ? updatedUnit : u
        ),
      };
      
      handleUpdateSubject(updatedSubject);
      
      if (selectedUnit && selectedUnit.id === unitId) {
        setSelectedUnit(updatedUnit);
      }
    }
  };

  const handleDeleteUnit = (unitId: string) => {
    if (selectedSubject) {
      const updatedSubject = {
        ...selectedSubject,
        units: selectedSubject.units.filter(u => u.id !== unitId),
      };
      handleUpdateSubject(updatedSubject);
      if (selectedUnit && selectedUnit.id === unitId) {
        setSelectedUnit(null);
      }
    }
  };

  const handleAcceptSuggestion = (unitId: string) => {
    if (selectedSubject) {
      const unit = selectedSubject.units.find(u => u.id === unitId);
      if (unit && unit.suggestedTitle) {
        const updatedUnit = {
          ...unit,
          title: unit.suggestedTitle,
          suggestedTitle: undefined, // Remove the suggestion after accepting
        };

        const updatedSubject = {
          ...selectedSubject,
          units: selectedSubject.units.map(u => 
            u.id === unitId ? updatedUnit : u
          ),
        };
        
        handleUpdateSubject(updatedSubject);
        
        if (selectedUnit && selectedUnit.id === unitId) {
          setSelectedUnit(updatedUnit);
        }

        toast.success('Title updated!', {
          description: `Unit title changed to "${unit.suggestedTitle}"`,
        });
      }
    }
  };

  const handleRejectSuggestion = (unitId: string) => {
    if (selectedSubject) {
      const unit = selectedSubject.units.find(u => u.id === unitId);
      if (unit && unit.suggestedTitle) {
        const updatedUnit = {
          ...unit,
          suggestedTitle: undefined, // Remove the suggestion after rejecting
        };

        const updatedSubject = {
          ...selectedSubject,
          units: selectedSubject.units.map(u => 
            u.id === unitId ? updatedUnit : u
          ),
        };
        
        handleUpdateSubject(updatedSubject);
        
        if (selectedUnit && selectedUnit.id === unitId) {
          setSelectedUnit(updatedUnit);
        }

        toast.info('Suggestion dismissed', {
          description: 'The AI suggestion has been removed.',
        });
      }
    }
  };

  const handleOpenModule = (moduleTitle: string) => {
    if (moduleTitle === 'Source Markdown') {
      setCurrentView('markdown-editor');
    } else if (moduleTitle === 'Unit Text') {
      setCurrentView('unit-text');
    } else if (moduleTitle === 'Audio Lesson') {
      setCurrentView('audio-lesson');
    } else if (moduleTitle === 'Vocabulary') {
      setCurrentView('vocabulary');
    } else if (moduleTitle === 'Summary') {
      setCurrentView('summary');
    } else if (moduleTitle === 'Exercises') {
      setCurrentView('exercises');
    } else if (moduleTitle === 'Interactive') {
      setCurrentView('interactive');
    } else if (moduleTitle === 'Practice') {
      setCurrentView('practice');
    } else if (moduleTitle === 'Model Question') {
      setCurrentView('model-question');
    } else if (moduleTitle === 'Unit Images') {
      setCurrentView('unit-images');
    }
  };

  const handleSaveMarkdown = (markdown: string) => {
    if (selectedSubject && selectedUnit) {
      const updatedUnit = {
        ...selectedUnit,
        content: {
          ...selectedUnit.content!,
          markdown: markdown,
        },
      };
      
      const updatedSubject = {
        ...selectedSubject,
        units: selectedSubject.units.map(u => 
          u.id === selectedUnit.id ? updatedUnit : u
        ),
      };
      
      handleUpdateSubject(updatedSubject);
      setSelectedUnit(updatedUnit);
    }
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleViewAdmin = () => {
    setCurrentView('admin-panel');
  };

  // Update module status for a unit
  const handleUpdateModuleStatus = (
    unitId: string,
    moduleName: string,
    status: 'pending' | 'processing' | 'completed' | 'error',
    data?: any,
    error?: string,
    progress?: number
  ) => {
    if (!selectedSubject) return;

    const unit = selectedSubject.units.find(u => u.id === unitId);
    if (!unit || !unit.content) return;

    const updatedContent = {
      ...unit.content,
      [moduleName]: {
        status,
        data,
        error,
        progress
      }
    };

    const updatedUnit = {
      ...unit,
      content: updatedContent
    };

    const updatedSubject = {
      ...selectedSubject,
      units: selectedSubject.units.map(u =>
        u.id === unitId ? updatedUnit : u
      )
    };

    handleUpdateSubject(updatedSubject);

    if (selectedUnit && selectedUnit.id === unitId) {
      setSelectedUnit(updatedUnit);
    }
    
    // Force re-render by updating subjects state reference
    setSubjects(prevSubjects => 
      prevSubjects.map(s => 
        s.id === selectedSubject.id ? updatedSubject : s
      )
    );
  };

  // Process ALL modules BEFORE navigation (new UX flow)
  const processAllModulesBeforeNavigation = async (
    unit: Unit,
    subject: Subject,
    signal?: AbortSignal
  ) => {
    const { regenerateModule, getCurrentProvider } = await import('./lib/ai-provider');

    const modules: Array<{ name: any; displayName: string }> = [
      { name: 'vocabulary', displayName: 'Vocabulary' },
      { name: 'audioLesson', displayName: 'Audio Lesson' },
      { name: 'summary', displayName: 'Summary' },
      { name: 'exercises', displayName: 'Exercises' },
      { name: 'interactiveQuiz', displayName: 'Interactive Quiz' },
      { name: 'practiceQuestions', displayName: 'Practice Questions' },
      { name: 'modelQuestion', displayName: 'Model Question' }
    ];

    const markdown = unit.content?.markdown || '';
    const unitTitle = unit.title;

    // Add toast for processing start
    toast.info('Generating all learning materials...', {
      description: 'This will take 3-6 minutes. Please wait.',
      duration: 5000
    });

    // Process modules sequentially (always, to be safe)
    console.log('⏱️ Processing ALL modules before navigation...');

    for (const module of modules) {
      if (signal?.aborted) {
        console.log('🛑 Module generation cancelled');
        throw new Error('Processing cancelled');
      }

      try {
        console.log(`🚀 Processing: ${module.displayName}`);

        // Skip Audio Lesson - marked as Coming Soon
        if (module.name === 'audioLesson') {
          console.log('📢 Audio Lesson is Coming Soon (skipping AI processing)');
          unit.content![module.name] = {
            status: 'completed',
            progress: 100,
            data: '🎧 Coming Soon'
          };
          console.log(`✅ Completed: ${module.displayName}`);
          continue;
        }

        // Skip Model Question - marked as Coming Soon
        if (module.name === 'modelQuestion') {
          console.log('📋 Model Question is Coming Soon (skipping AI processing)');
          unit.content![module.name] = {
            status: 'completed',
            progress: 100,
            data: '📋 Coming Soon'
          };
          console.log(`✅ Completed: ${module.displayName}`);
          continue;
        }

        const data = await regenerateModule(
          module.name,
          markdown,
          unitTitle,
          (msg, progress) => {
            console.log(`  ${module.displayName}: ${progress}%`);
          },
          signal
        );

        unit.content![module.name] = {
          status: 'completed',
          progress: 100,
          data
        };

        console.log(`✅ Completed: ${module.displayName}`);

        // Add delay between modules (except last one)
        if (module.name !== 'modelQuestion') {
          console.log('⏸️ Waiting 3 seconds before next module...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

      } catch (error: any) {
        if (error.message === 'Processing cancelled' || signal?.aborted) {
          throw error;
        }
        console.error(`❌ Error processing ${module.displayName}:`, error);
        unit.content![module.name] = {
          status: 'error',
          progress: 0,
          error: error.message || 'Processing failed'
        };
      }
    }

    // All modules processed! Now add the unit and navigate
    console.log('🎉 All modules processed! Adding unit and navigating...');

    // Calculate progress
    const completedModules = Object.keys(unit.content!).filter(key => {
      const mod = unit.content![key];
      return mod && typeof mod === 'object' && mod.status === 'completed';
    }).length;

    unit.progress = Math.round((completedModules / 9) * 100);
    unit.completedModules = completedModules;

    // Add unit to subject
    const updatedSubject = {
      ...subject,
      units: [...subject.units, unit],
    };

    handleUpdateSubject(updatedSubject);
    setSelectedUnit(unit);

    // Show success and navigate
    toast.success('All learning materials generated!', {
      description: `${completedModules} out of 9 modules are ready.`
    });

    setCurrentView('learning-modules');
  };

  // Process modules in background after unit creation
  const processModulesInBackground = async (
    unitId: string,
    markdown: string,
    unitTitle: string
  ) => {
    const { regenerateModule, getCurrentProvider } = await import('./lib/ai-provider');
    
    const modules: Array<{ name: any; displayName: string }> = [
      { name: 'vocabulary', displayName: 'Vocabulary' },
      { name: 'audioLesson', displayName: 'Audio Lesson' },
      { name: 'summary', displayName: 'Summary' },
      { name: 'exercises', displayName: 'Exercises' },
      { name: 'interactiveQuiz', displayName: 'Interactive Quiz' },
      { name: 'practiceQuestions', displayName: 'Practice Questions' },
      { name: 'modelQuestion', displayName: 'Model Question' }
    ];

    // Check if using Gemini (which has rate limits)
    const provider = getCurrentProvider();
    const useSequential = provider === 'openrouter';
    
    if (useSequential) {
      console.log('⏱️ Processing modules in batches of 2 to avoid rate limits...');
      toast.info('Processing modules in batches to avoid rate limits');

      // Process modules in batches of 2 (instead of fully sequential) for a ~2x speedup
      // while still respecting rate limits.
      const BATCH_SIZE = 2;
      for (let i = 0; i < modules.length; i += BATCH_SIZE) {
        const batch = modules.slice(i, i + BATCH_SIZE);

        await Promise.all(batch.map(async (module) => {
          // Skip Coming Soon modules
          if (module.name === 'audioLesson' || module.name === 'modelQuestion') {
            handleUpdateModuleStatus(unitId, module.name, 'completed', module.name === 'audioLesson' ? '🎧 Coming Soon' : '📋 Coming Soon');
            console.log(`⏭️ Skipped (Coming Soon): ${module.displayName}`);
            return;
          }

          try {
            console.log(`🚀 Processing: ${module.displayName}`);
            handleUpdateModuleStatus(unitId, module.name, 'processing', undefined, undefined, 0);

            const data = await regenerateModule(
              module.name,
              markdown,
              unitTitle,
              (msg, progress) => {
                handleUpdateModuleStatus(unitId, module.name, 'processing', undefined, undefined, progress);
              }
            );

            handleUpdateModuleStatus(unitId, module.name, 'completed', data);
            console.log(`✅ Completed: ${module.displayName}`);

          } catch (error: any) {
            console.error(`❌ Error processing ${module.displayName}:`, error);

            // Check if it's a rate limit error
            if (error.message?.includes('Rate limit') || error.message?.includes('429')) {
              toast.error(`Rate limit hit on ${module.displayName}. Will retry...`);
              await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute

              // Retry this module
              try {
                const data = await regenerateModule(module.name, markdown, unitTitle);
                handleUpdateModuleStatus(unitId, module.name, 'completed', data);
                console.log(`✅ Completed (after retry): ${module.displayName}`);
              } catch (retryError: any) {
                handleUpdateModuleStatus(unitId, module.name, 'error', undefined, retryError.message || 'Processing failed');
              }
            } else {
              handleUpdateModuleStatus(unitId, module.name, 'error', undefined, error.message || 'Processing failed');
            }
          }
        }));

        // Add a small delay between batches to avoid rate limits
        if (i + BATCH_SIZE < modules.length) {
          console.log('⏸️ Waiting 3 seconds before next batch...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    } else {
      console.log('⚡ Processing modules in PARALLEL for faster generation...');
      
      // Process all modules in PARALLEL
      const processingPromises = modules.map(async (module) => {
        // Skip Coming Soon modules
        if (module.name === 'audioLesson' || module.name === 'modelQuestion') {
          handleUpdateModuleStatus(unitId, module.name, 'completed', module.name === 'audioLesson' ? '🎧 Coming Soon' : '📋 Coming Soon');
          console.log(`⏭️ Skipped (Coming Soon): ${module.displayName}`);
          return;
        }

        try {
          console.log(`🚀 Starting background processing for: ${module.displayName}`);
          handleUpdateModuleStatus(unitId, module.name, 'processing', undefined, undefined, 0);

          const data = await regenerateModule(
            module.name,
            markdown,
            unitTitle,
            (msg, progress) => {
              handleUpdateModuleStatus(unitId, module.name, 'processing', undefined, undefined, progress);
            }
          );

          handleUpdateModuleStatus(unitId, module.name, 'completed', data);
          console.log(`✅ Completed: ${module.displayName}`);

        } catch (error: any) {
          console.error(`❌ Error processing ${module.displayName}:`, error);
          handleUpdateModuleStatus(unitId, module.name, 'error', undefined, error.message || 'Processing failed');
        }
      });

      await Promise.all(processingPromises);
    }

    console.log('🎉 All modules processed!');
    
    // Reload data from localStorage to get the latest state
    const savedData = localStorage.getItem('studycopilot_subjects');
    if (savedData) {
      const parsedSubjects = JSON.parse(savedData);
      setSubjects(parsedSubjects);
      
      // Update selected subject and unit
      const finalSubject = parsedSubjects.find((s: Subject) => s.id === selectedSubject?.id);
      if (finalSubject) {
        setSelectedSubject(finalSubject);
        const finalUnit = finalSubject.units.find((u: Unit) => u.id === unitId);
        if (finalUnit) {
          setSelectedUnit(finalUnit);
        }
      }
    }
    
    toast.success('All modules completed!', {
      description: 'All learning materials have been generated successfully.'
    });
  };

  // Regenerate a single module
  const handleRegenerateModule = async (
    unitId: string,
    moduleName: string
  ) => {
    const unit = selectedSubject?.units.find(u => u.id === unitId);
    if (!unit || !unit.content?.markdown) {
      toast.error('Cannot regenerate - no markdown content found');
      return;
    }

    try {
      const { regenerateModule } = await import('./lib/ai-provider');
      
      // Update to processing
      handleUpdateModuleStatus(unitId, moduleName, 'processing', undefined, undefined, 0);

      // Regenerate
      const data = await regenerateModule(
        moduleName as any,
        unit.content.markdown,
        unit.title,
        (msg, progress) => {
          handleUpdateModuleStatus(unitId, moduleName, 'processing', undefined, undefined, progress);
        }
      );

      // Update to completed
      handleUpdateModuleStatus(unitId, moduleName, 'completed', data);
      toast.success(`${moduleName} regenerated successfully!`);

    } catch (error: any) {
      console.error(`Error regenerating ${moduleName}:`, error);
      handleUpdateModuleStatus(unitId, moduleName, 'error', undefined, error.message || 'Regeneration failed');
      toast.error(`Failed to regenerate ${moduleName}`);
    }
  };

  // Calculate stats for profile
  const totalSubjects = subjects.length;
  const totalUnits = subjects.reduce((sum, subject) => sum + (subject.units?.length || 0), 0);
  const totalCompleted = subjects.reduce((sum, subject) => 
    sum + (subject.units?.filter(u => u.progress === 100).length || 0), 0
  );
  const averageProgress = totalUnits > 0 
    ? Math.round(subjects.reduce((sum, subject) => 
        sum + (subject.units || []).reduce((unitSum, unit) => unitSum + (unit.progress || 0), 0), 0
      ) / totalUnits)
    : 0;

  if (currentView === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setCurrentView('signup')}
        onLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentView('signup')}
        onForgotPassword={() => setCurrentView('forgot-password')}
        isAdminLogin={pendingAdminRedirect}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'reset-password') {
    return (
      <ResetPassword
        onSuccess={() => {
          // After successful password reset, go to dashboard
          setCurrentView('dashboard');
        }}
        onCancel={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <Dashboard
          user={user}
          subjects={subjects}
          activities={activities}
          onAddNewSubject={handleAddSubject}
          onViewSubject={handleSelectSubject}
          onOpenProfile={handleViewProfile}
          onLogout={handleLogout}
          onEditSubject={handleEditSubject}
          onDeleteSubject={handleDeleteSubject}
        />
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      </>
    );
  }

  if (currentView === 'select-subject') {
    return (
      <SelectSubject
        userGrade={user?.grade || 7}
        onBack={() => setCurrentView('dashboard')}
        onSelectExisting={(subject) => {
          setSubjects([...subjects, subject]);
          setSelectedSubject(subject);
          setCurrentView('units-dashboard');
        }}
        onCreateNew={() => setCurrentView('create-subject')}
      />
    );
  }

  if (currentView === 'create-subject') {
    return (
      <CreateSubject
        userGrade={user?.grade || 7}
        onBack={() => setCurrentView('select-subject')}
        onCreate={handleCreateSubject}
      />
    );
  }

  if (currentView === 'units-dashboard' && selectedSubject) {
    return (
      <UnitsDashboard
        subject={selectedSubject}
        user={user}
        onBack={() => setCurrentView('dashboard')}
        onAddUnit={handleAddUnit}
        onSelectUnit={handleSelectUnit}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onEditUnit={handleEditUnit}
        onDeleteUnit={handleDeleteUnit}
        onAcceptSuggestion={handleAcceptSuggestion}
        onRejectSuggestion={handleRejectSuggestion}
      />
    );
  }

  if (currentView === 'create-unit' && selectedSubject) {
    return (
      <CreateUnit
        subject={selectedSubject}
        user={user}
        onBack={() => setCurrentView('units-dashboard')}
        onCreate={handleCreateUnit}
        onLogout={handleLogout}
        onOpenProfile={handleViewProfile}
      />
    );
  }

  if (currentView === 'learning-modules' && selectedSubject && selectedUnit) {
    return (
      <LearningModules
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('units-dashboard')}
        onOpenModule={handleOpenModule}
        onRegenerateModule={(moduleName) => handleRegenerateModule(selectedUnit.id, moduleName)}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
      />
    );
  }

  if (currentView === 'markdown-editor' && selectedSubject && selectedUnit) {
    return (
      <MarkdownEditor
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onSave={handleSaveMarkdown}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'unit-text' && selectedSubject && selectedUnit) {
    return (
      <UnitText
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onNextModule={() => setCurrentView('audio-lesson')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'audio-lesson' && selectedSubject && selectedUnit) {
    return (
      <AudioLesson
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onNextModule={() => setCurrentView('vocabulary')}
        onPreviousModule={() => setCurrentView('unit-text')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'audioLesson')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'vocabulary' && selectedSubject && selectedUnit) {
    return (
      <Vocabulary
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onNextModule={() => setCurrentView('summary')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'vocabulary')}
        onPreviousModule={() => setCurrentView('audio-lesson')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'summary' && selectedSubject && selectedUnit) {
    return (
      <Summary
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onNextModule={() => setCurrentView('exercises')}
        onPreviousModule={() => setCurrentView('vocabulary')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'summary')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'exercises' && selectedSubject && selectedUnit) {
    return (
      <Exercises
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onNextModule={() => setCurrentView('interactive')}
        onPreviousModule={() => setCurrentView('summary')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'exercises')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'interactive' && selectedSubject && selectedUnit) {
    return (
      <InteractiveLearning
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'interactiveQuiz')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'practice' && selectedSubject && selectedUnit) {
    return (
      <Practice
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onPreviousModule={() => setCurrentView('interactive')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'practiceQuestions')}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('profile')}
        onNavigateHome={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'model-question' && selectedSubject && selectedUnit) {
    return (
      <ModelQuestion
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onRegenerate={() => handleRegenerateModule(selectedUnit.id, 'modelQuestion')}
        onLogout={handleLogout}
        onOpenProfile={handleViewProfile}
      />
    );
  }

  if (currentView === 'unit-images' && selectedSubject && selectedUnit) {
    return (
      <UnitImages
        subject={selectedSubject}
        unit={selectedUnit}
        user={user}
        onBack={() => setCurrentView('learning-modules')}
        onLogout={handleLogout}
        onOpenProfile={handleViewProfile}
      />
    );
  }

  if (currentView === 'profile') {
    return (
      <Profile
        user={user}
        onBack={() => setCurrentView('dashboard')}
        onDeleteAccount={handleDeleteAccount}
        stats={{
          subjects: totalSubjects,
          totalUnits,
          completed: totalCompleted,
          progress: averageProgress,
        }}
        subjects={subjects}
        onImportData={(importedSubjects) => {
          setSubjects(importedSubjects);
          toast.success('Your data has been restored!');
        }}
        onOpenAdmin={handleViewAdmin}
        onLogout={handleLogout}
        onOpenProfile={handleViewProfile}
        onUpdateUser={(updatedData) => {
          if (user) {
            setUser({ ...user, ...updatedData });
          }
        }}
      />
    );
  }

  if (currentView === 'admin-panel') {
    // Check if user is admin
    if (!user?.isAdmin) {
      toast.error('Access Denied', {
        description: 'You do not have permission to access the Admin Panel.',
      });
      setCurrentView('profile');
      return <Profile
        user={user}
        onBack={() => setCurrentView('dashboard')}
        onDeleteAccount={handleDeleteAccount}
        stats={{
          subjects: totalSubjects,
          totalUnits,
          completed: totalCompleted,
          progress: averageProgress,
        }}
        subjects={subjects}
        onImportData={(importedSubjects) => {
          setSubjects(importedSubjects);
          toast.success('Your data has been restored!');
        }}
        onLogout={handleLogout}
        onOpenProfile={handleViewProfile}
        onUpdateUser={(updatedData) => {
          if (user) {
            setUser({ ...user, ...updatedData });
          }
        }}
      />;
    }
    
    return <AdminPanel onBack={() => setCurrentView('profile')} />;
  }

  // Default view: landing page
  return <LandingPage onGetStarted={() => setCurrentView('signup')} onLogin={() => setCurrentView('login')} />;
}

// Add Toaster at the app level
export default function AppWithToaster() {
  return (
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  );
}