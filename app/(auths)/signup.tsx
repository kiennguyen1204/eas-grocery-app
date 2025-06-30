import { baseColors } from '@/themes/colors';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Components
import { SignUpForm } from '@/components';

const SignupScreen = () => {
  const handleSubmit = async () => {
    // Handle form submission logic here
  };

  const handleLoginScreen = () => {
    // Navigate to login screen
  };

  const isPending = false;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SignUpForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          onLoginScreen={handleLoginScreen}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.greenDark,
  },
});
