export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required.`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}.`,
  INVALID_PASSWORD:
    'Password must be between 8 and 32 characters, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  PASSWORD_NOT_MATCH: 'Password and Confirm Password do not match.',
  PASSWORD_TOO_LONG: 'Password must be less than 8 characters.',
  REQUEST: 'Request failed. Please try again later.',
  SERVER_ERROR: 'Server error. Please try again later.',
  LOGIN_FAILED: 'Login Failed. Please check your credentials.',
  SIGNUP_FAILED: 'Sign up failed. Please try again later.',
  USERNAME_EMAIL_TAKEN:
    'Username or password is already taken. Please choose a different one.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please try again.',
  PRODUCT_NOT_FOUND: 'Product not found. Please check the product ID.',
};
