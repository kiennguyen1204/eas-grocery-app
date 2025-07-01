import * as SecureStore from 'expo-secure-store';
import { createWithEqualityFn } from 'zustand/traditional';

import { KEYCHAIN_SERVICE } from '@/constants';

// Types
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
  clearAuth: () => void;
}

const INITIAL_AUTH_STATE = {
  isAuthenticated: false,
  accessToken: '',
  user: {} as Omit<TUser, 'password'>,
  userId: '',
};

export const useAuthStore = createWithEqualityFn<AuthStore>(set => ({
  ...INITIAL_AUTH_STATE,

  setAuthenticated: isAuthenticated => {
    set({ isAuthenticated });
  },

  setAccessToken: async (accessToken: string, userId: string) => {
    const data = JSON.stringify({ accessToken, userId });
    await SecureStore.setItemAsync(KEYCHAIN_SERVICE, data);

    set({ accessToken, isAuthenticated: true, userId });
  },

  setAuth: user => {
    set({
      user,
    });
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(KEYCHAIN_SERVICE);
    set({ ...INITIAL_AUTH_STATE });
  },
}));
