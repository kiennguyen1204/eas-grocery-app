import { KEYCHAIN_SERVICE, KEYCHAIN_USER_SERVICE } from '@/constants';
import { TUser } from '@/interfaces';
import { act } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '../auth';

// Mock SecureStore
jest.mock('expo-secure-store', () => ({
  __esModule: true,
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock constants
jest.mock('@/constants', () => ({
  KEYCHAIN_SERVICE: 'auth_credentials',
  KEYCHAIN_USER_SERVICE: 'user_data',
}));

// Mock console.error for error handling tests
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useAuthStore', () => {
  const mockUser: Omit<TUser, 'password'> = {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockToken = 'test-access-token';
  const mockCredentials = JSON.stringify({
    accessToken: mockToken,
    userId: 'user123',
  });
  const mockUserData = JSON.stringify(mockUser);

  beforeEach(() => {
    // Reset store to initial state before each test
    act(() => {
      useAuthStore.setState({ ...useAuthStore.getInitialState() });
    });
    jest.clearAllMocks();
  });

  describe('setAccessToken', () => {
    it('should store token and update state', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValueOnce(undefined);

      await act(async () => {
        await useAuthStore.getState().setAccessToken(mockToken, 'user123');
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_SERVICE,
        mockCredentials,
      );

      const state = useAuthStore.getState();
      expect(state.accessToken).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userId).toBe('user123');
    });

    it('should not update state on SecureStore error', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      await act(async () => {
        await useAuthStore.getState().setAccessToken(mockToken, 'user123');
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_SERVICE,
        mockCredentials,
      );

      const state = useAuthStore.getState();
      expect(state.accessToken).toBe('');
      expect(state.isAuthenticated).toBe(false);
      expect(state.userId).toBe('');
      expect(console.error).toHaveBeenCalledWith(
        'Error saving access token:',
        expect.any(Error),
      );
    });
  });

  describe('setAuth', () => {
    it('should store user and update state', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValueOnce(undefined);

      await act(async () => {
        await useAuthStore.getState().setAuth(mockUser);
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_USER_SERVICE,
        mockUserData,
      );

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
    });

    it('should not update state on SecureStore error', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      await act(async () => {
        await useAuthStore.getState().setAuth(mockUser);
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_USER_SERVICE,
        mockUserData,
      );

      const state = useAuthStore.getState();
      expect(state.user).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        'Error saving user:',
        expect.any(Error),
      );
    });
  });

  describe('setAuthenticated', () => {
    it('should update isAuthenticated state', () => {
      act(() => {
        useAuthStore.getState().setAuthenticated(true);
      });

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });

  describe('clearAuth', () => {
    it('should clear auth data and reset state', async () => {
      // Set initial state
      act(() => {
        useAuthStore.setState({
          accessToken: mockToken,
          userId: 'user123',
          isAuthenticated: true,
          user: mockUser,
        });
      });

      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValueOnce(
        undefined,
      );
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await act(async () => {
        await useAuthStore.getState().clearAuth();
      });

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_SERVICE,
      );
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_USER_SERVICE,
      );

      const state = useAuthStore.getState();
      expect({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        user: state.user,
        userId: state.userId,
      }).toEqual({
        isAuthenticated: false,
        accessToken: '',
        user: {},
        userId: '',
      });
    });

    it('should handle SecureStore error and still reset state', async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await act(async () => {
        await useAuthStore.getState().clearAuth();
      });

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_SERVICE,
      );
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        'auth_credentials',
      );

      const state = useAuthStore.getState();
      expect({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        user: state.user,
        userId: state.userId,
      }).toEqual({
        isAuthenticated: false,
        accessToken: '',
        user: {},
        userId: '',
      });
      expect(console.error).toHaveBeenCalledWith(
        'Error clearing auth:',
        expect.any(Error),
      );
    });
  });

  describe('initializeAuth', () => {
    it('should restore state from SecureStore when data exists', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
        mockCredentials,
      );
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
        mockUserData,
      );

      await act(async () => {
        await useAuthStore.getState().initializeAuth();
      });

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(KEYCHAIN_SERVICE);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_USER_SERVICE,
      );

      const state = useAuthStore.getState();
      expect(state.accessToken).toBe(mockToken);
      expect(state.userId).toBe('user123');
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('should set initial state when no data exists in SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);

      await act(async () => {
        await useAuthStore.getState().initializeAuth();
      });

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(KEYCHAIN_SERVICE);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(
        KEYCHAIN_USER_SERVICE,
      );

      const state = useAuthStore.getState();
      expect({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        user: state.user,
        userId: state.userId,
      }).toEqual({
        isAuthenticated: false,
        accessToken: '',
        user: {},
        userId: '',
      });
    });

    it('should handle SecureStore error and set initial state', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      await act(async () => {
        await useAuthStore.getState().initializeAuth();
      });

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(KEYCHAIN_SERVICE);
      expect(console.error).toHaveBeenCalledWith(
        'Error initializing auth state:',
        expect.any(Error),
      );

      const state = useAuthStore.getState();
      expect({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        user: state.user,
        userId: state.userId,
      }).toEqual({
        isAuthenticated: false,
        accessToken: '',
        user: {},
        userId: '',
      });
    });
  });
});
