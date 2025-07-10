import { render, fireEvent } from '@testing-library/react-native';
import CategoryList from '../';
import { CATEGORIES } from '@/mocks';

describe('CategoryList Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly with data', () => {
    const container = render(
      <CategoryList data={CATEGORIES} onPress={mockOnPress} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onPress with the correct id when an item is pressed', () => {
    const { getByText } = render(
      <CategoryList data={CATEGORIES} onPress={mockOnPress} />,
    );

    // Simulate pressing the first category
    const firstCategory = getByText(CATEGORIES[0].title);
    fireEvent.press(firstCategory);

    // Check if the onPress handler is called with the correct id
    expect(mockOnPress).toHaveBeenCalledWith(CATEGORIES[0].id);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
