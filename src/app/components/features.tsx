import { 
  BookOpen,
  Upload, 
  Sparkles, 
  Volume2, 
  FileText, 
  Languages, 
  BookMarked, 
  PenTool, 
  Zap, 
  Target, 
  MessageSquare, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Clock,
  Video,
  Brain,
  Globe,
  Smartphone,
  Shield,
  Rocket
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PublicNav } from './public-nav';

interface FeaturesProps {
  onGetStarted?: () => void;
  onBack?: () => void;
  onViewPricing?: () => void;
  onViewAbout?: () => void;
  onLogin?: () => void;
}

export function Features({ onGetStarted, onBack, onViewPricing, onViewAbout, onLogin }: FeaturesProps) {
  const currentFeatures = [
    { icon: Upload, title: 'Textbook Upload', description: 'Upload photos of textbook pages or markdown files - our AI extracts and processes the content with high accuracy', accentClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { icon: FileText, title: 'Unit Text Generation', description: 'Clean, readable text extracted from your uploads - formatted perfectly for easy reading and studying', accentClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { icon: Volume2, title: 'Audio Lessons', description: 'Listen to your lessons on the go - perfect for auditory learners and studying while multitasking', accentClass: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
    { icon: Languages, title: 'Vocabulary with Translations', description: 'Key terms with Nepali translations, definitions, and context - build your vocabulary effortlessly', accentClass: 'bg-primary/10 text-primary' },
    { icon: BookMarked, title: 'Smart Summaries', description: 'Concise summaries of each unit - review key concepts quickly before exams', accentClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { icon: PenTool, title: 'Solved Exercises', description: 'Complete solutions to all exercises with step-by-step explanations - learn by example', accentClass: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    { icon: Zap, title: 'Interactive Learning', description: 'Engaging quizzes that test your understanding - get instant feedback and track progress', accentClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { icon: Target, title: 'Practice Questions', description: 'Unlimited practice questions tailored to your units - master every topic through repetition', accentClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
    { icon: MessageSquare, title: 'Unit Chat Assistant', description: 'Ask questions about any unit and get instant AI-powered answers - your personal study buddy', accentClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
    { icon: Lightbulb, title: 'Smart Title Suggestions', description: 'AI suggests relevant unit titles from your uploads - organize your content automatically', accentClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { icon: BookOpen, title: 'Multi-Subject Support', description: 'Create unlimited subjects across all grades (4-12) - organize all your learning in one place', accentClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { icon: Sparkles, title: 'AI-Powered Generation', description: 'Advanced AI models via OpenRouter generate high-quality, accurate content automatically', accentClass: 'bg-primary/10 text-primary' },
  ];

  const comingSoonFeatures = [
    { icon: Video, title: 'Video Lectures', description: 'Watch comprehensive video lessons for every unit - visual learning made easy (Premium plan)', accentClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', eta: 'Coming Q2 2025' },
    { icon: Brain, title: 'Adaptive Learning', description: 'Personalized learning paths that adapt to your pace and understanding - AI tracks your progress', accentClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', eta: 'Coming Q3 2025' },
    { icon: Globe, title: 'More Languages', description: 'Support for Hindi, English, and more regional languages - learn in your preferred language', accentClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', eta: 'Coming Q3 2025' },
    { icon: Smartphone, title: 'Mobile Apps', description: 'Native iOS and Android apps - learn anywhere, anytime with offline support', accentClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', eta: 'Coming Q4 2025' },
  ];

  const platformFeatures = [
    { icon: Shield, title: 'Secure & Private', description: 'Your data is encrypted and secure with Supabase authentication' },
    { icon: Rocket, title: 'Fast Processing', description: 'Generate complete learning materials in 3-6 minutes' },
    { icon: CheckCircle, title: 'High Accuracy', description: 'Advanced AI ensures accurate content extraction and generation' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PublicNav 
        currentPage="features"
        onViewFeatures={onBack}
        onViewPricing={onViewPricing}
        onViewAbout={onViewAbout}
        onLogin={onLogin}
        onGetStarted={onGetStarted}
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Excel
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            From textbook uploads to interactive quizzes, StudyCopilot provides a complete learning ecosystem for students in grades 4-12
          </p>
        </div>

        {/* Current Features */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <CheckCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Available Now
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
                  <div className={`w-12 h-12 rounded-xl ${feature.accentClass} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Clock className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Coming Soon
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 border-2 border-dashed border-border bg-card/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.accentClass} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {feature.eta}
                    </Badge>
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            Built for Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload Content', description: 'Take photos of textbook pages or upload markdown files', color: 'bg-secondary' },
              { step: '2', title: 'AI Processing', description: 'Our AI extracts and generates all learning materials', color: 'bg-primary' },
              { step: '3', title: 'Study & Learn', description: 'Access text, audio, vocabulary, exercises, and quizzes', color: 'bg-secondary' },
              { step: '4', title: 'Track Progress', description: 'Monitor your progress and master every topic', color: 'bg-primary' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}>
                  {step.step}
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Modules Breakdown */}
        <div className="mb-16">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            8 Learning Modules Per Unit
          </h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {[
                { name: 'Unit Text', icon: '📚', description: 'Clean, formatted text extracted from your uploads - easy to read and study', available: 'All Plans' },
                { name: 'Audio Lesson', icon: '🎧', description: 'Listen to your lessons anytime - perfect for learning on the go', available: 'All Plans' },
                { name: 'Vocabulary', icon: '📗', description: 'Key terms with Nepali translations, definitions, and example usage', available: 'All Plans' },
                { name: 'Summary', icon: '📋', description: 'Concise overview of the unit - quick revision before exams', available: 'All Plans' },
                { name: 'Exercises', icon: '📝', description: 'Fully solved exercises with step-by-step explanations', available: 'All Plans' },
                { name: 'Interactive Learning', icon: '🎮', description: 'Engaging quizzes with instant feedback - test your understanding', available: 'Pro & Premium' },
                { name: 'Practice Questions', icon: '🎯', description: 'Additional practice questions to master every concept', available: 'Pro & Premium' },
                { name: 'Video Lectures', icon: '🎥', description: 'Comprehensive video lessons for visual learning (Coming Soon)', available: 'Premium Only', comingSoon: true },
              ].map((module, index) => (
                <div key={index} className="p-6 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                  <div className="text-3xl">{module.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-foreground font-semibold">{module.name}</h4>
                      {module.comingSoon && (
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <Badge variant="outline" className="text-xs border-border">
                      {module.available}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {onGetStarted && (
          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(109,193,82,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg mb-8 text-secondary-foreground/70">
                Join students already using StudyCopilot to excel in their studies
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={onGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={onViewPricing || onBack}
                >
                  View Pricing
                </Button>
              </div>
              <p className="text-sm mt-6 text-secondary-foreground/50">
                No credit card required. Start with free plan. Upgrade anytime.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>StudyCopilot - AI-Powered Learning Platform for Grades 4-12</p>
            <p className="mt-2">Have feature requests? We'd love to hear from you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
