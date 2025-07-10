import { fireEvent, render, screen } from 'test-utils';
import CartItem, { CartItemProps } from '..';

const mockOnRemove = jest.fn();
const mockOnIncrease = jest.fn();
const mockOnDecrease = jest.fn();

describe('CartItem component', () => {
  const mockProps: CartItemProps = {
    id: '1',
    title: 'test',
    image: 'img.png',
    price: 10,
    quantity: 2,
    onRemove: mockOnRemove,
    onIncrease: mockOnIncrease,
    onDecrease: mockOnDecrease,
    newPrice: 8,
    oldPrice: 12,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { toJSON } = render(<CartItem {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onRemove when remove button is clicked', () => {
    render(<CartItem {...mockProps} />);
    fireEvent.press(screen.getByText('Remove'));
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('should call onIncrease when increase button is clicked', () => {
    render(<CartItem {...mockProps} />);
    fireEvent.press(screen.getByText('+'));
    expect(mockOnIncrease).toHaveBeenCalled();
  });

  it('should call onDecrease when decrease button is clicked', () => {
    render(<CartItem {...mockProps} />);
    fireEvent.press(screen.getByText('-'));
    expect(mockOnDecrease).toHaveBeenCalled();
  });
});
