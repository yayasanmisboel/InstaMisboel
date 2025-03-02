import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for the MVP
const sampleUsers = [
  {
    id: 'user-1',
    username: 'instamisboel_official',
    email: 'admin@instamisboel.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=150&h=150&auto=format&fit=crop'
  },
  {
    id: 'user-2',
    username: 'pet_lover',
    email: 'pet@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&h=150&auto=format&fit=crop'
  },
  {
    id: 'user-3',
    username: 'catfan',
    email: 'cat@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem('instamisboel_user');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };
    
    // Initialize users in localStorage if they don't exist
    const users = localStorage.getItem('instamisboel_users');
    if (!users) {
      localStorage.setItem('instamisboel_users', JSON.stringify(sampleUsers));
    }
    
    initAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      const usersJson = localStorage.getItem('instamisboel_users');
      if (!usersJson) return false;
      
      const users = JSON.parse(usersJson);
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Remove password before storing in state or localStorage
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('instamisboel_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      const usersJson = localStorage.getItem('instamisboel_users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Check if username already exists
      if (users.some((u: any) => u.username === username)) {
        return false;
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        profilePicture: `https://ui-avatars.com/api/?name=${username}&background=random`
      };
      
      // Add to users array and save to localStorage
      const updatedUsers = [...users, newUser];
      localStorage.setItem('instamisboel_users', JSON.stringify(updatedUsers));
      
      // Login the user after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('instamisboel_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('instamisboel_user');
  };
  
  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      isLoading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
