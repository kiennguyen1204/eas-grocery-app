import { fireEvent, render, screen } from 'test-utils';
import Button, { ButtonProps } from '..';

describe('Button', () => {
  const setup = (props?: ButtonProps) => render(<Button {...props} />);

  const mockProps: ButtonProps = {
    title: 'Click me',
    variant: 'primary',
    size: 'medium',
    isLoading: false,
  };

  it('should render correctly', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', () => {
    setup({
      title: 'Mock title',
      variant: 'primary',
      size: 'small',
      isLoading: true,
    });

    expect(screen.getByText('Mock title')).toBeTruthy();

    setup({
      title: 'Mock secondary',
      variant: 'secondary',
    });

    expect(screen.getByText('Mock secondary')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button {...mockProps} onPress={onPressMock} />,
    );
    const buttonElement = getByText(mockProps.title!);
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button {...mockProps} disabled />);
    const buttonElement = getByText(mockProps.title!);

    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
