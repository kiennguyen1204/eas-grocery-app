import { ENDPOINTS } from '@/constants';
import { del, get, patch, post } from '@/services/http-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface CartItem {
  id?: string;
  title?: string;
  image?: string;
  price?: number;
  quantity?: number;
  newPrice?: number;
  oldPrice?: number;
}

export const useGetCart = () => {
  return useQuery<CartItem[], Error>({
    queryKey: [ENDPOINTS.CART],
    queryFn: async () => {
      const response = await get<CartItem[]>(ENDPOINTS.CART);
      return response;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation<CartItem, Error, Omit<CartItem, 'id'>>({
    mutationFn: async cartItem => {
      const response = await post<Omit<CartItem, 'id'>, CartItem>(
        ENDPOINTS.CART,
        cartItem,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.CART] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async cartItemId => {
      await del<void>(`${ENDPOINTS.CART}/${cartItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.CART] });
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation<CartItem, Error, { cartItemId: string; quantity: number }>(
    {
      mutationFn: async ({ cartItemId, quantity }) => {
        const response = await patch<{ quantity: number }, CartItem>(
          `${ENDPOINTS.CART}/${cartItemId}`,
          { quantity },
        );
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ENDPOINTS.CART] });
      },
    },
  );
};
