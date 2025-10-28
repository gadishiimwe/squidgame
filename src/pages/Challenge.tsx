''
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle, Clock, Users, Trophy, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Challenge = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinChallenge = async () => {
    setIsJoining(true);

    // Simulate joining challenge (static frontend)
    setTimeout(() => {
      toast({
        title: "Challenge Joined!",
        description: "You have successfully joined the Solo Challenge. You'll be notified when your group is ready.",
      });
      setIsJoining(false);
      navigate('/dashboard');
    }, 2000);
  };

  // Removed login check for static frontend

  return (
    <div className="min-h-screen bg-squid-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="sm" className="border-squid-gray text-white hover:bg-squid-gray">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Arena
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Solo Challenge Arena</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="squid-card border-squid-red/50">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Circle className="w-8 h-8 text-squid-red" />
                <Badge variant="destructive" className="bg-squid-red animate-pulse">
                  3/5 PLAYERS WAITING
                </Badge>
              </div>
              <CardTitle className="text-2xl text-white">
                Join Solo Challenge
              </CardTitle>
              <CardDescription className="text-gray-300">
                Battle against 4 other players in skill-based challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Entry Fee</div>
                    <div className="text-2xl font-bold text-squid-red">5,000 RWF</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Winner Prize</div>
                    <div className="text-2xl font-bold text-squid-green">20,000 RWF</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Your Balance</div>
                    <div className="text-2xl font-bold text-white">{profile?.wallet_balance || 0} RWF</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-2" />
                    5 Players Maximum
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2" />
                    ~15 Minutes Duration
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Trophy className="w-5 h-5 mr-2" />
                    Winner Takes All
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Challenge Stages:</h3>
                <div className="grid gap-3">
                  <div className="flex items-center p-3 bg-squid-darker rounded-lg">
                    <div className="w-8 h-8 bg-squid-red rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                    <div>
                      <div className="font-medium text-white">Memory Pattern Challenge</div>
                      <div className="text-sm text-gray-400">Remember and replicate visual patterns</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-squid-darker rounded-lg">
                    <div className="w-8 h-8 bg-squid-green rounded-full flex items-center justify-center text-squid-dark font-bold mr-3">2</div>
                    <div>
                      <div className="font-medium text-white">Speed Calculation Test</div>
                      <div className="text-sm text-gray-400">Solve math problems under time pressure</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-squid-darker rounded-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-squid-dark font-bold mr-3">3</div>
                    <div>
                      <div className="font-medium text-white">Final Elimination Round</div>
                      <div className="text-sm text-gray-400">Ultimate skill test to determine the winner</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-squid-gray">
                <Button
                  onClick={handleJoinChallenge}
                  disabled={isJoining}
                  className="w-full squid-button text-lg py-6"
                >
                  {isJoining ? 'Joining Challenge...' : 'Join Challenge - 5,000 RWF'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
