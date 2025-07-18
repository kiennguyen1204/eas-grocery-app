/**
 * Accessibility Configuration for React Native Expo App
 *
 * This file contains accessibility settings and best practices
 * for the grocery store application.
 */

import { AccessibilityInfo } from 'react-native';

export const ACCESSIBILITY_CONFIG = {
  MIN_TOUCH_TARGET_SIZE: 44,

  // Screen reader announcement delays
  ANNOUNCEMENT_DELAY: {
    SHORT: 100,
    MEDIUM: 500,
    LONG: 1000,
  },

  // Common accessibility labels
  LABELS: {
    // General
    LOADING: 'Loading',
    ERROR: 'Error',
    SUCCESS: 'Success',
    CLOSE: 'Close',
    BACK: 'Go back',
    NEXT: 'Next',
    PREVIOUS: 'Previous',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    EDIT: 'Edit',

    // Categories
    CATEGORY_LIST: 'Product categories',
    CATEGORY_ITEM: (title: string) => `Category: ${title}`,
    CATEGORY_IMAGE: (title: string) => `${title} category image`,

    // Products
    PRODUCT_CARD: (name: string, storeName: string, price: string | number) =>
      `Product: ${name} from ${storeName}, priced at $${price}`,
    PRODUCT_IMAGE: (name: string) => `Product image for ${name}`,
    PRODUCT_STORE: (storeName: string) => `Store: ${storeName}`,
    PRODUCT_PRICE: (price: string | number) => `Price: $${price}`,

    // Cart
    ADD_TO_CART: 'Add to cart',
    REMOVE_FROM_CART: (title: string) => `Remove ${title} from cart`,
    INCREASE_QUANTITY: 'Increase quantity',
    DECREASE_QUANTITY: 'Decrease quantity',
    CART_QUANTITY: (quantity: number) => `Quantity: ${quantity}`,
    CART_ITEMS_COUNT: (count: number) => `${count} items in cart`,
    CART_ITEM_IMAGE: (title: string) => `Product image for ${title}`,
    CART_CURRENT_PRICE: (price: number) => `Current price: $${price}`,
    CART_ORIGINAL_PRICE: (price: number) => `Original price: $${price}`,
    CART_DISCOUNT: (percentage: number) => `Discount: ${percentage}% off`,

    // Banner
    BANNER_CAROUSEL: 'Banner carousel',
    BANNER_ITEM: (title: string) => `Banner: ${title}`,

    // Store
    STORE_CARD: (name: string) => `Store: ${name}`,
    STORE_IMAGE: (name: string) => `Store image for ${name}`,
    STORE_LOGO: (letter: string) => `Store logo: ${letter}`,
    FOLLOW_STORE: (storeName: string) => `Follow ${storeName} store`,

    // Navigation
    FAVORITES_BUTTON: 'Favorites',
    CART_BUTTON: 'View shopping cart',

    // Dropdown
    DROPDOWN_BUTTON: (label: string, value: string) => `${label}: ${value}`,
    DROPDOWN_OPTION: (option: string) => `Select ${option} option`,
    DROPDOWN_MENU: (label: string) => `${label} options`,
    DROPDOWN_ICON: 'Dropdown icon',
    CLOSE_DROPDOWN: 'Close dropdown',

    // Input
    INPUT_ICON: 'Input icon',
    TOGGLE_PASSWORD: 'Toggle password visibility',
    TEXT_INPUT: (label?: string) => label || 'Text input',
    ACTION_BUTTON: 'Action button',
  },

  // Common accessibility hints
  HINTS: {
    // General
    TAP_TO_OPEN: 'Tap to open',
    TAP_TO_CLOSE: 'Tap to close',
    TAP_TO_SELECT: 'Tap to select',
    TAP_TO_EDIT: 'Tap to edit',
    TAP_TO_DELETE: 'Tap to delete',
    SWIPE_FOR_MORE: 'Swipe to see more options',
    DOUBLE_TAP_TO_ACTIVATE: 'Double tap to activate',

    // Categories
    CATEGORY_LIST: 'Browse product categories',
    CATEGORY_ITEM: (title: string) => `Tap to browse ${title} products`,

    // Products
    PRODUCT_CARD: 'Tap to view product details',

    // Banner
    BANNER_CAROUSEL: 'Swipe left or right to browse banners',
    BANNER_BUTTON: (text: string) => `Tap to ${text.toLowerCase()}`,

    // Cart
    REMOVE_FROM_CART: 'Tap to remove this item from cart',
    INCREASE_QUANTITY: (quantity: number) =>
      `Increase quantity from ${quantity}`,
    DECREASE_QUANTITY: (quantity: number) =>
      `Decrease quantity from ${quantity}`,

    // Store
    STORE_CARD: 'Tap to view store details',
    FOLLOW_STORE: 'Tap to follow this store',

    // Navigation
    FAVORITES_BUTTON: 'Tap to view your favorite items',
    CART_BUTTON: 'Tap to view items in your cart',

    // Dropdown
    DROPDOWN_BUTTON: 'Tap to open dropdown menu',
    DROPDOWN_DISABLED: 'Dropdown is disabled',
    DROPDOWN_OPTION: (option: string) => `Tap to select ${option}`,
    CLOSE_DROPDOWN: 'Tap to close the dropdown menu',

    // Input
    SECURE_TEXT_ENTRY: 'Secure text entry field',
    TEXT_INPUT: (label?: string) => `Enter ${label?.toLowerCase() || 'text'}`,
    TOGGLE_PASSWORD_SHOW: 'Tap to show password',
    TOGGLE_PASSWORD_HIDE: 'Tap to hide password',
    ACTION_BUTTON: 'Tap to perform action',
  },

  // Timeout values for accessibility announcements
  TIMEOUTS: {
    TOAST: 3000,
    ALERT: 5000,
    FORM_ERROR: 4000,
  },
};

