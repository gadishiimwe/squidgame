
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Circle, Square, Triangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const GameModes = () => {
  const { user } = useAuth();
  
  const soloStats = {
    playersWaiting: 3,
    nextRound: '5 mins',
    prize: '20,000 RWF',
    entry: '5,000 RWF'
  };

  const teamStats = {
    teamsActive: 12,
    avgPot: '45,000 RWF',
    nextBattle: '12 mins'
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-squid-red">Challenge</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your skills in fast-paced, mind-bending challenges designed to separate winners from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Solo Challenge */}
          <Card className="squid-card group hover:border-squid-red/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Circle className="w-8 h-8 text-squid-red" />
                <Badge variant="destructive" className="bg-squid-red animate-pulse">
                  {soloStats.playersWaiting}/5 WAITING
                </Badge>
              </div>
              <CardTitle className="text-2xl text-white group-hover:text-squid-red transition-colors">
                Solo Challenge Arena
              </CardTitle>
              <CardDescription className="text-gray-300">
                Join 4 other players in a battle of wits and speed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Entry Fee</div>
                  <div className="text-lg font-bold text-squid-red">{soloStats.entry}</div>
                </div>
                <div>
                  <div className="text-gray-400">Winner Prize</div>
                  <div className="text-lg font-bold text-squid-green">{soloStats.prize}</div>
                </div>
                <div>
                  <div className="text-gray-400">Players Needed</div>
                  <div className="text-lg font-bold">5 Players</div>
                </div>
                <div>
                  <div className="text-gray-400">Next Round</div>
                  <div className="text-lg font-bold text-squid-green">{soloStats.nextRound}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white">Challenge Stages:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Square className="w-3 h-3 text-squid-red mr-2" />
                    Memory Pattern Recognition
                  </div>
                  <div className="flex items-center">
                    <Triangle className="w-3 h-3 text-squid-green mr-2" />
                    Speed Calculation Challenge
                  </div>
                  <div className="flex items-center">
                    <Circle className="w-3 h-3 text-white mr-2" />
                    Final Elimination Round
                  </div>
                </div>
              </div>

              <Link to={user ? "/challenge" : "/auth"}>
                <Button className="w-full squid-button text-lg py-3 group-hover:animate-pulse-glow">
                  Join Solo Challenge - {soloStats.entry}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Team Battle */}
          <Card className="squid-card group hover:border-squid-green/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Triangle className="w-8 h-8 text-squid-green" />
                <Badge className="bg-squid-green text-squid-dark">
                  {teamStats.teamsActive} TEAMS ACTIVE
                </Badge>
              </div>
              <CardTitle className="text-2xl text-white group-hover:text-squid-green transition-colors">
                Team Battle Arena
              </CardTitle>
              <CardDescription className="text-gray-300">
                Form teams of 3-5 players and challenge rivals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Team Size</div>
                  <div className="text-lg font-bold">3-5 Players</div>
                </div>
                <div>
                  <div className="text-gray-400">Avg Prize Pool</div>
                  <div className="text-lg font-bold text-squid-green">{teamStats.avgPot}</div>
                </div>
                <div>
                  <div className="text-gray-400">Active Teams</div>
                  <div className="text-lg font-bold text-squid-green">{teamStats.teamsActive}</div>
                </div>
                <div>
                  <div className="text-gray-400">Next Battle</div>
                  <div className="text-lg font-bold">{teamStats.nextBattle}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white">Battle Features:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Square className="w-3 h-3 text-squid-red mr-2" />
                    Coordinate team strategies
                  </div>
                  <div className="flex items-center">
                    <Triangle className="w-3 h-3 text-squid-green mr-2" />
                    Higher stake competitions
                  </div>
                  <div className="flex items-center">
                    <Circle className="w-3 h-3 text-white mr-2" />
                    Winner-takes-all format
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link to={user ? "/teams" : "/auth"} className="flex-1">
                  <Button className="w-full squid-button-green group-hover:animate-pulse">
                    Create Team
                  </Button>
                </Link>
                <Link to={user ? "/teams" : "/auth"} className="flex-1">
                  <Button variant="outline" className="w-full border-squid-green text-squid-green hover:bg-squid-green hover:text-squid-dark">
                    Join Team
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-squid-red rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-semibold">Pay Entry Fee</h4>
              <p className="text-sm text-gray-400">Secure payment via MTN/Airtel Mobile Money</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-squid-green rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-squid-dark">2</span>
              </div>
              <h4 className="font-semibold">Join Group</h4>
              <p className="text-sm text-gray-400">Auto-matched with other players</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-squid-dark">3</span>
              </div>
              <h4 className="font-semibold">Complete Challenges</h4>
              <p className="text-sm text-gray-400">3 skill-based elimination rounds</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-squid-green rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                <span className="text-2xl font-bold text-squid-dark">4</span>
              </div>
              <h4 className="font-semibold">Win Prizes</h4>
              <p className="text-sm text-gray-400">Instant payout to your mobile money</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameModes;
