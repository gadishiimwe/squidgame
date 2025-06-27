
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Wallet, Trophy, Target, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserProfile = () => {
  const { user, profile, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <Card className="squid-card border-squid-gray">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarFallback className="bg-squid-red text-white text-xl font-bold">
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-white">{profile.full_name || 'Player'}</CardTitle>
          <CardDescription className="text-gray-400">{user.email}</CardDescription>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="border-squid-green text-squid-green">
              {profile.role === 'admin' ? 'Admin' : 'Player'}
            </Badge>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="border-squid-red text-squid-red hover:bg-squid-red hover:text-white"
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </Button>
      </CardHeader>
      
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-squid-green/20 rounded-lg">
            <Wallet className="w-6 h-6 text-squid-green" />
          </div>
          <div className="text-2xl font-bold text-white">{profile.wallet_balance || 0} RWF</div>
          <div className="text-sm text-gray-400">Wallet Balance</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-squid-red/20 rounded-lg">
            <Trophy className="w-6 h-6 text-squid-red" />
          </div>
          <div className="text-2xl font-bold text-white">{profile.total_wins || 0}</div>
          <div className="text-sm text-gray-400">Total Wins</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">{profile.total_games || 0}</div>
          <div className="text-sm text-gray-400">Games Played</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-squid-green/20 rounded-lg">
            <Users className="w-6 h-6 text-squid-green" />
          </div>
          <div className="text-2xl font-bold text-white">
            {profile.total_games > 0 ? Math.round((profile.total_wins / profile.total_games) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-400">Win Rate</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
