
import { useState, useEffect } from 'react';

const StatsCounter = () => {
  const [stats, setStats] = useState({
    totalPaid: 15247000,
    gamesPlayed: 8934,
    playersRegistered: 23456,
    averageWinRate: 20
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalPaid: prev.totalPaid + Math.floor(Math.random() * 20000),
        gamesPlayed: prev.gamesPlayed + Math.floor(Math.random() * 3),
        playersRegistered: prev.playersRegistered + Math.floor(Math.random() * 2),
        averageWinRate: 20 // Fixed at 20% (1 in 5 win rate)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-accent animate-pulse">
              {stats.totalPaid.toLocaleString()} RWF
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Total Prizes Paid</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary animate-pulse">
              {stats.gamesPlayed.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Games Completed</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-foreground animate-pulse">
              {stats.playersRegistered.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Players Registered</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-accent animate-pulse">
              {stats.averageWinRate}%
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Win Rate</div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Stats update in real-time</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
