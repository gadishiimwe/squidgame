
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Search, Crown, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Teams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teamName, setTeamName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Mock data for demonstration
  const availableTeams = [
    { id: 1, name: 'Fire Dragons', members: 3, maxMembers: 5, wins: 12, isOpen: true },
    { id: 2, name: 'Thunder Wolves', members: 4, maxMembers: 5, wins: 8, isOpen: true },
    { id: 3, name: 'Ice Phoenix', members: 2, maxMembers: 4, wins: 15, isOpen: true },
    { id: 4, name: 'Shadow Hawks', members: 5, maxMembers: 5, wins: 20, isOpen: false },
  ];

  const myTeam = {
    id: 1,
    name: 'Fire Dragons',
    members: [
      { id: 1, name: 'You', role: 'Leader', isLeader: true },
      { id: 2, name: 'Player123', role: 'Member', isLeader: false },
      { id: 3, name: 'ProGamer', role: 'Member', isLeader: false },
    ],
    wins: 12,
    totalEarnings: 60000
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast({
        title: "Team Name Required",
        description: "Please enter a team name.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate team creation
    setTimeout(() => {
      toast({
        title: "Team Created!",
        description: `Team "${teamName}" has been created successfully. You can now invite members.`,
      });
      setIsCreating(false);
      setTeamName('');
    }, 1500);
  };

  const handleJoinTeam = async (teamId: number, teamName: string) => {
    setIsJoining(true);
    
    // Simulate joining team
    setTimeout(() => {
      toast({
        title: "Team Joined!",
        description: `You have successfully joined "${teamName}". Welcome to the team!`,
      });
      setIsJoining(false);
    }, 1500);
  };

  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) && team.isOpen
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-squid-dark flex items-center justify-center">
        <Card className="squid-card border-squid-gray max-w-md">
          <CardHeader>
            <CardTitle className="text-white text-center">Login Required</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              You need to be logged in to manage teams
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/auth">
              <Button className="squid-button">
                Login to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold">Team Management</h1>
        </div>

        <div className="grid gap-8">
          {/* My Team Section */}
          <Card className="squid-card border-squid-green/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Crown className="w-6 h-6 text-squid-green mr-2" />
                My Team: {myTeam.name}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your team and view team statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{myTeam.members.length}</div>
                  <div className="text-sm text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-squid-green">{myTeam.wins}</div>
                  <div className="text-sm text-gray-400">Team Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{myTeam.totalEarnings.toLocaleString()} RWF</div>
                  <div className="text-sm text-gray-400">Total Earnings</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Team Members</h3>
                <div className="space-y-2">
                  {myTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-squid-darker rounded-lg">
                      <div className="flex items-center">
                        {member.isLeader && <Crown className="w-4 h-4 text-squid-green mr-2" />}
                        <span className="text-white">{member.name}</span>
                      </div>
                      <Badge variant={member.isLeader ? 'default' : 'outline'} className={member.isLeader ? 'bg-squid-green text-squid-dark' : 'border-squid-gray text-gray-400'}>
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 squid-button-green">
                  Invite Members
                </Button>
                <Button variant="outline" className="flex-1 border-squid-red text-squid-red hover:bg-squid-red hover:text-white">
                  Leave Team
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Team Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="squid-card border-squid-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-6 h-6 text-squid-green mr-2" />
                  Create New Team
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Start your own team and invite friends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name" className="text-white">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  onClick={handleCreateTeam}
                  disabled={isCreating}
                  className="w-full squid-button-green"
                >
                  {isCreating ? 'Creating Team...' : 'Create Team'}
                </Button>
              </CardContent>
            </Card>

            {/* Join Team Section */}
            <Card className="squid-card border-squid-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Search className="w-6 h-6 text-squid-red mr-2" />
                  Join Existing Team
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Find and join teams looking for members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search-teams" className="text-white">Search Teams</Label>
                  <Input
                    id="search-teams"
                    placeholder="Search team names"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredTeams.map((team) => (
                    <div key={team.id} className="flex items-center justify-between p-3 bg-squid-darker rounded-lg">
                      <div>
                        <div className="text-white font-medium">{team.name}</div>
                        <div className="text-sm text-gray-400">
                          {team.members}/{team.maxMembers} members • {team.wins} wins
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleJoinTeam(team.id, team.name)}
                        disabled={isJoining}
                        className="squid-button text-xs"
                      >
                        {isJoining ? 'Joining...' : 'Join'}
                      </Button>
                    </div>
                  ))}
                  {filteredTeams.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      No teams found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
