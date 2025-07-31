import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceWave } from './VoiceWave';
import { 
  Mic, 
  Play, 
  RotateCcw, 
  Heart, 
  MessageSquare,
  Star,
  Users
} from 'lucide-react';

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  const demoSteps = [
    {
      title: "Voice Onboarding",
      description: "Tell us about yourself naturally",
      action: "Record Your Voice",
      content: "\"I'm a morning person who loves quiet study sessions. I keep things clean but I'm not obsessive. I enjoy having friends over occasionally but prefer intimate gatherings.\""
    },
    {
      title: "AI Analysis",
      description: "Our AI analyzes your personality",
      action: "Analyzing...",
      content: "✓ Communication Style: Thoughtful & Clear\n✓ Energy Level: Moderate to High\n✓ Social Preference: Small Groups\n✓ Lifestyle: Structured but Flexible"
    },
    {
      title: "Perfect Matches",
      description: "See your compatible roommates",
      action: "View Matches",
      content: "Found 3 highly compatible matches in your area!"
    }
  ];

  const mockMatches = [
    {
      name: "Alex Chen",
      compatibility: 94,
      avatar: "AC",
      traits: ["Early Riser", "Studious", "Clean"],
      quote: "\"I love morning workouts and quiet evenings with a good book.\""
    },
    {
      name: "Morgan Taylor", 
      compatibility: 87,
      avatar: "MT",
      traits: ["Social", "Organized", "Friendly"],
      quote: "\"Cooking together and having deep conversations over dinner is my ideal evening.\""
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 0) {
        setIsVoiceActive(true);
        setTimeout(() => setIsVoiceActive(false), 3000);
      }
      if (currentStep === 1) {
        setTimeout(() => setShowMatches(true), 1000);
      }
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsVoiceActive(false);
    setShowMatches(false);
  };

  const step = demoSteps[currentStep];

  return (
    <section className="section bg-gradient-to-b from-voice-primary/5 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Try the <span className="text-voice-primary">Padosan</span> Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how voice-powered matching works in 3 simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {demoSteps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-voice-primary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < demoSteps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      index < currentStep ? 'bg-voice-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <Card className="p-8 bg-gradient-card border-2 border-voice-primary/20 shadow-voice">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            {/* Step-specific Content */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <VoiceWave 
                    isActive={isVoiceActive} 
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                  />
                </div>
                <div className="bg-background/50 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="italic text-primary text-center">
                    {step.content}
                  </p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {step.content.split('\n').map((line, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-sm text-primary">{line.replace('✓ ', '')}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="inline-block bg-voice-primary/10 rounded-full px-4 py-2">
                    <span className="text-voice-primary font-semibold">Personality Analysis Complete!</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Badge className="bg-success text-white text-lg px-4 py-2">
                    <Star className="h-4 w-4 mr-2" />
                    {step.content}
                  </Badge>
                </div>
                
                {showMatches && (
                  <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                    {mockMatches.map((match, index) => (
                      <Card key={index} className="p-6 border-2 border-voice-primary/30 hover:border-voice-primary transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-voice text-white flex items-center justify-center font-semibold">
                            {match.avatar}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary">{match.name}</h4>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-coral fill-current" />
                              <span className="text-voice-primary font-semibold">{match.compatibility}% Match</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {match.traits.map((trait, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm italic text-muted-foreground mb-4">
                          {match.quote}
                        </p>
                        
                        <Button className="w-full" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {currentStep < demoSteps.length - 1 ? (
                <Button onClick={nextStep} size="lg" className="btn-hero">
                  <Play className="h-5 w-5 mr-2" />
                  {step.action}
                </Button>
              ) : (
                <Button onClick={resetDemo} size="lg" variant="outline">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to find your perfect roommate?
            </p>
            <Button size="lg" className="btn-hero">
              <Users className="h-5 w-5 mr-2" />
              Start Your Real Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};