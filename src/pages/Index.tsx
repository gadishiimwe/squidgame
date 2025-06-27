
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle, Square, Triangle } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import GameModes from '@/components/GameModes';
import Leaderboard from '@/components/Leaderboard';
import StatsCounter from '@/components/StatsCounter';
import Footer from '@/components/Footer';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

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

  return (
    <div className="min-h-screen bg-squid-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-squid-dark/90 backdrop-blur-md border-b border-squid-gray">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Circle className="w-6 h-6 text-squid-red" />
            <Triangle className="w-6 h-6 text-squid-green" />
            <Square className="w-6 h-6 text-white" />
            <span className="text-xl font-bold">The Challenge Arena</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Next Round: <span className="text-squid-green font-mono animate-countdown">{formatTime(timeLeft)}</span>
            </div>
            <Button variant="outline" className="border-squid-red text-squid-red hover:bg-squid-red hover:text-white">
              Login
            </Button>
            <Button className="squid-button">
              Join Challenge
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <HeroSection />
        <StatsCounter />
        <GameModes />
        <Leaderboard />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
