import { useState } from 'react';
import { Mail, Lock, Loader2, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signIn, signInWithGoogle, signInWithGitHub, checkDeletedAccount, recoverAccount } from '../lib/auth-service';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { useTheme } from './theme-provider';

interface LoginProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
  isAdminLogin?: boolean;
}

export function Login({ onLogin, onSwitchToSignup, onForgotPassword, isAdminLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'github' | null>(null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [deletedAccountInfo, setDeletedAccountInfo] = useState<{ email: string; deletedAt: number } | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter both email and password'); return; }

    const deletionStatus = checkDeletedAccount(email);
    if (deletionStatus.isDeleted) {
      if (deletionStatus.canRecover) {
        setDeletedAccountInfo({ email, deletedAt: deletionStatus.deletedAt! });
        setShowRecoveryDialog(true);
        return;
      } else {
        toast.error('This account has been permanently deleted.');
        return;
      }
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      onLogin(email);
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverAccount = async () => {
    if (!deletedAccountInfo) return;
    setIsLoading(true);
    try {
      await recoverAccount(deletedAccountInfo.email, password);
      toast.success('Account recovered!');
      onLogin(deletedAccountInfo.email);
    } catch (error: any) {
      toast.error(error.message || 'Recovery failed');
    } finally {
      setIsLoading(false);
      setShowRecoveryDialog(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSocialLoading('google');
    try { await signInWithGoogle(); } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed');
      setIsSocialLoading(null);
    }
  };

  const handleGitHubLogin = async () => {
    setIsSocialLoading('github');
    try { await signInWithGitHub(); } catch (error: any) {
      toast.error(error.message || 'GitHub sign-in failed');
      setIsSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-secondary to-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-16">
            <span className="text-3xl">📚</span>
            <span className="font-display text-xl font-bold text-white">StudyCopilot</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold font-display text-white leading-tight mb-6"
          >
            Learn smarter<br />with AI-powered<br />study tools.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 text-lg max-w-md leading-relaxed"
          >
            Upload your textbooks and let AI generate all the study materials you need.
          </motion.p>
        </div>
        <p className="text-white/30 text-sm relative">StudyCopilot - AI Learning Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 lg:hidden">
            <span className="text-2xl">📚</span>
            <span className="font-display font-bold text-foreground">StudyCopilot</span>
          </div>
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all ml-auto">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-sm">
            {isAdminLogin && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl flex items-center gap-3">
                <span className="text-lg">🔐</span>
                <div>
                  <p className="text-sm font-bold text-foreground">Admin Login</p>
                  <p className="text-xs text-muted-foreground font-semibold">Sign in with an administrator account to access the admin panel.</p>
                </div>
              </motion.div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold font-display text-foreground mb-1">Welcome back</h2>
              <p className="text-muted-foreground text-sm">Sign in to continue learning</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-11 bg-input-background border-border rounded-xl" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>Password</Label>
                  <button type="button" onClick={onForgotPassword} className="text-xs text-secondary hover:text-secondary/80 font-semibold">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-11 bg-input-background border-border rounded-xl" />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display text-base">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground font-semibold">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleGoogleLogin} disabled={!!isSocialLoading} className="h-11 border-border hover:bg-accent rounded-xl">
                {isSocialLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Google</>
                )}
              </Button>
              <Button variant="outline" onClick={handleGitHubLogin} disabled={!!isSocialLoading} className="h-11 border-border hover:bg-accent rounded-xl">
                {isSocialLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <><svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</>
                )}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{' '}
              <button onClick={onSwitchToSignup} className="text-secondary hover:text-secondary/80 font-bold">Create one</button>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="rounded-2xl border-2 border-primary/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Recover Your Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This account was scheduled for deletion. You can still recover it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecoverAccount} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl">Recover Account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
