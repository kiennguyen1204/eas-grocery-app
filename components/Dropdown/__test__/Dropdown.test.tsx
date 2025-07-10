import { ICategory } from '@/interfaces';
import { fireEvent, render, screen } from 'test-utils';
import Dropdown, { DropdownProps } from '..';

const mockOnSelect = jest.fn();

const options: ICategory[] = [
  { id: 1, title: 'Option 1', value: 'option1' },
  { id: 2, title: 'Option 2', value: 'option2' },
];

describe('Dropwdown component', () => {
  const mockProps: DropdownProps = {
    defaultValue: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render properly', () => {
    const { toJSON } = render(<Dropdown {...mockProps} />);
    expect(toJSON).toMatchSnapshot();
  });

  test('renders with default value', () => {
    render(
      <Dropdown
        defaultValue="Select an option"
        options={options}
        onSelect={mockOnSelect}
      />,
    );
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  test('opens dropdown when pressed', () => {
    render(
      <Dropdown
        defaultValue="Select an option"
        options={options}
        onSelect={mockOnSelect}
      />,
    );
    fireEvent.press(screen.getByText('Select an option'));
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
  });

  test('calls onSelect and updates value when an option is selected', () => {
    render(
      <Dropdown
        defaultValue="Select an option"
        options={options}
        onSelect={mockOnSelect}
      />,
    );
    fireEvent.press(screen.getByText('Select an option'));
    fireEvent.press(screen.getByText('Option 1'));
    expect(mockOnSelect).toHaveBeenCalledWith('option1');
    expect(screen.getByText('option1')).toBeTruthy();
  });

  test('closes dropdown after selecting an option', () => {
    render(
      <Dropdown
        defaultValue="Select an option"
        options={options}
        onSelect={mockOnSelect}
      />,
    );
    fireEvent.press(screen.getByText('Select an option'));
    fireEvent.press(screen.getByText('Option 1'));
    expect(screen.queryByText('Option 2')).toBeNull();
  });
});
