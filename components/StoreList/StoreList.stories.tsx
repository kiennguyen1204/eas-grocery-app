import type { Meta, StoryObj } from '@storybook/react';
import StoreList from '.';

const meta: Meta<typeof StoreList> = {
  title: 'components/StoreList',
  component: StoreList,
};

export default meta;
type Story = StoryObj<typeof StoreList>;

const mockStores = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Fresh Market',
    logoLetter: 'F',
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Organic Store',
    logoLetter: 'O',
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Super Mart',
    logoLetter: 'S',
  },
];

export const Default: Story = {
  args: {
    stores: mockStores,
  },
};

export const SingleStore: Story = {
  args: {
    stores: [mockStores[0]],
  },
};

export const ManyStores: Story = {
  args: {
    stores: [
      ...mockStores,
      {
        id: '4',
        imageUrl: 'https://via.placeholder.com/160x100',
        storeName: 'Tech Store',
        logoLetter: 'T',
      },
      {
        id: '5',
        imageUrl: 'https://via.placeholder.com/160x100',
        storeName: 'Book Shop',
        logoLetter: 'B',
      },
      {
        id: '6',
        imageUrl: 'https://via.placeholder.com/160x100',
        storeName: 'Coffee House',
        logoLetter: 'C',
      },
    ],
  },
};

export const EmptyList: Story = {
  args: {
    stores: [],
  },
};
