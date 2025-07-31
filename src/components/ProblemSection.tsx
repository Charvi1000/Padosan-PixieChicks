import { AlertTriangle, Users, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import problemImage from '@/assets/problem-scene.jpg';

export const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Awkward Strangers",
      description: "Living with someone who doesn't match your energy or habits"
    },
    {
      icon: Users,
      title: "Compatibility Issues",
      description: "Different sleep schedules, cleanliness standards, and social needs"
    },
    {
      icon: Clock,
      title: "Time-Consuming Search",
      description: "Endless scrolling through listings without knowing who you're really living with"
    },
    {
      icon: DollarSign,
      title: "Hidden Costs",
      description: "Unexpected bills, different spending habits, and financial conflicts"
    }
  ];

  return (
    <section className="section bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary">
            The Roommate
            <span className="text-coral"> Struggle</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Finding the right roommate shouldn't feel like a gamble. 
            Yet millions of young renters face the same challenges every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problem Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img 
                src={problemImage} 
                alt="Chaotic roommate situation" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Problem Indicators */}
            <div className="absolute -top-4 -right-4 bg-coral text-white rounded-full p-3 shadow-lg float">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="absolute bottom-8 -left-4 bg-warning text-white rounded-full p-2 shadow-lg float" style={{ animationDelay: '1s' }}>
              <Clock className="h-5 w-5" />
            </div>
          </div>

          {/* Problem List */}
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-coral/10 p-3 rounded-lg shrink-0">
                    <problem.icon className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-coral">73%</div>
            <div className="text-sm text-muted-foreground">Have roommate conflicts</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-voice-primary">2.5</div>
            <div className="text-sm text-muted-foreground">Months average search</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">45%</div>
            <div className="text-sm text-muted-foreground">Move out within 6 months</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">$800</div>
            <div className="text-sm text-muted-foreground">Average lost deposits</div>
          </div>
        </div>
      </div>
    </section>
  );
};