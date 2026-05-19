import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { AppHeader } from './app-header';
import { motion } from 'motion/react';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface AudioLessonProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onNextModule: () => void;
  onPreviousModule: () => void;
  onRegenerate?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

interface TranscriptSection {
  id: number;
  timestamp: string;
  timeInSeconds: number;
  text: string;
}

const defaultTranscript: TranscriptSection[] = [
  { id: 1, timestamp: '0:00', timeInSeconds: 0, text: 'Welcome to this audio lesson on Cell Structure and Functions. In this lesson, we will explore the fundamental building blocks of life and understand how cells work.' },
  { id: 2, timestamp: '0:15', timeInSeconds: 15, text: 'Every living organism is made of cells. They are the smallest units of life that can replicate independently.' },
  { id: 3, timestamp: '0:30', timeInSeconds: 30, text: 'There are two main types of cells: Prokaryotic and Eukaryotic cells. Let\'s discuss the differences.' },
  { id: 4, timestamp: '0:45', timeInSeconds: 45, text: 'Prokaryotic cells are simple, single-celled organisms without a nucleus. Bacteria are a common example.' },
  { id: 5, timestamp: '1:00', timeInSeconds: 60, text: 'Eukaryotic cells are more complex. They have a nucleus and membrane-bound organelles. Plants and animals have these cells.' }
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const DEFAULT_TOTAL_DURATION = 195;

export function AudioLesson({ subject, unit, user, onBack, onNextModule, onPreviousModule, onRegenerate, onLogout, onOpenProfile, onNavigateHome }: AudioLessonProps) {
  const [transcriptData, setTranscriptData] = useState<TranscriptSection[]>(defaultTranscript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [activeSection, setActiveSection] = useState(0);
  const [totalDuration, setTotalDuration] = useState(DEFAULT_TOTAL_DURATION);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (unit.content?.audioLesson?.data && typeof unit.content.audioLesson.data === 'string') {
      const text = unit.content.audioLesson.data;
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      const newTranscript = sentences.map((sentence, index) => ({
        id: index + 1,
        timestamp: formatTime(index * 10),
        timeInSeconds: index * 10,
        text: sentence.trim()
      }));
      setTranscriptData(newTranscript);
      setTotalDuration(Math.max(sentences.length * 10, 60));
    }
  }, [unit.content]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1 * playbackSpeed;
          if (newTime >= totalDuration) { setIsPlaying(false); return totalDuration; }
          return newTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, playbackSpeed, totalDuration]);

  useEffect(() => {
    for (let i = transcriptData.length - 1; i >= 0; i--) {
      if (currentTime >= transcriptData[i].timeInSeconds) { setActiveSection(i); break; }
    }
  }, [currentTime, transcriptData]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const handleSeek = (value: number[]) => setCurrentTime(value[0]);
  const skipForward = () => setCurrentTime(Math.min(currentTime + 10, totalDuration));
  const skipBackward = () => setCurrentTime(Math.max(currentTime - 10, 0));
  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
  };
  const jumpToSection = (timeInSeconds: number) => setCurrentTime(timeInSeconds);
  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Audio Lesson`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-xl shadow-md shadow-primary/10">🎧</div>
          <div>
            <h1 className="text-foreground font-bold font-display text-xl">Audio Lesson</h1>
            <p className="text-sm text-muted-foreground font-semibold">{unit.title} • {formatTime(totalDuration)}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6 bg-card rounded-2xl border-2 border-border">
                <div className="bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 mb-6 relative overflow-hidden">
                  <div className="flex items-center justify-center gap-1 h-24">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const height = Math.random() * 60 + 20;
                      const isPassed = (i / 60) * 100 < progress;
                      return (
                        <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isPassed ? 'bg-gradient-to-t from-primary to-secondary' : 'bg-secondary/30'}`} style={{ height: `${height}%` }} />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <Slider value={[currentTime]} max={totalDuration} step={0.1} onValueChange={handleSeek} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground font-semibold">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalDuration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={skipBackward} className="rounded-full border-2 border-border">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="icon" onClick={togglePlayPause} className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/20">
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={skipForward} className="rounded-full border-2 border-border">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={cyclePlaybackSpeed} className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-xl transition-colors text-foreground font-semibold border-2 border-border">
                      {playbackSpeed}x
                    </button>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} className="w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 bg-gradient-to-r from-secondary to-primary text-white border-0 rounded-2xl shadow-lg shadow-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg">💡</div>
                  <div>
                    <h3 className="text-white font-bold font-display mb-2">Listening Tips</h3>
                    <ul className="space-y-1 text-sm text-white/90 font-semibold">
                      <li>• Follow along with the transcript for better comprehension</li>
                      <li>• Adjust playback speed to match your learning pace</li>
                      <li>• Take notes on important concepts as you listen</li>
                      <li>• Replay sections that need more attention</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="p-6 bg-card rounded-2xl border-2 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-foreground font-bold font-display">Transcript</h2>
                  <Badge className="bg-primary/10 text-primary rounded-full font-semibold">Live</Badge>
                </div>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {transcriptData.map((section, index) => (
                    <button key={section.id} onClick={() => jumpToSection(section.timeInSeconds)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        activeSection === index
                          ? 'bg-primary/5 border-2 border-primary/30'
                          : 'bg-muted border-2 border-transparent hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className={`text-xs flex-shrink-0 rounded-full font-semibold ${
                          activeSection === index ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground'
                        }`}>{section.timestamp}</Badge>
                        <p className={`text-sm font-semibold ${activeSection === index ? 'text-foreground' : 'text-muted-foreground'}`}>{section.text}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={onPreviousModule} className="border-2 border-border rounded-xl font-semibold">
            <ChevronLeft className="w-4 h-4" />Previous: Unit Text
          </Button>
          <Button onClick={onNextModule} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
            Next: Vocabulary<ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
