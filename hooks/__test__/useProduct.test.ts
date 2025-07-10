import { get } from '@/services/http-request';
import { renderHook, waitFor } from 'test-utils';
import { useGetProductDetail, useGetProducts } from '../useProducts';

jest.mock('@/services/http-request', () => ({
  get: jest.fn(),
}));

const mockProduct = {
  id: 'p1',
  name: 'Sample Product',
  newPrice: 200,
  oldPrice: 250,
  image: 'sample.jpg',
};

describe('useGetProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches first page of products successfully', async () => {
    (get as jest.Mock).mockResolvedValue([mockProduct]);

    const { result } = renderHook(() =>
      useGetProducts({ categoryName: 'electronics', limit: 1 }),
    );

    await waitFor(() => {
      const productsHook = result.current as ReturnType<typeof useGetProducts>;
      expect(productsHook.data?.pages[0]).toEqual([mockProduct]);
    });

    expect(get).toHaveBeenCalledWith(
      expect.stringContaining(
        '/products?categoryName=electronics&_limit=1&_page=1',
      ),
    );
  });

  it('returns undefined for next page if last page has fewer than limit', async () => {
    const mockResponse = [mockProduct];

    (get as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetProducts({ limit: 2 }));
    const productsHook = result.current as ReturnType<typeof useGetProducts>;

    await waitFor(() => {
      expect(productsHook.hasNextPage).toBe(false);
    });
  });

  it('fetches next page correctly', async () => {
    (get as jest.Mock)
      .mockResolvedValueOnce([mockProduct])
      .mockResolvedValueOnce([mockProduct]);

    const { result } = renderHook(() => useGetProducts({ limit: 1 }));

    await waitFor(() => {
      const productsHook = result.current as ReturnType<typeof useGetProducts>;
      expect(productsHook.hasNextPage).toBe(true);
    });

    const productsHook = result.current as ReturnType<typeof useGetProducts>;
    await productsHook.fetchNextPage();

    expect(get).toHaveBeenCalledWith(expect.stringContaining('_page=2'));

    await waitFor(() => {
      const updatedHook = result.current as ReturnType<typeof useGetProducts>;
      expect(updatedHook.data?.pages.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('useGetProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches product detail successfully', async () => {
    (get as jest.Mock).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useGetProductDetail('p1'));

    await waitFor(() => {
      const detailHook = result.current as ReturnType<
        typeof useGetProductDetail
      >;
      expect(detailHook.data).toEqual(mockProduct);
    });

    expect(get).toHaveBeenCalledWith('/products/p1');
  });
});
