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
  const textStyles = {
    color,
    fontSize: fontSizes[size] || fontSizes.md,
    fontFamily: fontsFamily[fontFamily] || fontsFamily.regular,
  };

  return (
    <Text style={style ? [textStyles, style] : textStyles} {...props}>
      {children}
    </Text>
  );
};

TextCustom.displayName = 'Text';

export default memo(TextCustom);
