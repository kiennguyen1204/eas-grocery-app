import type { Meta, StoryObj } from '@storybook/react';
import Banner from '.';

const BannerMeta: Meta<typeof Banner> = {
  title: 'components/Banner',
  component: Banner,
};

export default BannerMeta;

export const Default: StoryObj<typeof Banner> = {};
