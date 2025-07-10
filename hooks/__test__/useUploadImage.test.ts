import { act, renderHook, waitFor } from 'test-utils';
import { useUploadToImgBB } from '../useImage';

// Mocks
global.fetch = jest.fn();

jest.mock('react-native', () => ({
  Platform: { OS: 'android' },
}));

jest.mock('@/constants', () => ({
  PROCESS_ENV: {
    EXPO_PUBLIC_IMAGE_SERVICE_KEY: 'fake-key',
    EXPO_PUBLIC_IMGBB_API: 'https://fakeapi.com/upload',
  },
}));

describe('useUploadToImgBB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads multiple images and returns their URLs', async () => {
    const mockImageUrls = ['https://image1.com', 'https://image2.com'];
    const mockFetch = fetch as jest.Mock;

    mockFetch.mockImplementation(() =>
      Promise.resolve({
        json: async () => ({
          success: true,
          data: { url: mockImageUrls.shift() },
        }),
      }),
    );

    const { result } = renderHook(() => useUploadToImgBB());
    const uploadHook = result.current as ReturnType<typeof useUploadToImgBB>;

    await act(async () => {
      await uploadHook.mutateAsync(['file:///img1.jpg', 'file:///img2.jpg']);
    });

    await waitFor(() => {
      const current = result.current as ReturnType<typeof useUploadToImgBB>;
      expect(current.data).toEqual([
        'https://image1.com',
        'https://image2.com',
      ]);
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('throws error if upload fails', async () => {
    const mockFetch = fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      json: async () => ({
        success: false,
        error: { message: 'Invalid API key' },
      }),
    });

    const { result } = renderHook(() => useUploadToImgBB());
    const uploadHook = result.current as ReturnType<typeof useUploadToImgBB>;

    await act(async () => {
      await expect(
        uploadHook.mutateAsync(['file:///invalid.jpg']),
      ).rejects.toThrow('Invalid API key');
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
