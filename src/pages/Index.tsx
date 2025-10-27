
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Circle, Square, Triangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/HeroSection';
import GameModes from '@/components/GameModes';
import Leaderboard from '@/components/Leaderboard';
import StatsCounter from '@/components/StatsCounter';
import UserProfile from '@/components/UserProfile';
import Footer from '@/components/Footer';
import BackgroundMusic from '@/components/BackgroundMusic';
import RadarLoader from '@/components/RadarLoader';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <RadarLoader size="lg" theme="squid-red" />
        <div className="mt-8 text-foreground text-xl font-semibold">
          Loading Challenge Arena...
        </div>
        <div className="mt-2 text-muted-foreground text-sm">
          Preparing your gaming experience
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Circle className="w-6 h-6 text-primary" />
            <Triangle className="w-6 h-6 text-accent" />
            <Square className="w-6 h-6 text-foreground" />
            <span className="text-xl font-bold">The Challenge Arena</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Next Round: <span className="text-accent font-mono animate-countdown">{formatTime(timeLeft)}</span>
            </div>
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Dashboard
                  </Button>
                </Link>
                {profile?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/challenge">
                  <button className="uiverse-button squid-red small">
                    <div className="blob1"></div>
                    <div className="inner">Join Challenge</div>
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <button className="uiverse-button squid-red small">
                    <div className="blob1"></div>
                    <div className="inner">Login</div>
                  </button>
                </Link>
                <Link to="/auth">
                  <button className="uiverse-button squid-green small">
                    <div className="blob1"></div>
                    <div className="inner">Join Challenge</div>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 space-y-8">
        <HeroSection />
        
        {/* User Profile Section - Only shown when logged in */}
        {user && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <UserProfile />
            </div>
          </section>
        )}
        
        <StatsCounter />
        <GameModes />
        <Leaderboard />
      </div>

      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default Index;
