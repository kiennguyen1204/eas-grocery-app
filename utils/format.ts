export const formatAmountNumber = (value: string): string => {
  if (!value) {
    return value;
  }

  if (Number.isNaN(parseFloat(value))) {
    return '';
  }

  const dotIndex = value.indexOf('.');
  const newValue =
    dotIndex > -1
      ? value.slice(0, dotIndex).replaceAll(',', '')
      : value.replaceAll(',', '');

  const newValueFormat = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return newValueFormat;
};

export const roundToDecimal = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Calculate discount percentage between original and discounted price
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The discount percentage as a number (0-100)
 */
export const calculateDiscountPercentage = (
  originalPrice?: number,
  discountedPrice?: number,
): number => {
  if (!originalPrice || !discountedPrice || originalPrice <= 0) {
    return 0;
  }

  if (discountedPrice >= originalPrice) {
    return 0;
  }

  return Math.round((1 - discountedPrice / originalPrice) * 100);
};
