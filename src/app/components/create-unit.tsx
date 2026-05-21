import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, BookOpen, Upload, X, Loader2, CheckCircle2, Image as ImageIcon, Sparkles, AlertCircle, FileText, Download, Clock, StopCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Subject, User } from '../App';
import { Unit } from './units-dashboard';
import { processUnitQuickly, getAIProviderStatus, suggestTitleFromMarkdown, createInitialContentStructure } from '../lib/ai-provider';
import { getVisionModel } from '../lib/ai-service';
import { saveUnitImages } from '../lib/unit-images-store';
import { fileToDataUrl } from '../lib/ai-service';
import { AppHeader } from './app-header';

interface CreateUnitProps {
  subject: Subject;
  user: User | null;
  onBack: () => void;
  onCreate: (unit: Unit, shouldProcessModules?: boolean) => Promise<void>;
  onLogout: () => void;
  onOpenProfile: () => void;
}


export function CreateUnit({ subject, user, onBack, onCreate, onLogout, onOpenProfile }: CreateUnitProps) {
  const [unitTitle, setUnitTitle] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedMarkdown, setUploadedMarkdown] = useState<File | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [suggestedTitle, setSuggestedTitle] = useState<string>('');
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [aiGeneratedContent, setAiGeneratedContent] = useState<any>(null);
  const [aiStatus, setAiStatus] = useState<{ provider: string; available: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check current provider on mount
  useEffect(() => {
    getAIProviderStatus().then(status => {
      console.log(`🤖 Active AI Provider: ${status.provider}`);
      setAiStatus(status);
    });
  }, []);

  // Abort any in-flight requests on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        setUploadedImages(prev => [...prev, file]);
      } else if (file.name.endsWith('.md') || file.type === 'text/markdown') {
        // Read markdown file content
        const content = await file.text();
        setUploadedMarkdown(file);
        setMarkdownContent(content);
        
        // Extract title from markdown if not already set
        if (!unitTitle.trim()) {
          const titleMatch = content.match(/^#\s+(.+)$/m);
          if (titleMatch) {
            setUnitTitle(titleMatch[1]);
          }
        }
      }
    }
    
    setError('');
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const removeMarkdown = () => {
    setUploadedMarkdown(null);
    setMarkdownContent('');
  };

  const handleDownloadMarkdown = () => {
    if (!generatedMarkdown) return;
    
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${unitTitle.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContinueToDashboard = async () => {
    if (!aiGeneratedContent) return;

    // Create new abort controller for module generation
    abortControllerRef.current = new AbortController();

    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      title: unitTitle,
      number: (subject.units || []).length + 1,
      progress: 0, // Will be updated after processing
      totalModules: 9,
      completedModules: 4, // Markdown, Unit Text, Audio Lesson, Model Question
      lastAccessed: new Date().toISOString(),
      aiGenerated: true,
      content: aiGeneratedContent,
      suggestedTitle: suggestedTitle || undefined,
      imageCount: uploadedImages.length,
    };

    // Only persist uploaded images for admin users to avoid localStorage bloat.
    // Non-admin users still get text extraction; images are discarded after processing.
    if (uploadedImages.length > 0 && user?.isAdmin) {
      try {
        const imageDataUrls = await Promise.all(uploadedImages.map(file => fileToDataUrl(file)));
        saveUnitImages(newUnit.id, imageDataUrls);
      } catch (e) {
        console.error('Failed to save unit images:', e);
      }
    }

    // Show processing state
    setProcessingStep('Generating all learning materials...');
    setProgress(0);
    setIsProcessing(true);

    try {
      // Create unit and process all modules (will navigate when done)
      await onCreate(newUnit, true, abortControllerRef.current.signal); // true = process modules before navigation
    } catch (error: any) {
      if (error.message === 'Processing cancelled' || abortControllerRef.current?.signal.aborted) {
        setError('Processing was cancelled.');
      } else {
        console.error('Error creating unit:', error);
        setError(`Failed to generate learning materials: ${error?.message || 'Unknown error'}`);
      }
      setIsProcessing(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleCancelProcessing = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsProcessing(false);
    setProcessingStep('');
    setProgress(0);
  };

  const handleCreateUnit = async () => {
    if (!unitTitle.trim()) {
      setError('Please enter a unit title');
      return;
    }

    if (uploadedImages.length === 0 && !uploadedMarkdown) {
      setError('Please upload at least one image or a markdown file');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Create abort controller for text extraction
    abortControllerRef.current = new AbortController();

    try {
      // Step 1: Quick extraction - just get the markdown
      if (uploadedMarkdown) {
        setProcessingStep('Loading your markdown file...');
      } else {
        setProcessingStep('Extracting text from images...');
      }
      setProgress(10);

      // Step 2: Process quickly - extract markdown only
      const { markdown, unitText } = await processUnitQuickly(
        uploadedImages,
        unitTitle,
        markdownContent,
        (step, progressValue) => {
          setProcessingStep(step);
          setProgress(progressValue);
        },
        abortControllerRef.current.signal
      );

      // Store the generated markdown for download
      setGeneratedMarkdown(markdown);
      console.log('✅ Text extracted:', markdown.substring(0, 200));

      // Generate title suggestion from the markdown
      setProcessingStep('Generating title suggestion...');
      setProgress(90);

      try {
        const titleSuggestion = await suggestTitleFromMarkdown(markdown, unitTitle, abortControllerRef.current.signal);
        if (titleSuggestion && titleSuggestion !== unitTitle) {
          setSuggestedTitle(titleSuggestion);
          console.log('💡 Title suggestion:', titleSuggestion);
        }
      } catch (err) {
        console.warn('Could not generate title suggestion:', err);
      }

      // Create initial content structure with pending modules
      const initialContent = createInitialContentStructure(markdown, unitText);
      setAiGeneratedContent(initialContent);

      setProgress(100);
      setProcessingStep('Unit created! Modules will process in background.');

      // Don't auto-redirect, show download/continue options
    } catch (err: any) {
      if (err.message === 'Processing cancelled' || abortControllerRef.current?.signal.aborted) {
        setError('Processing was cancelled.');
      } else {
        console.error('Error processing with AI:', err);
        setError(`AI processing failed: ${err?.message || 'Unknown error'}`);
      }
      setIsProcessing(false);
      setProgress(0);
      setProcessingStep('');
    } finally {
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        user={user}
        onLogout={onLogout}
        onOpenProfile={onOpenProfile}
        currentPage="Create Unit"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Units</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-2xl`}>
              {subject.icon}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-foreground font-bold text-xl">Create New Unit</h1>
                {aiStatus && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    aiStatus.provider === 'openrouter' 
                      ? 'bg-primary/10 text-primary border-primary/20' 
                      : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    Using {getVisionModel()} for images
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{subject.title} • Grade {subject.grade}</p>
            </div>
          </div>
        </div>

        {!isProcessing ? (
          <div className="space-y-6">
            {/* Unit Title */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="unitTitle" className="text-foreground">
                    Unit Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="unitTitle"
                    placeholder="e.g., Introduction to Scientific Learning"
                    value={unitTitle}
                    onChange={(e) => setUnitTitle(e.target.value)}
                    className="mt-2 bg-input-background border-border"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the title of the unit as it appears in your textbook
                  </p>
                </div>
              </div>
            </Card>

            {/* File Upload */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Upload Content</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload textbook images for AI text extraction, or upload a .md file to use your own content directly (no AI processing).
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.md"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-muted-foreground">Click to upload files</span>
                      <span className="text-xs text-muted-foreground">Images (PNG, JPG) or Markdown (.md)</span>
                    </div>
                  </Button>
                </div>

                {/* Uploaded Markdown File */}
                {uploadedMarkdown && (
                  <div>
                    <Label className="mb-3 block text-foreground">Uploaded Markdown File</Label>
                    <div className="relative group p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText className="w-8 h-8 text-secondary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{uploadedMarkdown.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {(uploadedMarkdown.size / 1024).toFixed(1)} KB • 
                            {markdownContent.split('\n').length} lines
                          </p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            ✓ Will be used as-is (no AI processing needed)
                          </p>
                          {unitTitle && (
                            <p className="text-xs text-secondary">
                              ✓ Title extracted: {unitTitle}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={removeMarkdown}
                          className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div>
                    <Label className="mb-3 block text-foreground">Uploaded Images ({uploadedImages.length})</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Page ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-muted-foreground text-center mt-1">Page {index + 1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* AI Content Info */}
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/15">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">AI-Generated Learning Content</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your content will be processed by Kimi 2.6 AI to generate comprehensive learning materials including:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Unit Text (Rich content)
                    </li>
                    <li className="flex items-center gap-2 opacity-60">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Audio Lesson — Coming Soon
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Vocabulary with Nepali
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Summary & Key Points
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Solved Exercises
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Interactive Quiz (10 questions)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Practice Questions
                    </li>
                    <li className="flex items-center gap-2 opacity-60">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Model Question — Coming Soon
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-destructive mb-2">Error Processing Content</h3>
                    <div className="text-sm text-destructive/80 whitespace-pre-wrap">
                      {error}
                    </div>
                    

                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setError('')}
                        className="text-xs border-border"
                      >
                        Dismiss
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleCreateUnit}
                        className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onBack} className="border-border">
                Cancel
              </Button>
              <Button
                onClick={handleCreateUnit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!unitTitle.trim() || (uploadedImages.length === 0 && !uploadedMarkdown)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Process & Create Unit
              </Button>
            </div>
          </div>
        ) : (
          // Processing Screen
          <Card className="p-12 bg-card border-border">
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {progress === 100 ? (
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                ) : (
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                )}
              </div>

              <h2 className="text-foreground font-semibold text-lg mb-2">
                {progress === 100 ? 'Processing Complete!' : 'Processing Your Unit'}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">{processingStep}</p>

              <Progress value={progress} className="mb-4" />

              {/* Cancel button during processing */}
              {isProcessing && progress < 100 && (
                <Button
                  variant="outline"
                  onClick={handleCancelProcessing}
                  className="mt-2 border-destructive text-destructive hover:bg-destructive/10"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Cancel Processing
                </Button>
              )}

              {progress === 100 && generatedMarkdown ? (
                <div className="space-y-4 mt-6">
                  {!isProcessing || !processingStep.includes('materials') ? (
                    <>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm text-primary">
                          ✅ AI successfully extracted and structured the content!
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          variant="outline"
                          onClick={handleDownloadMarkdown}
                          className="flex items-center gap-2 border-border"
                        >
                          <Download className="w-4 h-4" />
                          Download .md File
                        </Button>
                        <Button
                          onClick={handleContinueToDashboard}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Generate All Materials & Continue
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <p className="text-sm text-primary font-medium">
                          Generating all learning materials...
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ⏱️ This takes 3-6 minutes. Processing vocabulary, summary, exercises, quiz, and practice questions.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Please wait - you'll be redirected automatically when complete!
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelProcessing}
                        className="mt-3 border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <StopCircle className="w-4 h-4 mr-2" />
                        Cancel Processing
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    {progress === 100
                      ? 'Finalizing...'
                      : "This may take a minute. Please don't close this window."}
                  </p>

                  {(uploadedImages.length > 0 || uploadedMarkdown) && progress < 100 && (
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  {uploadedMarkdown ? (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Processing markdown file</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4" />
                      <span>Processing {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
              )}
                </>
                )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}