import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen
      name="login"
      options={{ headerShown: false, title: 'Login' }}
    />
    <Stack.Screen
      name="signup"
      options={{ headerShown: false, title: 'Sign Up' }}
    />
  </Stack>
);

export default AuthLayout;
