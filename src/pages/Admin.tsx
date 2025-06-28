
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, DollarSign, Trophy, Settings, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const stats = {
    totalUsers: 1250,
    activeGames: 12,
    totalRevenue: 2500000,
    payoutsPending: 5
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+250781234567', status: 'Active', joinDate: '2024-12-27' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+250782345678', status: 'Active', joinDate: '2024-12-26' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '+250783456789', status: 'Suspended', joinDate: '2024-12-25' },
  ];

  const activeGames = [
    { id: 1, name: 'Solo Challenge #124', players: 5, prize: 20000, status: 'In Progress', startTime: '14:30' },
    { id: 2, name: 'Team Battle Alpha vs Beta', players: 8, prize: 80000, status: 'Waiting', startTime: '15:00' },
    { id: 3, name: 'Solo Challenge #125', players: 3, prize: 15000, status: 'Waiting', startTime: '15:30' },
  ];

  const pendingPayouts = [
    { id: 1, user: 'Alice Johnson', amount: 20000, game: 'Solo Challenge #123', date: '2024-12-27' },
    { id: 2, user: 'Team Fire Dragons', amount: 60000, game: 'Team Battle #45', date: '2024-12-27' },
    { id: 3, user: 'Charlie Brown', amount: 15000, game: 'Solo Challenge #122', date: '2024-12-26' },
  ];

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-squid-dark flex items-center justify-center">
        <Card className="squid-card border-squid-red max-w-md">
          <CardHeader>
            <Shield className="w-12 h-12 text-squid-red mx-auto mb-4" />
            <CardTitle className="text-white text-center">Access Denied</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              You don't have admin privileges to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/">
              <Button className="squid-button">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApprovePayment = (payoutId: number) => {
    toast({
      title: "Payment Approved",
      description: "The payout has been processed successfully.",
    });
  };

  const handleSuspendUser = (userId: number) => {
    toast({
      title: "User Suspended",
      description: "The user account has been suspended.",
      variant: "destructive",
    });
  };

  const handleEndGame = (gameId: number) => {
    toast({
      title: "Game Ended",
      description: "The game has been forcefully ended by admin.",
      variant: "destructive",
    });
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
          <Shield className="w-8 h-8 text-squid-red mr-3" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-squid-darker border-squid-gray">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-squid-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Users</div>
              </CardContent>
            </Card>
            <Card className="bg-squid-darker border-squid-gray">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-squid-red mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.activeGames}</div>
                <div className="text-sm text-gray-400">Active Games</div>
              </CardContent>
            </Card>
            <Card className="bg-squid-darker border-squid-gray">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-squid-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.totalRevenue.toLocaleString()} RWF</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
              </CardContent>
            </Card>
            <Card className="bg-squid-darker border-squid-gray">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-squid-red">{stats.payoutsPending}</div>
                <div className="text-sm text-gray-400">Pending Payouts</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Card className="squid-card border-squid-gray">
            <CardHeader>
              <CardTitle className="text-white">Administration Panel</CardTitle>
              <CardDescription className="text-gray-400">
                Manage users, games, and system operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-squid-gray mb-6">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-squid-red data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="users" className="data-[state=active]:bg-squid-green data-[state=active]:text-squid-dark">
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="games" className="data-[state=active]:bg-white data-[state=active]:text-squid-dark">
                    Games
                  </TabsTrigger>
                  <TabsTrigger value="payouts" className="data-[state=active]:bg-squid-red data-[state=active]:text-white">
                    Payouts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-squid-darker border-squid-gray">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Platform Health</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">System Status</span>
                            <Badge className="bg-squid-green text-squid-dark">Online</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Payment Gateway</span>
                            <Badge className="bg-squid-green text-squid-dark">Active</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Game Engine</span>
                            <Badge className="bg-squid-green text-squid-dark">Running</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-squid-darker border-squid-gray">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full squid-button-green">Create New Challenge</Button>
                          <Button className="w-full squid-button">Send System Notification</Button>
                          <Button variant="outline" className="w-full border-squid-gray text-white hover:bg-squid-gray">
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="users">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Recent Users</h3>
                      <Button size="sm" className="squid-button">
                        Export Users
                      </Button>
                    </div>
                    <div className="bg-squid-darker rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-squid-gray">
                            <TableHead className="text-gray-400">Name</TableHead>
                            <TableHead className="text-gray-400">Contact</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                            <TableHead className="text-gray-400">Join Date</TableHead>
                            <TableHead className="text-gray-400">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((user) => (
                            <TableRow key={user.id} className="border-squid-gray">
                              <TableCell className="text-white">{user.name}</TableCell>
                              <TableCell className="text-gray-400">
                                <div>{user.email}</div>
                                <div className="text-sm">{user.phone}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} 
                                       className={user.status === 'Active' ? 'bg-squid-green text-squid-dark' : 'bg-squid-red'}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-400">{user.joinDate}</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline" 
                                        onClick={() => handleSuspendUser(user.id)}
                                        className="border-squid-red text-squid-red hover:bg-squid-red hover:text-white">
                                  Suspend
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="games">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Active Games</h3>
                      <Button size="sm" className="squid-button">
                        Create Challenge
                      </Button>
                    </div>
                    <div className="bg-squid-darker rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-squid-gray">
                            <TableHead className="text-gray-400">Game Name</TableHead>
                            <TableHead className="text-gray-400">Players</TableHead>
                            <TableHead className="text-gray-400">Prize Pool</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                            <TableHead className="text-gray-400">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeGames.map((game) => (
                            <TableRow key={game.id} className="border-squid-gray">
                              <TableCell className="text-white">{game.name}</TableCell>
                              <TableCell className="text-gray-400">{game.players} players</TableCell>
                              <TableCell className="text-squid-green">{game.prize.toLocaleString()} RWF</TableCell>
                              <TableCell>
                                <Badge variant={game.status === 'In Progress' ? 'default' : 'outline'} 
                                       className={game.status === 'In Progress' ? 'bg-squid-red' : 'border-squid-gray text-gray-400'}>
                                  {game.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline" 
                                        onClick={() => handleEndGame(game.id)}
                                        className="border-squid-red text-squid-red hover:bg-squid-red hover:text-white">
                                  End Game
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="payouts">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Pending Payouts</h3>
                      <Button size="sm" className="squid-button-green">
                        Process All
                      </Button>
                    </div>
                    <div className="bg-squid-darker rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-squid-gray">
                            <TableHead className="text-gray-400">Winner</TableHead>
                            <TableHead className="text-gray-400">Amount</TableHead>
                            <TableHead className="text-gray-400">Game</TableHead>
                            <TableHead className="text-gray-400">Date</TableHead>
                            <TableHead className="text-gray-400">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingPayouts.map((payout) => (
                            <TableRow key={payout.id} className="border-squid-gray">
                              <TableCell className="text-white">{payout.user}</TableCell>
                              <TableCell className="text-squid-green">{payout.amount.toLocaleString()} RWF</TableCell>
                              <TableCell className="text-gray-400">{payout.game}</TableCell>
                              <TableCell className="text-gray-400">{payout.date}</TableCell>
                              <TableCell>
                                <Button size="sm" 
                                        onClick={() => handleApprovePayment(payout.id)}
                                        className="squid-button-green">
                                  Approve
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
