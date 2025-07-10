import { act } from '@testing-library/react-native';
import { renderHook } from 'test-utils';

// Services
import { useAuthSignIn, useAuthSignUp } from '@/services/auth';
import { post } from '@/services/http-request';

// Constants
import { SERVER_ERROR_MESSAGES } from '@/constants';
import { AuthResponse } from '@/interfaces';
import { useAuthStore } from '@/stores';

// Hooks

// Interfaces

jest.mock('@/services/http-request', () => ({
  post: jest.fn(),
}));

jest.mock('@/stores/auth', () => ({
  useAuthStore: jest.fn(),
}));

const mockSetAuth = jest.fn();

jest.mock('@/stores/auth', () => ({
  useAuthStore: jest.fn(),
}));

const mockSetAuthenticated = jest.fn();
const mockSetAccessToken = jest.fn();

describe('useAuthLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockImplementation(cb =>
      cb({
        setAuthenticated: mockSetAuthenticated,
        setAccessToken: mockSetAccessToken,
        setAuth: mockSetAuth,
      }),
    );
  });

  it('calls setAuth on successful login', async () => {
    const mockResponse = {
      accessToken: 'token123',
      user: { id: 1, username: 'test' },
    };

    (post as jest.MockedFunction<typeof post>).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthSignIn());
    const login = result.current as ReturnType<typeof useAuthSignIn>;

    await act(async () => {
      await login.mutateAsync({ email: 'test', password: '123456' });
    });

    expect(post).toHaveBeenCalledWith('/login', {
      email: 'test',
      password: '123456',
    });

    expect(mockSetAuth).toHaveBeenCalledWith(mockResponse.user);
  });

  it('handles error object correctly', async () => {
    const error = new Error('Invalid credentials');
    (post as jest.MockedFunction<typeof post>).mockRejectedValue(error);

    const { result } = renderHook(() => useAuthSignIn());
    const login = result.current as ReturnType<typeof useAuthSignIn>;

    await act(async () => {
      await expect(
        login.mutateAsync({ email: 'test', password: 'wrongpass' }),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  it('handles string error correctly', async () => {
    (post as jest.MockedFunction<typeof post>).mockRejectedValue(
      'Internal Server Error: Something went wrong on our end.',
    );

    const { result } = renderHook(() => useAuthSignIn());
    const login = result.current as ReturnType<typeof useAuthSignIn>;

    await act(async () => {
      await expect(
        login.mutateAsync({ email: 'test', password: 'wrongpass' }),
      ).rejects.toBe(SERVER_ERROR_MESSAGES[500]);
    });
  });
});

describe('useAuthSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockImplementation(cb =>
      cb({
        setAuthenticated: mockSetAuthenticated,
        setAccessToken: mockSetAccessToken,
        setAuth: mockSetAuth,
      }),
    );
  });

  it('calls setAuth on successful sign up', async () => {
    const mockResponse: AuthResponse = {
      accessToken: 'fake-token-123',
      user: {
        id: '2',
        name: 'newuser',
        email: 'newuser@example.com',
        avatar: 'avatar-url',
      },
    };

    (post as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthSignUp());
    const signup = result.current as ReturnType<typeof useAuthSignUp>;

    await act(async () => {
      await signup.mutateAsync({
        name: 'newuser',
        email: 'test@example.com',
        password: 'abc123',
        avatar: 'avatar-url',
      });
    });

    expect(post).toHaveBeenCalledWith('/register', {
      name: 'newuser',
      email: 'test@example.com',
      password: 'abc123',
      avatar: 'avatar-url',
    });

    expect(mockSetAuth).toHaveBeenCalledWith(mockResponse.user);
  });

  it('handles object error correctly', async () => {
    const error = new Error('Email already exists');
    (post as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useAuthSignUp());
    const signup = result.current as ReturnType<typeof useAuthSignUp>;

    await act(async () => {
      await expect(
        (signup as ReturnType<typeof useAuthSignUp>).mutateAsync({
          name: 'newuser',
          email: 'test@example.com',
          password: 'abc123',
          avatar: 'avatar-url',
        }),
      ).rejects.toThrow('Email already exists');
    });
  });

  it('handles string error correctly', async () => {
    (post as jest.Mock).mockRejectedValue(
      new Error(SERVER_ERROR_MESSAGES[500]),
    );

    const { result } = renderHook(() => useAuthSignUp());
    const signup = result.current as ReturnType<typeof useAuthSignUp>;

    await act(async () => {
      await expect(
        signup.mutateAsync({
          name: 'newuser',
          email: 'test@example.com',
          password: 'abc123',
          avatar: 'avatar-url',
        }),
      ).rejects.toThrow(SERVER_ERROR_MESSAGES[500]);
    });
  });
});
