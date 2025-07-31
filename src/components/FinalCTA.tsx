import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VoiceWave } from './VoiceWave';
import { ArrowRight, Mic, Users, Heart } from 'lucide-react';
import { useState } from 'react';

export const FinalCTA = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  return (
    <section className="section bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 float" />
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-white/5 float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-32 w-16 h-16 rounded-full bg-white/10 float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Start finding your
            <br />
            perfect roommate
            <span className="text-voice-glow"> today</span>
          </h2>

          <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands who've found their ideal living companion through voice, vibe, and lifestyle matching.
          </p>

          {/* Interactive Voice Demo */}
          <div className="mb-12 flex justify-center">
            <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 shadow-voice">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Try Voice Onboarding</h3>
                <p className="text-white/70 text-sm">Experience how we analyze your personality</p>
              </div>
              <VoiceWave 
                isActive={isVoiceActive} 
                size="lg" 
                className="cursor-pointer justify-center"
                onClick={toggleVoice}
              />
              <Button 
                onClick={toggleVoice}
                variant="outline" 
                className="mt-4 border-white/30 text-white hover:bg-white/10"
              >
                <Mic className="mr-2 h-4 w-4" />
                {isVoiceActive ? 'Stop Demo' : 'Start Demo'}
              </Button>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 w-full sm:w-auto font-semibold shadow-lg"
            >
              Start Voice Onboarding
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white">Voice Analysis</h3>
              <p className="text-sm text-white/70">AI understands your personality through natural conversation</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white">Smart Matching</h3>
              <p className="text-sm text-white/70">Find roommates who match your lifestyle and energy</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white">Safety First</h3>
              <p className="text-sm text-white/70">Verified profiles and family approval for peace of mind</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="border-t border-white/20 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">10k+</div>
                <div className="text-sm text-white/70">Happy Users</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-sm text-white/70">Match Success</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/70">User Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/70">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};