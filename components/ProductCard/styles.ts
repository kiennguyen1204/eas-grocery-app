import { baseColors, fontsFamily, fontWeights } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: 'white',
    marginBottom: 16,
    marginRight: 8,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  storeName: {
    opacity: 0.5,
    overflow: 'visible',
    fontSize: 14,
    lineHeight: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  discountPrice: {
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    color: baseColors.greenDark,
    overflow: 'visible',
  },

  storeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
