import { TCustomClass } from '@/interfaces';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

const UserIcon = ({
  width = 22,
  height = 24,
  color = '#4F4F4F',
}: TCustomClass) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none">
    <Mask
      id="mask0_0_4586"
      maskUnits="userSpaceOnUse"
      x="0"
      y="-2"
      width="22"
      height="29">
      <Rect y="-2" width="22" height="29" fill="white" />
    </Mask>
    <G mask="url(#mask0_0_4586)">
      <Path
        clip-rule="evenodd"
        d="M16.625 8.625C16.625 5.51953 14.1055 3 11 3C7.89453 3 5.375 5.51953 5.375 8.625C5.375 11.7305 7.89453 14.25 11 14.25C14.1055 14.25 16.625 11.7305 16.625 8.625ZM13.8477 15.5C12.9805 15.8984 12.0156 16.125 11 16.125C9.98438 16.125 9.02344 15.8984 8.15234 15.5H6C3.23828 15.5 1 17.7383 1 20.5V21.125C1 22.1602 1.83984 23 2.875 23H19.125C20.1602 23 21 22.1602 21 21.125V20.5C21 17.7383 18.7617 15.5 16 15.5H13.8477Z"
        fill={color}
      />
    </G>
  </Svg>
);

export default UserIcon;
