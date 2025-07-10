import { PROCESS_ENV } from '@/constants';
import { del, get, patch, post, put } from '@/services';
import { getErrorMessageFromApi } from '@/utils';

jest.mock('@/utils', () => ({
  getErrorMessageFromApi: jest.fn(() => 'Parsed API error'),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const BASE_URL = PROCESS_ENV.EXPO_PUBLIC_API_URL;
const endpoint = '/test';
const fullUrl = `${BASE_URL}${endpoint}`;
const mockResponseData = { success: true };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('HTTP methods', () => {
  it('should call GET correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await get(endpoint);

    expect(fetch).toHaveBeenCalledWith(fullUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should call POST with body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const body = { name: 'test' };
    const result = await post(endpoint, body);

    expect(fetch).toHaveBeenCalledWith(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should call PUT with body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const body = { id: 1 };
    const result = await put(endpoint, body);

    expect(fetch).toHaveBeenCalledWith(
      fullUrl,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(body),
      }),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should call PATCH with body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const body = { status: 'done' };
    const result = await patch(endpoint, body);

    expect(fetch).toHaveBeenCalledWith(
      fullUrl,
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify(body),
      }),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should call DELETE correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await del(endpoint);

    expect(fetch).toHaveBeenCalledWith(
      fullUrl,
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should throw error for HTTP error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Something went wrong',
    });

    (getErrorMessageFromApi as jest.Mock).mockReturnValueOnce(
      'Something went wrong',
    );

    await expect(get(endpoint)).rejects.toEqual('Something went wrong');
  });

  it('should throw error from fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(get(endpoint)).rejects.toEqual('Parsed API error');
    expect(getErrorMessageFromApi).toHaveBeenCalledWith(expect.any(Error));
  });
});
