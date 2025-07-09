import { ICategory } from '@/interfaces';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '.';

const meta: Meta<typeof Dropdown> = {
  title: 'components/Dropdown',
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const mockOptions: ICategory[] = [
  { id: 1, title: 'Price: Low to High', value: 'price_asc' },
  { id: 2, title: 'Price: High to Low', value: 'price_desc' },
  { id: 3, title: 'Name: A to Z', value: 'name_asc' },
  { id: 4, title: 'Name: Z to A', value: 'name_desc' },
];

const categoryOptions: ICategory[] = [
  { id: 1, title: 'Fruits', value: 'fruits' },
  { id: 2, title: 'Vegetables', value: 'vegetables' },
  { id: 3, title: 'Dairy', value: 'dairy' },
  { id: 4, title: 'Meat', value: 'meat' },
];

export const Default: Story = {
  args: {
    defaultValue: 'Select option',
    options: mockOptions,
    onSelect: (value: string) => console.log('Selected:', value),
  },
};

export const CategoryDropdown: Story = {
  args: {
    defaultValue: 'Category',
    options: categoryOptions,
    onSelect: (value: string) => console.log('Category selected:', value),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Location',
    isDisabled: true,
    onSelect: (value: string) => console.log('Should not trigger:', value),
  },
};

export const NoOptions: Story = {
  args: {
    defaultValue: 'No options available',
    options: [],
    onSelect: (value: string) => console.log('Selected:', value),
  },
};

export const LongText: Story = {
  args: {
    defaultValue:
      'Very Long Default Value Text That Should Be Handled Properly',
    options: [
      {
        id: 1,
        title: 'Very Long Option Text That Should Be Displayed Correctly',
        value: 'long1',
      },
      { id: 2, title: 'Another Long Option', value: 'long2' },
    ],
    onSelect: (value: string) => console.log('Selected:', value),
  },
};
