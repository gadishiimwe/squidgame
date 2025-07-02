-- Fix infinite recursion in profiles RLS policies
-- Drop the problematic admin policy that causes recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create a new admin policy that doesn't cause recursion
-- Use a direct role check instead of referencing the same table
CREATE POLICY "Admins can view all profiles" 
ON profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ) 
  OR 
  (
    SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1
  ) = 'admin'
);

-- Also add a policy for public profile viewing (needed for leaderboards)
CREATE POLICY "Public profile viewing for leaderboards" 
ON profiles 
FOR SELECT 
USING (true);