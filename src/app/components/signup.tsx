import { useState } from 'react';
import { Mail, User, Loader2, Moon, Sun, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { StudyCopilotLogo } from './landing-page';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { signUp, signInWithGoogle } from '../lib/auth-service';
import { toast } from 'sonner';
import { useTheme } from './theme-provider';

interface SignupProps {
  onSignup: (email: string) => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !grade) { toast.error('Please fill in all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setIsLoading(true);
    try {
      const result = await signUp(email, password, name, parseInt(grade));
      if (result.session) {
        toast.success('Account created!');
        onSignup(email);
      } else {
        setShowVerification(true);
        toast.success('Confirmation email sent! Check your inbox.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-secondary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-20 right-10 w-36 h-36 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-16">
            <StudyCopilotLogo variant="light" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold font-display text-white leading-tight mb-6"
          >
            Start your<br />learning journey<br />today.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 text-lg max-w-md leading-relaxed"
          >
            Create your free account and unlock AI-powered study tools.
          </motion.p>
        </div>
        <p className="text-white/30 text-sm relative">Free to start. No credit card required.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 lg:hidden">
            <StudyCopilotLogo />
          </div>
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all ml-auto">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-sm">
            {!showVerification ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold font-display text-foreground mb-1">Create an account</h2>
                  <p className="text-muted-foreground text-sm">Get started with StudyCopilot</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-11 bg-input-background border-border rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-11 bg-input-background border-border rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Grade</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger className="h-11 bg-input-background border-border rounded-xl">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border rounded-xl">
                        {[6,7,8,9,10,11,12].map(g => (
                          <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Password</Label>
                      <Input type="password" placeholder="6+ chars" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 bg-input-background border-border rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Confirm</Label>
                      <Input type="password" placeholder="Confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 bg-input-background border-border rounded-xl" />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display text-base mt-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                  </Button>
                </form>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground font-semibold">or</span></div>
                </div>

                <Button variant="outline" onClick={async () => { setIsSocialLoading('google'); try { await signInWithGoogle(); } catch(e:any) { toast.error(e.message); setIsSocialLoading(null); }}} disabled={!!isSocialLoading} className="w-full h-11 border-border hover:bg-accent rounded-xl">
                  {isSocialLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Continue with Google</>}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{' '}
                  <button onClick={onSwitchToLogin} className="text-secondary hover:text-secondary/80 font-bold">Sign in</button>
                </p>
              </>
            ) : (
              // Email Verification View
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
                <Button variant="ghost" size="sm" onClick={() => setShowVerification(false)} className="mb-4 text-muted-foreground hover:text-foreground -ml-2 rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>

                <div className="mb-8 flex flex-col items-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                    <Mail className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold font-display text-foreground mb-3">Check your email</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    We've sent a confirmation link to<br />
                    <span className="font-bold text-foreground">{email}</span>
                  </p>
                </div>

                <div className="bg-primary/5 border-2 border-primary/10 rounded-2xl p-5 mb-6 text-left space-y-3">
                  {[
                    { step: 1, text: 'Open your email inbox' },
                    { step: 2, text: 'Click the confirmation link from Supabase' },
                    { step: 3, text: "You'll be automatically logged in" },
                  ].map(s => (
                    <div key={s.step} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                      <span className="text-sm text-foreground/80 font-semibold">{s.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive the email?{' '}
                  <button type="button" onClick={handleSubmit} disabled={isLoading} className="text-secondary hover:text-secondary/80 font-bold">
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin inline" /> : 'Resend'}
                  </button>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
