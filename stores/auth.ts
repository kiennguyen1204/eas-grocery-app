import * as SecureStore from 'expo-secure-store';
import { createWithEqualityFn } from 'zustand/traditional';

// Constants
import { KEYCHAIN_SERVICE, KEYCHAIN_USER_SERVICE } from '@/constants';

// Interfaces
import { TUser } from '@/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user: Omit<TUser, 'password'>;
  userId: string;
}

interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAuth: (user: Omit<TUser, 'password'>) => Promise<void>;
  setAccessToken: (accessToken: string, userId: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  user: {} as Omit<TUser, 'password'>,
  userId: '',
};

// Initialize store with data from SecureStore
const initializeState = async (): Promise<Partial<AuthState>> => {
  const savedAuthData = await SecureStore.getItemAsync(KEYCHAIN_SERVICE);
  const savedUserData = await SecureStore.getItemAsync(KEYCHAIN_USER_SERVICE);

  const authData = savedAuthData ? JSON.parse(savedAuthData) : {};
  const userData = savedUserData ? JSON.parse(savedUserData) : {};

  return {
    accessToken: authData.accessToken || '',
    userId: authData.userId || '',
    user: userData || ({} as Omit<TUser, 'password'>),
    isAuthenticated: !!(authData.accessToken && authData.userId),
  };
};

// Create the store
export const useAuthStore = createWithEqualityFn<AuthStore>(set => ({
  // Initialize with default state, will be updated by initializeAuth
  ...INITIAL_AUTH_STATE,

  setAuthenticated: isAuthenticated => {
    set({ isAuthenticated });
  },

  setAccessToken: async (accessToken: string, userId: string) => {
    const data = JSON.stringify({ accessToken, userId });
    await SecureStore.setItemAsync(KEYCHAIN_SERVICE, data);
    set({ accessToken, userId, isAuthenticated: true });
  },

  setAuth: async user => {
    await SecureStore.setItemAsync(KEYCHAIN_USER_SERVICE, JSON.stringify(user));
    set({ user });
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(KEYCHAIN_SERVICE);
    await SecureStore.deleteItemAsync(KEYCHAIN_USER_SERVICE);
    set({ ...INITIAL_AUTH_STATE });
  },

  initializeAuth: async () => {
    const restoredState = await initializeState();
    set(restoredState);
  },
}));
