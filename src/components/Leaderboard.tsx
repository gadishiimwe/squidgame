
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle, Square, Triangle } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: 'Player001', wins: 47, earnings: '940,000 RWF', badge: 'LEGEND' },
    { rank: 2, name: 'SkillMaster', wins: 43, earnings: '860,000 RWF', badge: 'CHAMPION' },
    { rank: 3, name: 'QuickThink', wins: 39, earnings: '780,000 RWF', badge: 'EXPERT' },
    { rank: 4, name: 'MindBender', wins: 35, earnings: '700,000 RWF', badge: 'PRO' },
    { rank: 5, name: 'FastFingers', wins: 32, earnings: '640,000 RWF', badge: 'RISING' },
  ];

  const topTeams = [
    { rank: 1, name: 'Red Guardians', members: 5, wins: 23, earnings: '1,150,000 RWF' },
    { rank: 2, name: 'Green Machines', members: 4, wins: 21, earnings: '1,050,000 RWF' },
    { rank: 3, name: 'Triangle Force', members: 5, wins: 19, earnings: '950,000 RWF' },
  ];

  const recentWinners = [
    { name: 'Player087', challenge: 'Solo Arena', prize: '20,000 RWF', time: '2 mins ago' },
    { name: 'Team Alpha', challenge: 'Team Battle', prize: '75,000 RWF', time: '8 mins ago' },
    { name: 'QuickWit', challenge: 'Solo Arena', prize: '20,000 RWF', time: '15 mins ago' },
    { name: 'Speed Demons', challenge: 'Team Battle', prize: '60,000 RWF', time: '23 mins ago' },
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Circle className="w-6 h-6 text-squid-red" />;
      case 2: return <Triangle className="w-6 h-6 text-squid-green" />;
      case 3: return <Square className="w-6 h-6 text-white" />;
      default: return <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs font-bold">{rank}</div>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case 'LEGEND': return 'bg-squid-red';
      case 'CHAMPION': return 'bg-squid-green text-squid-dark';
      case 'EXPERT': return 'bg-white text-squid-dark';
      default: return 'bg-squid-gray';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-squid-dark to-squid-darker">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hall of <span className="text-squid-green neon-glow">Champions</span>
          </h2>
          <p className="text-xl text-gray-300">
            The elite players and teams dominating the Arena
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Solo Players */}
          <Card className="squid-card">
            <CardHeader>
              <CardTitle className="flex items-center text-squid-red">
                <Circle className="w-6 h-6 mr-2" />
                Top Solo Players
              </CardTitle>
              <CardDescription>This week's champion solo competitors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPlayers.map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-3 rounded-lg bg-squid-gray/30 hover:bg-squid-gray/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(player.rank)}
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-gray-400">{player.wins} wins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getBadgeColor(player.badge)} text-xs mb-1`}>
                      {player.badge}
                    </Badge>
                    <div className="text-sm font-semibold text-squid-green">{player.earnings}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Teams */}
          <Card className="squid-card">
            <CardHeader>
              <CardTitle className="flex items-center text-squid-green">
                <Triangle className="w-6 h-6 mr-2" />
                Top Teams
              </CardTitle>
              <CardDescription>Dominant team battle champions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topTeams.map((team) => (
                <div key={team.rank} className="flex items-center justify-between p-3 rounded-lg bg-squid-gray/30 hover:bg-squid-gray/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(team.rank)}
                    <div>
                      <div className="font-semibold">{team.name}</div>
                      <div className="text-sm text-gray-400">{team.members} members • {team.wins} wins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-squid-green">{team.earnings}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Winners */}
          <Card className="squid-card">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Square className="w-6 h-6 mr-2" />
                Live Winners
              </CardTitle>
              <CardDescription>Recent prize winners in real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentWinners.map((winner, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-squid-green/10 border border-squid-green/20 animate-winner-reveal">
                  <div>
                    <div className="font-semibold text-squid-green">{winner.name}</div>
                    <div className="text-sm text-gray-400">{winner.challenge}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-squid-green">{winner.prize}</div>
                    <div className="text-xs text-gray-400">{winner.time}</div>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <div className="text-sm text-gray-400">
                  🔴 Live updates • Winners announced instantly
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Achievement Levels</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-squid-red text-lg px-4 py-2">🏆 LEGEND</Badge>
            <Badge className="bg-squid-green text-squid-dark text-lg px-4 py-2">👑 CHAMPION</Badge>
            <Badge className="bg-white text-squid-dark text-lg px-4 py-2">⭐ EXPERT</Badge>
            <Badge className="bg-squid-gray text-lg px-4 py-2">🚀 PRO</Badge>
            <Badge className="bg-squid-gray/50 text-lg px-4 py-2">📈 RISING</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
