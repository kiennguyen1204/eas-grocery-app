import { ICategory } from '@/interfaces';
import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

// Mock data for dropdown options
const mockSortOptions: ICategory[] = [
  { id: 1, title: 'Price: Low to High', value: 'price_asc' },
  { id: 2, title: 'Price: High to Low', value: 'price_desc' },
  { id: 3, title: 'Name: A to Z', value: 'name_asc' },
  { id: 4, title: 'Name: Z to A', value: 'name_desc' },
];

const mockCategoryOptions: ICategory[] = [
  { id: 1, title: 'Fruits', value: 'fruits' },
  { id: 2, title: 'Vegetables', value: 'vegetables' },
  { id: 3, title: 'Dairy', value: 'dairy' },
  { id: 4, title: 'Meat', value: 'meat' },
  { id: 5, title: 'Bakery', value: 'bakery' },
];

export const Default: Story = {
  args: {
    title: 'My Store',
    totalQuantity: 3,
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const WithSearch: Story = {
  args: {
    title: 'Browse Products',
    totalQuantity: 5,
    isSearch: true,
    onChangeText: (value: string) => console.log('Search:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const BrowseMode: Story = {
  args: {
    title: 'Browse Store',
    totalQuantity: 8,
    isBrowse: true,
    optionSort: mockSortOptions,
    optionCategory: mockCategoryOptions,
    onSelect: (value: string) => console.log('Sort selected:', value),
    onCategorySelect: (value: string) =>
      console.log('Category selected:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const BrowseModeWithSearch: Story = {
  args: {
    title: 'Browse & Search',
    totalQuantity: 12,
    isBrowse: true,
    isSearch: true,
    optionSort: mockSortOptions,
    optionCategory: mockCategoryOptions,
    onChangeText: (value: string) => console.log('Search:', value),
    onSelect: (value: string) => console.log('Sort selected:', value),
    onCategorySelect: (value: string) =>
      console.log('Category selected:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const EmptyCart: Story = {
  args: {
    title: 'Empty Cart Store',
    totalQuantity: 0,
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const HighQuantityCart: Story = {
  args: {
    title: 'Popular Store',
    totalQuantity: 99,
    isSearch: true,
    onChangeText: (value: string) => console.log('Search:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const OnlySort: Story = {
  args: {
    title: 'Sort Only',
    totalQuantity: 7,
    isBrowse: true,
    optionSort: mockSortOptions,
    onSelect: (value: string) => console.log('Sort selected:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};

export const OnlyCategory: Story = {
  args: {
    title: 'Category Only',
    totalQuantity: 4,
    isBrowse: true,
    optionCategory: mockCategoryOptions,
    onCategorySelect: (value: string) =>
      console.log('Category selected:', value),
    onNavigate: () => console.log('Navigate to cart'),
  },
};
