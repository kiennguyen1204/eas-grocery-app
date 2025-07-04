import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { ENDPOINTS } from '@/constants';

// Interfaces
import { TProduct } from '@/interfaces';

// Services
import { get } from '@/services';

type GetProductParams = {
  categoryName?: string;
  query?: string;
  searchProducts?: string;
  order?: string;
  limit?: number;
};

export const useGetProducts = (params: GetProductParams = {}) => {
  const { categoryName, searchProducts, order, limit, query } = params;

  return useInfiniteQuery<TProduct[], Error>({
    queryKey: [
      ENDPOINTS.PRODUCTS,
      { categoryName, searchProducts, order, limit, query },
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        ...(categoryName ? { categoryName } : {}),
        ...(query || searchProducts ? { q: query || searchProducts } : {}),
        ...(order ? { _sort: 'newPrice', _order: order } : {}),
        ...(limit ? { _limit: limit.toString() } : {}),
        _page: (pageParam as number).toString(),
      }).toString();

      const url = `${ENDPOINTS.PRODUCTS}?${queryParams}`;

      const response = await get<TProduct[]>(url);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const pageLimit = limit ?? 10;
      if (lastPage.length < pageLimit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};

export const useGetProductDetail = (id: string) => {
  return useQuery<TProduct, Error>({
    queryKey: [ENDPOINTS.PRODUCTS + 'details', id],
    queryFn: () => get<TProduct>(`${ENDPOINTS.PRODUCTS}/${id}`),
  });
};
