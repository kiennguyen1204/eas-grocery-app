import '@testing-library/react-native/extend-expect';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn().mockReturnValue({
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(),
    requestPermission: jest.fn().mockResolvedValue(true),
    hasPermission: jest.fn().mockResolvedValue(true),
    getToken: jest.fn().mockResolvedValue('mocked-firebase-token'),
    deleteToken: jest.fn().mockResolvedValue(null),
  }),
}));

jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn().mockReturnValue({
    name: 'mocked-app-name',
    options: {},
    delete: jest.fn().mockResolvedValue(undefined),
    utils: jest.fn().mockReturnValue({}),
  }),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.interpolate = jest.fn(value => value);
  Reanimated.Extrapolation = {
    CLAMP: 'clamp',
    EXTEND: 'extend',
    IDENTITY: 'identity',
  };
  return Reanimated;
});

jest.mock('expo-linking', () => ({
  openSettings: jest.fn(),
}));

jest.mock('expo-device', () => ({
  __esModule: true, // This makes it work with import *
  isDevice: jest.fn().mockImplementation(() => true), // Default implementation
  // Add other exports if your component uses them
  getDeviceTypeAsync: jest.fn(),
  getManufacturerAsync: jest.fn(),
}));

jest.mock('expo-notifications', () => ({
  __esModule: true,
  AndroidImportance: {
    MAX: 4,
    HIGH: 3,
    DEFAULT: 2,
    LOW: 1,
    MIN: 0,
    NONE: -1000,
    UNSPECIFIED: -1000,
  },
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  // Add any other exports you use
}));
