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
