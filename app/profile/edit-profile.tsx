import { router } from 'expo-router';

import { useCallback, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

// Components
import { Button, ChevronLeftIcon, Input, Text } from '@/components';

// Constants
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// Hooks
import { useGetUser, usePatchUser, useUploadToImgBB } from '@/hooks';

// Stores
import { useAuthStore } from '@/stores';

// Themes
import {
  baseColors,
  borderRadius,
  fontsFamily,
  fontSizes,
  fontWeights,
} from '@/themes';

// Utils
import { pickImage } from '@/utils';

import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { Image } from 'expo-image';

type FormData = {
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
};

const NAME_VALIDATION_RULES = {
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
  },
  name: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Name'),
  },
  phone: {
    pattern: {
      value: /^[0-9]{10,}$/,
      message: ERROR_MESSAGES.FIELD_INVALID('Phone'),
    },
  },
};

export default function EditProfileScreen() {
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string>();

  const { user: authUser } = useAuthStore();
  const { user: apiUser } = useGetUser();

  const { mutateAsync: editUser, status: editStatus } = usePatchUser();
  const { mutateAsync: uploadToImgBB, status: uploadStatus } =
    useUploadToImgBB();
  const isUploading = uploadStatus === 'pending';

  const [modalVisible, setModalVisible] = useState(false);

  const {
    avatar = '',
    name = '',
    phone = '',
    email = '',
  } = apiUser || authUser || {};

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      avatar,
      name,
      phone,
      email,
    },
  });

  const dirtyItems = Object.keys(dirtyFields).filter(
    key => dirtyFields[key as keyof FormData],
  );

  const handleAvatarChange = useCallback((uri: string) => {
    setAvatarUri(uri);
    setIsAvatarDirty(true);
  }, []);

  const handleEditProfile = useCallback(
    async (data: FormData) => {
      try {
        await editUser(
          {
            ...data,
            avatar: isAvatarDirty ? avatarUri : undefined,
          },
          {
            onSuccess: () => {
              Toast.show({
                type: 'success',
                text1: SUCCESS_MESSAGES.EDIT_PROFILE_SUCCESS,
              });
              router.replace(ROUTES.PROFILE);
            },
            onError: (error: string) => {
              const errorMessage =
                error || ERROR_MESSAGES.UPDATE_PROFILE_FAILED;
              Toast.show({
                type: 'error',
                text1: errorMessage,
              });
            },
          },
        );
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    [avatarUri, editUser, isAvatarDirty, router],
  );

  const emailInputRef = useRef(null);

  const handleOnChange = (fieldName: keyof FormData) => {
    clearErrors(fieldName);
  };

  const handlePressBackIcon = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text style={styles.textHeading} size="xl">
          My Profile
        </Text>
        <TouchableOpacity onPress={handlePressBackIcon}>
          <ChevronLeftIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => setModalVisible(true)}>
          {avatarUri || avatar ? (
            <Image
              source={{ uri: avatarUri || avatar }}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          ) : (
            <Text style={styles.avatarText}>
              {(name || 'U').charAt(0).toUpperCase() || 'U'}
            </Text>
          )}
          <Text style={styles.changeAvatarText}>Change Avatar</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableHighlight
                style={styles.modalButton}
                onPress={() =>
                  pickImage(
                    'library',
                    handleAvatarChange,
                    uploadToImgBB,
                    setAvatarUri,
                    setModalVisible,
                  )
                }>
                <Text style={styles.modalButtonText}>Choose from Library</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalButton}
                onPress={() =>
                  pickImage(
                    'camera',
                    handleAvatarChange,
                    uploadToImgBB,
                    setAvatarUri,
                    setModalVisible,
                  )
                }>
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Name</Text>
          <Controller
            control={control}
            name="name"
            rules={NAME_VALIDATION_RULES.name}
            render={({
              field: { onChange, value, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                style={[styles.input, errors.name && styles.inputError]}
                onChangeText={(value: string) => {
                  handleOnChange('name');
                  onChange(value);
                }}
                value={value}
                errorMessage={error?.message}
                placeholder="Enter name"
                returnKeyType="done"
                editable
                focusable
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            name="email"
            control={control}
            rules={NAME_VALIDATION_RULES.email}
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
                placeholder="Email"
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <Controller
            control={control}
            name="phone"
            rules={NAME_VALIDATION_RULES.phone}
            render={({
              field: { onChange, value, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                style={[styles.input, errors.phone && styles.inputError]}
                onChangeText={(value: string) => {
                  handleOnChange('phone');
                  onChange(value);
                }}
                value={value ?? ''}
                errorMessage={error?.message}
                placeholder="Enter phone number"
                returnKeyType="done"
                keyboardType="phone-pad"
                autoCapitalize="none"
                editable
                focusable
              />
            )}
          />
        </View>
        <Button
          titleStyle={styles.buttonText}
          style={styles.buttonSave}
          title="Save Changes"
          onPress={handleSubmit(handleEditProfile)}
          disabled={dirtyItems.length === 0 && !isAvatarDirty}
          isLoading={editStatus === 'pending' || isUploading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.whiteSoft,
  },
  header: {
    backgroundColor: baseColors.greenDark,
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },

  textHeading: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whiteSoft,
    textAlign: 'center',
    flex: 1,
  },

  titleGroup: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: baseColors.greenDark,
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whitePure,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: baseColors.whiteSoft,
    borderWidth: 2,
  },
  avatarText: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: baseColors.whiteSoft,
    borderWidth: 2,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 40,
    fontFamily: fontsFamily.bold,
    color: baseColors.whitePure,
    backgroundColor: baseColors.greenDark,
  },
  changeAvatarText: {
    marginTop: 8,
    color: baseColors.greenLight,
    fontFamily: fontsFamily.regular,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: fontsFamily.medium,
    color: baseColors.grayDark,
  },
  input: {
    padding: 12,
    fontFamily: fontsFamily.regular,
  },
  inputError: {
    borderColor: baseColors.redPrimary,
  },
  errorText: {
    color: baseColors.redPrimary,
    fontFamily: fontsFamily.regular,
    fontSize: 12,
  },

  buttonSave: {
    borderRadius: borderRadius.xl,
    paddingVertical: 5,
  },

  buttonText: {
    color: baseColors.whitePure,
    width: '100%',
    paddingVertical: 14,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: baseColors.whiteSoft,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    gap: 10,
  },
  modalButton: {
    backgroundColor: baseColors.greenLight,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: baseColors.grayDark,
  },
  modalButtonText: {
    color: baseColors.whitePure,
    fontFamily: fontsFamily.regular,
    fontSize: 16,
  },
});
