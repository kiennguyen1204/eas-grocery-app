import * as SecureStore from 'expo-secure-store';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
  },
});

export default StorybookUIRoot;
