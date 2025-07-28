import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Grocery Shopping App',
  slug: 'grocery-shopping-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'com.kien.nguyenagility.grocery',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    url: 'https://u.expo.dev/075eb0da-6bb8-48db-91de-ff79c36ed507',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kien.nguyenagility.grocery',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#33907C',
    },
    edgeToEdgeEnabled: true,
    package: 'com.kien.nguyenagility.grocery',
    googleServicesFile: './google-services.json',
    runtimeVersion: '1.0.0',
    permissions: [
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#33907C',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    'expo-secure-store',
    'expo-media-library',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '075eb0da-6bb8-48db-91de-ff79c36ed507',
    },
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    imgbbApi: process.env.EXPO_PUBLIC_IMGBB_API,
    storybookEnabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    imageServiceKey: process.env.EXPO_PUBLIC_IMAGE_SERVICE_KEY || '',
  },
  owner: 'kien.nguyen',
});
