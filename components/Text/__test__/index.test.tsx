import '@testing-library/jest-native/extend-expect';

import { render, screen } from 'test-utils';

// Themes
import { baseColors } from '@/themes';

// Components
import Text, { TextCustomProps } from '..';

describe('Text', () => {
  const setup = (props?: TextCustomProps) => render(<Text {...props} />);

  it('should render correctly', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', () => {
    setup({
      color: baseColors.greenDark,
      fontFamily: 'regular',
      size: 'md',
      children: 'Mock title',
    });
    expect(screen.getByText('Mock title')).toBeTruthy();
    expect(screen.getByText('Mock title')).toBeVisible();
  });
});
