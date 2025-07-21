import { baseColors, fontsFamily, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  bannerWrapper: {
    marginRight: 10,
  },
  banner: {
    width: 300,
    height: 165,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    paddingHorizontal: 20,
  },
  noImage: {
    backgroundColor: 'black',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  button: {
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: baseColors.whitePure,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whitePure,
  },
});
