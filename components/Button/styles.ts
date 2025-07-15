import {
  baseColors,
  fontsFamily,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/themes';
import { StyleSheet } from 'react-native';

type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'outlined';
type ButtonSizes = 'small' | 'medium' | 'large';

export const variantStyles = {
  primary: {
    backgroundColor: baseColors.greenLight,
    textColor: baseColors.whitePure,
  },
  secondary: {
    backgroundColor: baseColors.whitePure,
    textColor: baseColors.greenLight,
  },
  danger: {
    backgroundColor: baseColors.redPrimary,
    textColor: baseColors.whitePure,
  },
  outlined: {
    backgroundColor: 'transparent',
    textColor: baseColors.greenLight,
  },
};

export const buttonSizes: Record<
  ButtonSizes,
  { paddingHorizontal: number; paddingVertical: number }
> = {
  small: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
};

export const buttonTextStyles: Record<ButtonVariants, { color: string }> = {
  primary: {
    color: baseColors.whitePure,
  },
  secondary: {
    color: baseColors.greenLight,
  },
  outlined: {
    color: baseColors.whitePure,
  },
  danger: {
    color: baseColors.whitePure,
  },
};

export const buttonTextSizes: Record<ButtonSizes, any> = {
  small: {
    fontSize: fontSizes.xs,
  },
  medium: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontFamily: fontsFamily.medium,
    fontWeight: fontWeights.medium,
  },
  large: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.semiBold,
  },
};

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  text: {
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: baseColors.grayMedium,
  },
  loadingIndicator: {
    paddingVertical: 10,
  },
});
