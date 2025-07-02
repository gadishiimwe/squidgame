
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Circle, Square, Triangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const HeroSection = () => {
  const [playersOnline, setPlayersOnline] = useState(1247);
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <Circle className="absolute top-20 left-10 w-32 h-32 text-primary/10 animate-float" />
        <Triangle className="absolute top-40 right-20 w-24 h-24 text-accent/10 animate-float" style={{ animationDelay: '1s' }} />
        <Square className="absolute bottom-32 left-20 w-28 h-28 text-foreground/5 animate-float" style={{ animationDelay: '2s' }} />
        <Circle className="absolute bottom-20 right-10 w-20 h-20 text-primary/5 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Badge className="mb-6 bg-primary/20 text-primary border-primary animate-pulse-glow">
          🔴 LIVE CHALLENGE ARENA
        </Badge>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="text-foreground">THE</span>{' '}
          <span className="text-primary neon-glow">CHALLENGE</span>
          <br />
          <span className="text-accent neon-glow">ARENA</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Skill-based competitions with real cash prizes. 
          <br />
          <span className="text-accent font-semibold">Win 20,000 RWF</span> in solo challenges or team up for bigger stakes.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <Link to={user ? "/challenge" : "/auth"}>
            <Button className="squid-button text-lg px-8 py-4 h-auto animate-pulse-glow">
              🔥 Join Solo Challenge - 5,000 RWF
            </Button>
          </Link>
          <Link to={user ? "/teams" : "/auth"}>
            <Button className="squid-button-green text-lg px-8 py-4 h-auto">
              👥 Create Team Battle
            </Button>
          </Link>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">{playersOnline.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Players Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">847</div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">₱2.1M</div>
            <div className="text-sm text-muted-foreground">Total Prizes Won</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">98.3%</div>
            <div className="text-sm text-muted-foreground">Payout Rate</div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="mt-12 p-4 border border-primary/30 rounded-lg bg-primary/5 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">⚠️ Skill-based challenges only.</span> 
            {' '}Ages 18+. Play responsibly. Mobile Money payment required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
