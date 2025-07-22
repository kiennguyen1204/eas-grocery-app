import { router } from 'expo-router';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import LoginForm from '@/components/LoginForm';

// Constants
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// Interfaces
import { SignInPayload } from '@/interfaces';

// Services
import { useAuthSignIn } from '@/services/auth';

// Themes
import { baseColors } from '@/themes';

const LoginScreen = () => {
  const { mutate: login, isPending } = useAuthSignIn();

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
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      accessibilityLabel="Dismiss keyboard">
      <KeyboardAvoidingView
        style={styles.container}
        accessible={true}
        accessibilityLabel="Login screen">
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          accessible={true}
          accessibilityLabel="Login form container">
          <LoginForm onSubmit={handleSubmit} isLoading={isPending} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.greenDark,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default LoginScreen;
