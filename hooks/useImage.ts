import { PROCESS_ENV } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';

const uploadImage = async (imageUri: string) => {
  const formData = new FormData();

  const imageBlob = {
    uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
    name: 'image.jpg',
    type: 'image/jpeg',
  } as any;

  formData.append('image', imageBlob);
  formData.append('key', PROCESS_ENV.EXPO_PUBLIC_IMAGE_SERVICE_KEY || '');

  const response = await fetch(PROCESS_ENV.EXPO_PUBLIC_IMGBB_API, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || 'Upload failed');
  }

  return result.data.url;
};

export const useUploadToImgBB = () => {
  return useMutation({
    mutationFn: async (imageUris: string[]) => {
      return Promise.all(imageUris.map(uploadImage));
    },
  });
};
