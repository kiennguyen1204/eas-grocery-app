import { baseColors, fontsFamily, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
    marginBottom: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    color: baseColors.whitePure,
    fontSize: 11,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    textAlign: 'center',
  },
});
