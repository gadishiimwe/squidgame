-- Drop the problematic policies first
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Public profile viewing for leaderboards" ON profiles;

-- Create a security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create proper RLS policies using the security definer function
CREATE POLICY "Users can view their own profile" 
ON profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Allow public viewing for leaderboards (needed for the app)
CREATE POLICY "Public can view basic profile info" 
ON profiles 
FOR SELECT 
USING (true);