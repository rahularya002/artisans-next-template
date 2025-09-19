'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, RegisterData } from '../types';
import { mockUser } from '../utils/mockData';
import { storage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = storage.get<User>('artisan_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - accept any email/password combination
    const authenticatedUser = { ...mockUser, email };
    setUser(authenticatedUser);
    storage.set('artisan_user', authenticatedUser);
    
    setIsLoading(false);
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isArtisan: userData.isArtisan || false
    };
    
    setUser(newUser);
    storage.set('artisan_user', newUser);
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.remove('artisan_user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      storage.set('artisan_user', updatedUser);
    }
    
    setIsLoading(false);
    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};