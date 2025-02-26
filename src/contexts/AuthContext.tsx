
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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        setUser(userData);
        if (event === 'SIGNED_IN') {
          navigate('/home');
        }
      } else {
        setUser(null);
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
      setLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        setUser(userData);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signUp = async (email: string, password: string, document: string) => {
    try {
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
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const userData = await fetchUserData(data.user.id);
        setUser(userData);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
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
