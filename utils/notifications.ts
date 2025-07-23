import { isDevice } from 'expo-device';
import {
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getLastNotificationResponseAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { router } from 'expo-router';
import { Alert, Platform } from 'react-native';

// ===== PUSH NOTIFICATIONS (Remote) =====
// Functions for getting device tokens and setting up remote push notifications

export const registerForPushNotifications = async () => {
  console.log('📱 Getting Expo push token for device...');

  if (!isDevice) {
    console.log('❌ Must use physical device for push notifications');
    return null;
  }

  // Request permissions
  const { status: existingStatus } = await getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('❌ Failed to get push token for push notification!');
    return null;
  }

  try {
    // Get the Expo push token
    const token = await getExpoPushTokenAsync();
    console.log('✅ Expo Push Token:', token.data);
    console.log('� Copy this token to test notifications:');
    console.log('🔥 Token:', token.data);
    return token.data;
  } catch (error) {
    console.log('❌ Error getting push token:', error);
    return null;
  }
};

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!isDevice) {
    console.log('❌ Must use physical device for push notifications');
    return null;
  }

  const { status: existingStatus } = await getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('❌ Failed to get permission for push notifications!');
    return null;
  }

  try {
    // Get the Expo push token
    const token = await getExpoPushTokenAsync();
    console.log('✅ Push notifications configured');
    console.log('🔥 Your device token:', token.data);
    return token.data;
  } catch (error) {
    console.log('❌ Error getting push token:', error);
    return null;
  }
};

// ===== NOTIFICATION HANDLERS =====
// Functions for setting up how notifications are displayed and handled

export const setupNotificationHandler = () => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export const setupFirebaseNotificationListeners = () => {
  // In Expo managed workflow, we'll handle this through Expo notifications
  console.log(
    '📱 Firebase notification listeners not available in Expo managed workflow',
  );
};

// ===== LOCAL NOTIFICATIONS =====
// Functions for scheduling and managing local notifications

export const scheduleNotification = async (
  title: string,
  body: string,
  data?: any,
  trigger?: any,
) => {
  try {
    await scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        ...(Platform.OS === 'android' && {
          android: {
            smallIcon: 'ic_notification',
            color: '#FF231F7C',
          },
        }),
      },
      trigger,
    });
    console.log('✅ Local notification scheduled successfully');
  } catch (error) {
    console.error('❌ Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule notification. Please try again.');
  }
};

// ===== PERMISSION HELPERS =====
// Functions for checking and requesting notification permissions

export const checkAndRequestNotificationPermission =
  async (): Promise<boolean> => {
    const { status: existingStatus } = await getPermissionsAsync();

    if (existingStatus === 'granted') {
      return true;
    }

    if (existingStatus === 'denied') {
      Alert.alert(
        'Permission Required',
        'This app needs notification permissions to work properly. Please enable notifications in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: async () => {
              const { openSettings } = await import('expo-linking');
              openSettings();
            },
          },
        ],
      );
      return false;
    }

    const { status } = await requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Notification permissions are required to receive push notifications.',
        [{ text: 'OK', style: 'default' }],
      );
      return false;
    }

    return status === 'granted';
  };

// ===== NOTIFICATION NAVIGATION =====
// Functions for handling notification taps and deep linking

export const handleNotificationResponse = (response: any) => {
  const data = response.notification?.request?.content?.data;

  if (data) {
    // Handle new format: type + productId
    if (data.type === 'product' && data.productId) {
      setTimeout(() => {
        router.push(`/products/${data.productId}`);
      }, 100);

      // Handle old format: actionType + url
    } else if (data.actionType && data.url) {
      setTimeout(() => {
        router.push(data.url as never);
      }, 100);
    } else if (data.type === 'category' && data.categoryId) {
      setTimeout(() => router.push(`/categories/${data.categoryId}`), 100);
    } else if (data.type === 'cart') {
      setTimeout(() => router.push('/cart'), 100);
    } else if (data.type === 'profile') {
      setTimeout(() => router.push('/(tabs)/profile'), 100);
    } else {
      setTimeout(() => router.push('/(tabs)'), 100);
    }
  } else {
    setTimeout(() => router.push('/(tabs)'), 100);
  }
};

export const setupNotificationListeners = () => {
  console.log('📱 🔔 Setting up notification listeners...');

  // Listen for notification taps when app is running
  const subscription = addNotificationResponseReceivedListener(response => {
    console.log('📱 🔔 LISTENER: Notification response received');
    handleNotificationResponse(response);
  });

  // Check if app was opened by tapping a notification
  getLastNotificationResponseAsync().then(response => {
    if (response) {
      console.log('📱 🔔 STARTUP: App opened from notification:', response);
      handleNotificationResponse(response);
    } else {
      console.log('📱 🔔 STARTUP: No notification response found');
    }
  });

  console.log('📱 🔔 Notification listeners setup complete');
  return subscription;
};

// Helper function to create notification data for product
export const createProductNotificationData = (productId: string) => ({
  type: 'product',
  productId,
  timestamp: Date.now(),
});

// Helper function to create notification data for category
export const createCategoryNotificationData = (categoryId: string) => ({
  type: 'category',
  categoryId,
  timestamp: Date.now(),
});

// Helper function to create notification data for cart
export const createCartNotificationData = () => ({
  type: 'cart',
  timestamp: Date.now(),
});

// Helper function to schedule a product notification
export const scheduleProductNotification = async (
  title: string,
  body: string,
  productId: string,
  delaySeconds: number = 2,
) => {
  const data = createProductNotificationData(productId);

  await scheduleNotification(title, body, data, {
    seconds: delaySeconds,
  });
};
