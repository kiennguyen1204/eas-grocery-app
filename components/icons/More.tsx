import Svg, { G, Rect, Defs, ClipPath, Circle } from 'react-native-svg';
import { TCustomClass } from '@/interfaces';

const MoreIcon = ({
  width = 4,
  height = 18,
  color = '#FFFFFF',
}: TCustomClass) => (
  <Svg width={width} height={height} viewBox="0 0 4 18" fill="none">
    <Defs>
      <ClipPath id="clip0">
        <Rect width="4" height="18" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0)">
      <Circle cx="2" cy="2" r="2" fill={color} />
      <Circle cx="2" cy="9" r="2" fill={color} />
      <Circle cx="2" cy="16" r="2" fill={color} />
    </G>
  </Svg>
);

export default MoreIcon;
