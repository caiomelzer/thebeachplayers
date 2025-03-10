
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/integrations/api/client';
import type { User, PlayerStatistics, UserModality } from '@/types/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, document: string, nickname: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      // Usar o endpoint /api/user/me para buscar os dados do usuário
      const { data } = await apiClient.get('/api/user/me');
      
      if (!data) return null;
      
      // Transform API response to match our User type
      const userData: User = {
        id: data.id,
        full_name: data.full_name,
        nickname: data.nickname,
        avatar_url: data.avatar_url,
        born: data.born,
        gender: data.gender,
        cpf: data.cpf,
        created_at: data.created_at,
        updated_at: data.updated_at,
        ranking: data.ranking,
        rating: data.rating,
        modalities: data.modalities || [],
        statistics: data.statistics || {
          user_id: data.id,
          ranking: 0,
          victories: 0,
          defeats: 0,
          total_championships: 0,
          recent_championships: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Verify the token and get user data
          const userData = await fetchUserData();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, document: string, nickname: string) => {
    try {
      const response = await apiClient.post('/api/auth/register', {
        email,
        password,
        cpf: document,
        nickname
      });
      return response;
    } catch (error: any) {
      console.error('Signup error:', error);
      
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar';
      return { data: null, error: { message: errorMessage } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password
      });

      const { token, user: userData } = response.data;

      // Store auth token
      localStorage.setItem('auth_token', token);

      // Update user state with all the properties
      setUser({
        id: userData.id,
        full_name: userData.full_name,
        nickname: userData.nickname,
        avatar_url: userData.avatar_url,
        born: userData.born,
        gender: userData.gender,
        cpf: userData.cpf,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        statistics: userData.statistics,
        ranking: userData.ranking,
        rating: userData.rating,
        modalities: userData.modalities || []
      });

      return { data: userData, error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 'Credenciais inválidas';
      return { data: null, error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    try {
      // Remove the token from local storage
      localStorage.removeItem('auth_token');
      // Clear the user state
      setUser(null);
      // Redirect to login page
      navigate('/login');
      return Promise.resolve();
    } catch (error) {
      console.error('Signout error:', error);
      return Promise.reject(error);
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
