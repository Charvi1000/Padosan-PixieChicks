import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  RefreshCw, 
  Target, 
  Award,
  Brain,
  Star,
  ArrowRight
} from 'lucide-react';

export const ContinuousLearning = () => {
  const improvementMetrics = [
    { label: "Match Accuracy", current: 87, target: 95, color: "voice-primary" },
    { label: "Satisfaction Score", current: 92, target: 98, color: "success" },
    { label: "Conflict Resolution", current: 84, target: 90, color: "accent" },
    { label: "Long-term Compatibility", current: 78, target: 85, color: "coral" }
  ];

  const learningPhases = [
    {
      phase: "30 Days",
      title: "Early Adjustment",
      description: "Initial compatibility assessment",
      insights: ["Living habit patterns", "Communication preferences", "Shared space usage"],
      accuracy: 85
    },
    {
      phase: "90 Days",
      title: "Pattern Recognition",
      description: "Deeper behavioral understanding",
      insights: ["Conflict resolution style", "Social preferences", "Financial habits"],
      accuracy: 92
    },
    {
      phase: "180+ Days",
      title: "Optimized Matching",
      description: "Refined future recommendations",
      insights: ["Long-term compatibility factors", "Lifestyle evolution", "Preference changes"],
      accuracy: 96
    }
  ];

  return (
    <section className="section bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brain/10 flex items-center justify-center">
            <Brain className="h-8 w-8 text-voice-primary" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            We <span className="text-voice-primary">Improve</span> With You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Padosan's AI learns from every interaction, making future matches 
            even better based on real-world compatibility feedback.
          </p>
        </div>

        {/* Learning Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {learningPhases.map((phase, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-voice-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-voice-primary">{index + 1}</span>
                  </div>
                  <Badge className="bg-voice-primary text-white mb-2">{phase.phase}</Badge>
                  <h3 className="text-xl font-semibold text-primary">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {phase.insights.map((insight, insightIndex) => (
                    <div key={insightIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-voice-primary" />
                      <span className="text-sm text-primary">{insight}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-primary">Match Accuracy</span>
                    <span className="text-sm font-semibold text-voice-primary">{phase.accuracy}%</span>
                  </div>
                  <Progress value={phase.accuracy} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvement Metrics */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-card border-0 shadow-elegant">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Your Impact on Our AI</h3>
              <p className="text-muted-foreground">
                Every feedback helps us improve matching accuracy for you and future users
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {improvementMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{metric.current}%</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-voice-primary">{metric.target}%</span>
                    </div>
                  </div>
                  <Progress value={metric.current} className="h-3" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span>Improving with each match</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Feedback Loop */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-lavender/5 to-accent/5 border-2 border-lavender/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">The Learning Loop</h3>
                <p className="text-muted-foreground mb-6">
                  Your feedback creates a virtuous cycle of improvement, 
                  making every future match better than the last.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
                      <span className="text-lavender font-bold text-sm">1</span>
                    </div>
                    <span className="text-sm">Live together and provide feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
                      <span className="text-lavender font-bold text-sm">2</span>
                    </div>
                    <span className="text-sm">AI analyzes compatibility patterns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
                      <span className="text-lavender font-bold text-sm">3</span>
                    </div>
                    <span className="text-sm">Algorithm improves for future matches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
                      <span className="text-lavender font-bold text-sm">4</span>
                    </div>
                    <span className="text-sm">You get even better recommendations</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-voice/20 flex items-center justify-center">
                    <RefreshCw className="h-16 w-16 text-voice-primary animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success text-white flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 text-voice-primary fill-current" />
                    <span className="font-semibold text-voice-primary">96% Accuracy</span>
                  </div>
                  <p className="text-sm text-muted-foreground">After your feedback</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Community Impact */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 text-primary">Community Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-voice-primary">2.5M+</div>
              <div className="text-sm text-muted-foreground">Feedback points collected</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">23%</div>
              <div className="text-sm text-muted-foreground">Accuracy improvement</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Algorithm updates</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-coral">99.2%</div>
              <div className="text-sm text-muted-foreground">User satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};