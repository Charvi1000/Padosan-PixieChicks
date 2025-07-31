import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VoiceWave } from './VoiceWave';
import { Brain, Heart, Shield, Sparkles } from 'lucide-react';
import { useState } from 'react';
import voiceWavesImg from '@/assets/voice-waves.jpg';

export const PadosanIntro = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const features = [
    {
      icon: Brain,
      title: "Voice Analysis",
      description: "Our AI understands your tone, energy, and communication style",
      color: "voice-primary"
    },
    {
      icon: Heart,
      title: "Lifestyle Matching",
      description: "Sleep habits, cleanliness, social battery—we match what matters",
      color: "coral"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified profiles, background checks, and safety features",
      color: "accent"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Personalized matches that learn and improve over time",
      color: "lavender"
    }
  ];

  const voiceQuestions = [
    "Tell me about your ideal evening at home",
    "How do you handle household chores?",
    "What's your approach to having friends over?",
    "Describe your morning routine"
  ];

  return (
    <section className="section bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Enter <span className="text-voice-primary">Padosan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A fresh, human-centered approach to finding your perfect living companion. 
            We go beyond photos and basic info to understand who you really are.
          </p>
        </div>

        {/* Voice Onboarding Demo */}
        <div className="mb-20">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-card shadow-voice border-0">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Experience Voice Onboarding</h3>
              <p className="text-muted-foreground">Try our interactive demo to see how voice analysis works</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Voice Interface */}
              <div className="text-center space-y-6">
                <div 
                  className="relative mx-auto w-64 h-64 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url(${voiceWavesImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  onClick={() => setActiveDemo(activeDemo ? null : 'voice')}
                >
                  <div className="absolute inset-0 bg-gradient-voice/80 flex items-center justify-center">
                    <VoiceWave 
                      isActive={activeDemo === 'voice'} 
                      size="lg"
                    />
                  </div>
                </div>
                
                <Button 
                  variant={activeDemo === 'voice' ? 'default' : 'outline'}
                  onClick={() => setActiveDemo(activeDemo === 'voice' ? null : 'voice')}
                  className="w-full"
                >
                  {activeDemo === 'voice' ? 'Stop Demo' : 'Start Voice Onboarding'}
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary">Sample Questions:</h4>
                {voiceQuestions.map((question, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      activeDemo === 'voice' 
                        ? 'border-voice-primary bg-voice-primary/5' 
                        : 'border-border bg-background'
                    }`}
                  >
                    <p className="text-sm">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${feature.color}/10 flex items-center justify-center`}>
                <feature.icon className={`h-8 w-8 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 text-primary">How Voice Analysis Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-voice-primary text-white flex items-center justify-center font-bold text-xl">1</div>
              <h4 className="font-semibold text-primary">Speak Naturally</h4>
              <p className="text-sm text-muted-foreground">Answer fun, casual questions about your lifestyle and preferences</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-coral text-white flex items-center justify-center font-bold text-xl">2</div>
              <h4 className="font-semibold text-primary">AI Analysis</h4>
              <p className="text-sm text-muted-foreground">Our AI analyzes tone, energy levels, communication style, and personality traits</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">3</div>
              <h4 className="font-semibold text-primary">Perfect Matches</h4>
              <p className="text-sm text-muted-foreground">Get matched with roommates who complement your energy and lifestyle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};