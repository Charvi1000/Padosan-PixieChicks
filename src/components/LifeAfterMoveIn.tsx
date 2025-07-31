import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Home, 
  CheckSquare, 
  Users,
  Smartphone,
  Lightbulb
} from 'lucide-react';
import harmonyLiving from '@/assets/harmony-living.jpg';

export const LifeAfterMoveIn = () => {
  const features = [
    {
      icon: CheckSquare,
      title: "Chore Scheduling",
      description: "Fair rotation system for household tasks",
      color: "accent"
    },
    {
      icon: DollarSign,
      title: "Bill Splitting",
      description: "Automatic calculations and payment reminders",
      color: "success"
    },
    {
      icon: MessageSquare,
      title: "Conflict Resolution",
      description: "AI mediator for smooth communication",
      color: "voice-primary"
    },
    {
      icon: Lightbulb,
      title: "Smart Assistant",
      description: "Helpful tips for harmonious living",
      color: "coral"
    }
  ];

  const choreDemo = [
    { task: "Kitchen Cleaning", assignee: "Alex", dueDate: "Today", status: "pending" },
    { task: "Bathroom Cleaning", assignee: "Morgan", dueDate: "Tomorrow", status: "completed" },
    { task: "Living Room Vacuum", assignee: "You", dueDate: "Sunday", status: "upcoming" },
    { task: "Trash & Recycling", assignee: "Alex", dueDate: "Monday", status: "upcoming" }
  ];

  const billSplit = {
    rent: { total: 2400, perPerson: 1200 },
    utilities: { total: 180, perPerson: 90 },
    internet: { total: 80, perPerson: 40 },
    groceries: { total: 320, perPerson: 160 }
  };

  return (
    <section className="section bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Life After <span className="text-accent">Move-In</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your journey doesn't end at move-in. Padosan continues to support 
            harmonious living with smart tools and ongoing assistance.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative overflow-hidden rounded-2xl shadow-elegant">
            <img 
              src={harmonyLiving} 
              alt="Harmonious living space with roommates" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-primary mb-2">Living in Harmony</h3>
                <p className="text-sm text-muted-foreground">
                  Technology that makes shared living effortless and enjoyable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
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

        {/* Success Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-card rounded-2xl p-8 border border-success/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">6 Months Later...</h3>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-success mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    AL
                  </div>
                  <p className="text-sm font-semibold">Alex</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-success mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    MO
                  </div>
                  <p className="text-sm font-semibold">Morgan</p>
                </div>
              </div>
              <p className="text-lg italic text-muted-foreground mt-4">
                "We've never had a single argument about chores or bills. The app handles everything seamlessly!"
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Demos */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Chore Scheduling Demo */}
          <Card className="p-6 bg-gradient-card border-0 shadow-elegant">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Alex & Morgan's Chore Schedule</h3>
                <p className="text-sm text-muted-foreground">Automated fair rotation system</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {choreDemo.map((chore, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div className="flex-1">
                    <h4 className="font-medium text-primary text-sm">{chore.task}</h4>
                    <p className="text-xs text-muted-foreground">{chore.assignee} • Due {chore.dueDate}</p>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      chore.status === 'completed' 
                        ? 'bg-success text-white' 
                        : chore.status === 'pending'
                        ? 'bg-coral text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {chore.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Bill Splitting Demo */}
          <Card className="p-6 bg-gradient-card border-0 shadow-elegant">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Bill Splitter</h3>
                <p className="text-sm text-muted-foreground">Automatic expense tracking and splitting</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(billSplit).map(([category, amounts]) => (
                <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <h4 className="font-medium text-primary text-sm capitalize">{category}</h4>
                    <p className="text-xs text-muted-foreground">Total: ${amounts.total}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">${amounts.perPerson}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-primary">Your Monthly Total</span>
                <span className="text-xl font-bold text-success">$1,490</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Conflict Resolution */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-voice-primary/5 to-lavender/5 border-2 border-voice-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">AI Conflict Resolution</h3>
                <p className="text-muted-foreground mb-6">
                  When tensions arise, our smart assistant helps mediate discussions 
                  and find solutions that work for everyone.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-voice-primary text-white flex items-center justify-center text-sm font-semibold">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-primary">
                          "I see there's been some concern about kitchen cleanliness. 
                          Would you like me to suggest a cleaning schedule that works for both of you?"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Start Conversation
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Tips
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-voice/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-xl bg-gradient-voice text-white flex items-center justify-center">
                      <Smartphone className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success text-white flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Available 24/7 in your app</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Success Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">89%</div>
            <div className="text-sm text-muted-foreground">Reduced household conflicts</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-success">$400</div>
            <div className="text-sm text-muted-foreground">Average monthly savings</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-voice-primary">95%</div>
            <div className="text-sm text-muted-foreground">Stay together 1+ years</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-coral">4.8</div>
            <div className="text-sm text-muted-foreground">Average happiness rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};