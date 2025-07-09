import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Input from '.';

// Mock data for icons
const mockLeftIcon = <Ionicons name="person-outline" size={24} color="gray" />;
const mockRightIcon = (
  <Ionicons name="lock-closed-outline" size={24} color="gray" />
);

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Filled: Story = {
  args: {
    value: 'Sample Text',
    placeholder: 'Enter text',
    variant: 'filled',
    label: 'Filled Input',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const Outlined: Story = {
  args: {
    value: 'Sample Text',
    placeholder: 'Enter text',
    variant: 'outlined',
    label: 'Outlined Input',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const Flushed: Story = {
  args: {
    value: 'Sample Text',
    placeholder: 'Enter text',
    variant: 'flushed',
    label: 'Flushed Input',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled Input',
    placeholder: 'Cannot edit',
    variant: 'filled',
    label: 'Disabled Input',
    disabled: true,
    onChangeText: (text: string) => console.log('Text changed:', text),
  },
};

export const WithError: Story = {
  args: {
    value: 'Invalid Input',
    placeholder: 'Enter text',
    variant: 'outlined',
    label: 'Input with Error',
    errorMessage: 'This field is required',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Enter text',
    variant: 'flushed',
    label: 'Empty Input',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const LongLabel: Story = {
  args: {
    value: 'Sample Text',
    placeholder: 'Enter text',
    variant: 'filled',
    label: 'This is a very long input label to test text overflow behavior',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};

export const SecureEntry: Story = {
  args: {
    value: 'secret',
    placeholder: 'Enter password',
    variant: 'filled',
    label: 'Secure Input',
    secureTextEntry: true,
    onIconPressed: () => console.log('Toggle visibility'),
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSubmitEditing: () => console.log('Submitted'),
  },
};
