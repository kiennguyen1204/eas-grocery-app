import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import CartItem from '.';

const meta: Meta<typeof CartItem> = {
  title: 'components/CartItem',
  component: CartItem,
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Sample Product',
    image: 'https://via.placeholder.com/150',
    price: 20,
    quantity: 2,
    onRemove: () => action('Remove clicked'),
    onIncrease: () => action('Increase clicked'),
    onDecrease: () => action('Decrease clicked'),
  },
};

export const WithDiscount: Story = {
  args: {
    id: '2',
    title: 'Discounted Product',
    image: 'https://via.placeholder.com/150',
    price: 30,
    newPrice: 25,
    oldPrice: 35,
    quantity: 1,
    onRemove: () => action('Remove clicked'),
    onIncrease: () => action('Increase clicked'),
    onDecrease: () => action('Decrease clicked'),
  },
};

export const NoImage: Story = {
  args: {
    id: '3',
    title: 'Product Without Image',
    price: 15,
    quantity: 3,
    onRemove: () => action('Remove clicked'),
    onIncrease: () => action('Increase clicked'),
    onDecrease: () => action('Decrease clicked'),
  },
};

export const HighQuantity: Story = {
  args: {
    id: '4',
    title: 'High Quantity Product',
    image: 'https://via.placeholder.com/150',
    price: 10,
    quantity: 10,
    onRemove: () => action('Remove clicked'),
    onIncrease: () => action('Increase clicked'),
    onDecrease: () => action('Decrease clicked'),
  },
};
