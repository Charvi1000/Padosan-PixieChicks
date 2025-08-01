import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Phone, 
  AlertTriangle, 
  MapPin, 
  Users, 
  MessageCircle,
  Bell,
  CheckCircle,
  X,
  Heart,
  Star,
  Zap,
  ArrowRight,
  Clock,
  User,
  Plus
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isVerified: boolean;
  lastContact: string;
}

interface SafetyAlert {
  id: string;
  type: 'emergency' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  isActive: boolean;
}

export const SOS = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<SafetyAlert[]>([]);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      relationship: 'Sister',
      phone: '+91 98765 43210',
      isVerified: true,
      lastContact: '2 hours ago'
    },
    {
      id: '2',
      name: 'Rahul Patel',
      relationship: 'Best Friend',
      phone: '+91 98765 43211',
      isVerified: true,
      lastContact: '1 day ago'
    },
    {
      id: '3',
      name: 'Anjali Desai',
      relationship: 'Roommate',
      phone: '+91 98765 43212',
      isVerified: false,
      lastContact: '3 hours ago'
    }
  ];

  const safetyFeatures = [
    {
      id: 'location-sharing',
      title: 'Location Sharing',
      description: 'Share your real-time location with trusted contacts',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      action: 'Share Location'
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      description: 'Quick access to your trusted emergency contacts',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      action: 'View Contacts'
    },
    {
      id: 'safety-alerts',
      title: 'Safety Alerts',
      description: 'Get notified about safety concerns in your area',
      icon: Bell,
      color: 'from-orange-500 to-red-500',
      action: 'Check Alerts'
    },
    {
      id: 'voice-commands',
      title: 'Voice Commands',
      description: 'Use voice commands for hands-free emergency actions',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      action: 'Enable Voice'
    }
  ];

  const handleEmergencyMode = () => {
    setIsEmergencyMode(true);
    toast({
      title: "🚨 Emergency Mode Activated",
      description: "Emergency contacts have been notified. Help is on the way.",
      duration: 5000,
    });
    
    // Simulate emergency response
    setTimeout(() => {
      setActiveAlerts(prev => [...prev, {
        id: Date.now().toString(),
        type: 'emergency',
        title: 'Emergency Response Activated',
        description: 'Local authorities have been notified of your emergency',
        timestamp: new Date().toLocaleTimeString(),
        isActive: true
      }]);
    }, 2000);
  };

  const handleContactCall = (contact: EmergencyContact) => {
    toast({
      title: `Calling ${contact.name}`,
      description: `Initiating call to ${contact.phone}`,
      duration: 3000,
    });
  };

  const handleLocationShare = () => {
    toast({
      title: "📍 Location Shared",
      description: "Your location has been shared with emergency contacts",
      duration: 3000,
    });
  };

  const handleSafetyCheck = () => {
    toast({
      title: "✅ Safety Check Complete",
      description: "All safety systems are functioning normally",
      duration: 3000,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Safety Features</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to access safety and emergency features.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Navigation />
      
      <div className="pt-20 lg:pt-6">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Safety & Emergency</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Your safety is our top priority. Access emergency features and stay protected.
            </p>
          </div>

          {/* Emergency SOS Button */}
          <div className="mb-8">
            <Card className={`${isEmergencyMode ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-white'} border-2 ${isEmergencyMode ? 'border-red-500' : 'border-gray-200'}`}>
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${isEmergencyMode ? 'bg-white/20' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}>
                    <AlertTriangle className={`h-10 w-10 ${isEmergencyMode ? 'text-white' : 'text-white'}`} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {isEmergencyMode ? 'Emergency Mode Active' : 'Emergency SOS'}
                  </h2>
                  <p className="text-sm opacity-80">
                    {isEmergencyMode 
                      ? 'Emergency contacts have been notified. Help is on the way.'
                      : 'Press this button in case of emergency to alert your contacts and authorities.'
                    }
                  </p>
                </div>
                
                <Button
                  size="lg"
                  onClick={handleEmergencyMode}
                  disabled={isEmergencyMode}
                  className={`${
                    isEmergencyMode 
                      ? 'bg-white text-red-600 hover:bg-gray-100' 
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'
                  } text-lg font-semibold py-4 px-8`}
                >
                  {isEmergencyMode ? (
                    <>
                      <CheckCircle className="mr-2 h-6 w-6" />
                      Emergency Activated
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-6 w-6" />
                      SOS Emergency
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {safetyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (feature.id === 'location-sharing') handleLocationShare();
                            else if (feature.id === 'safety-alerts') handleSafetyCheck();
                            else {
                              toast({
                                title: feature.title,
                                description: `${feature.action} feature activated`,
                                duration: 3000,
                              });
                            }
                          }}
                        >
                          {feature.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Emergency Contacts */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  Your trusted contacts who will be notified in case of emergency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{contact.name}</h4>
                            {contact.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                          <p className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContactCall(contact)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Active Safety Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border ${
                        alert.type === 'emergency' ? 'bg-red-50 border-red-200' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              alert.type === 'emergency' ? 'bg-red-500' :
                              alert.type === 'warning' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}>
                              <AlertTriangle className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{alert.title}</h4>
                              <p className="text-sm text-muted-foreground">{alert.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setActiveAlerts(prev => prev.filter(a => a.id !== alert.id))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Safety Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-6 w-6" />
                  <h3 className="font-semibold">Location Safety</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">
                  Always share your location with trusted contacts when meeting new people
                </p>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6" />
                  <h3 className="font-semibold">Trusted Network</h3>
                </div>
                <p className="text-green-100 text-sm mb-4">
                  Build a network of verified contacts for emergency situations
                </p>
                <Button variant="secondary" size="sm">
                  Build Network
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-6 w-6" />
                  <h3 className="font-semibold">Quick Actions</h3>
                </div>
                <p className="text-purple-100 text-sm mb-4">
                  Set up voice commands for hands-free emergency actions
                </p>
                <Button variant="secondary" size="sm">
                  Setup Voice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 