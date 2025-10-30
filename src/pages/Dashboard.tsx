
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wallet, Trophy, Users, History, ArrowLeft } from 'lucide-react';

import { Link } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import WalletTopup from '@/components/WalletTopup';
import { useTeams } from '@/hooks/useTeams';

const Dashboard = () => {
  const { myTeam } = useTeams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const gameHistory = [
    { id: 1, name: 'Solo Challenge #123', date: '2024-12-27', result: 'Won', prize: 20000 },
    { id: 2, name: 'Team Battle Alpha', date: '2024-12-26', result: 'Lost', prize: 0 },
    { id: 3, name: 'Solo Challenge #122', date: '2024-12-25', result: 'Won', prize: 15000 },
  ];

  // Mock profile data for static frontend design
  const mockProfile = {
    wallet_balance: 50000,
    total_wins: 15,
    total_games: 25,
  };

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
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
        </div>

        <div className="grid gap-8">
          <UserProfile />

          <Card className="squid-card border-squid-gray">
            <CardHeader>
              <CardTitle className="text-white">Dashboard</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your challenges, teams, and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-squid-red data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-squid-green data-[state=active]:text-squid-dark">
                    Game History
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="data-[state=active]:bg-squid-green data-[state=active]:text-squid-dark">
                    Teams
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardContent className="p-6 text-center">
                        <Wallet className="w-8 h-8 text-squid-green mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{mockProfile.wallet_balance} USD</div>
                        <div className="text-sm text-gray-400">Current Balance</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-8 h-8 text-squid-red mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{mockProfile.total_wins}</div>
                        <div className="text-sm text-gray-400">Total Wins</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardContent className="p-6 text-center">
                        <Users className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{mockProfile.total_games}</div>
                        <div className="text-sm text-gray-400">Games Played</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Link to="/challenge">
                          <Button className="w-full squid-button-green">
                            Join Solo Challenge
                          </Button>
                        </Link>
                        <Link to="/teams">
                          <Button className="w-full squid-button">
                            Manage Teams
                          </Button>
                        </Link>
                        <WalletTopup />
                      </CardContent>
                    </Card>

                    <Card className="bg-squid-darker border-squid-gray">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {gameHistory.slice(0, 3).map((game) => (
                            <div key={game.id} className="flex justify-between items-center p-2 bg-squid-dark rounded">
                              <div>
                                <div className="text-sm font-medium text-white">{game.name}</div>
                                <div className="text-xs text-gray-400">{game.date}</div>
                              </div>
                              <Badge variant={game.result === 'Won' ? 'default' : 'destructive'} className={game.result === 'Won' ? 'bg-squid-green text-squid-dark' : 'bg-squid-red'}>
                                {game.result}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-4">
                    {gameHistory.map((game) => (
                      <Card key={game.id} className="bg-squid-darker border-squid-gray">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-white">{game.name}</h3>
                              <p className="text-sm text-gray-400">{game.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={game.result === 'Won' ? 'default' : 'destructive'} className={game.result === 'Won' ? 'bg-squid-green text-squid-dark mb-2' : 'bg-squid-red mb-2'}>
                                {game.result}
                              </Badge>
                              <div className="text-lg font-bold text-white">
                                {game.prize > 0 ? `+${game.prize} USD` : 'No Prize'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="teams" className="space-y-4">
                  {myTeam ? (
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardHeader>
                        <CardTitle className="text-white">Your Team: {myTeam.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage your team and view team statistics
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{myTeam.member_count || 0}</div>
                            <div className="text-sm text-gray-400">Members</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-squid-green">0</div>
                            <div className="text-sm text-gray-400">Team Wins</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">0 USD</div>
                            <div className="text-sm text-gray-400">Total Earnings</div>
                          </div>
                          <div className="text-center">
                            <Link to="/teams">
                              <Button className="squid-button-green">
                                Manage Team
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-squid-darker border-squid-gray">
                      <CardContent className="p-8 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No Team Yet</h3>
                        <p className="text-gray-400 mb-4">Create or join a team to participate in team battles</p>
                        <Link to="/teams">
                          <Button className="squid-button-green">
                            Manage Teams
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
