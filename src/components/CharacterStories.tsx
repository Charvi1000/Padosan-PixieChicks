import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface StoryStep {
  title: string;
  description: string;
  character: string;
  avatar: string;
  outcome: string;
  mood: 'problem' | 'solution' | 'success';
}

export const CharacterStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stories: StoryStep[] = [
    {
      title: "The Nightmare Roommate",
      description: "Meet Jake, 22, who found himself living with a party animal when he needed quiet study time for medical school.",
      character: "Jake's been pulling all-nighters, but not by choice. His roommate brings friends over every night.",
      avatar: "JK",
      outcome: "Moved out after 2 months, lost $800 deposit",
      mood: 'problem'
    },
    {
      title: "Traditional App Struggles", 
      description: "Sarah, 24, spent months on traditional apps, going through awkward meetups with mismatched personalities.",
      character: "Profile looked great, but they were night owls while Sarah needed her 8-hour sleep schedule.",
      avatar: "SA",
      outcome: "3 failed roommate attempts in 6 months",
      mood: 'problem'
    },
    {
      title: "Enter Padosan",
      description: "Alex, 23, tries Padosan's voice-first approach and shares their authentic lifestyle preferences.",
      character: "\"I love morning workouts and quiet evenings. I'm clean but not obsessive, and I prefer small gatherings.\"",
      avatar: "AL",
      outcome: "Found compatible matches within days",
      mood: 'solution'
    },
    {
      title: "Perfect Match Found",
      description: "Morgan, 25, connects with Alex through Padosan's compatibility algorithm.",
      character: "Both are early risers, value cleanliness, and have compatible social energies.",
      avatar: "MO",
      outcome: "Living together happily for 8+ months",
      mood: 'success'
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const resetStory = () => {
    setCurrentStory(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStory((prev) => {
          const next = (prev + 1) % stories.length;
          if (next === 0) {
            setIsPlaying(false);
            clearInterval(interval);
          }
          return next;
        });
      }, 3000);
    }
  };

  const story = stories[currentStory];
  const moodColors = {
    problem: 'from-coral/20 to-warning/20 border-coral/30',
    solution: 'from-voice-primary/20 to-accent/20 border-voice-primary/30',
    success: 'from-success/20 to-lavender/20 border-success/30'
  };

  return (
    <section className="section bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Real Stories, Real <span className="text-voice-primary">Journeys</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the journey from roommate struggles to perfect matches
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Story Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={togglePlay}
              className="flex items-center gap-2"
              variant={isPlaying ? "secondary" : "default"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause Story' : 'Play Story'}
            </Button>
            <Button onClick={resetStory} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Story Progress */}
          <div className="flex justify-center gap-2 mb-8">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStory 
                    ? 'bg-voice-primary scale-125' 
                    : index < currentStory 
                    ? 'bg-voice-primary/50' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Story Card */}
          <Card className={`p-8 bg-gradient-to-br ${moodColors[story.mood]} border-2 transition-all duration-500 transform hover:scale-105`}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-full ${
                  story.mood === 'problem' ? 'bg-coral' :
                  story.mood === 'solution' ? 'bg-voice-primary' : 'bg-success'
                } text-white flex items-center justify-center font-bold text-lg`}>
                  {story.avatar}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-primary">{story.title}</h3>
                  <Badge className={`${
                    story.mood === 'problem' ? 'bg-coral' :
                    story.mood === 'solution' ? 'bg-voice-primary' : 'bg-success'
                  } text-white`}>
                    {story.mood === 'problem' ? 'Problem' :
                     story.mood === 'solution' ? 'Solution' : 'Success'}
                  </Badge>
                </div>
                
                <p className="text-lg text-muted-foreground mb-4">
                  {story.description}
                </p>
                
                <div className="bg-background/50 rounded-lg p-4 mb-4">
                  <p className="italic text-primary">"{story.character}"</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">Outcome:</span>
                  <span className={`text-sm font-medium ${
                    story.mood === 'success' ? 'text-success' : 'text-coral'
                  }`}>
                    {story.outcome}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Story Navigation */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={nextStory}
              variant="outline"
              className="border-2 border-voice-primary text-voice-primary hover:bg-voice-primary hover:text-white"
            >
              Next Chapter →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};