/**
 * Check if screen reader is enabled
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.warn('Failed to check screen reader status:', error);
    return false;
  }
};

/**
 * Check if reduce motion is enabled
 */
export const isReduceMotionEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isReduceMotionEnabled();
  } catch (error) {
    console.warn('Failed to check reduce motion status:', error);
    return false;
  }
};

/**
 * Announce a message to screen readers
 */
export const announceToScreenReader = (message: string, delay = 0) => {
  setTimeout(() => {
    try {
      AccessibilityInfo.announceForAccessibility(message);
    } catch (error) {
      console.warn('Failed to announce message:', error);
    }
  }, delay);
};

/**
 * Best practices for accessibility implementation
 */
export const ACCESSIBILITY_BEST_PRACTICES = {
  // Touch targets should be at least 44x44 points
  TOUCH_TARGET_SIZE: 44,

  // Color contrast ratios
  COLOR_CONTRAST: {
    AA_NORMAL: 4.5, // WCAG AA for normal text
    AA_LARGE: 3, // WCAG AA for large text
    AAA_NORMAL: 7, // WCAG AAA for normal text
    AAA_LARGE: 4.5, // WCAG AAA for large text
  },

  // Font size recommendations
  FONT_SIZES: {
    MIN_BODY_TEXT: 16, // Minimum readable size
    MIN_TOUCH_TARGET_TEXT: 14, // Minimum for interactive elements
    LARGE_TEXT_THRESHOLD: 18, // Considered large text
  },

  // Animation duration limits
  ANIMATION: {
    MAX_DURATION: 3000, // Maximum recommended animation duration
    REDUCED_MOTION_DURATION: 200, // Duration when reduce motion is enabled
  },

  // Accessibility roles
  ROLES: {
    BUTTON: 'button',
    HEADER: 'header',
    TEXT: 'text',
    IMAGE: 'image',
    LINK: 'link',
    SEARCH: 'search',
    ADJUSTABLE: 'adjustable',
    TAB: 'tab',
    TABLIST: 'tablist',
    MENU: 'menu',
    MENUITEM: 'menuitem',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SWITCH: 'switch',
    ALERT: 'alert',
    NONE: 'none',
  },
};

/**
 * Accessibility testing helpers
 */
export const ACCESSIBILITY_TEST_IDS = {
  BANNER_CAROUSEL: 'banner-carousel',
  PRODUCT_CARD: 'product-card',
  CART_BUTTON: 'cart-button',
  SEARCH_INPUT: 'search-input',
  CATEGORY_LIST: 'category-list',
  LOADING_INDICATOR: 'loading-indicator',
  ERROR_MESSAGE: 'error-message',
  SUCCESS_MESSAGE: 'success-message',
};

/**
 * Common accessibility props for different component types
 */
export const COMMON_ACCESSIBILITY_PROPS = {
  // For decorative images that should be ignored by screen readers
  DECORATIVE_IMAGE: {
    accessible: false,
    importantForAccessibility: 'no-hide-descendants' as const,
  },

  // For containers that should group content
  CONTENT_GROUP: {
    accessible: true,
    accessibilityRole: 'none' as const,
  },

  // For dismissible overlays
  DISMISSIBLE_OVERLAY: {
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityLabel: 'Close overlay',
    accessibilityHint: 'Tap to dismiss',
  },

  // For loading states
  LOADING_STATE: {
    accessible: true,
    accessibilityLabel: 'Loading',
    accessibilityLiveRegion: 'polite' as const,
  },
};
