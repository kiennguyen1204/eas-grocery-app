import { NOTIFICATION_ACTION_KEYS } from '@/constants';
import messaging from '@react-native-firebase/messaging';
import { isDevice } from 'expo-device';
import { openSettings } from 'expo-linking';
import {
  AndroidImportance,
  getPermissionsAsync,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { router } from 'expo-router';
import { Alert, Platform } from 'react-native';

import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken } from '@react-native-firebase/messaging';

const app = getApp();
const messages = getMessaging(app);

export const registerForPushNotifications = async () => {
  try {
    const token = await getToken(messages);
    console.log('FCM Registration Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await requestPermissionsAsync();
    await setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!isDevice) return;

  const { status: existingStatus } = await getPermissionsAsync();
  if (existingStatus !== 'granted') {
    await requestPermissionsAsync();
  }

  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

export const setupNotificationHandler = () => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);
    const { notification, data } = remoteMessage;
    await scheduleNotificationAsync({
      content: {
        title: notification?.title || 'new notification',
        body: notification?.body || 'You have a new notification',
        data: {
          actionType:
            data?.actionType || NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING,
          actionData: data || {},
        },
        ...(Platform.OS === 'android' && {
          android: {
            smallIcon: 'ic_notification',
            color: '#FF231F7C',
          },
        }),
      },
      trigger: null,
    });
  });
};

export const setupFirebaseNotificationListeners = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      const { data } = remoteMessage;
      if (data?.actionType === NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING) {
        const url = data.url;
        if (url) {
          router.push(url as never);
        }
      }
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        const { data } = remoteMessage;
        if (data?.actionType === NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING) {
          const url = data.url;
          if (url) {
            router.push(url as never);
          }
        }
      }
    });
};

export async function scheduleNotification(
  title: string,
  body: string,
  actionType: string,
  actionData?: any,
  delaySeconds?: number,
) {
  try {
    await scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          actionType,
          actionData,
        },
        ...(Platform.OS === 'android' && {
          android: {
            smallIcon: 'ic_notification',
            color: '#FF231F7C',
          },
        }),
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: delaySeconds || 2,
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule notification. Please try again.');
  }
}

export const checkAndRequestNotificationPermission = async () => {
  const { status } = await getPermissionsAsync();

  if (status !== 'granted') {
    return new Promise(resolve => {
      Alert.alert(
        'You need to enable notifications',
        'Please go to Settings to enable notification permissions.',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
          {
            text: 'Open Settings',
            onPress: () => {
              openSettings();
              resolve(false);
            },
          },
        ],
      );
    });
  }

  return true;
};
