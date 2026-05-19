import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, ArrowRight, Moon, Sun, ChevronDown, Menu, X,
  BookOpen, Headphones, BookText, FileText, PenLine, Gamepad2,
  Target, FileQuestion, Camera, Brain, Laptop, Play, CheckCircle,
  Quote, Upload, Zap, Volume2, FlaskConical, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

/* ─────────────────── LOGO ─────────────────── */
export function StudyCopilotLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="text-2xl">📚</span>
      <span className="font-display text-lg font-bold gradient-text">StudyCopilot</span>
    </div>
  );
}

/* ─────────────────── TESTIMONIALS DATA ─────────────────── */
const testimonials = [
  {
    quote: "I used to spend hours highlighting. Now, I just upload the chapter and listen to the summary while I walk to class.",
    name: "Ramesh K.",
    level: "Grade 12 · Physics",
    initials: "R",
    gradient: "from-secondary to-[#4A90E2]",
    stars: 5,
  },
  {
    quote: "The quizzes feel like actual exam questions. I scored 15% higher on my mid-terms after just two weeks.",
    name: "Priya S.",
    level: "Bachelor's · Computer Science",
    initials: "P",
    gradient: "from-primary to-primary/70",
    stars: 5,
  },
  {
    quote: "My daughter is in Grade 7 and she loves the audio lessons. She listens to her Science chapters like a podcast before bed!",
    name: "Sunita M.",
    level: "Parent · Grade 7 student",
    initials: "S",
    gradient: "from-[#F5A623] to-[#E89500]",
    stars: 5,
  },
  {
    quote: "As a Master's student, the solved exercises are a lifesaver. It doesn't just give answers — it explains every single step of the logic.",
    name: "Arun T.",
    level: "Master's · Applied Mathematics",
    initials: "A",
    gradient: "from-[#4A90E2] to-secondary",
    stars: 5,
  },
  {
    quote: "I struggle with big words in my Social Studies book. The vocabulary tool explains everything so simply. It's like magic!",
    name: "Anisha G.",
    level: "Grade 5 · Social Studies",
    initials: "A",
    gradient: "from-pink-500 to-rose-400",
    stars: 5,
  },
  {
    quote: "Preparing for my board exams was so stressful until I found this. I upload each chapter and get a complete study kit in minutes.",
    name: "Bikash R.",
    level: "Grade 10 · All Subjects",
    initials: "B",
    gradient: "from-emerald-500 to-teal-500",
    stars: 5,
  },
  {
    quote: "The text summaries cut my reading time in half. I use it for every journal article in my research work now.",
    name: "Dr. Kavita J.",
    level: "Master's · Public Health",
    initials: "K",
    gradient: "from-violet-500 to-purple-500",
    stars: 4,
  },
  {
    quote: "I'm a visual learner so reading is hard for me. The audio lessons let me actually understand the content without straining my eyes.",
    name: "Sagar P.",
    level: "Grade 8 · Science",
    initials: "S",
    gradient: "from-cyan-500 to-blue-500",
    stars: 5,
  },
];

