import { render } from '@testing-library/react-native';
import TotalCart from '..';

describe('TotalCart Component', () => {
  it('renders correctly with total price', () => {
    const container = render(<TotalCart totalPrice={100} totalQuantity={5} />);
    expect(container).toMatchSnapshot();
  });
});
