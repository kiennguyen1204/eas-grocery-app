import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Interfaces
import { TProduct } from '@/interfaces';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

type ProductCardProps = Pick<
  TProduct,
  'id' | 'name' | 'storeName' | 'oldPrice' | 'newPrice'
> & {
  imageUrl: string;
  onPress: (id: string) => void;
};

const ProductCard = ({
  id,
  imageUrl,
  name,
  newPrice,
  storeName,
  oldPrice,
  onPress,
}: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        testID="product-card"
        style={styles.cardContent}
        onPress={() => onPress(id)}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.storeContainer}>
            <Text style={styles.storeName} numberOfLines={1}>
              {storeName}
            </Text>
            <View style={styles.priceContainer}>
              {oldPrice && <Text style={styles.oldPrice}>${oldPrice}</Text>}
              <Text style={styles.newPrice}>${newPrice}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 40,
    overflow: 'visible',
    fontSize: 14,
    lineHeight: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: baseColors.grayMedium,
    fontSize: 12,
    marginRight: 5,
  },
  newPrice: {
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    color: baseColors.greenDark,
  },

  storeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default ProductCard;
