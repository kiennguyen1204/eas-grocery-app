import type { Meta, StoryObj } from '@storybook/react';
import TotalCart from '.';

const meta: Meta<typeof TotalCart> = {
  title: 'components/TotalCart',
  component: TotalCart,
};

export default meta;
type Story = StoryObj<typeof TotalCart>;

export const Default: Story = {
  args: {
    totalPrice: 45.99,
    totalQuantity: 3,
  },
};

export const SingleItem: Story = {
  args: {
    totalPrice: 12.99,
    totalQuantity: 1,
  },
};

export const ManyItems: Story = {
  args: {
    totalPrice: 127.5,
    totalQuantity: 8,
  },
};

export const HighValue: Story = {
  args: {
    totalPrice: 999.99,
    totalQuantity: 5,
  },
};

export const LowValue: Story = {
  args: {
    totalPrice: 2.5,
    totalQuantity: 1,
  },
};

export const ZeroValue: Story = {
  args: {
    totalPrice: 0,
    totalQuantity: 0,
  },
};
