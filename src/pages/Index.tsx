
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading...</div>
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
                  <Button className="squid-button">
                    Join Challenge
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="squid-button">
                    Join Challenge
                  </Button>
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
    </div>
  );
};

export default Index;
