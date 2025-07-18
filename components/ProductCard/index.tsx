import { memo } from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

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
        onPress={() => onPress(id)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.PRODUCT_CARD(
          name,
          storeName,
          roundToDecimal(discountPrice || 0),
        )}
        accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.PRODUCT_CARD}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.PRODUCT_IMAGE(name)}
        />
        <View style={styles.infoContainer}>
          <Text
            style={styles.name}
            accessible={true}
            accessibilityRole="header">
            {name}
          </Text>
          <View style={styles.storeContainer}>
            <Text
              style={styles.storeName}
              numberOfLines={1}
              accessible={true}
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.PRODUCT_STORE(
                storeName,
              )}>
              {storeName}
            </Text>
            <View style={styles.priceContainer}>
              {discountPrice && (
                <Text
                  style={styles.discountPrice}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  accessible={true}
                  accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.PRODUCT_PRICE(
                    roundToDecimal(discountPrice),
                  )}>
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
