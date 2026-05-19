import { useState } from 'react';
import { Lock, Loader2, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { updatePassword } from '../lib/auth-service';
import { toast } from 'sonner';
import { useTheme } from './theme-provider';

interface ResetPasswordProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ResetPassword({ onSuccess, onCancel }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) { toast.error('Please fill in both fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setIsLoading(true);
    try {
      await updatePassword(password);
      toast.success('Password updated successfully!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">📚</span>
          <span className="font-display text-lg font-bold gradient-text">StudyCopilot</span>
        </div>
        <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold font-display text-foreground mb-2">Set new password</h2>
            <p className="text-sm text-muted-foreground">Enter your new password below.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 bg-input-background border-border rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 bg-input-background border-border rounded-xl" />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display text-base">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
            </Button>
          </form>
          <p className="text-center mt-8">
            <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-semibold">Cancel</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
