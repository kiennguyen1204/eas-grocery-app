import '@testing-library/react-native/extend-expect';

// Mock Firebase for web SDK (new approach)
jest.mock('./firebase.config', () => ({
  __esModule: true,
  app: {
    name: '[DEFAULT]',
    options: {
      projectId: 'mocked-project-id',
      apiKey: 'mocked-api-key',
    },
  },
  default: {
    name: '[DEFAULT]',
    options: {
      projectId: 'mocked-project-id',
      apiKey: 'mocked-api-key',
    },
  },
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

// Mock React Native Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
