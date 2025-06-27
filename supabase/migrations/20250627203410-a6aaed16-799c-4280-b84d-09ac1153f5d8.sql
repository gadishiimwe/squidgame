
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.game_status AS ENUM ('waiting', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.payment_provider AS ENUM ('mtn', 'airtel');
CREATE TYPE public.user_role AS ENUM ('user', 'admin');
CREATE TYPE public.challenge_type AS ENUM ('solo', 'team');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  phone_number TEXT UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  total_wins INTEGER DEFAULT 0,
  total_games INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  role public.user_role DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  max_members INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team members table
CREATE TABLE public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type public.challenge_type NOT NULL,
  entry_fee DECIMAL(10,2) NOT NULL,
  max_participants INTEGER NOT NULL,
  prize_pool DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  status public.game_status DEFAULT 'waiting',
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge participants table
CREATE TABLE public.challenge_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  payment_id UUID,
  position INTEGER,
  prize_amount DECIMAL(10,2) DEFAULT 0.00,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK ((user_id IS NOT NULL AND team_id IS NULL) OR (user_id IS NULL AND team_id IS NOT NULL))
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  provider public.payment_provider NOT NULL,
  phone_number TEXT NOT NULL,
  transaction_id TEXT,
  status public.payment_status DEFAULT 'pending',
  payment_type TEXT DEFAULT 'entry_fee',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL, -- 'deposit', 'withdrawal', 'prize', 'fee', 'refund'
  description TEXT,
  challenge_id UUID REFERENCES public.challenges(id),
  payment_id UUID REFERENCES public.payments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game sessions table
CREATE TABLE public.game_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES public.challenge_participants(id) ON DELETE CASCADE NOT NULL,
  stage INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  time_taken INTEGER, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE,
  game_data JSONB, -- store game-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboards table
CREATE TABLE public.leaderboards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  period TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'all_time'
  wins INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  games_played INTEGER DEFAULT 0,
  ranking INTEGER,
  period_start DATE NOT NULL,
  period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, period, period_start)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for teams
CREATE POLICY "Anyone can view active teams" ON public.teams FOR SELECT USING (is_active = true);
CREATE POLICY "Users can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Team creators can update their teams" ON public.teams FOR UPDATE USING (auth.uid() = creator_id);

-- Create RLS policies for team members
CREATE POLICY "Team members can view their team memberships" ON public.team_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can join teams" ON public.team_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave teams" ON public.team_members FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for challenges
CREATE POLICY "Anyone can view active challenges" ON public.challenges FOR SELECT USING (status != 'cancelled');
CREATE POLICY "Admins can manage challenges" ON public.challenges FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for challenge participants
CREATE POLICY "Users can view challenge participants" ON public.challenge_participants FOR SELECT USING (true);
CREATE POLICY "Users can join challenges" ON public.challenge_participants FOR INSERT WITH CHECK (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM public.team_members WHERE team_id = challenge_participants.team_id AND user_id = auth.uid())
);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON public.payments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for wallet transactions
CREATE POLICY "Users can view their own transactions" ON public.wallet_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON public.wallet_transactions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for game sessions
CREATE POLICY "Users can view their own game sessions" ON public.game_sessions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.challenge_participants WHERE id = game_sessions.participant_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create their own game sessions" ON public.game_sessions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.challenge_participants WHERE id = game_sessions.participant_id AND user_id = auth.uid())
);

-- Create RLS policies for leaderboards
CREATE POLICY "Anyone can view leaderboards" ON public.leaderboards FOR SELECT USING (true);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  referral_code_val TEXT;
BEGIN
  -- Generate unique referral code
  SELECT 'REF' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)) INTO referral_code_val;
  
  -- Insert new profile
  INSERT INTO public.profiles (id, phone_number, email, full_name, referral_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    referral_code_val
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update wallet balance
CREATE OR REPLACE FUNCTION public.update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET wallet_balance = wallet_balance + NEW.amount,
      updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for wallet balance updates
CREATE TRIGGER on_wallet_transaction_created
  AFTER INSERT ON public.wallet_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_wallet_balance();

-- Create indexes for better performance
CREATE INDEX idx_profiles_phone ON public.profiles(phone_number);
CREATE INDEX idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX idx_challenges_status ON public.challenges(status);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_wallet_transactions_user_id ON public.wallet_transactions(user_id);
CREATE INDEX idx_game_sessions_challenge_id ON public.game_sessions(challenge_id);
CREATE INDEX idx_leaderboards_period ON public.leaderboards(period, period_start);
