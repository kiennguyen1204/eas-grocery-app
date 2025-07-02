import * as SecureStore from 'expo-secure-store';
import { createWithEqualityFn } from 'zustand/traditional';

// Constants
import { KEYCHAIN_SERVICE } from '@/constants';

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
  setAuth: (user: Omit<TUser, 'password'>) => void;
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
  try {
    const savedData = await SecureStore.getItemAsync(KEYCHAIN_SERVICE);
    if (savedData) {
      const { accessToken, userId } = JSON.parse(savedData);
      if (accessToken && userId) {
        return {
          accessToken,
          userId,
          isAuthenticated: true, // Assume authenticated if token and userId exist
        };
      }
    }
    return INITIAL_AUTH_STATE;
  } catch (error) {
    console.error('Error initializing auth state:', error);
    return INITIAL_AUTH_STATE;
  }
};

// Create the store
export const useAuthStore = createWithEqualityFn<AuthStore>((set, get) => ({
  // Initialize with default state, will be updated by initializeAuth
  ...INITIAL_AUTH_STATE,

  setAuthenticated: isAuthenticated => {
    set({ isAuthenticated });
  },

  setAccessToken: async (accessToken: string, userId: string) => {
    try {
      const data = JSON.stringify({ accessToken, userId });
      await SecureStore.setItemAsync(KEYCHAIN_SERVICE, data);
      set({ accessToken, userId, isAuthenticated: true });
    } catch (error) {
      console.error('Error saving access token:', error);
    }
  },

  setAuth: user => {
    set({ user });
  },

  clearAuth: async () => {
    try {
      await SecureStore.deleteItemAsync(KEYCHAIN_SERVICE);
      set({ ...INITIAL_AUTH_STATE });
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  initializeAuth: async () => {
    const restoredState = await initializeState();
    set(restoredState);
  },
}));
