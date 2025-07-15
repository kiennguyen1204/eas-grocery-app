import { ROUTES } from '@/constants';
import { useAuthStore } from '@/stores/auth';
import { Redirect } from 'expo-router';
import React from 'react';

const Screen = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? (
    <Redirect href={ROUTES.HOME} />
  ) : (
    <Redirect href={ROUTES.ONBOARDING} />
  );
};

export default Screen;
