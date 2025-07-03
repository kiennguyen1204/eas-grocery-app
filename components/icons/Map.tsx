import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

const Map = () => (
  <Svg fill="none" width={16} height={16}>
    <Mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path fill="#fff" d="M0 0h16v16H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M2.667 6.333a5 5 0 1 1 10 0c0 2.016-.703 2.58-4.486 8.065a.625.625 0 0 1-1.028 0C3.369 8.912 2.667 8.349 2.667 6.334Zm7.083 0a2.083 2.083 0 1 0-4.167 0 2.083 2.083 0 0 0 4.167 0Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default Map;
