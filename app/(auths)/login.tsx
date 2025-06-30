import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Components
import { LoginForm } from '@/components';

// Themes
import { baseColors } from '@/themes';

const LoginScreen = () => {
  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const handleSignUpScreen = () => {
    // Navigate to sign up screen
  };

  const isPending = false; // Replace with actual loading state logic
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          onSignUpScreen={handleSignUpScreen}
        />
      </View>
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
});

export default LoginScreen;
