import { memo, PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Themes
import {
  baseColors,
  fontsFamily,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/themes';

type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'outlined';
type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonProps = PropsWithChildren<PressableProps> & {
  title?: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  titleStyle?: StyleProp<TextStyle>;
};

const variantStyles = {
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

const buttonSizes: Record<
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

const buttonTextStyles: Record<ButtonVariants, { color: string }> = {
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

const buttonTextSizes: Record<ButtonSizes, any> = {
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

const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
  style,
  titleStyle,
  onPress,
}: ButtonProps) => {
  const variantStyle = variantStyles[variant];
  const buttonSize = buttonSizes[size];
  const textStyle = buttonTextStyles[variant];

  return (
    <Pressable
      testID="button-pressable"
      style={({ pressed }) => [
        styles.button,
        buttonSize,
        {
          backgroundColor: variantStyle.backgroundColor,
          opacity: pressed || disabled ? 0.6 : 1,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading && <ActivityIndicator color={variantStyle.textColor} />}
      {icon}
      <Text
        style={[
          styles.text,
          titleStyle,
          {
            ...buttonTextSizes[size],
            ...textStyle,
          },
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default memo(Button);
