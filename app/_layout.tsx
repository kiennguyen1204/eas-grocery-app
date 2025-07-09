import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadAsync } from 'expo-font';
import { Slot } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { DevSettings } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// Constants
import { STALE_TIME } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';
import { registerForPushNotifications } from '@/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

preventAutoHideAsync();

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';
const StorybookUIRoot = require('../.storybook').default;

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showStorybook, setShowStorybook] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (__DEV__) {
      // Toggle Storybook
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync({
          Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [isAuthenticated]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      registerForPushNotifications();
      onLayoutRootView();
    }
  }, [appIsReady, onLayoutRootView]);

  // Render Storybook or the main app
  if (showStorybook && storybookEnabled && __DEV__) {
    return <StorybookUIRoot />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <StatusBar style="auto" />
      <Toast />
    </QueryClientProvider>
  );
}
