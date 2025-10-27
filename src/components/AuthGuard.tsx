
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import RadarLoader from './RadarLoader';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate('/auth');
      } else if (!requireAuth && user) {
        navigate('/');
      }
    }
  }, [user, loading, requireAuth, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-squid-dark flex flex-col items-center justify-center">
        <RadarLoader size="md" theme="squid-red" />
        <div className="mt-6 text-white text-lg font-semibold">
          Authenticating...
        </div>
        <div className="mt-2 text-gray-400 text-sm">
          Verifying your access
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
