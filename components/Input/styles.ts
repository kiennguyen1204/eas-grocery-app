import { baseColors, borderRadius, fontsFamily, fontSizes } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    opacity: 0.5,
    marginBottom: 5,
  },
  inputBase: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 18,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
  errorMessage: {
    color: baseColors.redPrimary,
    marginTop: 10,
    marginLeft: 16,
    textAlign: 'left',
  },
  disabled: {
    opacity: 0.7,
  },
});

export const inputVariants = StyleSheet.create({
  filled: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.regular,
    paddingLeft: 40,
    backgroundColor: baseColors.whitePure,
    borderRadius: borderRadius.xl,
    color: baseColors.grayMedium,
  },
  outlined: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.regular,
    backgroundColor: baseColors.transparent,
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    paddingHorizontal: 16,
    color: baseColors.whiteSoft,
    borderRadius: borderRadius.xl,
  },
  flushed: {
    fontSize: fontSizes.sm,
    fontFamily: fontsFamily.semiBold,
    borderBottomWidth: 1,
    borderBottomColor: baseColors.grayLight,
    color: baseColors.grayMedium,
  },
});

export const placeHolderTextColors = {
  filled: baseColors.grayExtraLight,
  outlined: baseColors.whitePure,
  flushed: baseColors.grayMedium,
};
