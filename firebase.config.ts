import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

// Firebase configuration from google-services.json
const firebaseConfig = {
  apiKey: 'AIzaSyCFiyuHiRldNseW-53moHp6OGoPIl0MKVA',
  projectId: 'reactnativefunitureshopping',
  storageBucket: 'reactnativefunitureshopping.firebasestorage.app',
  messagingSenderId: '96695287326',
  appId: '1:96695287326:android:cc847f90cb38c7d35fb80f',
};

// Initialize Firebase
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };
export default app;
