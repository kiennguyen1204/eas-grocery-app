import { ERROR_MESSAGES } from '@/constants';
import { getErrorMessageFromApi } from '../messages';

jest.mock('@/constants', () => ({
  ERROR_MESSAGES: {
    REQUEST: 'An unexpected error occurred',
  },
}));

describe('getErrorMessageFromApi', () => {
  it('should return error message for Error instance', () => {
    const error = new Error('Network error');
    expect(getErrorMessageFromApi(error)).toBe('Network error');
  });

  it('should return HTTP status message for object with response property', () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
      } as Response,
    };
    expect(getErrorMessageFromApi(error)).toBe('HTTP 404: Not Found');
  });

  it('should return default message for null response', () => {
    const error = { response: null };
    expect(getErrorMessageFromApi(error)).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default message for object without response property', () => {
    const error = { someOtherProperty: 'value' };
    expect(getErrorMessageFromApi(error)).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default message for null input', () => {
    expect(getErrorMessageFromApi(null)).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default message for undefined input', () => {
    expect(getErrorMessageFromApi(undefined)).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default message for non-object, non-Error input', () => {
    expect(getErrorMessageFromApi('some string')).toBe(ERROR_MESSAGES.REQUEST);
    expect(getErrorMessageFromApi(123)).toBe(ERROR_MESSAGES.REQUEST);
    expect(getErrorMessageFromApi(true)).toBe(ERROR_MESSAGES.REQUEST);
  });
});
