import { useState } from 'react';
import { Mail, Loader2, ArrowLeft, CheckCircle, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { StudyCopilotLogo } from './landing-page';
import { Label } from './ui/label';
import { requestPasswordReset } from '../lib/auth-service';
import { toast } from 'sonner';
import { useTheme } from './theme-provider';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email address'); return; }
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setIsEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <StudyCopilotLogo />
        </div>
        <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          {!isEmailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold font-display text-foreground mb-2">Reset password</h2>
                <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 bg-input-background border-border rounded-xl" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display text-base">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Check your email</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                We've sent a password reset link to{' '}
                <strong className="text-foreground">{email}</strong>
              </p>
              <Button onClick={onBack} className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display text-base">
                Back to Sign In
              </Button>
            </motion.div>
          )}
          {!isEmailSent && (
            <p className="text-center mt-8">
              <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />Back to Sign In
              </button>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
