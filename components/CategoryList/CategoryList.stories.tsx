import type { Meta, StoryObj } from '@storybook/react';
import CategoryList from '.';
import { CATEGORIES } from '@/mocks';

const meta: Meta<typeof CategoryList> = {
  title: 'components/CategoryList',
  component: CategoryList,
};

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const Default: Story = {
  args: {
    data: CATEGORIES,
    onPress: (id: number) => console.log('Category pressed:', id),
  },
};

export const ManyCategories: Story = {
  args: {
    data: [
      ...CATEGORIES,
      {
        id: 5,
        title: 'Bakery',
        imageUrl:
          'https://via.placeholder.com/100x100/e74c3c/ffffff?text=Bakery',
      },
      {
        id: 6,
        title: 'Beverages',
        imageUrl:
          'https://via.placeholder.com/100x100/9b59b6/ffffff?text=Beverages',
      },
      {
        id: 7,
        title: 'Snacks',
        imageUrl:
          'https://via.placeholder.com/100x100/2ecc71/ffffff?text=Snacks',
      },
      {
        id: 8,
        title: 'Frozen',
        imageUrl:
          'https://via.placeholder.com/100x100/34495e/ffffff?text=Frozen',
      },
    ],
    onPress: (id: number) => console.log('Category pressed:', id),
  },
};

export const LongNames: Story = {
  args: {
    data: [
      {
        id: 1,
        title: 'Organic Fruits',
        imageUrl:
          'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Organic',
      },
      {
        id: 2,
        title: 'Fresh Vegetables',
        imageUrl:
          'https://via.placeholder.com/100x100/4ecdc4/ffffff?text=Fresh',
      },
      {
        id: 3,
        title: 'Dairy Products',
        imageUrl:
          'https://via.placeholder.com/100x100/45b7d1/ffffff?text=Dairy',
      },
      {
        id: 4,
        title: 'Premium Meat',
        imageUrl:
          'https://via.placeholder.com/100x100/f39c12/ffffff?text=Premium',
      },
    ],
    onPress: (id: number) => console.log('Category pressed:', id),
  },
};

export const FewCategories: Story = {
  args: {
    data: [
      {
        id: 1,
        title: 'Fruits',
        imageUrl:
          'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Fruits',
      },
      {
        id: 2,
        title: 'Vegetables',
        imageUrl:
          'https://via.placeholder.com/100x100/4ecdc4/ffffff?text=Vegetables',
      },
    ],
    onPress: (id: number) => console.log('Category pressed:', id),
  },
};

export const EmptyList: Story = {
  args: {
    data: [],
    onPress: (id: number) => console.log('Category pressed:', id),
  },
};
