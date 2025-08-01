import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Heart } from 'lucide-react';

interface MatchIntroductionProps {
  match: {
    id: string;
    name: string;
    age: number;
    location: string;
    compatibility: number;
    bio: string;
    interests: string[];
    photos: string[];
    isOnline: boolean;
    lastActive: string;
    verified: boolean;
    mutualFriends: number;
    matchReasons: string[];
  };
  onClose: () => void;
  onMessage: () => void;
  onLike: () => void;
}

export const MatchIntroduction: React.FC<MatchIntroductionProps> = ({
  match,
  onClose,
  onMessage,
  onLike
}) => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'details'>('intro');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Complete story as one continuous text
  const fullStory = `Hi there! 👋 Meet ${match.name} - someone really special! They're ${match.age} years old and live in ${match.location}. You two have an amazing ${match.compatibility}% compatibility! ${match.name} loves ${match.interests.slice(0, 2).join(' and ')}. What makes you perfect together? ${match.matchReasons[0]}. Ready to get to know them better?`;
  
  // Split the story into words
  const words = fullStory.split(' ');

  useEffect(() => {
    const typeWords = async () => {
      // Start typing after initial delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show each word with a delay
      for (let i = 0; i <= words.length; i++) {
        setCurrentWordIndex(i);
        await new Promise(resolve => setTimeout(resolve, 200)); // 200ms between each word
      }
      
      setIsTypingComplete(true);
      
      // Transition to details after typing is complete
      setTimeout(() => {
        setCurrentPhase('details');
      }, 2000);
    };

    typeWords();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        {currentPhase === 'intro' && (
          <div className="p-8 text-center">
            {/* Introduction GIF/Animation Area */}
            <div className="mb-6 relative">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Animated woman presenter - using CSS animation to simulate GIF */}
                <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full animate-pulse flex items-center justify-center">
                  <div className="text-4xl animate-bounce">👩‍💼</div>
                </div>
                
                {/* Animated sparkles around the presenter */}
                <div className="absolute top-4 left-4 text-yellow-400 animate-ping">✨</div>
                <div className="absolute top-8 right-6 text-pink-400 animate-pulse">💫</div>
                <div className="absolute bottom-6 left-8 text-purple-400 animate-bounce">⭐</div>
                <div className="absolute bottom-4 right-4 text-blue-400 animate-ping">✨</div>
              </div>
            </div>

            {/* Single Box Word-by-Word Story Introduction */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 relative animate-fade-in">
                {/* Speech bubble tail */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-pink-200"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-b-[13px] border-b-white"></div>
                
                {/* Typewriter effect text */}
                <p className="text-lg text-gray-700 leading-relaxed font-medium min-h-[120px]">
                  {words.slice(0, currentWordIndex).map((word, index) => (
                    <span key={index} className="animate-fade-in">
                      {word}{index < currentWordIndex - 1 ? ' ' : ''}
                    </span>
                  ))}
                  {/* Blinking cursor while typing */}
                  {!isTypingComplete && (
                    <span className="animate-pulse text-pink-500 font-bold">|</span>
                  )}
                </p>
              </div>

              {/* Loading animation while story is being told */}
              {!isTypingComplete && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2">Telling you about {match.name}...</span>
                </div>
              )}

              {/* Story complete indicator */}
              {isTypingComplete && (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 mt-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="ml-2">Ready to meet {match.name}!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {currentPhase === 'details' && (
          <div className="p-8 animate-fade-in">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={match.photos[0]} 
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{match.name}</h2>
                <p className="text-gray-600">{match.age} years old • {match.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${match.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-500">{match.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Compatibility Score */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-green-800">Compatibility Score</span>
                <span className="text-2xl font-bold text-green-600">{match.compatibility}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${match.compatibility}%` }}
                ></div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">About {match.name}</h3>
              <p className="text-gray-700 leading-relaxed">{match.bio}</p>
            </div>

            {/* Match Reasons */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Why you're perfect together</h3>
              <div className="grid gap-2">
                {match.matchReasons.map((reason, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Shared Interests</h3>
              <div className="flex flex-wrap gap-2">
                {match.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onMessage}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chatting
              </Button>
              <Button
                onClick={onLike}
                variant="outline"
                className="px-6 border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
