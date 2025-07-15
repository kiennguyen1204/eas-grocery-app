import { baseColors, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    backgroundColor: baseColors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    position: 'absolute',
    bottom: 0,
    top: 60,
    left: '30%',
  },
  logoText: {
    color: baseColors.whitePure,
    fontSize: 24,
    fontWeight: fontWeights.bold,
  },
  storeName: {
    marginTop: 35,
    fontSize: 14,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  followButton: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  followText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
