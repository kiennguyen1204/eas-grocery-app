import { ENDPOINTS } from '@/constants';
import { TUser, UserPayload } from '@/interfaces';
import { get, patch } from '@/services';
import { useAuthStore } from '@/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetUser = () => {
  const [token, userId] = useAuthStore(state => [
    state.accessToken,
    state.userId,
  ]);

  const { data, error, ...rest } = useQuery<TUser>({
    queryKey: [ENDPOINTS.USERS, userId],
    enabled: !!token && !!userId,
    queryFn: async () => {
      const response = await get<TUser>(`${ENDPOINTS.USERS}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

  return {
    user: data,
    error,
    ...rest,
  };
};

export const usePatchUser = () => {
  const [token, userId] = useAuthStore(state => [
    state.accessToken,
    state.userId,
  ]);

  const queryClient = useQueryClient();

  return useMutation<TUser, string, UserPayload>({
    mutationFn: async (payload: UserPayload) => {
      const response = await patch<UserPayload, TUser>(
        `${ENDPOINTS.USERS}/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.USERS, userId] });
    },
  });
};
