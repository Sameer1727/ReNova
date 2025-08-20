import React, { createContext, useContext, ReactNode } from 'react';
import { User, MoodEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('mindMotionUser', null);
  const [allMoodEntries, setAllMoodEntries] = useLocalStorage<Record<string, MoodEntry[]>>('mindMotionAllMoods', {});
  const [users, setUsers] = useLocalStorage<User[]>('mindMotionUsers', []);

  // Get mood entries for current user
  const moodEntries = user ? (allMoodEntries[user.id] || []) : [];

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>) => {
    if (!user) return;
    
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    
    setAllMoodEntries(prev => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), newEntry]
    }));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      onboardingCompleted: false
    };

    setUsers(prev => [...prev, newUser]);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return true;
  };

  const updateUser = (updatedUser: User) => {
    // Update in users array
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? { ...updatedUser, password: u.password } : u));
    // Update current user
    setUser(updatedUser);
  };
  const logout = () => {
    setUser(null);
    // Only clear current user session, not all data
    localStorage.removeItem('mindMotionUser');
  };

  return (
    <UserContext.Provider value={{ user, setUser, moodEntries, addMoodEntry, login, signup, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}