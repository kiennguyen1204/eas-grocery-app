import { Tabs } from 'expo-router';
import { useEffect } from 'react';

// Components
import {
  HomeIcon,
  OrderIcon,
  SearchIcon,
  StoreIcon,
  UserIcon,
} from '@/components/icons';

// Themes
import { baseColors } from '@/themes';

// Utils
import {
  registerForPushNotificationsAsync,
  setupFirebaseNotificationListeners,
  setupNotificationHandler,
} from '@/utils';

export default function TabLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    setupNotificationHandler();
    setupFirebaseNotificationListeners();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: baseColors.greenDark,
        headerShown: false,
        tabBarStyle: { height: 86, paddingTop: 13, paddingBottom: 33 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <StoreIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="order-history"
        options={{
          title: 'Order History',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
