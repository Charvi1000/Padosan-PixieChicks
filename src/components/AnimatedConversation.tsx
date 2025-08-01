import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import problemSceneImage from '@/assets/problem-scene.jpg';

interface AnimatedConversationProps {
  onComplete: () => void;
  isEndScene?: boolean;
}

interface DialogueStep {
  speaker: 'left' | 'right';
  text: string;
  delay: number;
}

export const AnimatedConversation: React.FC<AnimatedConversationProps> = ({ 
  onComplete, 
  isEndScene = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);

  const initialDialogue: DialogueStep[] = [
    {
      speaker: 'left',
      text: 'Hey, are you looking for a roommate? I will help you find one!',
      delay: 1000
    },
    {
      speaker: 'right',
      text: 'Yes please!',
      delay: 2000
    }
  ];

  const endDialogue: DialogueStep[] = [
    {
      speaker: 'left',
      text: 'You found your roommate!',
      delay: 1000
    },
    {
      speaker: 'right',
      text: 'Thank you so much!',
      delay: 2000
    }
  ];

  const dialogue = isEndScene ? endDialogue : initialDialogue;

  useEffect(() => {
    const showBubbles = async () => {
      for (let i = 0; i < dialogue.length; i++) {
        await new Promise(resolve => setTimeout(resolve, dialogue[i].delay));
        setVisibleBubbles(prev => [...prev, i]);
        setCurrentStep(i + 1);
      }
      
      // Auto-proceed after showing all bubbles
      setTimeout(() => {
        onComplete();
      }, 2000);
    };

    showBubbles();
  }, [dialogue, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={problemSceneImage} 
          alt="Two women talking" 
          className="max-w-full max-h-full object-contain opacity-90"
        />
      </div>

      {/* Speech Bubbles Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {dialogue.map((step, index) => (
          <div
            key={index}
            className={`
              absolute transition-all duration-500 transform
              ${visibleBubbles.includes(index) 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-4 scale-95'
              }
              ${step.speaker === 'left' 
                ? 'left-4 md:left-8 lg:left-16' 
                : 'right-4 md:right-8 lg:right-16'
              }
            `}
            style={{
              top: step.speaker === 'left' ? '30%' : '45%',
              maxWidth: '300px'
            }}
          >
            {/* Speech Bubble */}
            <div className={`
              relative bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-gray-200
              ${step.speaker === 'left' ? 'ml-0' : 'mr-0'}
            `}>
              {/* Speech Bubble Tail */}
              <div className={`
                absolute w-0 h-0 
                ${step.speaker === 'left' 
                  ? 'left-6 border-l-0 border-r-[20px] border-r-white' 
                  : 'right-6 border-r-0 border-l-[20px] border-l-white'
                }
                border-t-[15px] border-t-transparent
                border-b-[15px] border-b-transparent
                -bottom-[15px]
              `} />
              
              {/* Speech Bubble Border Tail */}
              <div className={`
                absolute w-0 h-0 
                ${step.speaker === 'left' 
                  ? 'left-6 border-l-0 border-r-[22px] border-r-gray-200' 
                  : 'right-6 border-r-0 border-l-[22px] border-l-gray-200'
                }
                border-t-[16px] border-t-transparent
                border-b-[16px] border-b-transparent
                -bottom-[17px] -z-10
              `} />

              {/* Text Content */}
              <p className="text-gray-800 font-medium text-lg leading-relaxed">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip Button */}
      <Button
        onClick={onComplete}
        variant="outline"
        className="absolute bottom-8 right-8 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
      >
        {isEndScene ? 'Continue' : 'Skip'}
      </Button>

      {/* Animated dots for loading effect */}
      {currentStep < dialogue.length && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};
