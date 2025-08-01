import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Mic, MicOff, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Users, Heart, MessageCircle, MapPin, Star, Smile
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AnimatedConversation } from '@/components/AnimatedConversation';
import { MatchIntroduction } from '@/components/MatchIntroduction';

const questions = [
  {
    id: 1,
    question: "Are you a morning lark, night owl, or confused bat that's never sure what time it is?",
    options: ["Morning Lark", "Night Owl", "Confused Bat"],
    category: "Sleep Schedule"
  },
  {
    id: 2,
    question: "Always charging with people, needs daily recharge alone, or runs on airplane mode most days?",
    options: ["Always Charging", "Daily Recharge", "Airplane Mode"],
    category: "Social Energy"
  },
  {
    id: 3,
    question: "Dirty dishes in the sink make you feel: Zen(whatever), Twitchy(mildly annoyed), or hulk(must clean now)?",
    options: ["Zen (Whatever)", "Twitchy (Mildly Annoyed)", "Hulk (Must Clean Now)"],
    category: "Cleanliness"
  },
  {
    id: 4,
    question: "When it comes to spending, are you: YOLO all the way, budget boss, or chill middle path?",
    options: ["YOLO All The Way", "Budget Boss", "Chill Middle Path"],
    category: "Spending Habits"
  },
  {
    id: 5,
    question: "Roommate grabs your shampoo without asking - you think: fair game, ask first please, or hands off my stuff!",
    options: ["Fair Game", "Ask First Please", "Hands Off My Stuff"],
    category: "Boundaries"
  }
];

const compatibleMatches = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 24,
    location: 'Mumbai, Maharashtra',
    compatibility: 96,
    bio: 'Software engineer who loves cooking and yoga. Looking for a clean, quiet roommate who respects personal space.',
    interests: ['Cooking', 'Yoga', 'Tech', 'Travel'],
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'],
    isOnline: true,
    lastActive: '2 min ago',
    verified: true,
    mutualFriends: 3,
    matchReasons: ['Same sleep schedule', 'Similar cleanliness standards', 'Compatible social energy']
  },
  {
    id: '2',
    name: 'Rahul Patel',
    age: 26,
    location: 'Bangalore, Karnataka',
    compatibility: 89,
    bio: 'Marketing professional with a passion for fitness and music. Prefers someone who is organized and communicative.',
    interests: ['Fitness', 'Music', 'Marketing', 'Reading'],
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'],
    isOnline: false,
    lastActive: '1 hour ago',
    verified: true,
    mutualFriends: 1,
    matchReasons: ['Similar spending habits', 'Compatible boundaries', 'Shared interests']
  },
  {
    id: '3',
    name: 'Anjali Desai',
    age: 23,
    location: 'Delhi, NCR',
    compatibility: 92,
    bio: 'Graduate student studying design. Creative soul who loves art, coffee, and meaningful conversations.',
    interests: ['Art', 'Coffee', 'Design', 'Photography'],
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'],
    isOnline: true,
    lastActive: '5 min ago',
    verified: false,
    mutualFriends: 2,
    matchReasons: ['Compatible social energy', 'Similar lifestyle', 'Shared creative interests']
  },
  {
    id: '4',
    name: 'Kavya Reddy',
    age: 25,
    location: 'Hyderabad, Telangana',
    compatibility: 87,
    bio: 'Healthcare professional who values cleanliness and quiet. Enjoys reading and occasional social gatherings.',
    interests: ['Healthcare', 'Reading', 'Cooking', 'Travel'],
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'],
    isOnline: true,
    lastActive: '10 min ago',
    verified: true,
    mutualFriends: 0,
    matchReasons: ['High cleanliness standards', 'Similar sleep patterns', 'Compatible boundaries']
  }
];

// Avatar mascot component
const StoryAvatar = ({ mood, message }: { mood: 'neutral'|'happy'|'celebrate'|'recording', message: string }) => {
  let face;
  if (mood === 'happy') face = <Smile className="h-8 w-8 text-green-500 animate-bounce" />;
  else if (mood === 'celebrate') face = <Sparkles className="h-8 w-8 text-yellow-500 animate-bounce" />;
  else if (mood === 'recording') face = <Mic className="h-8 w-8 text-red-500 animate-pulse" />;
  else face = <Smile className="h-8 w-8 text-blue-500" />;
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center border-4 border-white shadow-lg">
          {face}
        </div>
        {/* Speech bubble */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 min-w-[200px] max-w-xs bg-white border border-blue-200 rounded-xl shadow-lg px-4 py-3 text-base text-blue-900 font-medium animate-fade-in">
          {message}
        </div>
      </div>
    </div>
  );
};

