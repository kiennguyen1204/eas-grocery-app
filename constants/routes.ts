export const ROUTES = {
  ONBOARDING: '/(auths)',
  CATEGORY: (id: number) => `/categories/${id}` as const,
  LOGIN: '/(auths)/login',
  HOME: '/(tabs)',
  PRODUCT_DETAIL: (id: string) => `/products/${id}` as const,
  BROWSE: '/(tabs)/browse',
  CART: '/cart',
  EDIT_PROFILE: '/profile/edit-profile',
  PROFILE: '/(tabs)/profile',
} as const;
