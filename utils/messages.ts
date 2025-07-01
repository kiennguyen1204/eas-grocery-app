// Constants
import { ERROR_MESSAGES } from '@/constants';

export const getErrorMessageFromApi = (error: unknown): string => {
  let message = '';

  if (error instanceof Error) {
    message = error.message;
  }

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const errResponse = (error as { response?: Response }).response;

    if (errResponse) {
      message = `HTTP ${errResponse.status}: ${errResponse.statusText}`;
    }
  }

  if (!message) {
    message = ERROR_MESSAGES.REQUEST;
  }

  return message;
};
