import { MESSAGES } from '@/constants';
import { PRODUCTS } from '@/mocks';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ProductList from '../';

const SMALL_PRODUCTS = PRODUCTS.slice(0, 2);

describe('ProductList Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with horizontal layout', () => {
    render(
      <ProductList
        products={SMALL_PRODUCTS}
        isGridView={false}
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText(SMALL_PRODUCTS[0].name)).toBeTruthy();
    expect(screen.getByText(SMALL_PRODUCTS[1].name)).toBeTruthy();
  });

  it('renders correctly with grid layout', () => {
    render(
      <ProductList
        products={SMALL_PRODUCTS}
        isGridView={true}
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText(SMALL_PRODUCTS[0].name)).toBeTruthy();
    expect(screen.getByText(SMALL_PRODUCTS[1].name)).toBeTruthy();
  });

  it('calls onPress when a product card is pressed', () => {
    render(
      <ProductList
        products={SMALL_PRODUCTS}
        isGridView={false}
        onPress={mockOnPress}
      />,
    );

    const firstProductCard = screen.getByText(SMALL_PRODUCTS[0].name);
    fireEvent.press(firstProductCard);
    expect(mockOnPress).toHaveBeenCalledWith(SMALL_PRODUCTS[0].id);
  });

  it('renders empty state when no products are provided', () => {
    render(
      <ProductList products={[]} isGridView={false} onPress={mockOnPress} />,
    );

    expect(screen.getByText(MESSAGES.EMPTY_PRODUCT_LIST)).toBeTruthy();
  });
});
