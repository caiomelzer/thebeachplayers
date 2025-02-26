
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import type { User} from '@/types/database';

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

  const fetchUserData = async (userId: string): Promise<User | null> => {
    try {
      // Buscar dados do usuário e estatísticas em paralelo
      const [userResponse, statsResponse] = await Promise.all([
        supabase
          .from('users')
          .select('id, cpf, full_name, nickname, avatar_url, born, gender, created_at, updated_at')
          .eq('id', userId)
          .single(),
        supabase
          .from('user_statistics')
          .select('ranking, victories, defeats, total_championships, recent_championships')
          .eq('user_id', userId)
          .single()
      ]);

      if (userResponse.error && userResponse.error.code !== 'PGRST116') {
        throw userResponse.error;
      }

      if (!userResponse.data) {
        return null;
      }

      // Combinar dados do usuário com estatísticas
      return {
        ...userResponse.data,
        statistics: statsResponse.data || {
          ranking: 0,
          victories: 0,
          defeats: 0,
          total_championships: 0,
          recent_championships: 0
        }
      } as User;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        setUser(userData);
      }
      setLoading(false);
    });

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
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

      // If signup is successful and we have a session, navigate to home
      if (data?.user) {
        navigate('/home');
      }

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
        // Explicitly navigate after successful signin
        navigate('/home');
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
    navigate('/login');
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
