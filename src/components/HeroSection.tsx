
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

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight challenge-title">
          <span>THE</span>{' '}
          <span>CHALLENGE</span>
          <br />
          <span>ARENA</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Skill-based competitions with real cash prizes. 
          <br />
          <span className="text-accent font-semibold">Win 20,000 RWF</span> in solo challenges or team up for bigger stakes.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <Link to={user ? "/challenge" : "/auth"}>
            <button className="pearl-button squid-red small">
              <div className="wrap">
                <p>
                  <span>✧</span>
                  <span>✦</span>
                  🔥 Join Solo Challenge - 5,000 RWF
                </p>
              </div>
            </button>
          </Link>
          <Link to={user ? "/teams" : "/auth"}>
            <button className="launch-button squid-green">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>👥 Create Team Battle</span>
            </button>
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
