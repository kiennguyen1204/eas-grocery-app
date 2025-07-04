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
  REMOVE_FROM_CART_FAILED:
    'Failed to remove item from cart. Please try again later.',
  UPDATE_CART_QUANTITY_FAILED:
    'Failed to update cart quantity. Please try again later.',
  ADD_TO_CART_FAILED: 'Failed to add item to cart. Please try again later.',
};

export const SERVER_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad Request: Please check your input.',
  401: 'Unauthorized: Please log in again.',
  403: "Forbidden: You don't have permission to perform this action.",
  404: 'Not Found: The requested resource does not exist.',
  500: 'Internal Server Error: Something went wrong on our end.',
};

export const SUCCESS_MESSAGES = {
  ADD_TO_CART: 'Item added to cart successfully.',
  REMOVE_FROM_CART: 'Item removed from cart successfully.',
  LOGIN_SUCCESS: 'Login Successful! Welcome back!',
  REGISTER_SUCCESS: 'Registration Successful! Welcome to the community!',
};

export const MESSAGES = {
  EMPTY_CART: 'Your cart is empty.',
  EMPTY_PRODUCT_LIST: 'No products available at the moment.',
  NOTIFICATION: 'Notification',
  NEW_NOTIFICATION_MESSAGE: 'You have a new notifications.',
  ALREADY_IN_CART: 'This product is already in your cart.',
};
