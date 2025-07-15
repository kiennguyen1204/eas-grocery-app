import { memo } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

// Interfaces
import { TProduct } from '@/interfaces';

// Utils
import { roundToDecimal } from '@/utils';

// Styles
import { styles } from './styles';

type ProductCardProps = Pick<
  TProduct,
  'id' | 'name' | 'storeName' | 'price' | 'discountPrice'
> & {
  imageUrl: string;
  onPress: (id: string) => void;
};

const ProductCard = ({
  id,
  imageUrl,
  name,
  discountPrice,
  storeName,
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
              {discountPrice && (
                <Text
                  style={styles.discountPrice}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  ${roundToDecimal(discountPrice)}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ProductCard);
