import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Star, 
  MapPin, 
  UserPlus,
  ArrowRight,
  CheckCircle,
  X,
  Plus,
  Sparkles,
  Filter,
  Search
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface MutualFriend {
  id: string;
  name: string;
  mutualCount: number;
  mutualFriends: string[];
  location: string;
  compatibility: number;
  isOnline: boolean;
  lastActive: string;
  verified: boolean;
  relationship: string;
}

export const MutualFriends = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Connections', count: 15 },
    { id: 'high-mutual', label: 'High Mutual Friends', count: 8 },
    { id: 'verified', label: 'Verified', count: 12 },
    { id: 'nearby', label: 'Nearby', count: 6 }
  ];

  const mockMutualFriends: MutualFriend[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      mutualCount: 8,
      mutualFriends: ['Rahul Patel', 'Anjali Desai', 'Karan Singh', 'Meera Iyer', 'Vikram Malhotra', 'Sneha Reddy', 'Arjun Kapoor', 'Zara Khan'],
      location: 'Mumbai, Maharashtra',
      compatibility: 92,
      isOnline: true,
      lastActive: '5 min ago',
      verified: true,
      relationship: 'College Friend'
    },
    {
      id: '2',
      name: 'Rahul Patel',
      mutualCount: 12,
      mutualFriends: ['Priya Sharma', 'Anjali Desai', 'Karan Singh', 'Meera Iyer', 'Vikram Malhotra', 'Sneha Reddy', 'Arjun Kapoor', 'Zara Khan', 'Aditya Verma', 'Pooja Gupta', 'Rohan Sharma', 'Neha Singh'],
      location: 'Bangalore, Karnataka',
      compatibility: 87,
      isOnline: false,
      lastActive: '2 hours ago',
      verified: true,
      relationship: 'Work Colleague'
    },
    {
      id: '3',
      name: 'Anjali Desai',
      mutualCount: 5,
      mutualFriends: ['Priya Sharma', 'Rahul Patel', 'Karan Singh', 'Meera Iyer', 'Vikram Malhotra'],
      location: 'Delhi, NCR',
      compatibility: 89,
      isOnline: true,
      lastActive: '1 min ago',
      verified: false,
      relationship: 'Gym Buddy'
    }
  ];

  const handleConnect = (friend: MutualFriend) => {
    toast({
      title: `Connect with ${friend.name}`,
      description: "Connection request sent successfully!",
      duration: 3000,
    });
  };

  const handleMessage = (friend: MutualFriend) => {
    toast({
      title: `Message ${friend.name}`,
      description: "Opening chat window...",
      duration: 3000,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Mutual Friends</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to view and connect through mutual friends.
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <Navigation />
      
      <div className="pt-20 lg:pt-6">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Mutual Friends</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Connect through shared friends and build trusted relationships
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-green-100 text-sm">Total Connections</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">8.5</div>
                <div className="text-blue-100 text-sm">Avg Mutual Friends</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">89%</div>
                <div className="text-purple-100 text-sm">Trust Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-orange-100 text-sm">Verified</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, location, or mutual friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex items-center gap-2"
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-1">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Mutual Friends Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMutualFriends.map((friend) => (
              <Card key={friend.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://images.unsplash.com/photo-${friend.id === '1' ? '1494790108755-2616b612b786' : friend.id === '2' ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=150&h=150&fit=crop&crop=face`} />
                        <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{friend.name}</h3>
                          {friend.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {friend.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-xs text-muted-foreground">{friend.lastActive}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Mutual Friends Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mutual Friends</span>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{friend.mutualCount}</span>
                    </div>
                  </div>

                  {/* Compatibility Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compatibility</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${friend.compatibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-green-600">{friend.compatibility}%</span>
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    {friend.relationship}
                  </div>

                  {/* Mutual Friends Preview */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Mutual friends include:</p>
                    <div className="flex flex-wrap gap-1">
                      {friend.mutualFriends.slice(0, 3).map((mutual, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {mutual}
                        </Badge>
                      ))}
                      {friend.mutualFriends.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{friend.mutualFriends.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleMessage(friend)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleConnect(friend)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2" />
              Load More Connections
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="font-semibold">Trust Score</h3>
                </div>
                <p className="text-green-100 text-sm mb-4">
                  Build trust through mutual connections and verified profiles
                </p>
                <Button variant="secondary" size="sm">
                  View Score
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6" />
                  <h3 className="font-semibold">Network Growth</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">
                  Expand your network through trusted mutual connections
                </p>
                <Button variant="secondary" size="sm">
                  Grow Network
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-6 w-6" />
                  <h3 className="font-semibold">Recommendations</h3>
                </div>
                <p className="text-purple-100 text-sm mb-4">
                  Get personalized recommendations based on mutual friends
                </p>
                <Button variant="secondary" size="sm">
                  Get Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 