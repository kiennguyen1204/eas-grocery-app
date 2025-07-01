import { Link } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

// Components
import { Button, Hidden, Input, Show, Text } from '@/components';

// Themes
import {
  baseColors,
  borderRadius,
  fontsFamily,
  fontSizes,
  fontWeights,
} from '@/themes';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

interface SignInPayload {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: SignInPayload) => void;
  isLoading?: boolean;
}

const REQUIRE_FIELDS = ['email', 'password'];

const SIGN_IN_VALIDATION_RULES = {
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.FIELD_INVALID('Email'),
    },
  },
  password: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    minLength: { value: 8, message: ERROR_MESSAGES.PASSWORD_TOO_LONG },
    pattern: {
      value: REGEX.PASSWORD,
      message: ERROR_MESSAGES.INVALID_PASSWORD,
    },
  },
};

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useForm<SignInPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleTogglePassword = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const handleOnChange = (fieldName: keyof SignInPayload) => {
    clearErrors(fieldName);
  };

  const dirtyItems = Object.keys(dirtyFields).filter(
    key => dirtyFields[key as keyof SignInPayload],
  );

  const enableButton =
    dirtyItems.length === REQUIRE_FIELDS.length && !Object.keys(errors).length;

  const isDisableSubmit = !enableButton;

  const emailInputRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text color={baseColors.whitePure} size="xl">
          Welcome to tradly
        </Text>
        <Text color={baseColors.whitePure} size="sm">
          Login to your account
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          name="email"
          control={control}
          rules={SIGN_IN_VALIDATION_RULES.email}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              onChangeText={(value: string) => {
                handleOnChange('email');
                onChange(value);
              }}
              variant="outlined"
              placeholder="Email/Mobile Number"
              aria-label="Email"
              value={value}
              keyboardType="email-address"
              ref={emailInputRef}
              autoCapitalize="none"
              errorMessage={error?.message}
              editable
              focusable
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={SIGN_IN_VALIDATION_RULES.password}
          render={({
            field: { onChange, onBlur, value, ...rest },
            fieldState: { error },
          }) => (
            <View>
              <Input
                {...rest}
                placeholder="Password"
                aria-label="Password"
                variant="outlined"
                secureTextEntry={!passwordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={error?.message}
                rightIcon={passwordVisible ? <Hidden /> : <Show />}
                onIconPressed={handleTogglePassword}
              />
            </View>
          )}
        />
      </View>

      <Button
        titleStyle={styles.buttonText}
        style={styles.buttonLogin}
        variant="secondary"
        title="Login"
        isLoading={isLoading}
        disabled={isDisableSubmit}
        onPress={handleSubmit(onSubmit)}
      />
      <Link style={styles.forgotPassword} href="/login">
        Forgot your password?
      </Link>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpAccount}>Don’t have an account? </Text>
        <Link href="/signup" style={styles.signUpLink}>
          Sign up
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LoginForm;
