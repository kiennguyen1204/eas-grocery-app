import { baseColors } from '@/themes';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'components/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Default Text',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="md">Medium Text (md)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
    </>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <>
      <Text fontFamily="regular">Regular Font Family</Text>
      <Text fontFamily="medium">Medium Font Family</Text>
      <Text fontFamily="bold">Bold Font Family</Text>
      <Text fontFamily="semiBold">Semi Bold Font Family</Text>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Text color={baseColors.grayDark}>Gray Dark Text</Text>
      <Text color={baseColors.greenLight}>Green Light Text</Text>
      <Text color={baseColors.redPrimary}>Red Primary Text</Text>
      <Text color={baseColors.whitePure}>White Pure Text</Text>
      <Text color="#ff6b6b">Custom Color Text</Text>
    </>
  ),
};

export const Combined: Story = {
  args: {
    children: 'Large Bold Green Text',
    size: 'lg',
    fontFamily: 'bold',
    color: baseColors.greenLight,
  },
};
