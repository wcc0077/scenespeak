import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface AudioPlayerProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AudioPlayer({ text, size = 'md' }: AudioPlayerProps) {
  const { isPlaying, play, stop } = useAudio();
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const iconSizes = { sm: 16, md: 20, lg: 24 };
  const handleClick = () => { if (isPlaying) stop(); else play(text); };
  return (
    <button onClick={handleClick} className={`${sizeClasses[size]} rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all`}>
      {isPlaying ? <VolumeX size={iconSizes[size]} /> : <Volume2 size={iconSizes[size]} />}
    </button>
  );
}
