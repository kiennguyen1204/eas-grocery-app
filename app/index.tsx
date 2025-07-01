import { useAuthStore } from '@/stores/auth';
import { Redirect } from 'expo-router';
import React from 'react';

const Screen = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auths)" />
  );
};

export default Screen;
