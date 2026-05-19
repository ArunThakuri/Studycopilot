import { Check, X, BookOpen, Sparkles, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PublicNav } from './public-nav';

interface PricingProps {
  onSelectPlan?: (plan: 'free' | 'pro' | 'premium') => void;
  onBack?: () => void;
  currentPlan?: 'free' | 'pro' | 'premium';
  onViewFeatures?: () => void;
  onViewAbout?: () => void;
  onLogin?: () => void;
  onGetStarted?: () => void;
}

export function Pricing({ onSelectPlan, onBack, currentPlan = 'free', onViewFeatures, onViewAbout, onLogin, onGetStarted }: PricingProps) {
  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started with StudyCopilot',
      icon: BookOpen,
      accentClass: 'bg-secondary/10 text-secondary',
      buttonVariant: 'outline' as const,
      features: [
        { name: 'Unit Text', included: true },
        { name: 'Audio Lessons', included: true },
        { name: 'Vocabulary with Nepali translations', included: true },
        { name: 'Summary', included: true },
        { name: 'Exercises', included: true },
        { name: 'Interactive Learning', included: false },
        { name: 'Practice Questions', included: false },
        { name: 'Video Lectures', included: false },
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      price: '₹99',
      period: 'per month',
      description: 'Complete learning experience for serious students',
      icon: Sparkles,
      accentClass: 'bg-primary/10 text-primary',
      buttonVariant: 'default' as const,
      popular: true,
      features: [
        { name: 'Unit Text', included: true },
        { name: 'Audio Lessons', included: true },
        { name: 'Vocabulary with Nepali translations', included: true },
        { name: 'Summary', included: true },
        { name: 'Exercises', included: true },
        { name: 'Interactive Learning', included: true },
        { name: 'Practice Questions', included: true },
        { name: 'Video Lectures', included: false },
      ],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '₹999',
      period: 'per month',
      description: 'Everything you need including video lectures',
      icon: Video,
      accentClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      buttonVariant: 'default' as const,
      features: [
        { name: 'Unit Text', included: true },
        { name: 'Audio Lessons', included: true },
        { name: 'Vocabulary with Nepali translations', included: true },
        { name: 'Summary', included: true },
        { name: 'Exercises', included: true },
        { name: 'Interactive Learning', included: true },
        { name: 'Practice Questions', included: true },
        { name: 'Video Lectures', included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PublicNav 
        currentPage="pricing"
        onViewFeatures={onViewFeatures}
        onViewPricing={onBack}
        onViewAbout={onViewAbout}
        onLogin={onLogin}
        onGetStarted={onGetStarted}
      />

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Start learning for free or upgrade to unlock all features including interactive learning, practice questions, and video lectures
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative p-6 sm:p-8 bg-card ${
                  plan.popular
                    ? 'border-2 border-primary shadow-xl md:scale-105'
                    : 'border border-border'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <Badge variant="outline" className="bg-card border-border">
                      Current Plan
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${plan.accentClass} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Plan Name */}
                <h3 className="text-foreground font-semibold text-xl mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-8">
                  {plan.description}
                </p>

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-6 mb-8 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : plan.id === 'premium'
                      ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                      : 'border-border'
                  }`}
                  onClick={() => onSelectPlan?.(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : `Get ${plan.name}`}
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    What's included:
                  </p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            All plans include unlimited subjects and units.{' '}
            <span className="text-primary font-medium">Start free, upgrade anytime.</span>
          </p>
        </div>

        {/* Features Comparison Table */}
        <div className="mt-20">
          <h2 className="text-center text-foreground font-bold text-2xl mb-8">
            Compare Plans
          </h2>
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-foreground font-semibold">
                      Free
                    </th>
                    <th className="px-6 py-4 text-center text-foreground font-semibold bg-primary/10">
                      Pro
                    </th>
                    <th className="px-6 py-4 text-center text-foreground font-semibold">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'Unit Text', free: true, pro: true, premium: true },
                    { name: 'Audio Lessons', free: true, pro: true, premium: true },
                    { name: 'Vocabulary (with Nepali)', free: true, pro: true, premium: true },
                    { name: 'Summary', free: true, pro: true, premium: true },
                    { name: 'Exercises', free: true, pro: true, premium: true },
                    { name: 'Interactive Learning', free: false, pro: true, premium: true, highlight: true },
                    { name: 'Practice Questions', free: false, pro: true, premium: true, highlight: true },
                    { name: 'Video Lectures', free: false, pro: false, premium: true, highlight: true },
                  ].map((row) => (
                    <tr key={row.name} className={row.highlight ? 'bg-muted/50' : ''}>
                      <td className={`px-6 py-4 ${row.highlight ? 'text-foreground font-medium' : 'text-foreground'}`}>
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.free ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className={`px-6 py-4 text-center ${row.highlight ? 'bg-primary/10' : 'bg-primary/5'}`}>
                        {row.pro ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.premium ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
