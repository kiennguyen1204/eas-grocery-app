import LoginForm from '@/components/LoginForm';
import { ERROR_MESSAGES } from '@/constants';
import { act, fireEvent, render, screen } from 'test-utils';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with default props', () => {
    const tree = render(<LoginForm onSubmit={mockOnSubmit} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot when loading', () => {
    const tree = render(
      <LoginForm onSubmit={mockOnSubmit} isLoading={true} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123!');

    await act(async () => {
      fireEvent.press(loginButton);
    });

    expect(mockOnSubmit.mock.calls[0][0]).toEqual({
      email: 'test@example.com',
      password: 'Password123!',
    });
  });

  it('should disable login button when form is empty', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const loginButton = screen.getByTestId('button-pressable');
    expect(loginButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should show email validation error for invalid email', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');

    await act(async () => {
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent(emailInput, 'blur');
    });

    expect(
      screen.getByText(ERROR_MESSAGES.FIELD_INVALID('Email')),
    ).toBeTruthy();
  });

  it('should toggle password visibility when clicking password icon', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText('Password');
    const togglePasswordIcon = screen.getByTestId('icon');

    expect(passwordInput.props.secureTextEntry).toBe(true);

    await act(async () => {
      fireEvent.press(togglePasswordIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(false);

    await act(async () => {
      fireEvent.press(togglePasswordIcon);
    });

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('should not call onSubmit when form is invalid', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    await act(async () => {
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'short');
      fireEvent.press(loginButton);
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