/* ─────────────────── TESTIMONIALS CAROUSEL ─────────────────── */
function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const cardWidth = el.querySelector<HTMLElement>('.testimonial-card')?.clientWidth ?? 340;
    const gap = 20;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIdx(Math.min(idx, testimonials.length - 1));
  }, []);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('.testimonial-card')?.clientWidth ?? 340;
    const amount = dir === 'left' ? -(cardWidth + 20) : cardWidth + 20;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('.testimonial-card')?.clientWidth ?? 340;
    el.scrollTo({ left: idx * (cardWidth + 20), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, scroll]);

  // Check scroll bounds on mount
  useEffect(() => { checkScroll(); }, [checkScroll]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with navigation arrows */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5A623]/10 text-[#F5A623] rounded-full text-xs font-semibold mb-5 border border-[#F5A623]/20">
              <Quote className="w-3.5 h-3.5" />
              Student Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              Loved by students{' '}
              <span className="bg-gradient-to-r from-[#F5A623] to-primary bg-clip-text text-transparent">across every level</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              From grade school to graduate school — hear how StudyCopilot transforms study time.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-border/60 bg-white/70 dark:bg-card/70 backdrop-blur-sm flex items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/70 dark:disabled:hover:bg-card/70 disabled:hover:text-foreground disabled:hover:border-border/60 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-border/60 bg-white/70 dark:bg-card/70 backdrop-blur-sm flex items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/70 dark:disabled:hover:bg-card/70 disabled:hover:text-foreground disabled:hover:border-border/60 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable carousel track */}
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {canScrollLeft && <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />}
          {canScrollRight && <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory hide-scrollbar"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="testimonial-card snap-start shrink-0 w-[300px] sm:w-[340px]"
              >
                <div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)] p-6 sm:p-7 h-full flex flex-col group hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <svg key={si} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-sm sm:text-[15px] text-foreground leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.level}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to ${t.name}'s testimonial`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-border hover:bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── HERO ILLUSTRATION ─────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto h-[420px] sm:h-[480px]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-primary/8 rounded-full blur-[60px]" />

      {/* LEFT: Textbook page (blurred/static) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute left-0 top-8 sm:top-12 w-[180px] sm:w-[200px]"
      >
        <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border shadow-xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-orange-50/40 dark:from-amber-950/20 dark:to-orange-950/10" />
          <div className="relative space-y-2.5">
            <div className="text-[10px] font-bold text-secondary/60 dark:text-secondary/40 uppercase tracking-wider mb-3">Chapter 4</div>
            {/* Simulated text lines (blurred) */}
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-full blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[90%] blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[95%] blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[70%] blur-[1px]" />
            <div className="h-1.5" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-full blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[85%] blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[92%] blur-[1px]" />
            <div className="h-2 bg-gray-300/60 dark:bg-gray-600/30 rounded-full w-[60%] blur-[1px]" />
          </div>
          {/* Page corner fold */}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-gray-200 dark:from-gray-700 to-transparent" />
        </div>
        <div className="mt-2 text-center text-[10px] font-medium text-muted-foreground">Dusty Textbook</div>
      </motion.div>

      {/* CENTER: AI Processing arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div className="bg-secondary text-white text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
            AI Processing...
          </div>
          {/* Dashed connection lines */}
          <svg className="absolute top-1/2 -left-16 w-16 h-[2px]" viewBox="0 0 64 2">
            <motion.line x1="0" y1="1" x2="64" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-border" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
          </svg>
          <svg className="absolute top-1/2 -right-16 w-16 h-[2px]" viewBox="0 0 64 2">
            <motion.line x1="0" y1="1" x2="64" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-border" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
          </svg>
        </div>
      </motion.div>

      {/* RIGHT: Digital interface (clean, glowing) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute right-0 top-4 sm:top-8 w-[190px] sm:w-[220px]"
      >
        <div className="bg-white dark:bg-card rounded-2xl border border-primary/20 dark:border-primary/30 shadow-xl shadow-primary/10 p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                <FlaskConical className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-foreground">Science Ch.4</div>
                <div className="text-[8px] text-muted-foreground">8 modules ready</div>
              </div>
            </div>

            {/* Play Audio button */}
            <button className="w-full flex items-center gap-2.5 bg-secondary text-white rounded-xl px-3.5 py-2.5 mb-2.5 shadow-md shadow-secondary/20 text-left">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <div className="text-[10px] font-bold">Play Audio Lesson</div>
                <div className="text-[8px] text-white/60">12 min • AI narrated</div>
              </div>
            </button>

            {/* Start Quiz button */}
            <button className="w-full flex items-center gap-2.5 bg-primary text-primary-foreground rounded-xl px-3.5 py-2.5 mb-2.5 shadow-md shadow-primary/20 text-left">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] font-bold">Start Quiz</div>
                <div className="text-[8px] opacity-70">15 questions</div>
              </div>
            </button>

            {/* Progress bar */}
            <div className="bg-muted rounded-lg px-3 py-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[8px] font-medium text-muted-foreground">Vocabulary</span>
                <span className="text-[8px] font-bold text-primary">24 words</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] font-medium text-primary">Interactive Lessons</div>
      </motion.div>

      {/* Floating badge - High Fidelity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-6 sm:left-10 z-20"
      >
        <div className="bg-white dark:bg-card border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-[9px] font-bold text-foreground">High-Fidelity OCR</span>
        </div>
      </motion.div>

      {/* Floating badge - AI Powered */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-16 right-4 sm:right-8 z-20"
      >
        <div className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-[9px] font-bold shadow-lg shadow-primary/30 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> AI Generated
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-2 right-1/3 w-3 h-3 rounded-full bg-[#F5A623]/40" />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-[#4A90E2]/40" />
      <div className="absolute top-1/3 right-4 w-2.5 h-2.5 rounded-full bg-primary/30" />
    </div>
  );
}

