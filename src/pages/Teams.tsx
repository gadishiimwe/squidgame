
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Crown, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { useTeams } from '@/hooks/useTeams';

const Teams = () => {
  const { user } = useAuth();
  const { teams, myTeam, loading, createTeam, joinTeam, leaveTeam } = useTeams();
  const [teamName, setTeamName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [joiningTeamId, setJoiningTeamId] = useState<string | null>(null);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;
    
    setIsCreating(true);
    await createTeam(teamName.trim());
    setIsCreating(false);
    setTeamName('');
  };

  const handleJoinTeam = async (teamId: string, teamName: string) => {
    setJoiningTeamId(teamId);
    await joinTeam(teamId);
    setJoiningTeamId(null);
  };

  const handleLeaveTeam = async () => {
    if (!myTeam) return;
    await leaveTeam(myTeam.id);
  };

  const availableTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !team.members?.some(member => member.user_id === user?.id) &&
    (team.member_count || 0) < team.max_members
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

  if (loading) {
    return (
      <div className="min-h-screen bg-squid-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading teams...</div>
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
          {myTeam ? (
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
                    <div className="text-2xl font-bold text-white">{myTeam.member_count || 0}</div>
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
                    {myTeam.members?.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-squid-darker rounded-lg">
                        <div className="flex items-center">
                          {member.user_id === myTeam.creator_id && <Crown className="w-4 h-4 text-squid-green mr-2" />}
                          <span className="text-white">{member.profiles?.full_name || member.profiles?.email || 'Unknown'}</span>
                        </div>
                        <Badge variant={member.user_id === myTeam.creator_id ? 'default' : 'outline'} 
                               className={member.user_id === myTeam.creator_id ? 'bg-squid-green text-squid-dark' : 'border-squid-gray text-gray-400'}>
                          {member.user_id === myTeam.creator_id ? 'Leader' : 'Member'}
                        </Badge>
                      </div>
                    ))}
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
                All Teams ({teams.length})
              </CardTitle>
              <CardDescription className="text-gray-400">
                View all active teams in the arena
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {teams.map((team) => (
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
