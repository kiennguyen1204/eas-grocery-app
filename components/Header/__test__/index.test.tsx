import { fireEvent, render, screen } from 'test-utils';
import Header, { HeaderProps } from '..';

const mockOnChangeText = jest.fn();
const mockOnNavigate = jest.fn();

describe('SlideItem component', () => {
  const mockProps: HeaderProps = {
    title: 'test',
    totalQuantity: 2,
    isSearch: true,
    onChangeText: mockOnChangeText,
    onNavigate: mockOnNavigate,
  };

  it('Should render properly', () => {
    const { toJSON } = render(<Header {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onChangeText when handleSearch is triggered', () => {
    render(<Header {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Search Product');

    fireEvent.changeText(searchInput, 'Test Search');

    expect(mockOnChangeText).toHaveBeenCalledWith('Test Search');
  });

  it('should call onNavigate when handleNavigation is triggered', () => {
    render(<Header {...mockProps} />);

    fireEvent.press(screen.getByTestId('cart-button'));

    expect(mockOnNavigate).toHaveBeenCalled();
  });
});
