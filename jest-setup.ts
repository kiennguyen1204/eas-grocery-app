import '@testing-library/react-native/extend-expect';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(false),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
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

jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn(() => Promise.resolve(false)),
  setGenericPassword: jest.fn(() => Promise.resolve(true)),
  resetGenericPassword: jest.fn(() => Promise.resolve(true)),
}));
