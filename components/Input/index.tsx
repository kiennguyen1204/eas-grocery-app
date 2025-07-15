import React, { forwardRef, memo, Ref } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// Components
import { Text } from '@/components';

// Styles
import { inputVariants, placeHolderTextColors, styles } from './styles';

type InputVariants = 'filled' | 'outlined' | 'flushed';

interface InputProps
  extends Omit<TextInputProps, 'style'>,
    Pick<ViewProps, 'style'> {
  value?: string;
  placeholder?: string;
  variant?: InputVariants;
  label?: string;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  disabled?: boolean;
  errorMessage?: string;
  ref?: Ref<TextInput>;
  secureTextEntry?: boolean;
  onIconPressed?: () => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const Input = forwardRef(
  (
    {
      value,
      placeholder,
      variant = 'filled',
      label,
      leftIcon,
      rightIcon,
      errorMessage,
      disabled,
      secureTextEntry = false,
      onIconPressed,
      onChangeText,
      onSubmitEditing,
      style,
      ...props
    }: InputProps,
    ref?: Ref<TextInput>,
  ) => {
    return (
      <View style={[styles.container, style]}>
        {label && (
          <Text size="base" style={styles.label}>
            {label}
          </Text>
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          style={[
            styles.inputBase,
            inputVariants[variant],
            disabled && styles.disabled,
          ]}
          ref={ref}
          editable={!disabled}
          placeholderTextColor={placeHolderTextColors[variant]}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        {rightIcon &&
          (onIconPressed ? (
            <TouchableOpacity
              testID="icon"
              style={styles.rightIcon}
              onPress={onIconPressed}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.rightIcon}>{rightIcon}</View>
          ))}
        {errorMessage && (
          <Text size="base" style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
