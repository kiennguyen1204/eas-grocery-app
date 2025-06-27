import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
);

export default AuthLayout;
