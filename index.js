/**
 * @format
 */

import { getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const app = getApp();
const messaging = getMessaging(app);

messaging.setBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => App);
