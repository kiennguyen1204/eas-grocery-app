import * as Notifications from 'expo-notifications';
import { router, Tabs } from 'expo-router';
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

// Constants
import { NOTIFICATION_ACTION_KEYS } from '@/constants';

export default function TabLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    setupNotificationHandler();
    setupFirebaseNotificationListeners();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const { actionType, actionData } =
          response.notification.request.content.data;
        if (actionType === NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING) {
          const url = actionData.url;
          router.push(url);
        }
      },
    );

    return () => subscription.remove();
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
