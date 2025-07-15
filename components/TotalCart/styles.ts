import { baseColors, fontsFamily } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontsFamily.bold,
  },
  wrapper: {
    backgroundColor: baseColors.whitePure,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  groupInfo: {
    padding: 15,
    flexDirection: 'column',
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmount: {
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: baseColors.grayExtraLight,
    justifyContent: 'space-between',
  },
});
