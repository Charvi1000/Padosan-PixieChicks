import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Moon, 
  Sparkles, 
  Users, 
  Volume2, 
  Coffee, 
  Home,
  Heart,
  Star
} from 'lucide-react';
import { useState } from 'react';

export const CompatibilitySection = () => {
  const [selectedMatch, setSelectedMatch] = useState(0);

  const lifestyleCategories = [
    { icon: Moon, label: "Sleep Schedule", description: "Early bird vs. night owl" },
    { icon: Sparkles, label: "Cleanliness", description: "Organization and tidiness levels" },
    { icon: Users, label: "Social Battery", description: "Introvert vs. extrovert tendencies" },
    { icon: Volume2, label: "Noise Tolerance", description: "Music, calls, and general volume" },
    { icon: Coffee, label: "Kitchen Usage", description: "Cooking habits and meal times" },
    { icon: Home, label: "Space Sharing", description: "Common area usage patterns" }
  ];

  const mockMatches = [
    {
      name: "Alex Chen",
      age: 24,
      score: 94,
      avatar: "AC",
      traits: ["Early Riser", "Clean", "Quiet", "Studious"],
      compatibility: {
        sleep: 95,
        cleanliness: 92,
        social: 88,
        noise: 96,
        kitchen: 90,
        space: 94
      },
      bio: "Graduate student who loves morning workouts and weekend brunches.",
      budget: "$800-1000",
      location: "Downtown"
    },
    {
      name: "Morgan Taylor",
      age: 26,
      score: 87,
      avatar: "MT",
      traits: ["Social", "Organized", "Foodie", "Creative"],
      compatibility: {
        sleep: 82,
        cleanliness: 90,
        social: 95,
        noise: 80,
        kitchen: 92,
        space: 85
      },
      bio: "Marketing professional who enjoys cooking and hosting small gatherings.",
      budget: "$900-1200",
      location: "Midtown"
    }
  ];

  const match = mockMatches[selectedMatch];

  return (
    <section className="section bg-gradient-to-b from-background to-lavender/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-voice-primary">Compatibility</span> Matching
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced algorithm analyzes dozens of lifestyle factors to find roommates 
            who truly complement your way of living.
          </p>
        </div>

        {/* Lifestyle Categories */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {lifestyleCategories.map((category, index) => (
            <Card key={index} className="p-4 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-lavender/20 flex items-center justify-center">
                <category.icon className="h-6 w-6 text-lavender" />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-primary">{category.label}</h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>

        {/* Compatibility Demo */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">See Your Matches</h3>
            <p className="text-muted-foreground">Interactive demo showing how compatibility scoring works</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Match Cards */}
            <div className="space-y-4">
              {mockMatches.map((person, index) => (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                    selectedMatch === index 
                      ? 'border-voice-primary shadow-voice bg-voice-primary/5' 
                      : 'border-border shadow-card hover:shadow-elegant'
                  }`}
                  onClick={() => setSelectedMatch(index)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-voice text-white flex items-center justify-center font-semibold">
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-primary">{person.name}</h4>
                        <span className="text-sm text-muted-foreground">• {person.age}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-voice-primary fill-current" />
                        <span className="font-semibold text-voice-primary">{person.score}% Match</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {person.traits.slice(0, 3).map((trait, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Detailed Match View */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-gradient-card border-0 shadow-elegant">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-voice text-white flex items-center justify-center font-bold text-xl">
                    {match.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-primary">{match.name}</h3>
                      <div className="flex items-center gap-1">
                        <Heart className="h-5 w-5 text-coral fill-current" />
                        <span className="font-bold text-xl text-voice-primary">{match.score}%</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{match.bio}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Budget: {match.budget}</span>
                      <span>Location: {match.location}</span>
                    </div>
                  </div>
                </div>

                {/* Compatibility Breakdown */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-primary">Compatibility Breakdown</h4>
                  {Object.entries(match.compatibility).map(([key, value], index) => {
                    const category = lifestyleCategories.find(cat => 
                      cat.label.toLowerCase().includes(key) || key === 'sleep' && cat.label.includes('Sleep')
                    ) || lifestyleCategories[index];
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-primary">{category?.label || key}</span>
                          <span className="text-sm font-semibold text-voice-primary">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    );
                  })}
                </div>

                {/* Traits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.traits.map((trait, index) => (
                      <Badge key={index} variant="outline" className="border-voice-primary text-voice-primary">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full btn-hero">
                  Connect with {match.name}
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-2 border-voice-primary text-voice-primary hover:bg-voice-primary hover:text-white">
            See a Sample Match
          </Button>
        </div>
      </div>
    </section>
  );
};