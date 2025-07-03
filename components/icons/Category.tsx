import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

const Category = () => (
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
        d="M4.75 9.071a.65.65 0 0 1-.656.643H1.323a.65.65 0 0 1-.656-.643V6.93a.65.65 0 0 1 .656-.643h2.77a.65.65 0 0 1 .657.643V9.07ZM.667 13.357a.65.65 0 0 0 .656.643h2.77a.65.65 0 0 0 .657-.643v-2.143a.65.65 0 0 0-.656-.643H1.323a.65.65 0 0 0-.656.643v2.143ZM1.323 2a.65.65 0 0 0-.656.643v2.143a.65.65 0 0 0 .656.643h2.77a.65.65 0 0 0 .657-.643V2.643A.65.65 0 0 0 4.094 2H1.323Zm12.688 12a.65.65 0 0 0 .656-.643v-2.143a.65.65 0 0 0-.656-.643H6.28a.65.65 0 0 0-.656.643v2.143a.65.65 0 0 0 .656.643h7.73ZM5.625 4.786a.65.65 0 0 0 .656.643h7.73a.65.65 0 0 0 .656-.643V2.643A.65.65 0 0 0 14.01 2H6.28a.65.65 0 0 0-.656.643v2.143Zm8.386 4.928a.65.65 0 0 0 .656-.643V6.93a.65.65 0 0 0-.656-.643H6.28a.65.65 0 0 0-.656.643V9.07a.65.65 0 0 0 .656.643h7.73Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);

export default Category;
