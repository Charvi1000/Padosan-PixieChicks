import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceWaveProps {
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const VoiceWave = ({ isActive = false, size = 'md', className = '', onClick }: VoiceWaveProps) => {
  const [waveHeights, setWaveHeights] = useState([20, 40, 25, 60, 35, 45, 30]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.random() * 60 + 20));
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const barWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
  const spacing = size === 'sm' ? 1 : size === 'md' ? 2 : 3;

  return (
    <div className={`flex items-center gap-4 ${className}`} onClick={onClick}>
      <div className={`${sizeClasses[size]} bg-voice-primary rounded-full flex items-center justify-center ${isActive ? 'pulse-glow' : ''}`}>
        <Mic className="h-1/2 w-1/2 text-white" />
      </div>
      <div className="flex items-end gap-1 h-16">
        {waveHeights.map((height, index) => (
          <div
            key={index}
            className={`bg-gradient-voice transition-all duration-150 ease-out`}
            style={{
              width: `${barWidth}px`,
              height: isActive ? `${height}px` : '20px',
              marginRight: `${spacing}px`,
              borderRadius: '2px'
            }}
          />
        ))}
      </div>
    </div>
  );
};