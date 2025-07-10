import SignUpForm from '@/components/SignUpForm';
import { ERROR_MESSAGES } from '@/constants';
import { act, fireEvent, render, screen } from 'test-utils';

describe('SignUpForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with default props', () => {
    const tree = render(<SignUpForm onSubmit={mockOnSubmit} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot when loading', () => {
    const tree = render(
      <SignUpForm onSubmit={mockOnSubmit} isLoading={true} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders signup form elements correctly', () => {
    render(<SignUpForm isLoading={false} onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Welcome to tradly')).toBeTruthy();
    expect(screen.getByText('Sign up to your account')).toBeTruthy();
    expect(screen.getByPlaceholderText('First Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email ID/Phone Number')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Re-enter Password')).toBeTruthy();
    expect(screen.getByTestId('button-pressable')).toBeTruthy();
    expect(screen.getByText('Have an account?')).toBeTruthy();
    expect(screen.getByText('Sign in')).toBeTruthy();
  });

  it('should disable create button when form is empty', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const createButton = screen.getByTestId('button-pressable');
    expect(createButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should show firstName validation error when field is empty', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const firstNameInput = screen.getByLabelText('First Name');

    await act(async () => {
      fireEvent.changeText(firstNameInput, '');
      fireEvent(firstNameInput, 'blur');
    });

    expect(
      screen.getByText(ERROR_MESSAGES.FIELD_REQUIRED('First Name')),
    ).toBeTruthy();
  });

  it('should show lastName validation error when field is empty', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const lastNameInput = screen.getByLabelText('Last Name');

    await act(async () => {
      fireEvent.changeText(lastNameInput, '');
      fireEvent(lastNameInput, 'blur');
    });

    expect(
      screen.getByText(ERROR_MESSAGES.FIELD_REQUIRED('Last Name')),
    ).toBeTruthy();
  });

  it('should show email validation error for invalid email', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');

    await act(async () => {
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent(emailInput, 'blur');
    });

    expect(
      screen.getByText(ERROR_MESSAGES.FIELD_INVALID('Email')),
    ).toBeTruthy();
  });

  it('should show password validation error for short password', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText('Password');
    const createButton = screen.getByText('Create');

    await act(async () => {
      fireEvent.changeText(passwordInput, 'short');
      fireEvent(passwordInput, 'blur');
    });

    expect(screen.getByText(ERROR_MESSAGES.PASSWORD_TOO_LONG)).toBeTruthy();
  });

  it('should show confirmPassword validation error when passwords do not match', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Re-enter Password');

    await act(async () => {
      fireEvent.changeText(passwordInput, 'Password123!');
      fireEvent.changeText(confirmPasswordInput, 'Different123!');
      fireEvent(confirmPasswordInput, 'blur');
    });

    expect(screen.getByText(ERROR_MESSAGES.PASSWORD_NOT_MATCH)).toBeTruthy();
  });

  it('should not call onSubmit when form is invalid', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Re-enter Password');
    const createButton = screen.getByText('Create');

    await act(async () => {
      fireEvent.changeText(firstNameInput, '');
      fireEvent.changeText(lastNameInput, '');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'short');
      fireEvent.changeText(confirmPasswordInput, 'different');
      fireEvent.press(createButton);
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
