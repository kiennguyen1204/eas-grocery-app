import { fireEvent, render } from '@testing-library/react-native';
import ProductCard from '../';

describe('ProductCard Component', () => {
  const mockProps = {
    id: '1',
    imageUrl: 'https://example.com/image.jpg',
    name: 'Product Name',
    newPrice: 20,
    oldPrice: 30,
    storeName: 'Store Name',
    onPress: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const container = render(<ProductCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('calls onPress when the card is pressed', () => {
    const { getByTestId } = render(<ProductCard {...mockProps} />);
    const cardElement = getByTestId('product-card');

    fireEvent.press(cardElement);
    expect(mockProps.onPress).toHaveBeenCalledWith(mockProps.id);
  });
});
