
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AudioManager = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Soft volume
    
    // Try to autoplay (browsers may block this)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked by browser. User interaction required.');
      }
    };

    // Only try autoplay if audio source is valid
    const handleCanPlay = () => {
      tryAutoplay();
    };

    audio.addEventListener('canplay', handleCanPlay);

    // Handle audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.3;
      if (!isPlaying) {
        audio.play().catch(console.error);
      }
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleUserInteraction = () => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    audio.play().catch(console.error);
  };

  return (
    <>
      {/* Audio element with a royalty-free placeholder URL */}
      <audio
        ref={audioRef}
        preload="none"
        onError={(e) => {
          console.log('Audio failed to load - using placeholder files');
          setIsPlaying(false);
        }}
        onLoadStart={() => console.log('Audio loading started')}
      >
        {/* Placeholder audio files - replace with actual royalty-free audio */}
        <source src="/audio/squid-game-theme.mp3" type="audio/mpeg" />
        <source src="/audio/squid-game-theme.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Fixed position audio controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleMute}
          onMouseDown={handleUserInteraction}
          variant="outline"
          size="icon"
          className="bg-squid-dark/80 border-squid-red hover:bg-squid-red hover:text-white backdrop-blur-sm"
          title={isMuted ? 'Unmute background music' : 'Mute background music'}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User interaction prompt for autoplay */}
      {!isPlaying && !isMuted && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <Button
            onClick={handleUserInteraction}
            variant="outline"
            size="sm"
            className="bg-squid-dark/90 border-squid-green text-squid-green hover:bg-squid-green hover:text-squid-dark backdrop-blur-sm"
          >
            🎵 Enable Audio
          </Button>
        </div>
      )}
    </>
  );
};

export default AudioManager;
