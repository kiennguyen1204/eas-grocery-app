import { router } from 'expo-router';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import { LoginForm } from '@/components';

// Constants
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// Interfaces
import { SignInPayload } from '@/interfaces';

// Services
import { useAuthSignIn } from '@/services';

// Themes
import { baseColors } from '@/themes';
import {
  PerformanceMeasureView,
  useStartProfiler,
} from '@shopify/react-native-performance';
import { useEffect } from 'react';

const LoginScreen = () => {
  const { mutate: login, isPending } = useAuthSignIn();
  const startNavigationTTITimer = useStartProfiler();
  useEffect(() => {
    startNavigationTTITimer({});
  }, [startNavigationTTITimer]);

  const handleSubmit = (values: SignInPayload) => {
    login(values, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        });
        router.replace(ROUTES.HOME);
      },
      onError: (error: string) => {
        const errorMessage = error || ERROR_MESSAGES.LOGIN_FAILED;
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      },
    });
  };

  return (
    <PerformanceMeasureView interactive screenName="HomeScreen">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <LoginForm onSubmit={handleSubmit} isLoading={isPending} />
        </View>
      </TouchableWithoutFeedback>
    </PerformanceMeasureView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.greenDark,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});

export default LoginScreen;
