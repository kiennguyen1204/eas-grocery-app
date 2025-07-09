import { render } from '@testing-library/react-native';
import Banner from '..';

describe('Banner Component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Banner />);
    expect(toJSON()).toMatchSnapshot();
  });
});
