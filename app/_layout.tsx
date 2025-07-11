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

const PerformanceProfiler = __DEV__
  ? require('@shopify/react-native-performance').PerformanceProfiler
  : null;

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showStorybook, setShowStorybook] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const initializeAuth = useAuthStore(state => state.initializeAuth);

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
        await initializeAuth();
        setAuthReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [initializeAuth]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && authReady) {
      await hideAsync();
    }
  }, [appIsReady, authReady]);

  const onReportPrepared = useCallback((report: any) => {
    if (__DEV__) {
      console.log(report);
    }
  }, []);

  useEffect(() => {
    if (appIsReady && authReady) {
      registerForPushNotifications();
      onLayoutRootView();
    }
  }, [appIsReady, authReady, onLayoutRootView]);

  if (!appIsReady || !authReady) {
    return null;
  }

  // Render Storybook or the main app
  if (showStorybook && storybookEnabled && __DEV__) {
    return <StorybookUIRoot />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {__DEV__ ? (
        <PerformanceProfiler onReportPrepared={onReportPrepared}>
          <Slot />
        </PerformanceProfiler>
      ) : (
        <Slot />
      )}
      <StatusBar style="auto" />
      <Toast />
    </QueryClientProvider>
  );
}
