import { 
  BookOpen,
  Sparkles, 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Lightbulb,
  Rocket,
  Award,
  Globe,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PublicNav } from './public-nav';

interface AboutProps {
  onGetStarted?: () => void;
  onBack?: () => void;
  onViewFeatures?: () => void;
  onViewPricing?: () => void;
  onLogin?: () => void;
}

export function About({ onGetStarted, onBack, onViewFeatures, onViewPricing, onLogin }: AboutProps) {
  const values = [
    { icon: Heart, title: 'Student First', description: 'Every decision we make is centered around helping students learn better and faster', accentClass: 'bg-red-500/10 text-red-600 dark:text-red-400' },
    { icon: Sparkles, title: 'Innovation', description: 'We constantly explore cutting-edge AI technology to improve learning outcomes', accentClass: 'bg-primary/10 text-primary' },
    { icon: Globe, title: 'Accessibility', description: 'Making quality education accessible to students across Nepal and beyond', accentClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { icon: Award, title: 'Quality', description: 'We never compromise on the accuracy and quality of learning materials', accentClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  ];

  const milestones = [
    { year: '2024', title: 'The Idea', description: 'Late one evening, watching students struggle with heavy textbooks and incomplete notes, the idea struck - what if AI could transform any textbook page into comprehensive learning materials instantly?', icon: Lightbulb },
    { year: 'Early 2025', title: 'First Prototype', description: 'Built the first version with basic text extraction and AI-generated summaries. Students loved it, but wanted more - vocabulary, exercises, and quizzes.', icon: Rocket },
    { year: 'Q1 2025', title: 'Complete Platform', description: 'Launched StudyCopilot with 8 learning modules, supporting grades 4-12. Integrated advanced AI models and authentication for personalized learning.', icon: Award },
    { year: 'Future', title: 'Going Global', description: 'Planning to add video lectures, mobile apps, and support for multiple languages. Our vision: helping millions of students worldwide.', icon: TrendingUp },
  ];

  const team = [
    { role: 'Our Mission', description: 'To empower students in grades 4-12 with AI-powered learning tools that make education accessible, engaging, and effective', icon: Target, gradient: 'from-secondary to-secondary/70' },
    { role: 'Our Vision', description: 'A world where every student has access to personalized, high-quality learning materials, regardless of their location or resources', icon: Eye, gradient: 'from-blue-600 to-cyan-600' },
    { role: 'Our Goal', description: 'To help 1 million students across Nepal and South Asia excel in their studies by 2027 through innovative AI technology', icon: Users, gradient: 'from-primary to-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNav 
        currentPage="about"
        onViewFeatures={onViewFeatures}
        onViewPricing={onViewPricing}
        onViewAbout={onBack}
        onLogin={onLogin}
        onGetStarted={onGetStarted}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 mb-4">
            <Heart className="w-3 h-3 mr-1" />
            Built with passion for students
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About StudyCopilot
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            We're on a mission to transform education using artificial intelligence, making learning accessible, engaging, and effective for every student
          </p>
        </div>

        {/* The Story */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Card className="p-6 sm:p-8 lg:p-12 border-2 border-primary/20 bg-card shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-foreground font-bold text-xl">
                Where It All Began
              </h2>
            </div>
            <div className="space-y-4 text-foreground/80">
              <p>
                It was a typical evening in Kathmandu when the idea for StudyCopilot was born. A group of students sat hunched over heavy textbooks, struggling to take notes, create summaries, and prepare for exams. Their backpacks were filled with books, their notebooks incomplete, and their stress levels high.
              </p>
              <p>
                The question arose: <span className="text-primary font-medium">Why should students spend hours copying text from textbooks when AI can do it instantly?</span> Why should they struggle to create vocabulary lists, summaries, and practice questions when technology can generate high-quality learning materials in minutes?
              </p>
              <p>
                That's when StudyCopilot was conceived - an AI-powered learning platform that could transform any textbook page into comprehensive learning materials.
              </p>
              <p>
                What started as a simple text extraction tool quickly evolved into a complete learning ecosystem. Students asked for vocabulary with translations, so we added it. They wanted audio lessons for learning on the go, so we built it. They needed practice questions and quizzes, so we created intelligent AI systems to generate them.
              </p>
              <p className="text-primary font-medium">
                Today, StudyCopilot serves students across Nepal, helping them learn smarter, not harder. But we're just getting started.
              </p>
            </div>
          </Card>
        </div>

        {/* Mission, Vision, Goals */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {team.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 sm:p-8 text-center bg-card border-border hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold text-lg mb-3">
                    {item.role}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <h2 className="text-center text-foreground font-bold text-2xl mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/30 via-secondary/30 to-primary/30 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                        <Badge className="bg-primary/10 text-primary mb-3">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-foreground font-semibold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {milestone.description}
                        </p>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 hidden md:block">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-4 border-background shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center bg-card border-border hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 rounded-full ${value.accentClass} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* The Problem We're Solving */}
        <div className="mb-20">
          <Card className="p-12 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-primary/15">
            <h2 className="text-foreground font-bold text-2xl mb-6 text-center">
              The Problem We're Solving
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                  <span className="text-destructive">&#x2717;</span> Before StudyCopilot
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>- Students carrying heavy textbooks daily</li>
                  <li>- Hours spent copying text and taking notes</li>
                  <li>- Incomplete or missing learning materials</li>
                  <li>- Limited access to practice questions</li>
                  <li>- No personalized learning support</li>
                  <li>- Expensive private tutoring as only option</li>
                  <li>- Difficulty understanding complex topics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                  <span className="text-primary">&#x2713;</span> With StudyCopilot
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>- All materials digital and always accessible</li>
                  <li>- Instant generation of learning content</li>
                  <li>- Complete materials with 8 learning modules</li>
                  <li>- Unlimited practice questions and quizzes</li>
                  <li>- AI-powered personalized assistance</li>
                  <li>- Affordable education for everyone</li>
                  <li>- Interactive learning with instant feedback</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="mb-20">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Students Helped', icon: Users },
              { value: '500+', label: 'Subjects Created', icon: BookOpen },
              { value: '50,000+', label: 'Units Generated', icon: Sparkles },
              { value: '95%', label: 'Satisfaction Rate', icon: Heart },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center bg-card border-border">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology */}
        <div className="mb-20">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/15">
            <div className="text-center mb-8">
              <h2 className="text-foreground font-bold text-2xl mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We leverage cutting-edge artificial intelligence (OpenRouter AI) to generate high-quality, accurate learning materials
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Natural Language Processing', description: 'Understanding and processing textbook content with high accuracy' },
                { title: 'Machine Learning', description: 'Continuously improving content quality based on student feedback' },
                { title: 'Computer Vision', description: 'Extracting text from textbook images with OCR technology' },
              ].map((tech, index) => (
                <div key={index} className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="text-foreground font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        {onGetStarted && (
          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(109,193,82,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Learning Revolution
              </h2>
              <p className="text-lg mb-8 text-secondary-foreground/70 max-w-2xl mx-auto">
                Be part of the movement transforming education in Nepal and beyond. Start your learning journey with StudyCopilot today.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onGetStarted}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm mt-6 text-secondary-foreground/50">
                Free forever. No credit card required. Start learning in minutes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">StudyCopilot - Transforming Education with AI</p>
            <p>Made with love in Nepal for students everywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}
