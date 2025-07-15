import { ENDPOINTS } from '@/constants';
import { del, get, patch, post } from '@/services/http-request';
import { useQueryClient } from '@tanstack/react-query';
import { act, renderHook, waitFor } from 'test-utils';
import {
  CartItem,
  useAddToCart,
  useGetCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from '../useCart';

// Mocks
jest.mock('@/services/http-request', () => ({
  get: jest.fn(),
  post: jest.fn(),
  del: jest.fn(),
  patch: jest.fn(),
}));

const mockCartItem = {
  id: 'c1',
  title: 'Item 1',
  image: 'image.jpg',
  price: 120,
  quantity: 2,
  discountPrice: 90,
};

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: jest.fn(),
  };
});

jest.mock('@/constants', () => ({
  ENDPOINTS: {
    CART: '/cart',
  },
}));

describe('useGetCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches cart items successfully', async () => {
    (get as jest.Mock).mockResolvedValue([mockCartItem]);

    const { result } = renderHook(() => useGetCart());

    await waitFor(() => {
      const cartHook = result.current as ReturnType<typeof useGetCart>;
      expect(cartHook.data).toEqual([mockCartItem]);
    });

    expect(get).toHaveBeenCalledWith(ENDPOINTS.CART);
  });
});

describe('useAddToCart', () => {
  const mockInvalidateQueries = jest.fn();
  const mockQueryClient = {
    invalidateQueries: mockInvalidateQueries,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should add item to cart and invalidate queries on success', async () => {
    const mockCartItem: CartItem = {
      id: '1',
      title: 'Test Product',
      image: 'test.jpg',
      price: 100,
      quantity: 2,
      newPrice: 90,
      oldPrice: 110,
    };

    (post as jest.Mock).mockResolvedValue(mockCartItem);

    const { result } = renderHook(() => useAddToCart());

    let mutationResult;
    await act(async () => {
      mutationResult = await (
        result.current as ReturnType<typeof useAddToCart>
      ).mutateAsync({
        title: 'Test Product',
        image: 'test.jpg',
        price: 100,
        quantity: 2,
        newPrice: 90,
        oldPrice: 110,
      });
    });

    expect(post).toHaveBeenCalledWith(ENDPOINTS.CART, {
      title: 'Test Product',
      image: 'test.jpg',
      price: 100,
      quantity: 2,
      newPrice: 90,
      oldPrice: 110,
    });
    expect(mutationResult).toEqual(mockCartItem);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [ENDPOINTS.CART],
    });
  });

  it('should handle error when adding to cart fails', async () => {
    const error = new Error('Failed to add to cart');
    (post as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useAddToCart());

    await act(async () => {
      await expect(
        (result.current as ReturnType<typeof useAddToCart>).mutateAsync({
          title: 'Test Product',
          image: 'test.jpg',
          price: 100,
          quantity: 2,
        }),
      ).rejects.toThrow('Failed to add to cart');
    });

    expect(post).toHaveBeenCalledWith(ENDPOINTS.CART, {
      title: 'Test Product',
      image: 'test.jpg',
      price: 100,
      quantity: 2,
    });
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});

describe('useRemoveFromCart', () => {
  const mockInvalidateQueries = jest.fn();
  const mockQueryClient = {
    invalidateQueries: mockInvalidateQueries,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should remove item from cart and invalidate queries on success', async () => {
    (del as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useRemoveFromCart());

    await act(async () => {
      await (
        result.current as ReturnType<typeof useRemoveFromCart>
      ).mutateAsync('1');
    });

    expect(del).toHaveBeenCalledWith(`${ENDPOINTS.CART}/1`);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [ENDPOINTS.CART],
    });
  });

  it('should handle error when removing from cart fails', async () => {
    const error = new Error('Failed to remove from cart');
    (del as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useRemoveFromCart());

    await act(async () => {
      await expect(
        (result.current as ReturnType<typeof useRemoveFromCart>).mutateAsync(
          '1',
        ),
      ).rejects.toThrow('Failed to remove from cart');
    });

    expect(del).toHaveBeenCalledWith(`${ENDPOINTS.CART}/1`);
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});

describe('useUpdateCartQuantity', () => {
  const mockInvalidateQueries = jest.fn();
  const mockQueryClient = {
    invalidateQueries: mockInvalidateQueries,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it('should update cart item quantity and invalidate queries on success', async () => {
    const mockCartItem: CartItem = {
      id: '1',
      title: 'Test Product',
      image: 'test.jpg',
      price: 100,
      quantity: 3,
      newPrice: 90,
      oldPrice: 110,
    };

    (patch as jest.Mock).mockResolvedValue(mockCartItem);

    const { result } = renderHook(() => useUpdateCartQuantity());

    let mutationResult;
    await act(async () => {
      mutationResult = await (
        result.current as ReturnType<typeof useUpdateCartQuantity>
      ).mutateAsync({
        cartItemId: '1',
        quantity: 3,
      });
    });

    expect(patch).toHaveBeenCalledWith(`${ENDPOINTS.CART}/1`, { quantity: 3 });
    expect(mutationResult).toEqual(mockCartItem);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [ENDPOINTS.CART],
    });
  });

  it('should handle error when updating cart quantity fails', async () => {
    const error = new Error('Failed to update cart quantity');
    (patch as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateCartQuantity());

    await act(async () => {
      await expect(
        (
          result.current as ReturnType<typeof useUpdateCartQuantity>
        ).mutateAsync({
          cartItemId: '1',
          quantity: 3,
        }),
      ).rejects.toThrow('Failed to update cart quantity');
    });

    expect(patch).toHaveBeenCalledWith(`${ENDPOINTS.CART}/1`, { quantity: 3 });
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});
