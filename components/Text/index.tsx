import { memo } from 'react';

import { ColorValue, Text, TextProps } from 'react-native';

// Themes
import { baseColors, fontsFamily, fontSizes } from '@/themes';

type FontSize = keyof typeof fontSizes;

type FontFamily = keyof typeof fontsFamily;

export interface TextCustomProps extends TextProps {
  color?: ColorValue;
  fontFamily?: FontFamily;
  size?: FontSize;
}

const TextCustom = ({
  color = baseColors.grayDark,
  fontFamily = 'regular',
  size = 'md',
  children,
  style,
  ...props
}: TextCustomProps) => {
  return (
    <Text
      style={[
        {
          color: color,
          fontSize: fontSizes[`${size}`],
          fontFamily: fontsFamily[`${fontFamily}`],
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

TextCustom.displayName = 'Text';

export default memo(TextCustom);
