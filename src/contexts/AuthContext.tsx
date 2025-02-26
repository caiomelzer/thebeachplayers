import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import type { User, PlayerStatistics } from '@/types/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, document: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlayerStatistics = async (userId: string): Promise<PlayerStatistics | null> => {
    try {
      const { data, error } = await supabase
        .rpc('get_player_statistics', { player_id: userId });

      if (error) {
        console.error('Error fetching player statistics:', error);
        return null;
      }

      if (data && typeof data === 'object') {
        const stats = data as Record<string, number>;
        return {
          ranking: stats.ranking || 0,
          victories: stats.victories || 0,
          defeats: stats.defeats || 0,
          totalChampionships: stats.totalChampionships || 0,
          recentChampionships: stats.recentChampionships || 0
        };
      }

      return null;
    } catch (error) {
      console.error('Error in fetchPlayerStatistics:', error);
      return null;
    }
  };

  const fetchUserData = async (userId: string): Promise<User | null> => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('id, cpf, full_name, nickname, avatar_url, born, gender, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 means no data found
          throw error;
        }
        return null;
      }

      // Fetch player statistics
      const statistics = await fetchPlayerStatistics(userId);
      
      // Combine user data with statistics
      return {
        ...userData,
        statistics: statistics || undefined
      } as User;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Set initial loading state
    setLoading(true);

    // Check initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userData = await fetchUserData(session.user.id);
          setUser(userData);
          // Only navigate to home if we're on the login page
          if (window.location.pathname === '/login') {
            navigate('/home', { replace: true });
          }
        } else {
          setUser(null);
          // Only navigate to login if we're not on a public route
          const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
          if (!publicRoutes.includes(window.location.pathname)) {
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = await fetchUserData(session.user.id);
          setUser(userData);
          navigate('/home', { replace: true });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, document: string) => {
    try {
      setLoading(true);
      // First, check if CPF already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('cpf', document)
        .single();

      if (existingUser) {
        throw new Error('CPF já cadastrado');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            document,
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const userData = await fetchUserData(data.user.id);
        setUser(userData);
        navigate('/home', { replace: true });
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
