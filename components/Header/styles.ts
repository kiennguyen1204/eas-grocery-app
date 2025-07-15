import { baseColors, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: baseColors.greenDark,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  groupNav: {
    display: 'flex',
    flexDirection: 'row',
    gap: 19,
  },
  navLink: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  totalQuantity: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 150,
    backgroundColor: baseColors.redPrimary,
    zIndex: 1000,
    left: 15,
  },
  textQuantity: {
    bottom: 1,
  },
  groupDropdown: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feature: {
    width: '100%',
  },
  heading: {
    fontFamily: fontWeights.bold,
  },
});
