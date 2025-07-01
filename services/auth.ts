import { useMutation } from '@tanstack/react-query';

// Constants
import { ENDPOINTS } from '@/constants';

// Interfaces
import { AuthResponse, SignInPayload, SignUpPayload } from '@/interfaces';

// Services
import { post } from '@/services';

// Stores
import { useAuthStore } from '@/stores';

export const useAuthSignIn = () => {
  const [setAuthenticated, setAccessToken, setAuth] = useAuthStore(state => [
    state.setAuthenticated,
    state.setAccessToken,
    state.setAuth,
  ]);

  return useMutation<AuthResponse, string, SignInPayload>({
    mutationFn: async (payload: SignInPayload) => {
      return await post(ENDPOINTS.LOGIN, payload);
    },
    onSuccess: async (res: AuthResponse) => {
      const { accessToken, user } = res || {};
      setAuthenticated(true);
      await setAccessToken(accessToken, user?.id);
      setAuth(user);
    },
  });
};

export const useAuthSignUp = () => {
  const [setAuthenticated, setAccessToken, setUser] = useAuthStore(state => [
    state.setAuthenticated,
    state.setAccessToken,
    state.setAuth,
  ]);

  return useMutation<AuthResponse, string, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) =>
      post(ENDPOINTS.REGISTER, payload),

    onSuccess: async res => {
      const { user, accessToken } = res;

      setUser(user);
      await setAccessToken(accessToken, user?.id);
      setAuthenticated(true);
    },
  });
};
