import Svg, { Path } from 'react-native-svg';

import { TCustomClass } from '@/interfaces';

const ChevronLeft = ({
  width = 20,
  height = 20,
  color = '#FFFFFF',
}: TCustomClass) => (
  <Svg width={width} height={height} viewBox="0 0 19 16" fill="none">
    <Path
      d="M3.828 6.707L9.121 1.414L7.707 0L0 7.707L7.707 15.414L9.121 14L3.828 8.707H18.414V6.707H3.828Z"
      fill={color}
    />
  </Svg>
);

export default ChevronLeft;
