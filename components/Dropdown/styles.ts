import { baseColors, fontsFamily } from '@/themes';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dropdownButton: {
    ...Platform.select({
      ios: {
        paddingHorizontal: 12,
      },
      android: {
        paddingHorizontal: 20,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    borderRadius: 23,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: baseColors.grayMedium,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownList: {
    backgroundColor: baseColors.whitePure,
    borderRadius: 8,
    width: '80%',
    maxHeight: 200,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: baseColors.grayMedium,
    fontFamily: fontsFamily.medium,
  },
});
