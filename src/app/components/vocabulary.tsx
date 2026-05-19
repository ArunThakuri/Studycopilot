import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Volume2, Star, Plus, Loader2, LayoutGrid, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { AppHeader } from './app-header';
import { lookupVocabulary } from '../lib/ai-service';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface VocabularyProps {
  subject: Subject;
  unit: Unit;
  user?: User | null;
  onBack: () => void;
  onNextModule?: () => void;
  onPreviousModule?: () => void;
  onRegenerate?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onNavigateHome?: () => void;
}

interface VocabWord {
  word: string;
  nepali: string;
  definition: string;
  isStarred?: boolean;
  isCustom?: boolean;
}

export function Vocabulary({ subject, unit, user, onBack, onNextModule, onPreviousModule, onRegenerate, onLogout, onOpenProfile, onNavigateHome }: VocabularyProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newWord, setNewWord] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flashcards'>('list');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getVocabularyData = () => {
    const vocabularyModule = unit.content?.vocabulary;
    if (vocabularyModule && typeof vocabularyModule === 'object' && 'data' in vocabularyModule) return vocabularyModule.data || [];
    if (Array.isArray(vocabularyModule)) return vocabularyModule;
    return [];
  };

  const [words, setWords] = useState<VocabWord[]>(() => {
    const vocabData = getVocabularyData();
    if (vocabData.length > 0) return vocabData.map((v: any) => ({ ...v, isStarred: false, isCustom: false }));
    return [
      { word: 'Concept', nepali: 'अवधारणा', definition: 'An abstract idea or general notion', isStarred: false, isCustom: false },
      { word: 'Knowledge', nepali: 'ज्ञान', definition: 'Facts, information, and skills acquired through experience or education', isStarred: false, isCustom: false },
    ];
  });

  useEffect(() => {
    const vocabData = getVocabularyData();
    if (vocabData.length > 0) {
      const customWords = words.filter(w => w.isCustom);
      const unitWords = vocabData.map((v: any) => {
        const existing = words.find(w => w.word === v.word);
        return { ...v, isStarred: existing?.isStarred || false, isCustom: false };
      });
      setWords([...unitWords, ...customWords]);
    }
  }, [unit.content?.vocabulary]);

  const toggleStar = (index: number) => {
    setWords(words.map((word, i) => i === index ? { ...word, isStarred: !word.isStarred } : word));
  };

  const handleAddWord = async () => {
    const trimmedWord = newWord.trim();
    if (!trimmedWord) return;
    if (words.some(w => w.word.toLowerCase() === trimmedWord.toLowerCase())) {
      toast.error('This word is already in your vocabulary list');
      return;
    }
    setIsLookingUp(true);
    const context = unit.content?.markdown?.data || unit.content?.markdown || '';
    try {
      const result = await lookupVocabulary(trimmedWord, context);
      const isFallback = result.definition === 'Unable to fetch definition';
      const customWord: VocabWord = {
        word: trimmedWord,
        nepali: result.nepali || '(Add translation)',
        definition: result.definition || '(Add definition)',
        isStarred: false,
        isCustom: true,
      };
      setWords([...words, customWord]);
      setNewWord('');
      if (isFallback) {
        toast.error(`Could not get AI definition for "${trimmedWord}". Added with placeholder.`);
      } else {
        toast.success(`Added "${trimmedWord}" to vocabulary!`);
      }
    } catch {
      toast.error('Failed to look up word. Adding with placeholder values.');
      const customWord: VocabWord = {
        word: trimmedWord, nepali: '(Add translation)', definition: '(Add definition)', isStarred: false, isCustom: true,
      };
      setWords([...words, customWord]);
      setNewWord('');
    } finally {
      setIsLookingUp(false);
    }
  };

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unitWords = words.filter(w => !w.isCustom);
  const customWords = words.filter(w => w.isCustom);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex((prev) => (prev + 1) % filteredWords.length), 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length), 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user || null} onLogout={onLogout || (() => {})} onOpenProfile={onOpenProfile || (() => {})} onNavigateHome={onNavigateHome} currentPage={`${unit.title} • Vocabulary`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />Back to Modules
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-md shadow-primary/10">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-foreground text-xl font-bold font-display">Vocabulary</h1>
                <p className="text-sm text-muted-foreground font-semibold">Master {words.length} words</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'list' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <LayoutGrid className="w-4 h-4" />List
              </button>
              <button onClick={() => setViewMode('flashcards')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'flashcards' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <RotateCw className="w-4 h-4" />Flashcards
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge className="bg-primary/10 text-primary rounded-full font-semibold"><span className="mr-1">🇳🇵</span>Nepali Translation & Meaning</Badge>
            <Badge className="bg-muted text-muted-foreground rounded-full font-semibold">{unitWords.length} unit words • {customWords.length} added words</Badge>
          </div>
        </motion.div>

        {viewMode === 'flashcards' ? (
          <div className="max-w-2xl mx-auto">
            {filteredWords.length > 0 ? (
              <div className="space-y-6">
                <div className="perspective-1000 relative h-96 w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                  <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Card className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 text-center border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-primary/5 rounded-2xl">
                      <div className="absolute top-4 right-4 text-sm text-muted-foreground font-semibold">Card {currentCardIndex + 1} of {filteredWords.length}</div>
                      <h2 className="text-4xl font-bold font-display text-foreground mb-4">{filteredWords[currentCardIndex].word}</h2>
                      <Badge className="text-primary border-2 border-primary/20 bg-primary/5 rounded-full font-semibold">Tap to flip</Badge>
                    </Card>

                    <Card className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 text-center border-2 border-secondary/20 shadow-xl bg-gradient-to-br from-card to-secondary/5 rounded-2xl" style={{ transform: 'rotateY(180deg)' }}>
                      <div className="absolute top-4 right-4 text-sm text-muted-foreground font-semibold">Card {currentCardIndex + 1} of {filteredWords.length}</div>
                      <h3 className="text-2xl font-bold font-display text-foreground mb-2">{filteredWords[currentCardIndex].nepali}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
                      <p className="text-lg text-muted-foreground leading-relaxed font-semibold">{filteredWords[currentCardIndex].definition}</p>
                    </Card>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Button variant="outline" onClick={prevCard} className="flex-1 border-2 border-border rounded-xl font-semibold">Previous</Button>
                  <div className="text-sm text-muted-foreground font-bold">{currentCardIndex + 1} / {filteredWords.length}</div>
                  <Button onClick={nextCard} className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">Next</Button>
                </div>
              </div>
            ) : (
              <Card className="text-center py-12 bg-card rounded-2xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-semibold">No words found for flashcards.</p>
              </Card>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="p-4 bg-card rounded-2xl border-2 border-border">
                <h3 className="text-sm text-foreground font-bold font-display mb-3">Search Vocabulary</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search words..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-input-background border-2 border-border rounded-xl" />
                </div>
              </Card>

              <Card className="p-4 bg-card rounded-2xl border-2 border-border">
                <h3 className="text-sm text-foreground font-bold font-display mb-3">Look Up New Word</h3>
                <Input placeholder="Enter a word..." value={newWord} onChange={(e) => setNewWord(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !isLookingUp && handleAddWord()} disabled={isLookingUp} className="mb-3 bg-input-background border-2 border-border rounded-xl" />
                <Button onClick={handleAddWord} disabled={isLookingUp || !newWord.trim()} className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
                  {isLookingUp ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Looking up...</> : <><Plus className="w-4 h-4 mr-2" />Add to Vocab</>}
                </Button>
              </Card>

              <Card className="p-4 bg-card rounded-2xl border-2 border-border">
                <h3 className="text-sm text-foreground font-bold font-display mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  {[{ label: 'Total Words', value: words.length, color: 'text-primary' },
                    { label: 'Unit Words', value: unitWords.length, color: 'text-primary' },
                    { label: 'Added Words', value: customWords.length, color: 'text-secondary' },
                    { label: 'Starred', value: words.filter(w => w.isStarred).length, color: 'text-amber-500' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between text-sm font-semibold">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className={s.color}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-9">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center"><Volume2 className="w-4 h-4 text-white" /></div>
                  <h2 className="text-foreground font-bold font-display">Unit Vocabulary</h2>
                  <Badge className="bg-primary/10 text-primary rounded-full font-semibold">{(searchQuery ? filteredWords.filter(w => !w.isCustom) : unitWords).length} words</Badge>
                </div>

                <div className="space-y-3">
                  {(searchQuery ? filteredWords.filter(w => !w.isCustom) : unitWords).map((word, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                      <Card className="p-5 hover:shadow-md transition-shadow bg-card border-2 border-border rounded-2xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-foreground font-bold font-display">{word.word}</h3>
                              <button className="text-muted-foreground hover:text-primary transition-colors"><Volume2 className="w-4 h-4" /></button>
                              <Badge className="bg-secondary/10 text-secondary rounded-full font-semibold"><span className="mr-1">🇳🇵</span>{word.nepali.split(' ')[0]}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-semibold">{word.definition}</p>
                          </div>
                          <button onClick={() => toggleStar(words.indexOf(word))} className={`ml-4 transition-colors ${word.isStarred ? 'text-amber-500' : 'text-muted-foreground/30 hover:text-amber-500'}`}>
                            <Star className={`w-5 h-5 ${word.isStarred ? 'fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {customWords.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center"><Plus className="w-4 h-4 text-secondary" /></div>
                    <h2 className="text-foreground font-bold font-display">Added Words</h2>
                    <Badge className="bg-secondary/10 text-secondary rounded-full font-semibold">{(searchQuery ? filteredWords.filter(w => w.isCustom) : customWords).length} words</Badge>
                  </div>
                  <div className="space-y-3">
                    {(searchQuery ? filteredWords.filter(w => w.isCustom) : customWords).map((word, index) => (
                      <Card key={index} className="p-5 hover:shadow-md transition-shadow bg-card border-2 border-secondary/20 rounded-2xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-foreground font-bold font-display">{word.word}</h3>
                              <button className="text-muted-foreground hover:text-primary transition-colors"><Volume2 className="w-4 h-4" /></button>
                              <Badge className="bg-secondary/10 text-secondary rounded-full font-semibold"><span className="mr-1">🇳🇵</span>{word.nepali}</Badge>
                              <Badge className="border-2 border-secondary/30 text-secondary rounded-full font-semibold">Custom</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground italic font-semibold">{word.definition}</p>
                          </div>
                          <button onClick={() => toggleStar(words.indexOf(word))} className={`ml-4 transition-colors ${word.isStarred ? 'text-amber-500' : 'text-muted-foreground/30 hover:text-amber-500'}`}>
                            <Star className={`w-5 h-5 ${word.isStarred ? 'fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredWords.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-foreground font-bold font-display mb-2">No words found</h3>
                  <p className="text-muted-foreground text-sm font-semibold">Try adjusting your search query</p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {(onNextModule || onPreviousModule) && (
          <div className="flex items-center justify-between mt-6">
            {onPreviousModule ? (
              <Button variant="outline" onClick={onPreviousModule} className="border-2 border-border rounded-xl font-semibold">
                <ArrowLeft className="w-4 h-4" />Previous: Audio Lesson
              </Button>
            ) : <div />}
            {onNextModule && (
              <Button onClick={onNextModule} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">
                Next: Summary<ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
