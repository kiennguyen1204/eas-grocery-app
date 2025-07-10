import type { Meta, StoryObj } from '@storybook/react';
import StoreCard from '.';

const meta: Meta<typeof StoreCard> = {
  title: 'components/StoreCard',
  component: StoreCard,
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

export const Default: Story = {
  args: {
    id: '1',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Fresh Market',
    logoLetter: 'F',
  },
};

export const LongStoreName: Story = {
  args: {
    id: '2',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Super Long Store Name That Might Be Truncated',
    logoLetter: 'S',
  },
};

export const ShortStoreName: Story = {
  args: {
    id: '3',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Shop',
    logoLetter: 'S',
  },
};

export const DifferentLogos: Story = {
  args: {
    id: '4',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: 'Organic Store',
    logoLetter: 'O',
  },
};

export const NumberLogo: Story = {
  args: {
    id: '5',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: '24/7 Mart',
    logoLetter: '2',
  },
};

export const SpecialCharacterLogo: Story = {
  args: {
    id: '6',
    imageUrl: 'https://via.placeholder.com/160x100',
    storeName: '@Store',
    logoLetter: '@',
  },
};
