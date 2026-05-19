import { Settings, LogOut, Moon, Sun, ChevronDown, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useTheme } from './theme-provider';
import { StudyCopilotLogo } from './landing-page';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface AppHeaderProps {
  user: User | null;
  onLogout: () => void;
  onOpenProfile: () => void;
  currentPage?: string;
  onNavigateHome?: () => void;
}

export function AppHeader({ user, onLogout, onOpenProfile, currentPage, onNavigateHome }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-2xl border-b-2 border-primary/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 hover:opacity-80 transition-all btn-bounce text-foreground"
        >
          <span className="text-2xl">📚</span>
          <span className="font-display text-lg font-bold gradient-text hidden sm:block">
            StudyCopilot
          </span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {currentPage && (
            <span className="hidden lg:flex items-center gap-1 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              {currentPage}
            </span>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all btn-bounce"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-xl hover:bg-accent transition-all">
                <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-semibold text-foreground max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-card border-2 border-primary/10 rounded-2xl shadow-lg shadow-primary/5" align="end">
              <div className="px-3 py-2.5 border-b border-border/50 mb-1">
                <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <button
                onClick={onOpenProfile}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent rounded-xl transition-all"
              >
                <Settings className="w-4 h-4 text-secondary" />
                Settings
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
