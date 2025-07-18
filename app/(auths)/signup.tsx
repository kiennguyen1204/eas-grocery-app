import { baseColors } from '@/themes/colors';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

// Components
import { SignUpForm } from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  KEYBOARD_BEHAVIOR,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';

// Interfaces
import { ISignUpFormData, SignUpPayload } from '@/interfaces';
import { useAuthSignUp } from '@/services/auth';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const SignupScreen = () => {
  const { mutateAsync: signUp, isPending } = useAuthSignUp();

  const handleSubmit = (values: ISignUpFormData) => {
    const payload: SignUpPayload = {
      email: values.email,
      password: values.password,
      name: `${values.firstName} ${values.lastName}`,
      avatar: values.avatar,
    };

    signUp(payload, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: SUCCESS_MESSAGES.REGISTER_SUCCESS,
        });
        router.replace(ROUTES.HOME);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || ERROR_MESSAGES.SIGNUP_FAILED;
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={KEYBOARD_BEHAVIOR}>
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          keyboardShouldPersistTaps="handled">
          <SignUpForm onSubmit={handleSubmit} isLoading={isPending} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.greenDark,
  },
  flexGrow: {
    flexGrow: 1,
  },
});
