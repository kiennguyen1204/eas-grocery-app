import messaging from '@react-native-firebase/messaging';
import * as ExpoLinking from 'expo-linking';
import * as ExpoNotifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

import {
  checkAndRequestNotificationPermission,
  registerForPushNotifications,
  registerForPushNotificationsAsync,
  scheduleNotification,
  setupNotificationHandler,
} from '../notifications';

// Mock all external dependencies
jest.mock('@react-native-firebase/messaging', () => {
  const mockOnMessage = jest.fn();
  const mockOnNotificationOpenedApp = jest.fn();
  const mockGetInitialNotification = jest.fn().mockResolvedValue(null);
  const mockGetToken = jest.fn().mockResolvedValue('mock-token');
  return {
    __esModule: true,
    default: jest.fn(() => ({
      getToken: mockGetToken,
      onMessage: mockOnMessage,
      onNotificationOpenedApp: mockOnNotificationOpenedApp,
      getInitialNotification: mockGetInitialNotification,
    })),
    getMessaging: jest.fn(() => ({
      getToken: mockGetToken,
    })),
    getToken: mockGetToken,
  };
});

jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(() => ({})),
}));

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  scheduleNotificationAsync: jest.fn().mockResolvedValue('notification-id'),
  AndroidImportance: {
    MAX: 5,
  },
  SchedulableTriggerInputTypes: {
    TIME_INTERVAL: 'timeInterval',
  },
}));

jest.mock('expo-device', () => ({
  isDevice: true,
}));

jest.mock('expo-linking', () => ({
  openSettings: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn(obj => obj.ios || obj.default),
  },
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  },
  Animated: {
    createAnimatedComponent: jest.fn(component => component),
    Value: jest.fn(() => ({ setValue: jest.fn() })),
    timing: jest.fn(() => ({ start: jest.fn() })),
    View: 'Animated.View',
  },
}));

describe('Notifications Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerForPushNotifications', () => {
    it('should return FCM token when successful', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await registerForPushNotifications();

      expect(consoleSpy).toHaveBeenCalledWith(
        'FCM Registration Token:',
        'mock-token',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('registerForPushNotificationsAsync', () => {
    beforeEach(() => {
      const mockMessaging = messaging as jest.MockedFunction<any>;
      mockMessaging.mockReturnValue({
        getToken: jest.fn().mockResolvedValue('mock-token'),
      });
    });

    it('should setup notification channel on Android', async () => {
      Platform.OS = 'android';

      await registerForPushNotificationsAsync();

      expect(ExpoNotifications.requestPermissionsAsync).toHaveBeenCalled();
      expect(
        ExpoNotifications.setNotificationChannelAsync,
      ).toHaveBeenCalledWith(
        'myNotificationChannel',
        expect.objectContaining({
          name: expect.any(String),
          importance: ExpoNotifications.AndroidImportance.MAX,
        }),
      );
    });

    it('should request permissions if not granted', async () => {
      (ExpoNotifications.getPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      await registerForPushNotificationsAsync();

      expect(ExpoNotifications.requestPermissionsAsync).toHaveBeenCalled();
    });

    it('should handle FCM token retrieval', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await registerForPushNotificationsAsync();

      expect(consoleSpy).toHaveBeenCalledWith('FCM Token:', 'mock-token');
      consoleSpy.mockRestore();
    });
  });

  describe('setupNotificationHandler', () => {
    it('should setup Firebase message listener', () => {
      const mockOnMessage = jest.fn();
      const mockMessaging = messaging as jest.MockedFunction<any>;
      mockMessaging.mockReturnValue({
        onMessage: mockOnMessage,
      });

      setupNotificationHandler();

      expect(mockOnMessage).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('scheduleNotification', () => {
    it('should use default delay when not provided', async () => {
      await scheduleNotification('Title', 'Body', 'ACTION');

      expect(ExpoNotifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          trigger: {
            type: ExpoNotifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2,
          },
        }),
      );
    });

    it('should handle scheduling errors', async () => {
      const mockError = new Error('Scheduling failed');
      (
        ExpoNotifications.scheduleNotificationAsync as jest.Mock
      ).mockRejectedValue(mockError);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await scheduleNotification('Title', 'Body', 'ACTION');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error scheduling notification:',
        mockError,
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Failed to schedule notification. Please try again.',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('checkAndRequestNotificationPermission', () => {
    it('should return true when permissions are granted', async () => {
      (ExpoNotifications.getPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(true);
    });

    it('should show alert when permissions are denied', async () => {
      (ExpoNotifications.getPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const mockAlert = Alert.alert as jest.Mock;
      mockAlert.mockImplementation((title, message, buttons) => {
        // Simulate user pressing Cancel
        buttons?.[0]?.onPress?.();
      });

      await checkAndRequestNotificationPermission();

      expect(mockAlert).toHaveBeenCalledWith(
        'You need to enable notifications',
        'Please go to Settings to enable notification permissions.',
        expect.arrayContaining([
          expect.objectContaining({ text: 'Cancel' }),
          expect.objectContaining({ text: 'Open Settings' }),
        ]),
      );
    });

    it('should open settings when user chooses to', async () => {
      (ExpoNotifications.getPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const mockAlert = Alert.alert as jest.Mock;
      mockAlert.mockImplementation((title, message, buttons) => {
        // Simulate user pressing Open Settings
        buttons?.[1]?.onPress?.();
      });

      await checkAndRequestNotificationPermission();

      expect(ExpoLinking.openSettings).toHaveBeenCalled();
    });
  });
});
