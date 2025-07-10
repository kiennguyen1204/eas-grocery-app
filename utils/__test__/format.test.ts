import { formatAmountNumber } from '../format';

describe('formatAmountNumber', () => {
  it('should return empty string for empty input', () => {
    expect(formatAmountNumber('')).toBe('');
  });

  it('should format integer strings with thousand separators', () => {
    expect(formatAmountNumber('1234')).toBe('1,234');
    expect(formatAmountNumber('1234567')).toBe('1,234,567');
    expect(formatAmountNumber('1000000')).toBe('1,000,000');
  });

  it('should remove decimal part and format the integer part', () => {
    expect(formatAmountNumber('1234.56')).toBe('1,234');
    expect(formatAmountNumber('1234567.89')).toBe('1,234,567');
    expect(formatAmountNumber('1000000.00')).toBe('1,000,000');
  });

  it('should remove existing commas and reformat with thousand separators', () => {
    expect(formatAmountNumber('1,234')).toBe('1,234');
    expect(formatAmountNumber('1,234,567')).toBe('1,234,567');
    expect(formatAmountNumber('1,234.56')).toBe('1,234');
  });

  it('should handle single-digit numbers', () => {
    expect(formatAmountNumber('5')).toBe('5');
  });

  it('should handle zero', () => {
    expect(formatAmountNumber('0')).toBe('0');
  });
});
