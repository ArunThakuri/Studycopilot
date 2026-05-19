import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { StudyCopilotLogo } from './landing-page';

interface PublicNavProps {
  currentPage?: string;
  onViewFeatures?: () => void;
  onViewPricing?: () => void;
  onViewAbout?: () => void;
  onLogin?: () => void;
  onGetStarted?: () => void;
}

export function PublicNav({ currentPage, onViewFeatures, onViewPricing, onViewAbout, onLogin, onGetStarted }: PublicNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (callback?: () => void) => {
    setIsOpen(false);
    if (callback) callback();
  };

  return (
    <nav className="bg-card/70 backdrop-blur-2xl border-b-2 border-primary/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <StudyCopilotLogo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={onViewFeatures} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors btn-bounce">Features</button>
          <button onClick={onViewPricing} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors btn-bounce">Pricing</button>
          <button onClick={onViewAbout} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors btn-bounce">About</button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {onLogin && (
            <Button variant="ghost" onClick={onLogin} className="text-foreground font-semibold rounded-xl">Log In</Button>
          )}
          {onGetStarted && (
            <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display" onClick={onGetStarted}>
              Get Started Free
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground rounded-xl">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[380px] bg-card border-l-2 border-primary/10">
              <div className="flex flex-col gap-1 mt-8">
                <button onClick={() => handleNavClick(onViewFeatures)} className="text-base font-semibold text-foreground hover:text-primary hover:bg-accent rounded-xl py-3 px-4 text-left transition-all">Features</button>
                <button onClick={() => handleNavClick(onViewPricing)} className="text-base font-semibold text-foreground hover:text-primary hover:bg-accent rounded-xl py-3 px-4 text-left transition-all">Pricing</button>
                <button onClick={() => handleNavClick(onViewAbout)} className="text-base font-semibold text-foreground hover:text-primary hover:bg-accent rounded-xl py-3 px-4 text-left transition-all">About</button>
                <div className="h-px bg-border my-3" />
                {onLogin && (
                  <Button variant="ghost" onClick={() => handleNavClick(onLogin)} className="justify-start text-base font-semibold rounded-xl py-3 h-auto">Log In</Button>
                )}
                {onGetStarted && (
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-base rounded-xl font-display mt-2 py-3 h-auto" onClick={() => handleNavClick(onGetStarted)}>
                    Get Started Free
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
