import { memo, PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Themes
import { baseColors } from '@/themes';

// Styles
import {
  buttonSizes,
  buttonTextSizes,
  buttonTextStyles,
  styles,
  variantStyles,
} from './styles';

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
  const textSize = buttonTextSizes[size];

  const buttonStyles: StyleProp<ViewStyle> = [
    styles.button,
    buttonSize,
    {
      backgroundColor: disabled
        ? baseColors.grayMedium
        : variantStyle.backgroundColor,
      opacity: 1,
    },
    ...(style ? [style] : []),
  ];

  const textStyles = [styles.text, textSize, textStyle];
  if (titleStyle) {
    textStyles.push(titleStyle);
  }

  return (
    <Pressable
      testID="button-pressable"
      style={({ pressed }) => [
        ...buttonStyles,
        { opacity: pressed || disabled ? 0.6 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {icon}
      {isLoading ? (
        <ActivityIndicator
          testID="activity-indicator"
          style={styles.loadingIndicator}
          color={variantStyle.textColor}
        />
      ) : (
        title && <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
};

export default memo(Button);
