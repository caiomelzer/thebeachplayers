
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { apiClient } from "@/integrations/api/client";

// Define user type based on your database schema
type User = {
  id: string;
  email?: string;
  full_name?: string;
  nickname?: string;
  born?: string;
  gender?: string;
  cpf?: string;
  avatar_url?: string;
  rating?: number;
  modalities?: Array<{
    modality: string;
    status: string;
  }>;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ data?: User; error?: Error }>;
  signUp: (email: string, password: string, cpf: string, nickname: string) => Promise<{ data?: any; error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session) {
          // If session exists, get user data from your API
          const userResponse = await apiClient.get('/api/user/me');
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error("Error checking auth session:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user data from your API
          try {
            const userResponse = await apiClient.get('/api/user/me');
            setUser(userResponse.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      if (authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Sign in with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Get user data from your API
      const userResponse = await apiClient.get('/api/user/me');
      const userData = userResponse.data;
      
      setUser(userData);
      return { data: userData };
    } catch (error: any) {
      console.error("Error signing in:", error);
      setError(error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, cpf: string, nickname: string) => {
    try {
      setLoading(true);
      
      // Register with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Additional user data registration through API
      const userData = {
        email,
        cpf,
        nickname
      };
      
      const userResponse = await apiClient.post('/api/user/register', userData);
      
      return { data: userResponse.data };
    } catch (error: any) {
      console.error("Error signing up:", error);
      setError(error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      
      // Optionally notify the user
      toast.success("Logout realizado com sucesso");
    } catch (error: any) {
      console.error("Error signing out:", error);
      setError(error);
      toast.error("Erro ao realizar logout");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
