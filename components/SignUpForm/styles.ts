import {
  baseColors,
  borderRadius,
  fontSizes,
  fontWeights,
  fontsFamily,
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

  buttonCreate: {
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
