import { act } from '@testing-library/react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { Alert, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  pickImage,
  requestCameraPermission,
  requestPhotoLibraryPermission,
  showPermissionDeniedAlert,
} from '../imagePicker'; // Adjust path to your file

// Mock dependencies
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
  getCameraPermissionsAsync: jest.fn(),
  getMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
  Linking: { openSettings: jest.fn() },
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('Image Picker Utilities', () => {
  const CAMERA_DENIAL_COUNT_KEY = 'CAMERA_DENIAL_COUNT';
  const mockHandleAvatarChange = jest.fn();
  const mockUploadToImgBB = jest.fn();
  const mockSetAvatarUri = jest.fn();
  const mockSetModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('showPermissionDeniedAlert', () => {
    it('displays alert with correct message and buttons', () => {
      showPermissionDeniedAlert('Test message');
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Test message',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: expect.any(Function) },
        ],
      );
    });

    it('calls Linking.openSettings when "Open Settings" is pressed', () => {
      showPermissionDeniedAlert('Test message');
      const openSettingsButton = (Alert.alert as jest.Mock).mock.calls[0][2][1];
      openSettingsButton.onPress();
      expect(Linking.openSettings).toHaveBeenCalled();
    });
  });

  describe('requestCameraPermission', () => {
    it('returns true and clears denial count when permission is already granted', async () => {
      (ImagePicker.getCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });

      const result = await requestCameraPermission();

      expect(ImagePicker.getCameraPermissionsAsync).toHaveBeenCalled();
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        CAMERA_DENIAL_COUNT_KEY,
      );
      expect(result).toBe(true);
    });

    it('returns true and clears denial count when permission is granted after request', async () => {
      (ImagePicker.getCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
      (
        ImagePicker.requestCameraPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
        canAskAgain: true,
      });

      const result = await requestCameraPermission();

      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        CAMERA_DENIAL_COUNT_KEY,
      );
      expect(result).toBe(true);
    });
  });

  describe('requestPhotoLibraryPermission', () => {
    it('returns true when permission is already granted', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });

      const result = await requestPhotoLibraryPermission();

      expect(ImagePicker.getMediaLibraryPermissionsAsync).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('returns true when permission is granted after request', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'denied',
      });
      (
        ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });

      const result = await requestPhotoLibraryPermission();

      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync,
      ).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('pickImage', () => {
    it('picks image from library, uploads, and shows success toast', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: 'file://image.jpg' }],
      });
      mockUploadToImgBB.mockResolvedValue(['https://imgbb.com/image.jpg']);

      await act(async () => {
        await pickImage(
          'library',
          mockHandleAvatarChange,
          mockUploadToImgBB,
          mockSetAvatarUri,
          mockSetModalVisible,
        );
      });

      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      expect(mockHandleAvatarChange).toHaveBeenCalledWith('file://image.jpg');
      expect(mockUploadToImgBB).toHaveBeenCalledWith(['file://image.jpg']);
      expect(mockSetAvatarUri).toHaveBeenCalledWith(
        'https://imgbb.com/image.jpg',
      );
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Upload successful',
      });
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });

    it('picks image from camera, uploads, and shows success toast', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.getCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: 'file://camera.jpg' }],
      });
      mockUploadToImgBB.mockResolvedValue(['https://imgbb.com/camera.jpg']);

      await act(async () => {
        await pickImage(
          'camera',
          mockHandleAvatarChange,
          mockUploadToImgBB,
          mockSetAvatarUri,
          mockSetModalVisible,
        );
      });

      expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      expect(mockHandleAvatarChange).toHaveBeenCalledWith('file://camera.jpg');
      expect(mockUploadToImgBB).toHaveBeenCalledWith(['file://camera.jpg']);
      expect(mockSetAvatarUri).toHaveBeenCalledWith(
        'https://imgbb.com/camera.jpg',
      );
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Upload successful',
      });
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });

    it('exits early if camera permission is denied', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.getCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
      (
        ImagePicker.requestCameraPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'denied',
        canAskAgain: true,
      });

      await act(async () => {
        await pickImage(
          'camera',
          mockHandleAvatarChange,
          mockUploadToImgBB,
          mockSetAvatarUri,
          mockSetModalVisible,
        );
      });

      expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
      expect(mockHandleAvatarChange).not.toHaveBeenCalled();
      expect(mockUploadToImgBB).not.toHaveBeenCalled();
      expect(mockSetAvatarUri).not.toHaveBeenCalled();
      expect(mockSetModalVisible).not.toHaveBeenCalled();
    });

    it('handles canceled image selection', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: true,
      });

      await act(async () => {
        await pickImage(
          'library',
          mockHandleAvatarChange,
          mockUploadToImgBB,
          mockSetAvatarUri,
          mockSetModalVisible,
        );
      });

      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
      expect(mockHandleAvatarChange).not.toHaveBeenCalled();
      expect(mockUploadToImgBB).not.toHaveBeenCalled();
      expect(mockSetAvatarUri).not.toHaveBeenCalled();
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });

    it('shows error toast on upload failure', async () => {
      (
        ImagePicker.getMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: 'file://image.jpg' }],
      });
      const error = new Error('Upload failed');
      mockUploadToImgBB.mockRejectedValue(error);

      await act(async () => {
        await pickImage(
          'library',
          mockHandleAvatarChange,
          mockUploadToImgBB,
          mockSetAvatarUri,
          mockSetModalVisible,
        );
      });

      expect(mockHandleAvatarChange).toHaveBeenCalledWith('file://image.jpg');
      expect(mockUploadToImgBB).toHaveBeenCalledWith(['file://image.jpg']);
      expect(mockSetAvatarUri).not.toHaveBeenCalled();
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Error: Upload failed',
      });
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });
  });
});
