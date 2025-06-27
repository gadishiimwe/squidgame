
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  wins: number;
  total_earnings: number;
  games_played: number;
  ranking: number;
  profiles: {
    full_name: string | null;
    phone_number: string;
  };
}

export const useLeaderboard = (period: string = 'all_time') => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('leaderboards')
          .select(`
            *,
            profiles:user_id (
              full_name,
              phone_number
            )
          `)
          .eq('period', period)
          .order('ranking', { ascending: true })
          .limit(10);

        if (error) throw error;
        setLeaderboard(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [period]);

  return { leaderboard, loading, error };
};
