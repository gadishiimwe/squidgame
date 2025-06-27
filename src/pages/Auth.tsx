
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Circle, Square, Triangle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    fullName: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(loginForm.email, loginForm.password);
    
    if (!error) {
      // Redirect handled in signIn function
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (signupForm.phone && !signupForm.phone.match(/^(\+250|0)?[0-9]{9}$/)) {
      alert('Please enter a valid Rwandan phone number');
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(
      signupForm.email,
      signupForm.password,
      signupForm.phone,
      signupForm.fullName
    );
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-squid-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-white hover:text-squid-green mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="squid-card border-squid-gray">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Circle className="w-6 h-6 text-squid-red" />
              <Triangle className="w-6 h-6 text-squid-green" />
              <Square className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">The Challenge Arena</CardTitle>
            <CardDescription className="text-gray-400">
              Enter the arena. Win the prize.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-squid-gray">
                <TabsTrigger value="login" className="data-[state=active]:bg-squid-red data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-squid-green data-[state=active]:text-squid-dark">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full squid-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Enter Arena'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="text-white">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="0781234567 or +250781234567"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-white">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full squid-button-green"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Join The Arena'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
