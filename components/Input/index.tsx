import React, { forwardRef, Ref } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

// Components
import { Text } from '@/components';

// Themes
import { baseColors, borderRadius, fontsFamily, fontSizes } from '@/themes';

type InputVariants = 'filled' | 'outlined' | 'flushed';

interface InputProps
  extends Omit<TextInputProps, 'style'>,
    Pick<ViewProps, 'style'> {
  value: string;
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
      <View style={style}>
        {label && (
          <Text size="base" style={{ opacity: 0.5 }}>
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

export default Input;

export const styles = StyleSheet.create({
  inputBase: {
    paddingVertical: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 20,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  errorMessage: {
    color: baseColors.redPrimary,
    position: 'absolute',
    bottom: 20,
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
    paddingHorizontal: 8,
    color: baseColors.whiteSoft,
    borderRadius: borderRadius.sm,
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
