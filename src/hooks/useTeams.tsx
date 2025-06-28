import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Team {
  id: string;
  name: string;
  creator_id: string;
  max_members: number;
  is_active: boolean;
  created_at: string;
  members?: TeamMember[];
  member_count?: number;
}

interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  joined_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export const useTeams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      // Fetch all teams with member count
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          id,
          name,
          creator_id,
          max_members,
          is_active,
          created_at,
          team_members (
            id,
            user_id,
            team_id,
            joined_at,
            profiles (
              full_name,
              email
            )
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (teamsError) throw teamsError;

      const processedTeams = teamsData?.map(team => ({
        ...team,
        members: team.team_members?.map(member => ({
          id: member.id,
          user_id: member.user_id,
          team_id: member.team_id,
          joined_at: member.joined_at,
          profiles: member.profiles
        })) || [],
        member_count: team.team_members?.length || 0
      })) || [];

      setTeams(processedTeams);

      // Find user's team
      if (user) {
        const userTeam = processedTeams.find(team => 
          team.members?.some(member => member.user_id === user.id)
        );
        setMyTeam(userTeam || null);
      }

    } catch (error) {
      console.error('Error fetching teams:', error);
      toast({
        title: "Error",
        description: "Failed to load teams data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamName: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      // Create the team
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: teamName,
          creator_id: user.id,
          max_members: 5,
          is_active: true
        })
        .select()
        .single();

      if (teamError) throw teamError;

      // Add creator as team member
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: teamData.id,
          user_id: user.id
        });

      if (memberError) throw memberError;

      toast({
        title: "Team Created!",
        description: `Team "${teamName}" has been created successfully.`,
      });

      // Refresh teams data
      await fetchTeams();

      return { data: teamData, error: null };
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const joinTeam = async (teamId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      // Check if team has space
      const team = teams.find(t => t.id === teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      if ((team.member_count || 0) >= team.max_members) {
        throw new Error('Team is full');
      }

      // Add user to team
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: user.id
        });

      if (memberError) throw memberError;

      toast({
        title: "Team Joined!",
        description: `You have successfully joined "${team.name}".`,
      });

      // Refresh teams data
      await fetchTeams();

      return { error: null };
    } catch (error) {
      console.error('Error joining team:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join team.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const leaveTeam = async (teamId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Left Team",
        description: "You have successfully left the team.",
      });

      // Refresh teams data
      await fetchTeams();

      return { error: null };
    } catch (error) {
      console.error('Error leaving team:', error);
      toast({
        title: "Error",
        description: "Failed to leave team. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [user]);

  return {
    teams,
    myTeam,
    loading,
    createTeam,
    joinTeam,
    leaveTeam,
    refreshTeams: fetchTeams
  };
};
