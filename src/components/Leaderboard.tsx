
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const Leaderboard = () => {
  const { leaderboard, loading } = useLeaderboard();

  // Mock data for demonstration when no real data exists
  const mockLeaderboard = [
    { rank: 1, name: 'Player001', wins: 12, earnings: 240000 },
    { rank: 2, name: 'Player456', wins: 8, earnings: 160000 },
    { rank: 3, name: 'Player789', wins: 6, earnings: 120000 },
    { rank: 4, name: 'Player234', wins: 4, earnings: 80000 },
    { rank: 5, name: 'Player567', wins: 3, earnings: 60000 },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
  };

  const displayData = leaderboard.length > 0 ? leaderboard.map((entry) => ({
    rank: entry.ranking || 0,
    name: entry.profiles?.full_name || `Player${entry.user_id.slice(-3)}`,
    wins: entry.wins,
    earnings: entry.total_earnings
  })) : mockLeaderboard;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Arena <span className="text-squid-red">Champions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The elite players who have conquered the challenges and claimed their prizes. 
            Will you join their ranks?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="squid-card border-squid-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-6 h-6 text-squid-red mr-2" />
                Top Players - All Time
              </CardTitle>
              <CardDescription className="text-gray-400">
                {loading ? 'Loading leaderboard...' : 'Based on total wins and earnings'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayData.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-squid-darker/50 rounded-lg hover:bg-squid-darker transition-colors">
                    <div className="flex items-center space-x-4">
                      {getRankIcon(player.rank)}
                      <div>
                        <div className="font-semibold text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.wins} wins</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-squid-green">{player.earnings.toLocaleString()} RWF</div>
                      <Badge variant="outline" className="text-xs border-squid-gray text-gray-400">
                        Total Earnings
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
