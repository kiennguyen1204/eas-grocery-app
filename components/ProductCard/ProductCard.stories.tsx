import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from '.';

const meta: Meta<typeof ProductCard> = {
  title: 'components/ProductCard',
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Fresh Organic Apples',
    imageUrl: 'https://via.placeholder.com/160x160',
    newPrice: 12.99,
    storeName: 'Fresh Market',
    onPress: (id: string) => console.log('Product pressed:', id),
  },
};

export const WithDiscount: Story = {
  args: {
    id: '2',
    name: 'Premium Bananas',
    imageUrl: 'https://via.placeholder.com/160x160',
    newPrice: 8.99,
    oldPrice: 12.99,
    storeName: 'Organic Store',
    onPress: (id: string) => console.log('Product pressed:', id),
  },
};

export const LongName: Story = {
  args: {
    id: '3',
    name: 'Very Long Product Name That Should Be Truncated',
    imageUrl: 'https://via.placeholder.com/160x160',
    newPrice: 25.5,
    storeName: 'Long Store Name',
    onPress: (id: string) => console.log('Product pressed:', id),
  },
};

export const Expensive: Story = {
  args: {
    id: '4',
    name: 'Premium Product',
    imageUrl: 'https://via.placeholder.com/160x160',
    newPrice: 129.99,
    oldPrice: 149.99,
    storeName: 'Premium Store',
    onPress: (id: string) => console.log('Product pressed:', id),
  },
};