export const EnterPadosan = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<{ [key: number]: string }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [showInitialConversation, setShowInitialConversation] = useState(true);
  const [showEndConversation, setShowEndConversation] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<typeof compatibleMatches[0] | null>(null);
  const [showMatchIntroduction, setShowMatchIntroduction] = useState(false);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Avatar story messages
  const getAvatarMessage = () => {
    if (profileCreated) return "Hey! You finally matched. Here are your perfect roommates!";
    if (isProcessing) return "Hang tight, I'm finding your best matches...";
    if (isRecording) return `I'm listening! Tell me: ${currentQ.question}`;
    if (currentQuestion === 0) return "Let's start your roommate story! Ready for the first question?";
    if (currentQuestion === questions.length - 1) return "Last one! This will help us find your perfect match.";
    return `Next up: ${currentQ.category}!`;
  };
  const getAvatarMood = () => {
    if (profileCreated) return 'celebrate';
    if (isProcessing) return 'recording';
    if (isRecording) return 'recording';
    if (currentQuestion === questions.length - 1) return 'happy';
    return 'neutral';
  };

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started! 🎤",
      description: "Speak clearly and naturally",
      duration: 2000,
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordings(prev => ({
      ...prev,
      [currentQuestion]: `Recording ${currentQuestion + 1} completed`
    }));
    toast({
      title: "Recording saved! ✅",
      description: "Your voice response has been captured",
      duration: 2000,
    });
  };

  const selectOption = (option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitProfile = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProfileCreated(true);
      setShowEndConversation(true);
      toast({
        title: "Profile created successfully! 🎉",
        description: "Here are your perfect matches!",
        duration: 3000,
      });
    }, 2000);
  };

  const handleInitialConversationComplete = () => {
    setShowInitialConversation(false);
    setShowQuestions(true);
  };

  const handleEndConversationComplete = () => {
    setShowEndConversation(false);
    toast({
      title: "Let's start chatting! 💬",
      description: "Time to connect with your matches!",
      duration: 3000,
    });
  };

  const handleMatchSelect = (match: typeof compatibleMatches[0]) => {
    setSelectedMatch(match);
    setShowMatchIntroduction(true);
  };

  const handleMatchIntroductionClose = () => {
    setShowMatchIntroduction(false);
    setSelectedMatch(null);
  };

  const handleMatchMessage = () => {
    if (selectedMatch) {
      toast({
        title: `Message ${selectedMatch.name}`,
        description: "Opening chat window...",
        duration: 3000,
      });
      handleMatchIntroductionClose();
    }
  };

  const handleMatchLike = () => {
    if (selectedMatch) {
      toast({
        title: "Added to favorites! ❤️",
        description: `${selectedMatch.name} added to your liked list`,
        duration: 2000,
      });
      handleMatchIntroductionClose();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Join the Community</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to create your roommate profile.
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <Navigation />
      <div className="pt-20 lg:pt-6">
        <div className="container mx-auto px-6 py-8">
          {/* Initial Animated Conversation */}
          {showInitialConversation && (
            <AnimatedConversation 
              onComplete={handleInitialConversationComplete}
              isEndScene={false}
            />
          )}

          {/* End Animated Conversation */}
          {showEndConversation && (
            <AnimatedConversation 
              onComplete={handleEndConversationComplete}
              isEndScene={true}
            />
          )}

          {/* Questions Flow */}
          {showQuestions && (
            <>
              {/* Story Avatar */}
              <div className="flex justify-center">
                <StoryAvatar mood={getAvatarMood()} message={getAvatarMessage()} />
              </div>

          {/* Progress Bar */}
          {!profileCreated && !isProcessing && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Question Card or Processing/Matches */}
          {!profileCreated && !isProcessing && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="shadow-lg">
                <CardHeader className="text-center pb-6">
                  <Badge variant="secondary" className="w-fit mx-auto mb-3">
                    {currentQ.category}
                  </Badge>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {currentQ.question}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Record your voice response or select an option below
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Voice Recording Section */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording 
                          ? 'bg-red-500 animate-pulse' 
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105'
                      }`}>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={isRecording ? stopRecording : startRecording}
                          className="w-full h-full rounded-full text-white hover:bg-white/20"
                        >
                          {isRecording ? (
                            <MicOff className="h-8 w-8" />
                          ) : (
                            <Mic className="h-8 w-8" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {isRecording ? "Recording... Speak now!" : "Click to start recording"}
                      </p>
                      {recordings[currentQuestion] && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Recording saved</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Options */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-center">Or choose quickly:</h3>
                    <div className="grid gap-3">
                      {currentQ.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedOptions[currentQuestion] === option ? "default" : "outline"}
                          className="justify-start h-auto p-4 text-left"
                          onClick={() => selectOption(option)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedOptions[currentQuestion] === option 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {selectedOptions[currentQuestion] === option && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        onClick={submitProfile}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Find My Matches
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Processing Animation */}
          {isProcessing && !profileCreated && (
            <div className="flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
              <div className="mb-6">
                <Sparkles className="h-16 w-16 text-yellow-400 animate-bounce" />
              </div>
              <p className="text-xl font-semibold text-blue-900 mb-2">Finding your perfect matches...</p>
              <p className="text-md text-muted-foreground">Hang tight while we analyze your answers!</p>
            </div>
          )}

          {/* Compatible Matches Section */}
          {profileCreated && (
            <div className="mt-12 animate-fade-in">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Your Perfect Matches</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Based on your voice and preferences, here are your most compatible roommates
                </p>
              </div>

              {/* Match Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {compatibleMatches.map((match) => (
                  <Card key={match.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-green-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={match.photos[0]} />
                            <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{match.name}</h3>
                              {match.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {match.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${match.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-xs text-muted-foreground">{match.lastActive}</span>
                        </div>
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
                              style={{ width: `${match.compatibility}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-green-600">{match.compatibility}%</span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {match.bio}
                      </p>

                      {/* Match Reasons */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-green-700">Why you match:</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.matchReasons.map((reason, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Interests */}
                      <div className="flex flex-wrap gap-1">
                        {match.interests.slice(0, 3).map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {match.interests.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.interests.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Mutual Friends */}
                      {match.mutualFriends > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {match.mutualFriends} mutual friend{match.mutualFriends > 1 ? 's' : ''}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleMatchSelect(match)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Meet {match.name.split(' ')[0]}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Added to favorites! ❤️",
                              description: `${match.name} added to your liked list`,
                              duration: 2000,
                            });
                          }}
                          className="px-3"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Connecting
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
            </>
          )}

          {/* Match Introduction Modal */}
          {showMatchIntroduction && selectedMatch && (
            <MatchIntroduction
              match={selectedMatch}
              onClose={handleMatchIntroductionClose}
              onMessage={handleMatchMessage}
              onLike={handleMatchLike}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 