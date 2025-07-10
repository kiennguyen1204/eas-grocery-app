import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Interfaces
import { ISignUpFormData } from '@/interfaces';

// Components
import { Button, Hidden, Input, Show, Text } from '@/components';

// Themes
import {
  baseColors,
  borderRadius,
  fontSizes,
  fontWeights,
  fontsFamily,
} from '@/themes';

interface SignUpFormProps {
  onSubmit: (data: ISignUpFormData) => void;
  errorMessage?: string | null;
  isLoading?: boolean;
}

const REQUIRE_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
];

const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { dirtyFields, errors },
  } = useForm<ISignUpFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const SIGN_UP_VALIDATION_RULES = {
    firstName: {
      required: ERROR_MESSAGES.FIELD_REQUIRED('First Name'),
    },
    lastName: {
      required: ERROR_MESSAGES.FIELD_REQUIRED('Last Name'),
    },

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
    confirmPassword: {
      required: ERROR_MESSAGES.FIELD_REQUIRED('Confirm Password'),
      validate: (value: string) => {
        if (watch('password') !== value) {
          return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
        }
      },
    },
  };

  const handleTogglePassword = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const handleOnChange = (fieldName: keyof ISignUpFormData) => {
    clearErrors(fieldName);
  };

  const dirtyItems = Object.keys(dirtyFields).filter(
    key => dirtyFields[key as keyof ISignUpFormData],
  );
  const emailInputRef = useRef(null);

  const enableButton =
    dirtyItems.length === REQUIRE_FIELDS.length && !Object.keys(errors).length;
  const isDisableSubmit = !enableButton;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text color={baseColors.whitePure} size="xl">
          Welcome to tradly
        </Text>
        <Text color={baseColors.whitePure} size="sm">
          Sign up to your account
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          name="firstName"
          control={control}
          rules={SIGN_UP_VALIDATION_RULES.firstName}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              onChangeText={(value: string) => {
                handleOnChange('firstName');
                onChange(value);
              }}
              variant="outlined"
              placeholder="First Name"
              aria-label="First Name"
              value={value}
              ref={emailInputRef}
              autoCapitalize="none"
              errorMessage={error?.message}
              editable
              focusable
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={SIGN_UP_VALIDATION_RULES.lastName}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              onChangeText={(value: string) => {
                handleOnChange('lastName');
                onChange(value);
              }}
              variant="outlined"
              placeholder="Last Name"
              aria-label="Last Name"
              value={value}
              ref={emailInputRef}
              autoCapitalize="none"
              errorMessage={error?.message}
              editable
              focusable
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={SIGN_UP_VALIDATION_RULES.email}
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
              placeholder="Email ID/Phone Number"
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
          rules={SIGN_UP_VALIDATION_RULES.password}
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

        <Controller
          name="confirmPassword"
          control={control}
          rules={SIGN_UP_VALIDATION_RULES.confirmPassword}
          render={({
            field: { onChange, onBlur, value, ...rest },
            fieldState: { error },
          }) => (
            <View>
              <Input
                {...rest}
                placeholder="Re-enter Password"
                aria-label="Re-enter Password"
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
        style={styles.buttonCreate}
        variant="secondary"
        title="Create"
        isLoading={isLoading}
        disabled={isDisableSubmit}
        onPress={handleSubmit(onSubmit)}
      />

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpAccount}>Have an account? </Text>
        <Link href="/login" style={styles.signUpLink}>
          Sign in
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

export default SignUpForm;
