import { baseColors, fontsFamily, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textTitle: {
    fontFamily: fontsFamily.medium,
  },
  textHeading: {
    fontFamily: fontsFamily.bold,
  },
  wrapper: {
    backgroundColor: baseColors.whitePure,
    marginBottom: 30,
    marginTop: 10,
  },
  infoCart: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
  },
  image: {
    borderRadius: 10,
    width: 102,
    height: 102,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  buttonRemove: {
    borderTopWidth: 1,
    borderColor: baseColors.grayExtraLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  groupInfo: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    gap: 12,
  },
  priceGroup: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    paddingVertical: 8,
  },
  discountGroup: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  newPrice: {
    color: baseColors.greenDark,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.bold,
  },
  oldPrice: {
    color: baseColors.grayMedium,
    textDecorationLine: 'line-through',
    fontWeight: fontWeights.semiBold,
  },
  discountText: {
    color: baseColors.grayMedium,
    fontWeight: fontWeights.semiBold,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: baseColors.grayExtraLight,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
  },
  quantity: {
    fontSize: 16,
    fontFamily: fontsFamily.medium,
    color: baseColors.grayMedium,
  },

  disabledButton: {
    opacity: 0.5,
  },
});
