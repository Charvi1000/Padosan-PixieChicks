import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  AlertCircle, 
  Heart, 
  CheckCircle, 
  Lock,
  Phone,
  UserCheck
} from 'lucide-react';

export const TrustSafety = () => {
  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Verified IDs",
      description: "Government ID verification for all users",
      details: ["Photo verification", "Document scanning", "Real-time validation"]
    },
    {
      icon: AlertCircle,
      title: "SOS Button",
      description: "Emergency assistance available 24/7",
      details: ["Instant emergency contacts", "Location sharing", "Crisis support"]
    },
    {
      icon: Users,
      title: "Mutual Friends",
      description: "See connections in your social network",
      details: ["LinkedIn integration", "Instagram connections", "Mutual acquaintances"]
    },
    {
      icon: Heart,
      title: "Family Mode",
      description: "Parents can review and approve matches",
      details: ["Parental oversight", "Family communication", "Safety reports"]
    }
  ];

  return (
    <section className="section bg-gradient-to-b from-lavender/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-success/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-success">Trust</span> & Safety First
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your safety is our priority. Multiple layers of verification and protection 
            ensure you feel secure throughout your roommate journey.
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* SOS Demo with Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-r from-coral/5 to-success/5 border-2 border-coral/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">SOS Button Demo</h3>
                
                {/* Real Story */}
                <div className="bg-background/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center text-sm font-semibold">
                      LM
                    </div>
                    <span className="font-semibold text-primary">Lisa M., 24</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    "When my roommate's friend made me uncomfortable during a party, I used the SOS feature. 
                    Support called me within 30 seconds and helped me handle the situation safely."
                  </p>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  In any uncomfortable situation, help is just one tap away. 
                  Our emergency system connects you instantly with support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center">
                      <span className="text-coral font-bold text-sm">1</span>
                    </div>
                    <span className="text-sm">Press and hold SOS button</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center">
                      <span className="text-coral font-bold text-sm">2</span>
                    </div>
                    <span className="text-sm">Emergency contacts notified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center">
                      <span className="text-coral font-bold text-sm">3</span>
                    </div>
                    <span className="text-sm">Support team responds immediately</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto rounded-full bg-coral/20 flex items-center justify-center pulse-glow">
                    <div className="w-20 h-20 rounded-full bg-coral text-white flex items-center justify-center">
                      <AlertCircle className="h-10 w-10" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Tap to see demo</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Family Mode */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-card border-0 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-lavender/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-lavender text-white flex items-center justify-center font-semibold">
                      👨‍👩‍👧‍👦
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Parent Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Review your child's matches</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-background rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sarah's Top Match</span>
                        <Badge className="bg-success text-white">95% Safe</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Alex Chen • Verified Student • Mutual Friends: 3</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-success text-white">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Review More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4 text-primary">Family Alignment Mode</h3>
                <p className="text-muted-foreground mb-6">
                  Peace of mind for parents. Our Family Mode lets parents review matches, 
                  verify safety credentials, and approve living arrangements.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-lavender" />
                    <span className="text-sm">Parental review before connections</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-lavender" />
                    <span className="text-sm">Direct communication with safety team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-lavender" />
                    <span className="text-sm">Background check summaries</span>
                  </li>
                </ul>
                
                <Button className="mt-6 w-full md:w-auto" variant="outline">
                  Try Family Mode
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-success">99.8%</div>
            <div className="text-sm text-muted-foreground">Safety satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-lavender">24/7</div>
            <div className="text-sm text-muted-foreground">Support availability</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-coral">10k+</div>
            <div className="text-sm text-muted-foreground">Verified profiles</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">5M+</div>
            <div className="text-sm text-muted-foreground">Safe connections made</div>
          </div>
        </div>
      </div>
    </section>
  );
};