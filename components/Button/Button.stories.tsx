import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Primary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline',
  },
};

export const Rounded: Story = {
  args: {
    title: 'Rounded',
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled',
    disabled: true,
  },
};