/* ─────── AUDIO WAVEFORM ANIMATION ─────── */
function AudioWaveform() {
  const bars = [3, 5, 8, 6, 9, 4, 7, 5, 8, 3, 6, 9, 5, 7, 4];
  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-gradient-to-t from-secondary to-secondary/50 rounded-full"
          animate={{ height: [`${h * 3}px`, `${(h * 3) + 10}px`, `${h * 3}px`] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

/* ────── FEATURE ILLUSTRATIONS ────── */
function DocSparkleIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative flex items-center gap-5">
        {/* Document card */}
        <div className="w-[72px] h-[88px] bg-[#1a2740] dark:bg-[#151f32] rounded-xl border border-[#2a3a56] dark:border-[#253350] shadow-lg p-3.5 flex flex-col justify-center gap-[6px]">
          <div className="h-[5px] bg-primary/60 rounded-full w-[85%]" />
          <div className="h-[5px] bg-primary/40 rounded-full w-full" />
          <div className="h-[5px] bg-muted-foreground/20 rounded-full w-[70%]" />
          <div className="h-[5px] bg-muted-foreground/15 rounded-full w-[90%]" />
          <div className="h-[5px] bg-muted-foreground/15 rounded-full w-[55%]" />
          <div className="h-[5px] bg-muted-foreground/10 rounded-full w-[80%]" />
        </div>

        {/* Dashed connector */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-[2px] h-2 bg-primary/30 rounded-full" />
          <div className="w-[2px] h-2 bg-primary/20 rounded-full" />
          <div className="w-[2px] h-2 bg-primary/30 rounded-full" />
        </div>

        {/* Summary key points */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/25 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="h-[6px] bg-primary/50 rounded-full w-20" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            </div>
            <div className="h-[6px] bg-primary/35 rounded-full w-16" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/15 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="h-[6px] bg-muted-foreground/15 rounded-full w-18" />
          </div>
        </div>

        {/* Sparkle badge */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -top-4 -right-3 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
    </div>
  );
}

function AudioIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
        <AudioWaveform />
      </div>
    </div>
  );
}

function QuizIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="space-y-3 w-full max-w-[140px]">
        {[
          { checked: true, width: 'w-[85%]', color: 'bg-primary' },
          { checked: true, width: 'w-[70%]', color: 'bg-primary' },
          { checked: false, width: 'w-[78%]', color: 'bg-muted-foreground/20' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -12, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-2.5"
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.checked ? 'bg-primary' : 'border-2 border-muted-foreground/30'}`}>
              {item.checked && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 5L4.5 7L7.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="flex-1 flex items-center gap-1.5">
              <div className={`h-[6px] rounded-full ${item.checked ? item.color + '/40' : item.color} ${item.width}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ExerciseIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="space-y-3 w-full max-w-[150px]">
          {[
            { label: 'Step 1', color: 'bg-[#4A90E2] text-[#4A90E2]', barColor: 'bg-[#4A90E2]/30', barW: 'w-14' },
            { label: 'Step 2', color: 'bg-primary text-primary', barColor: 'bg-primary/30', barW: 'w-16' },
            { label: 'Step 3', color: 'bg-[#F5A623] text-[#F5A623]', barColor: 'bg-[#F5A623]/30', barW: 'w-12' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ x: 10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${s.color.split(' ')[0]}/15 ${s.color.split(' ')[1]} whitespace-nowrap`}>
                {s.label}
              </span>
              <div className={`h-[5px] rounded-full ${s.barColor} ${s.barW}`} />
            </motion.div>
          ))}
        </div>
        {/* Pen icon */}
        <motion.div
          animate={{ rotate: [-3, 3, -3], y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-2 -right-3"
        >
          <PenLine className="w-5 h-5 text-secondary" />
        </motion.div>
      </div>
    </div>
  );
}

function VocabIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Background card (stack effect) */}
        <div className="absolute top-1.5 left-1.5 w-full h-full bg-primary/8 rounded-xl border border-primary/15 rotate-2" />
        {/* Main flashcard */}
        <div className="relative w-[140px] bg-[#1a2740] dark:bg-[#151f32] rounded-xl border border-[#2a3a56] dark:border-[#253350] shadow-lg p-3 -rotate-1">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
              <BookText className="w-3 h-3 text-primary" />
            </div>
            <span className="text-[10px] font-bold text-primary">Photosynthesis</span>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] text-muted-foreground leading-snug">The process by</div>
            <div className="text-[8px] text-muted-foreground leading-snug">which plants</div>
            <div className="text-[8px] text-muted-foreground leading-snug">convert light...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN ─────────────────── */
export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#workflow' },
    { label: 'About', href: '#brain' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const features = [
    {
      title: 'Unit Text & Summary',
      hook: 'Ditch the fluff. Get the core concepts in seconds.',
      illustration: <DocSparkleIllustration />,
      size: 'large' as const,
    },
    {
      title: 'Audio Lessons',
      hook: 'Turn your textbook into a podcast for your commute or gym.',
      illustration: <AudioIllustration />,
      size: 'small' as const,
    },
    {
      title: 'Interactive Quizzes',
      hook: 'Test your knowledge instantly with AI-generated questions.',
      illustration: <QuizIllustration />,
      size: 'small' as const,
    },
    {
      title: 'Solved Exercises',
      hook: 'Stuck on a problem? Get step-by-step logic, not just answers.',
      illustration: <ExerciseIllustration />,
      size: 'small' as const,
    },
    {
      title: 'Smart Vocabulary',
      hook: 'Instant definitions and context for the hardest terms in the unit.',
      illustration: <VocabIllustration />,
      size: 'small' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background" style={{ overflowX: 'clip' }}>
      {/* ═══════ STICKY NAV ═══════ */}
      <div className="sticky top-0 z-50 pt-4 pb-2 px-4 sm:px-6">
        <nav className={`max-w-5xl mx-auto backdrop-blur-2xl border rounded-full px-6 sm:px-8 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-card/80 border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-white/70 dark:bg-card/70 border-white/60 dark:border-border/60 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)]'}`}>
            <div className="text-foreground shrink-0">
              <StudyCopilotLogo className="h-7 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <Button variant="outline" size="sm" onClick={onLogin} className="hidden sm:inline-flex rounded-full border-border text-foreground font-medium px-5 h-9">
                Login
              </Button>
              <Button size="sm" onClick={onGetStarted} className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 h-9">
                Get Started
              </Button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors">
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden max-w-5xl mx-auto mt-2 bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted">
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border my-2" />
              <Button variant="outline" size="sm" onClick={() => { onLogin(); setMobileMenuOpen(false); }} className="sm:hidden rounded-xl w-full justify-center h-10">Login</Button>
            </motion.div>
          )}
      </div>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col -mt-[4.5rem] pt-[4.5rem]">
        {/* Unified background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.03]" />
          <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-gradient-to-bl from-primary/[0.06] via-transparent to-transparent rounded-bl-[50%]" />
          <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-gradient-to-tr from-secondary/[0.05] via-transparent to-transparent rounded-tr-[50%]" />
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        {/* ── Hero content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Copy */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/60 text-primary rounded-full text-xs font-semibold mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Learning
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
                  Turn Your Textbook into an{' '}
                  <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                    Interactive Tutor
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                  Upload a photo of any chapter. Get instant audio lessons, interactive quizzes, and solved exercises. Powered by advanced AI.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
                  <Button size="lg" onClick={onGetStarted} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-13 text-base font-semibold shadow-lg shadow-primary/20 rounded-full">
                    Upload Your First Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={onLogin} className="h-13 text-base border-border rounded-full font-medium">
                    Get Started for Free
                  </Button>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 rounded-full px-3 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="font-medium">Free to start</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 rounded-full px-3 py-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span className="font-medium">Results in seconds</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/60 dark:bg-card/60 backdrop-blur-sm border border-border/40 rounded-full px-3 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-medium">High-Fidelity OCR</span>
                  </div>
                </div>
              </motion.div>

              {/* Illustration */}
              <div className="hidden lg:block">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="relative z-10 pb-6 flex justify-center">
          <a href="#features" className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition group">
            <span className="text-[10px] font-medium">See what's inside</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 rounded-full border-2 border-current/30 flex items-start justify-center pt-1.5">
              <div className="w-1 h-1 rounded-full bg-current" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ═══════ FEATURE GRID: "From Paper to Power" ═══════ */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-muted/30 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-semibold mb-5 border border-secondary/20">
              From Paper to Power
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Everything your textbook{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">can't do</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI reads your content and transforms it into five powerful learning tools.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className={`group ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="h-full bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden">
                  <div className={`h-full ${i === 0 ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
                    {/* Illustration area */}
                    <div className={`bg-gradient-to-br from-muted/50 to-muted/80 dark:from-muted/30 dark:to-muted/50 ${i === 0 ? 'h-40 sm:h-auto sm:w-2/5' : 'h-36'} flex items-center justify-center p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />
                      <div className="relative z-10 w-full h-full">
                        {f.illustration}
                      </div>
                    </div>
                    {/* Text */}
                    <div className={`p-5 sm:p-6 ${i === 0 ? 'sm:w-3/5 flex flex-col justify-center' : ''}`}>
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.hook}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WORKFLOW: "Snap, Sync, Study" ═══════ */}
      <section id="workflow" className="relative py-24 sm:py-32">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-5 border border-primary/20">
              3 Simple Steps
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Snap, Sync,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Study</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              From a textbook photo to a full study plan in under a minute.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Dashed connector line (desktop) */}
            <div className="hidden md:block absolute top-[140px] left-[20%] right-[20%] h-[2px] z-10">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 2">
                <line x1="0" y1="1" x2="600" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" className="text-border" />
              </svg>
            </div>

            {/* ── Step 1: Snap ── */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
              <div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)] overflow-hidden h-full relative">
                <div className="text-[10px] font-extrabold text-muted-foreground/40 absolute top-4 right-5 z-10">01</div>
                <div className="bg-gradient-to-br from-[#4A90E2]/5 to-[#4A90E2]/10 dark:from-[#4A90E2]/10 dark:to-[#4A90E2]/5 p-6 flex items-center justify-center h-[180px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                  <div className="relative flex items-center gap-4">
                    {/* Phone scanning a page */}
                    <div className="w-[72px] h-[104px] bg-[#1a2740] dark:bg-[#151f32] rounded-xl border-2 border-[#2a3a56] dark:border-[#253350] shadow-lg p-1.5 relative">
                      <div className="w-4 h-1 bg-[#2a3a56] rounded-full mx-auto mb-1" />
                      <div className="bg-white/10 rounded-md h-[72px] p-1.5 relative overflow-hidden">
                        <div className="space-y-[5px]">
                          <div className="h-[3px] bg-white/25 rounded-full w-[90%]" />
                          <div className="h-[3px] bg-white/20 rounded-full w-full" />
                          <div className="h-[3px] bg-white/25 rounded-full w-[75%]" />
                          <div className="h-[3px] bg-white/15 rounded-full w-[85%]" />
                          <div className="h-[3px] bg-white/20 rounded-full w-[60%]" />
                          <div className="mt-1 h-[3px] bg-white/25 rounded-full w-[95%]" />
                          <div className="h-[3px] bg-white/15 rounded-full w-[70%]" />
                        </div>
                        <motion.div animate={{ y: [-2, 68, -2] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-0 right-0 h-[2px] bg-[#4A90E2] shadow-[0_0_8px_rgba(74,144,226,0.6)]" />
                      </div>
                    </div>
                    {/* Capture button */}
                    <div className="flex flex-col items-center gap-2">
                      <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-10 h-10 rounded-full bg-[#4A90E2] flex items-center justify-center shadow-lg shadow-[#4A90E2]/30">
                        <Camera className="w-4.5 h-4.5 text-white" />
                      </motion.div>
                      <div className="bg-[#4A90E2]/15 text-[#4A90E2] text-[8px] font-bold px-2.5 py-1 rounded-full">Scanning</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Snap</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Take a photo of your textbook unit or upload a PDF. Our OCR handles the rest.</p>
                </div>
              </div>
            </motion.div>

            {/* ── Step 2: Analyze ── */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)] overflow-hidden h-full relative">
                <div className="text-[10px] font-extrabold text-muted-foreground/40 absolute top-4 right-5 z-10">02</div>
                <div className="bg-gradient-to-br from-[#F5A623]/5 to-[#F5A623]/10 dark:from-[#F5A623]/10 dark:to-[#F5A623]/5 p-6 flex items-center justify-center h-[180px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                  <div className="relative">
                    {/* Rotating dashed orbit */}
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-[-12px] flex items-center justify-center">
                      <div className="w-[110px] h-[110px] rounded-full border border-dashed border-[#F5A623]/25" />
                    </motion.div>
                    {/* Central brain node */}
                    <div className="relative w-[86px] h-[86px] flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E89500] flex items-center justify-center shadow-lg shadow-[#F5A623]/30 z-10">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      {/* Orbiting satellite nodes */}
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="absolute -top-1 left-1/2 -ml-2 w-4 h-4 rounded-full bg-[#4A90E2] flex items-center justify-center shadow-md">
                        <FileText className="w-2 h-2 text-white" />
                      </motion.div>
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute -bottom-1 left-1/2 -ml-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Volume2 className="w-2 h-2 text-white" />
                      </motion.div>
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="absolute top-1/2 -left-1 -mt-2 w-4 h-4 rounded-full bg-secondary flex items-center justify-center shadow-md">
                        <Target className="w-2 h-2 text-white" />
                      </motion.div>
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }} className="absolute top-1/2 -right-1 -mt-2 w-4 h-4 rounded-full bg-[#F5A623] flex items-center justify-center shadow-md">
                        <BookText className="w-2 h-2 text-white" />
                      </motion.div>
                    </div>
                    {/* Status pills */}
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                      <div className="bg-[#F5A623]/15 text-[#F5A623] text-[7px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">Parsing</div>
                      <div className="bg-primary/15 text-primary text-[7px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">Building</div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Analyze</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Our AI scans the text, understands the context, and builds your complete lesson plan.</p>
                </div>
              </div>
            </motion.div>

            {/* ── Step 3: Learn ── */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)] overflow-hidden h-full relative">
                <div className="text-[10px] font-extrabold text-muted-foreground/40 absolute top-4 right-5 z-10">03</div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-6 flex items-center justify-center h-[180px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                  <div className="relative flex items-end gap-3">
                    {/* Laptop */}
                    <div className="relative">
                      <div className="w-[96px] h-[62px] bg-[#1a2740] dark:bg-[#151f32] rounded-t-lg border border-b-0 border-[#2a3a56] dark:border-[#253350] p-2">
                        <div className="bg-white/8 rounded-sm h-full p-1.5 flex flex-col gap-1">
                          <div className="flex items-center gap-1 mb-0.5">
                            <div className="w-5 h-1.5 rounded-full bg-primary/50" />
                            <div className="w-3 h-1.5 rounded-full bg-[#F5A623]/40" />
                          </div>
                          <div className="h-[3px] bg-white/15 rounded-full w-[80%]" />
                          <div className="h-[3px] bg-white/10 rounded-full w-full" />
                          <div className="h-[3px] bg-primary/30 rounded-full w-[65%]" />
                          <div className="flex gap-1 mt-auto">
                            <div className="flex-1 h-3.5 rounded-sm bg-primary/20 flex items-center justify-center">
                              <Play className="w-2 h-2 text-primary fill-primary" />
                            </div>
                            <div className="flex-1 h-3.5 rounded-sm bg-secondary/20 flex items-center justify-center">
                              <CheckCircle className="w-2 h-2 text-secondary" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[106px] h-[5px] bg-[#2a3a56] dark:bg-[#253350] rounded-b-md -ml-[5px]" />
                    </div>
                    {/* Phone */}
                    <div className="w-[38px] h-[66px] bg-[#1a2740] dark:bg-[#151f32] rounded-lg border border-[#2a3a56] dark:border-[#253350] p-1 shadow-md">
                      <div className="w-2.5 h-0.5 bg-[#2a3a56] rounded-full mx-auto mb-0.5" />
                      <div className="bg-white/8 rounded-sm h-[46px] p-1 flex flex-col gap-[3px]">
                        <div className="h-[2px] bg-white/20 rounded-full w-[85%]" />
                        <div className="h-[2px] bg-white/15 rounded-full w-full" />
                        <div className="h-[2px] bg-primary/30 rounded-full w-[70%]" />
                        <div className="mt-auto flex gap-0.5">
                          <div className="flex-1 h-2.5 rounded-xs bg-primary/25" />
                          <div className="flex-1 h-2.5 rounded-xs bg-[#F5A623]/25" />
                        </div>
                      </div>
                    </div>
                    {/* Floating badge */}
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 -right-1">
                      <div className="bg-primary text-primary-foreground text-[7px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-primary/30 whitespace-nowrap">Any device</div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Learn</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Listen, read, quiz yourself, and practice — anywhere, on any device.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ "BRAIN" SECTION: AI Transparency ═══════ */}
      <section id="brain" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.04] via-background to-primary/[0.03] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Illustration */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative max-w-[420px] mx-auto">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary/8 rounded-full blur-[60px]" />

                {/* Main card */}
                <div className="relative bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white/80 dark:border-border/60 rounded-3xl shadow-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-md">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-secondary">AI Analysis Engine</div>
                      <div className="text-[10px] text-muted-foreground">Understanding pedagogy, not just text</div>
                    </div>
                  </div>

                  {/* Visual: connected analysis nodes */}
                  <div className="space-y-3">
                    {[
                      { label: 'Key Objectives', pct: 95, color: 'bg-primary' },
                      { label: 'Context Mapping', pct: 88, color: 'bg-secondary' },
                      { label: 'Question Patterns', pct: 92, color: 'bg-[#F5A623]' },
                      { label: 'Audio Generation', pct: 97, color: 'bg-[#4A90E2]' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-20 text-[10px] font-medium text-muted-foreground shrink-0">{item.label}</div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-foreground w-8">{item.pct}%</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Badge */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Fact-Checked Logic
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" /> High-Fidelity OCR
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-semibold mb-5 border border-secondary/20">
                <Brain className="w-3.5 h-3.5" />
                The AI Behind It
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-5 leading-tight">
                It's like having a{' '}
                <span className="bg-gradient-to-r from-secondary to-[#4A90E2] bg-clip-text text-transparent">PhD student</span>{' '}
                read your book with you.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                Our LLM doesn't just "read" the text — it understands the pedagogy. It identifies key learning objectives, generates human-like audio, and creates practice questions that actually mirror exam patterns.
              </p>
              <div className="space-y-3">
                {[
                  'Identifies learning objectives automatically',
                  'Generates human-like narrated audio lessons',
                  'Creates exam-pattern practice questions',
                  'Step-by-step logic for solved exercises',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-5 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Early Access
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start transforming your study materials today. Premium pricing will be introduced in a few months, but early users get full access completely free right now.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  100% Free
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Early Adopter</h3>
                <p className="text-muted-foreground text-sm">Everything you need to master your textbooks.</p>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-extrabold text-foreground">$0</span>
                <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/50">$15</span>
                <span className="text-sm font-medium text-muted-foreground">/mo</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited textbook image uploads',
                  'Instant Markdown & concept summaries',
                  'AI-generated quizzes & exercises',
                  'Audio lessons for any chapter',
                  'Lock in early user benefits'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" onClick={onGetStarted} className="w-full h-12 sm:h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                Join Early Access Now
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                No credit card required. Free during early access period.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <TestimonialsCarousel />

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border/60 py-8 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-foreground">
            <StudyCopilotLogo className="h-5 w-auto" />
          </div>
          <p className="text-xs text-muted-foreground">
            Built with AI. Designed for Nepali students.
          </p>
        </div>
      </footer>
    </div>
  );
}