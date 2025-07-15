import * as ImagePicker from 'expo-image-picker';
import {
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { Alert, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

export const showPermissionDeniedAlert = (message: string): void => {
  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  Alert.alert('Permission Denied', message, [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Open Settings',
      onPress: handleOpenSettings,
    },
  ]);
};

export const requestCameraPermission = async (): Promise<boolean> => {
  const CAMERA_DENIAL_COUNT_KEY = 'CAMERA_DENIAL_COUNT';
  const { status: currentStatus } = await getCameraPermissionsAsync();
  if (currentStatus === 'granted') {
    await SecureStore.deleteItemAsync(CAMERA_DENIAL_COUNT_KEY);
    return true;
  }

  const storedCount = await SecureStore.getItemAsync(CAMERA_DENIAL_COUNT_KEY);
  const denialCount = storedCount ? parseInt(storedCount, 10) : 0;

  const { status: requestStatus, canAskAgain } =
    await requestCameraPermissionsAsync();

  if (requestStatus === 'granted') {
    await SecureStore.deleteItemAsync(CAMERA_DENIAL_COUNT_KEY);
    return true;
  }

  const newDenialCount = denialCount + 1;
  await SecureStore.setItemAsync(
    CAMERA_DENIAL_COUNT_KEY,
    String(newDenialCount),
  );

  if (!canAskAgain && newDenialCount >= 3) {
    showPermissionDeniedAlert(
      'Camera access is required. Please enable it in settings.',
    );
  }

  return false;
};

export const requestPhotoLibraryPermission = async (): Promise<boolean> => {
  const { status } = await getMediaLibraryPermissionsAsync();

  if (status === 'granted') {
    return true;
  }

  const { status: requestStatus } = await requestMediaLibraryPermissionsAsync();

  if (requestStatus === 'granted') {
    return true;
  }

  showPermissionDeniedAlert('Media library access is required.');
  return false;
};

export const pickImage = async (
  source: 'library' | 'camera',
  handleAvatarChange: (uri: string) => void,
  uploadToImgBB: (imageUris: string[]) => Promise<string[]>,
  setAvatarUri: (uri: string) => void,
  setModalVisible: (visible: boolean) => void,
) => {
  const hasPermission = await requestPhotoLibraryPermission();
  if (!hasPermission) return;

  let result;
  if (source === 'library') {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  } else {
    const hasCameraPermission = await requestCameraPermission();
    if (!hasCameraPermission) return;

    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  }

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    handleAvatarChange(uri);

    try {
      const [uploadedUrl] = await uploadToImgBB([uri]);
      setAvatarUri(uploadedUrl);
      Toast.show({
        type: 'success',
        text1: 'Upload successful',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: String(error),
      });
    }
  }
  setModalVisible(false);
};
