'use client';


import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { authApi } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (
    user: User,
    tokens: { access_token: string }
  ) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await authApi.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = (user: User, tokens: { access_token: string }) => {
    try {
      if (!tokens?.access_token) {
        throw new Error('No access token provided');
      }

      console.log('Login called with:', { user, tokens });
      
      // Store tokens
      localStorage.setItem('accessToken', tokens.access_token);
      localStorage.setItem('token', tokens.access_token);
      
      console.log('Stored tokens:', {
        accessToken: localStorage.getItem('accessToken'),
        token: localStorage.getItem('token')
      });
      
      setUser(user);
    } catch (error) {
      console.error('Error in login:', error);
      throw error; // Re-throw to be handled by the caller
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
