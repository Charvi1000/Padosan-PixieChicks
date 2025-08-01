import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  Users, 
  MessageCircle, 
  Shield, 
  CheckCircle, 
  Clock,
  UserPlus,
  ArrowRight,
  X,
  Plus,
  Sparkles,
  Filter,
  Search,
  Heart,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isVerified: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  lastContact: string;
  avatar: string;
}

interface RoommateApproval {
  id: string;
  name: string;
  avatar: string;
  compatibility: number;
  familyApproval: 'pending' | 'approved' | 'rejected';
  familyComments: string;
  submittedBy: string;
  submittedDate: string;
}

export const FamilyMode = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Approvals', count: 8 },
    { id: 'pending', label: 'Pending', count: 3 },
    { id: 'approved', label: 'Approved', count: 4 },
    { id: 'rejected', label: 'Rejected', count: 1 }
  ];

  const familyMembers: FamilyMember[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      relationship: 'Mother',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      isVerified: true,
      approvalStatus: 'approved',
      lastContact: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Rajesh Sharma',
      relationship: 'Father',
      phone: '+91 98765 43211',
      email: 'rajesh.sharma@email.com',
      isVerified: true,
      approvalStatus: 'pending',
      lastContact: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Anjali Sharma',
      relationship: 'Sister',
      phone: '+91 98765 43212',
      email: 'anjali.sharma@email.com',
      isVerified: false,
      approvalStatus: 'rejected',
      lastContact: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const roommateApprovals: RoommateApproval[] = [
    {
      id: '1',
      name: 'Rahul Patel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      compatibility: 87,
      familyApproval: 'approved',
      familyComments: 'Seems like a good match. Verified profile and good background.',
      submittedBy: 'Priya Sharma (Mother)',
      submittedDate: '2 days ago'
    },
    {
      id: '2',
      name: 'Anjali Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      compatibility: 91,
      familyApproval: 'pending',
      familyComments: 'Waiting for family review',
      submittedBy: 'Pending',
      submittedDate: '1 day ago'
    },
    {
      id: '3',
      name: 'Karan Singh',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      compatibility: 78,
      familyApproval: 'rejected',
      familyComments: 'Not comfortable with this match. Limited background information.',
      submittedBy: 'Rajesh Sharma (Father)',
      submittedDate: '3 days ago'
    }
  ];

  const handleFamilyContact = (member: FamilyMember) => {
    toast({
      title: `Contact ${member.name}`,
      description: `Initiating contact with ${member.relationship}`,
      duration: 3000,
    });
  };

  const handleApproveRoommate = (roommate: RoommateApproval) => {
    toast({
      title: `Approved ${roommate.name}`,
      description: "Roommate has been approved by family",
      duration: 3000,
    });
  };

  const handleRejectRoommate = (roommate: RoommateApproval) => {
    toast({
      title: `Rejected ${roommate.name}`,
      description: "Roommate has been rejected by family",
      duration: 3000,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Family Mode</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to access family approval features.
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <Navigation />
      
      <div className="pt-20 lg:pt-6">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Family Mode</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Get family approval and ensure safety through trusted family connections
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-yellow-100 text-sm">Family Members</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-green-100 text-sm">Approved</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-blue-100 text-sm">Pending</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-red-100 text-sm">Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Family Members Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Family Members
                </CardTitle>
                <CardDescription>
                  Your trusted family members who can approve potential roommates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{member.name}</h4>
                            {member.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge 
                              variant={
                                member.approvalStatus === 'approved' ? 'default' :
                                member.approvalStatus === 'pending' ? 'secondary' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {member.approvalStatus === 'approved' ? 'Active' :
                               member.approvalStatus === 'pending' ? 'Pending' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.relationship}</p>
                          <p className="text-xs text-muted-foreground">Last contact: {member.lastContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFamilyContact(member)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Family Member
                  </Button>
                </div>
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
                placeholder="Search roommate approvals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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

          {/* Roommate Approvals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roommateApprovals.map((roommate) => (
              <Card key={roommate.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={roommate.avatar} />
                        <AvatarFallback>{roommate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{roommate.name}</h3>
                        <p className="text-sm text-muted-foreground">{roommate.submittedDate}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        roommate.familyApproval === 'approved' ? 'default' :
                        roommate.familyApproval === 'pending' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {roommate.familyApproval === 'approved' ? 'Approved' :
                       roommate.familyApproval === 'pending' ? 'Pending' : 'Rejected'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Compatibility Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compatibility</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${roommate.compatibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-green-600">{roommate.compatibility}%</span>
                    </div>
                  </div>

                  {/* Family Comments */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Family Comments:</p>
                    <p className="text-sm bg-gray-50 p-2 rounded text-muted-foreground">
                      {roommate.familyComments}
                    </p>
                  </div>

                  {/* Submitted By */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {roommate.submittedBy}
                  </div>

                  {/* Action Buttons */}
                  {roommate.familyApproval === 'pending' && (
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleApproveRoommate(roommate)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectRoommate(roommate)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="font-semibold">Family Safety</h3>
                </div>
                <p className="text-yellow-100 text-sm mb-4">
                  Ensure your safety with family approval for all roommate matches
                </p>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6" />
                  <h3 className="font-semibold">Background Check</h3>
                </div>
                <p className="text-green-100 text-sm mb-4">
                  Comprehensive background verification for all potential roommates
                </p>
                <Button variant="secondary" size="sm">
                  Check Background
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6" />
                  <h3 className="font-semibold">Family Meetings</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">
                  Schedule family meetings to discuss potential roommates
                </p>
                <Button variant="secondary" size="sm">
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 