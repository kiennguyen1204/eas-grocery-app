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
  const setAuth = useAuthStore(state => state.setAuth);

  return useMutation<AuthResponse, string, SignInPayload>({
    mutationFn: async (payload: SignInPayload) => {
      return await post(ENDPOINTS.LOGIN, payload);
    },
    onSuccess: async (res: AuthResponse) => {
      const { accessToken, user } = res;
      await setAuth(user, accessToken, user.id);
    },
  });
};

export const useAuthSignUp = () => {
  const setAuth = useAuthStore(state => state.setAuth);

  return useMutation<AuthResponse, string, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) =>
      post(ENDPOINTS.REGISTER, payload),

    onSuccess: async (res: AuthResponse) => {
      const { accessToken, user } = res;
      await setAuth(user, accessToken, user.id);
    },
  });
};
