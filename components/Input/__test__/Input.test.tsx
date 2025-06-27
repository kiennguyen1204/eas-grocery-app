import { Text } from 'react-native';
import { fireEvent, render, screen } from 'test-utils';
import Input from '..';

describe('Input component', () => {
  it('should render properly with label and error message', () => {
    const { toJSON } = render(
      <Input
        label="Email"
        leftIcon={<Text>LeftIcon</Text>}
        errorMessage="Email is invalid."
        value="test.com"
        placeholder="Enter your email"
      />,
    );
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Email is invalid.')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render right icon (static) without onPress', () => {
    render(
      <Input
        value="test@gmail.com"
        rightIcon={<Text testID="static-icon">Icon</Text>}
      />,
    );
    expect(screen.getByTestId('static-icon')).toBeTruthy();
  });

  it('should render right icon with onPressRightIcon and trigger press event', () => {
    const handlePress = jest.fn();
    render(
      <Input
        value="test@gmail.com"
        rightIcon={<Text>Icon</Text>}
        onIconPressed={handlePress}
      />,
    );
    const icon = screen.getByTestId('icon');
    fireEvent.press(icon);
    expect(handlePress).toHaveBeenCalled();
  });

  it('should be disabled and not editable', () => {
    const { getByDisplayValue } = render(
      <Input value="Disabled Input" disabled />,
    );
    const input = getByDisplayValue('Disabled Input');
    expect(input.props.editable).toBe(false);
  });

  it('should call onChangeText and onSubmitEditing', () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByPlaceholderText } = render(
      <Input
        value=""
        placeholder="Enter"
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
      />,
    );

    const input = getByPlaceholderText('Enter');

    fireEvent.changeText(input, 'Hello');
    fireEvent(input, 'submitEditing');

    expect(handleChange).toHaveBeenCalledWith('Hello');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should support secureTextEntry', () => {
    const { getByPlaceholderText } = render(
      <Input value="" placeholder="Password" secureTextEntry />,
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });
});
