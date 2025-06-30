import { TCustomClass } from '@/interfaces';
import Svg, { Path } from 'react-native-svg';

const Show = ({ width = 20, height = 20, color = '#ffffff' }: TCustomClass) => (
  <Svg
    testID="show-icon"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none">
    <Path
      d="M2 9.5C2 9.5 4.90909 4 10 4C15.0909 4 18 9.5 18 9.5C18 9.5 15.0909 15 10 15C4.90909 15 2 9.5 2 9.5Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10 12C11.1046 12 12 10.8807 12 9.5C12 8.11929 11.1046 7 10 7C8.89543 7 8 8.11929 8 9.5C8 10.8807 8.89543 12 10 12Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Show;
