
import { supabase } from '@/integrations/supabase/client';

export const ensureAdminAccount = async () => {
  try {
    // Check if admin profile exists
    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'gadyishimwe1@gmail.com')
      .maybeSingle();

    console.log('Admin profile check:', adminProfile);

    // If profile exists but role is not admin, update it
    if (adminProfile && adminProfile.role !== 'admin') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          role: 'admin',
          full_name: 'Admin User',
          is_active: true
        })
        .eq('email', 'gadyishimwe1@gmail.com');

      if (updateError) {
        console.error('Error updating admin role:', updateError);
      } else {
        console.log('Admin role updated successfully');
      }
    }

    return true;
  } catch (error) {
    console.error('Error ensuring admin account:', error);
    return false;
  }
};
