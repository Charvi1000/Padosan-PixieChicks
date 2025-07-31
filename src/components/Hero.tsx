import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VoiceWave } from './VoiceWave';
import { Play, ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const Hero = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    // Auto-stop after 3 seconds
    if (!isVoiceActive) {
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 opacity-30 float">
        <div className="w-12 h-12 rounded-full bg-lavender" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-20 float" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 rounded-full bg-coral" />
      </div>
      <div className="absolute top-1/3 left-8 opacity-25 float" style={{ animationDelay: '4s' }}>
        <div className="w-6 h-6 rounded-full bg-accent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Voice Wave Demo */}
          <div className="mb-8 flex justify-center">
            <VoiceWave 
              isActive={isVoiceActive} 
              size="lg" 
              className="cursor-pointer"
              onClick={toggleVoice}
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-voice-primary to-accent bg-clip-text text-transparent leading-tight">
            Find your vibe,
            <br />
            not just a roommate.
          </h1>

          {/* Subtext */}
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Padosan matches you with roommates who <span className="text-voice-primary font-semibold">get you</span>—through voice, vibe, and lifestyle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="btn-hero text-lg px-8 py-4 w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 w-full sm:w-auto border-2 hover:bg-secondary/50"
              onClick={toggleVoice}
            >
              Try Voice Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Verified IDs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-voice-primary" />
              <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Trusted by 10k+ Users</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};