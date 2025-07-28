// Constants
import Constants from 'expo-constants';

// Utils
import { getErrorMessageFromApi } from '@/utils';

// Helper function for fetch
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit,
): Promise<T> => {
  const baseUrl =
    Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle HTTP errors
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    const errorMessage: string = getErrorMessageFromApi(error);
    throw errorMessage;
  }
};

const createRequestConfig = <TRequestBody>(
  method: string,
  body?: TRequestBody,
  configs?: RequestInit,
): RequestInit => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  return {
    method,
    headers: {
      ...defaultHeaders,
      ...configs?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...configs,
  };
};

// HTTP GET
export const get = async <T>(
  endpoint: string,
  configs?: RequestInit,
): Promise<T> => {
  return fetchApi<T>(endpoint, createRequestConfig('GET', undefined, configs));
};

// HTTP POST
export const post = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: RequestInit,
): Promise<T> => {
  return fetchApi<T>(endpoint, createRequestConfig('POST', body, configs));
};

// HTTP PATCH
export const patch = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: RequestInit,
): Promise<T> => {
  return fetchApi<T>(endpoint, createRequestConfig('PATCH', body, configs));
};

// HTTP PUT
export const put = async <TRequestBody, T>(
  endpoint: string,
  body: TRequestBody,
  configs?: RequestInit,
): Promise<T> => {
  return fetchApi<T>(endpoint, createRequestConfig('PUT', body, configs));
};

// HTTP DELETE
export const del = async <T>(
  endpoint: string,
  configs?: RequestInit,
): Promise<T> => {
  return fetchApi<T>(
    endpoint,
    createRequestConfig('DELETE', undefined, configs),
  );
};
