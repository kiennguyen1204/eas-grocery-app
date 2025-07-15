import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

interface UseErrorToastOptions {
  error: Error | null | undefined;
  defaultMessage?: string;
  title?: string;
}

/**
 * Custom hook to display error toast notifications
 * @param options - Configuration object for error toast
 * @param options.error - Error object to display
 * @param options.defaultMessage - Default message if error.message is not available
 * @param options.title - Toast title (defaults to 'Error')
 */
export const useErrorToast = ({
  error,
  defaultMessage = 'Something went wrong',
  title = 'Error',
}: UseErrorToastOptions) => {
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: title,
        text2: error.message || defaultMessage,
      });
    }
  }, [error, defaultMessage, title]);
};
