const green = {
  greenLight: '#13B58C',
  greenDark: '#33907C',
};

const gray = {
  grayExtraLight: '#DCDDDF',
  grayMedium: '#4F4F4F',
  grayDark: '#4A4A4A',
  grayLight: '#DBDBDE',
};

const white = {
  whitePure: '#FFFFFF',
  whiteSoft: '#F6F9FF',
};

const black = {
  blackPure: '#000',
};

const red = {
  redPrimary: '#FF7272',
};

export const baseColors = {
  ...green,
  ...gray,
  ...white,
  ...black,
  ...red,
  transparent: 'transparent',
} as const;
