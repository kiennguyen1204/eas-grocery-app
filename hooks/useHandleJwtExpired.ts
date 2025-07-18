import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

export const useHandleJwtExpired = (error?: string) => {
  const clearAuth = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    if (error === 'jwt_expired') {
      clearAuth();
    }
  }, [error, clearAuth]);
};
