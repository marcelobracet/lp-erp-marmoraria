'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { apiClient, User } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const isAuthenticated = !!user;

  // Verificar se estamos no cliente
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Verificar autenticação na inicialização (apenas no cliente)
  useEffect(() => {
    if (!hasMounted) return;

    const checkAuth = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const userData = apiClient.getUser();
          if (userData) {
            setUser(userData);
          } else {
            // Tentar buscar dados do usuário da API
            await refreshUser();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        apiClient.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [hasMounted]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    apiClient.logout();
  };

  const refreshUser = async () => {
    try {
      const userData = await apiClient.getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Refresh user error:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
