/**
 * Accessibility utilities for React Native components
 *
 * This file provides helper functions and constants for implementing
 * consistent accessibility features across the application.
 */

export const ACCESSIBILITY_ROLES = {
  BUTTON: 'button' as const,
  HEADER: 'header' as const,
  IMAGE: 'image' as const,
  TEXT: 'text' as const,
  LINK: 'link' as const,
  SEARCH: 'search' as const,
  MENU: 'menu' as const,
  MENUITEM: 'menuitem' as const,
  TAB: 'tab' as const,
  TABLIST: 'tablist' as const,
  ALERT: 'alert' as const,
  NONE: 'none' as const,
};

export const ACCESSIBILITY_LIVE_REGIONS = {
  NONE: 'none' as const,
  POLITE: 'polite' as const,
  ASSERTIVE: 'assertive' as const,
};

export const ACCESSIBILITY_TRAITS = {
  DISABLED: 'disabled' as const,
  SELECTED: 'selected' as const,
  CHECKED: 'checked' as const,
  BUSY: 'busy' as const,
  EXPANDED: 'expanded' as const,
};

/**
 * Creates accessibility props for button components
 */
export const createButtonAccessibility = (
  label: string,
  hint?: string,
  disabled?: boolean,
  loading?: boolean,
) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityState: {
    disabled: disabled || loading,
    busy: loading,
  },
});

/**
 * Creates accessibility props for image components
 */
export const createImageAccessibility = (label: string) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.IMAGE,
  accessibilityLabel: label,
});

/**
 * Creates accessibility props for header components
 */
export const createHeaderAccessibility = (label: string) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.HEADER,
  accessibilityLabel: label,
});

/**
 * Creates accessibility props for text input components
 */
export const createTextInputAccessibility = (
  label: string,
  hint?: string,
  isSecure?: boolean,
  disabled?: boolean,
) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint || (isSecure ? 'Secure text entry field' : undefined),
  accessibilityState: {
    disabled,
  },
});

/**
 * Creates accessibility props for navigation elements
 */
export const createNavigationAccessibility = (label: string, hint: string) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
  accessibilityLabel: label,
  accessibilityHint: hint,
});

/**
 * Creates accessibility props for product/item cards
 */
export const createProductCardAccessibility = (
  name: string,
  storeName?: string,
  price?: number,
) => {
  const priceText = price ? `, priced at $${price}` : '';
  const storeText = storeName ? ` from ${storeName}` : '';

  return {
    accessible: true,
    accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
    accessibilityLabel: `Product: ${name}${storeText}${priceText}`,
    accessibilityHint: 'Tap to view product details',
  };
};

/**
 * Creates accessibility props for error messages
 */
export const createErrorAccessibility = (message: string) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.ALERT,
  accessibilityLabel: message,
  accessibilityLiveRegion: ACCESSIBILITY_LIVE_REGIONS.POLITE,
});

/**
 * Creates accessibility props for loading indicators
 */
export const createLoadingAccessibility = (message = 'Loading') => ({
  accessible: true,
  accessibilityLabel: message,
});

/**
 * Creates accessibility props for dropdown/select components
 */
export const createDropdownAccessibility = (
  label: string,
  selectedValue: string,
  isExpanded: boolean,
  isDisabled?: boolean,
) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
  accessibilityLabel: `${label}: ${selectedValue}`,
  accessibilityHint: isDisabled
    ? 'Dropdown is disabled'
    : 'Tap to open dropdown menu',
  accessibilityState: {
    disabled: isDisabled,
    expanded: isExpanded,
  },
});

/**
 * Creates accessibility props for quantity controls
 */
export const createQuantityControlAccessibility = (
  action: 'increase' | 'decrease',
  currentQuantity: number,
  disabled?: boolean,
) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
  accessibilityLabel: `${action === 'increase' ? 'Increase' : 'Decrease'} quantity`,
  accessibilityHint: `${action === 'increase' ? 'Increase' : 'Decrease'} quantity from ${currentQuantity}`,
  accessibilityState: {
    disabled,
  },
});

/**
 * Creates accessibility props for cart-related elements
 */
export const createCartAccessibility = (itemCount: number) => ({
  accessible: true,
  accessibilityRole: ACCESSIBILITY_ROLES.BUTTON,
  accessibilityLabel: `Shopping cart with ${itemCount} items`,
  accessibilityHint: 'Tap to view your shopping cart',
});

/**
 * Formats price for accessibility
 */
export const formatPriceForAccessibility = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Formats discount for accessibility
 */
export const formatDiscountForAccessibility = (
  originalPrice: number,
  discountPrice: number,
): string => {
  const discountPercent = Math.round((1 - discountPrice / originalPrice) * 100);
  return `${discountPercent}% off`;
};
