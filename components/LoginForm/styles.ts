import {
  baseColors,
  borderRadius,
  fontsFamily,
  fontSizes,
  fontWeights,
} from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },

  title: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 56,
    marginBottom: 45,
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },

  buttonLogin: {
    borderRadius: borderRadius.xl,
    width: '90%',
    paddingVertical: 5,
  },

  buttonText: {
    width: '100%',
    paddingVertical: 14,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },

  forgotPassword: {
    color: baseColors.whitePure,
    textAlign: 'center',
    fontSize: fontSizes.md,
    marginTop: 15,
    marginBottom: 40,
  },

  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signUpAccount: {
    color: baseColors.whitePure,
  },
  signUpLink: {
    color: baseColors.whitePure,
    fontWeight: fontWeights.bold,
    fontFamily: fontsFamily.bold,
    fontSize: fontSizes.md,
  },
});
