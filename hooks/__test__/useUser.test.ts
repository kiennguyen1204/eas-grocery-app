import { get, patch } from '@/services/http-request';
import { useAuthStore } from '@/stores'; // hoặc '@/stores/auth' nếu đúng path
import { act, renderHook, waitFor } from 'test-utils';
import { useGetUser, usePatchUser } from '../useUser';

jest.mock('@/services/http-request', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

jest.mock('@/stores', () => ({
  useAuthStore: jest.fn(),
}));

const mockToken = 'mock-token';
const mockUserId = '123';
const mockUser = {
  id: mockUserId,
  name: 'John Doe',
  email: 'john@example.com',
};

const mockSetAuthStore = () => {
  (useAuthStore as unknown as jest.Mock).mockImplementation(cb =>
    cb({
      accessToken: mockToken,
      userId: mockUserId,
    }),
  );
  // Also return the same object for direct calls (not as a callback)
  (useAuthStore as unknown as jest.Mock).mockImplementation((selector: any) =>
    selector({
      accessToken: mockToken,
      userId: mockUserId,
    }),
  );
};

describe('useGetUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAuthStore();
  });

  it('fetches user data successfully', async () => {
    (get as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useGetUser());

    await waitFor(() => {
      expect((result.current as ReturnType<typeof useGetUser>).user).toEqual(
        mockUser,
      );
    });

    expect(get).toHaveBeenCalledWith(`/users/${mockUserId}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('does not fetch if token or userId is missing', () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation(cb =>
      cb({ accessToken: null, userId: null }),
    );

    const { result } = renderHook(() => useGetUser());
    const userHook = result.current as ReturnType<typeof useGetUser>;

    expect(userHook.user).toBeUndefined();
    expect(get).not.toHaveBeenCalled();
  });
});

describe('usePatchUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAuthStore();
  });

  it('updates user and invalidates query', async () => {
    const updatedUser = { ...mockUser, name: 'Jane Doe' };
    (patch as jest.Mock).mockResolvedValue(updatedUser);

    const { result } = renderHook(() => usePatchUser());
    const patchHook = result.current as ReturnType<typeof usePatchUser>;

    await act(async () => {
      await patchHook.mutateAsync({ name: 'Jane Doe', email: mockUser.email });
    });

    expect(patch).toHaveBeenCalledWith(
      `/users/${mockUserId}`,
      { name: 'Jane Doe', email: mockUser.email },
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  });

  it('handles patch error correctly', async () => {
    (patch as jest.Mock).mockRejectedValue(new Error('Failed to update user'));

    const { result } = renderHook(() => usePatchUser());
    const patchHook = result.current as ReturnType<typeof usePatchUser>;

    await act(async () => {
      await expect(
        patchHook.mutateAsync({ name: 'Jane Doe', email: 'jane@example.com' }),
      ).rejects.toThrow('Failed to update user');
    });
  });
});
