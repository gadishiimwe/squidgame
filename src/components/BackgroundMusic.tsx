import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio('/audio/mingle-round-and-round.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={togglePlay}
        className="bg-background/90 backdrop-blur-sm border-primary/20 hover:border-primary"
      >
        {isPlaying ? 'Pause' : 'Play'} Music
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMute}
        className="bg-background/90 backdrop-blur-sm border-primary/20 hover:border-primary"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default BackgroundMusic;