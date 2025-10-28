
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Crown, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import RadarLoader from '@/components/RadarLoader';
import { useTeams } from '@/hooks/useTeams';

const Teams = () => {
  const { myTeam } = useTeams();
  const { user } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [joiningTeamId, setJoiningTeamId] = useState<string | null>(null);

  // Mock data for static frontend design
  const mockTeams = [
    {
      id: '1',
      name: 'Squid Warriors',
      member_count: 3,
      max_members: 5,
      members: [
        { id: '1', user_id: 'user1', profiles: { full_name: 'John Doe' } },
        { id: '2', user_id: 'user2', profiles: { full_name: 'Jane Smith' } },
        { id: '3', user_id: 'user3', profiles: { full_name: 'Bob Johnson' } }
      ],
      creator_id: 'user1'
    },
    {
      id: '2',
      name: 'Red Light Raiders',
      member_count: 2,
      max_members: 5,
      members: [
        { id: '4', user_id: 'user4', profiles: { full_name: 'Alice Brown' } },
        { id: '5', user_id: 'user5', profiles: { full_name: 'Charlie Wilson' } }
      ],
      creator_id: 'user4'
    },
    {
      id: '3',
      name: 'Game Masters',
      member_count: 5,
      max_members: 5,
      members: [
        { id: '6', user_id: 'user6', profiles: { full_name: 'Diana Prince' } },
        { id: '7', user_id: 'user7', profiles: { full_name: 'Eve Davis' } },
        { id: '8', user_id: 'user8', profiles: { full_name: 'Frank Miller' } },
        { id: '9', user_id: 'user9', profiles: { full_name: 'Grace Lee' } },
        { id: '10', user_id: 'user10', profiles: { full_name: 'Henry Ford' } }
      ],
      creator_id: 'user6'
    }
  ];

  const mockMyTeam = {
    id: '1',
    name: 'Squid Warriors',
    member_count: 3,
    max_members: 5,
    members: [
      { id: '1', user_id: 'user1', profiles: { full_name: 'John Doe' } },
      { id: '2', user_id: 'user2', profiles: { full_name: 'Jane Smith' } },
      { id: '3', user_id: 'user3', profiles: { full_name: 'Bob Johnson' } }
    ],
    creator_id: 'user1'
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;
    setIsCreating(true);
    // Mock create team action
    setTimeout(() => {
      setIsCreating(false);
      setTeamName('');
    }, 1000);
  };

  const handleJoinTeam = async (teamId: string, teamName: string) => {
    setJoiningTeamId(teamId);
    // Mock join team action
    setTimeout(() => {
      setJoiningTeamId(null);
    }, 1000);
  };

  const handleLeaveTeam = async () => {
    // Mock leave team action
  };

  const availableTeams = mockTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (team.member_count || 0) < team.max_members
  );

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
          {mockMyTeam ? (
            <Card className="squid-card border-squid-green/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-6 h-6 text-squid-green mr-2" />
                  My Team: {mockMyTeam.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your team and view team statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{mockMyTeam.member_count || 0}</div>
                    <div className="text-sm text-gray-400">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-squid-green">0</div>
                    <div className="text-sm text-gray-400">Team Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">0 RWF</div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">Team Members</h3>
                  <div className="space-y-2">
                    {mockMyTeam.members?.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-squid-darker rounded-lg">
                        <div className="flex items-center">
                          {member.user_id === mockMyTeam.creator_id && <Crown className="w-4 h-4 text-squid-green mr-2" />}
                          <span className="text-white">{member.profiles?.full_name || 'Unknown'}</span>
                        </div>
                        <Badge variant={member.user_id === mockMyTeam.creator_id ? 'default' : 'outline'}
                               className={member.user_id === mockMyTeam.creator_id ? 'bg-squid-green text-squid-dark' : 'border-squid-gray text-gray-400'}>
                          {member.user_id === mockMyTeam.creator_id ? 'Leader' : 'Member'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-squid-gray">
                  <h3 className="font-semibold text-white mb-3">Team Battle Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button className="squid-button-green">
                      Create Team Battle
                    </Button>
                    <Button variant="outline" className="border-squid-red text-squid-red hover:bg-squid-red hover:text-white">
                      Join Team Battle
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 squid-button-green">
                    Invite Members
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleLeaveTeam}
                    className="flex-1 border-squid-red text-squid-red hover:bg-squid-red hover:text-white"
                  >
                    Leave Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Create/Join Team Sections */
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
                    disabled={isCreating || !teamName.trim()}
                    className="w-full squid-button-green"
                  >
                    {isCreating ? 'Creating Team...' : 'Create Team'}
                  </Button>
                </CardContent>
              </Card>

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
                    {availableTeams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between p-3 bg-squid-darker rounded-lg">
                        <div>
                          <div className="text-white font-medium">{team.name}</div>
                          <div className="text-sm text-gray-400">
                            {team.member_count}/{team.max_members} members
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleJoinTeam(team.id, team.name)}
                          disabled={joiningTeamId === team.id}
                          className="squid-button text-xs"
                        >
                          {joiningTeamId === team.id ? 'Joining...' : 'Join'}
                        </Button>
                      </div>
                    ))}
                    {availableTeams.length === 0 && (
                      <div className="text-center text-gray-400 py-4">
                        No teams found matching your search
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* All Teams List */}
          <Card className="squid-card border-squid-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-6 h-6 text-white mr-2" />
                All Teams ({mockTeams.length})
              </CardTitle>
              <CardDescription className="text-gray-400">
                View all active teams in the arena
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {mockTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 bg-squid-darker rounded-lg border border-squid-gray">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-squid-red rounded-full flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{team.name}</div>
                        <div className="text-sm text-gray-400">
                          {team.member_count}/{team.max_members} members
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {team.members?.some(member => member.user_id === user?.id) && (
                        <Badge className="bg-squid-green text-squid-dark">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Joined
                        </Badge>
                      )}
                      <Badge variant="outline" className={
                        (team.member_count || 0) >= team.max_members 
                          ? 'border-squid-red text-squid-red' 
                          : 'border-squid-green text-squid-green'
                      }>
                        {(team.member_count || 0) >= team.max_members ? 'Full' : 'Open'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Teams;
