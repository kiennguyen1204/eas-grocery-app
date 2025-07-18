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

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

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
          accessible={true}
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.TEXT_INPUT(
            label || placeholder,
          )}
          accessibilityHint={
            secureTextEntry
              ? ACCESSIBILITY_CONFIG.HINTS.SECURE_TEXT_ENTRY
              : ACCESSIBILITY_CONFIG.HINTS.TEXT_INPUT(label)
          }
          accessibilityState={{
            disabled: disabled,
          }}
          accessibilityRole="none"
          {...props}
        />
        {leftIcon && (
          <View
            style={styles.leftIcon}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.INPUT_ICON}>
            {leftIcon}
          </View>
        )}
        {rightIcon &&
          (onIconPressed ? (
            <TouchableOpacity
              testID="icon"
              style={styles.rightIcon}
              onPress={onIconPressed}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                secureTextEntry
                  ? ACCESSIBILITY_CONFIG.LABELS.TOGGLE_PASSWORD
                  : ACCESSIBILITY_CONFIG.LABELS.ACTION_BUTTON
              }
              accessibilityHint={
                secureTextEntry
                  ? ACCESSIBILITY_CONFIG.HINTS.TOGGLE_PASSWORD_SHOW
                  : ACCESSIBILITY_CONFIG.HINTS.ACTION_BUTTON
              }>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View
              style={styles.rightIcon}
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.INPUT_ICON}>
              {rightIcon}
            </View>
          ))}
        {errorMessage && (
          <Text
            size="base"
            style={styles.errorMessage}
            accessible={true}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite">
            {errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
