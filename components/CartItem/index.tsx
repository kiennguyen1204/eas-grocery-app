import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

// Components
import { Text } from '@/components';

export type CartItemProps = {
  id?: string;
  title?: string;
  image?: string;
  price?: number;
  quantity: number;
  onRemove: (id: string) => void;
  newPrice?: number;
  oldPrice?: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
  newPrice,
  oldPrice,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  const handleRemoveItem = () => {
    onRemove && onRemove(id as string);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoCart}>
        <Image
          source={{ uri: image }}
          style={[styles.image]}
          resizeMode="cover"
        />
        <View style={styles.groupInfo}>
          <Text
            style={[styles.textTitle, { maxWidth: 260 }]}
            color={baseColors.grayMedium}>
            {title}
          </Text>
          <View style={styles.price}>
            <View style={styles.priceGroup}>
              <Text style={styles.newPrice}>${newPrice || price || 0}</Text>
              {oldPrice ? (
                <View style={styles.discountGroup}>
                  <Text style={styles.oldPrice}>${oldPrice}</Text>
                  <Text style={styles.discountText}>
                    {newPrice && oldPrice
                      ? `${Math.round((1 - newPrice / oldPrice) * 100)}% off`
                      : '0% off'}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={onDecrease}
              style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={onIncrease}
              style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonRemove} onPress={handleRemoveItem}>
        <Text style={styles.textTitle} color={baseColors.grayMedium}>
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: fontsFamily.medium,
  },
  textHeading: {
    fontFamily: fontsFamily.bold,
  },
  wrapper: {
    backgroundColor: baseColors.whitePure,
    marginBottom: 30,
    marginTop: 10,
  },
  infoCart: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
  },
  image: {
    borderRadius: 10,
    width: 102,
    height: 102,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  buttonRemove: {
    borderTopWidth: 1,
    borderColor: baseColors.grayExtraLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  groupInfo: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    gap: 12,
  },
  priceGroup: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    paddingVertical: 8,
  },
  discountGroup: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  newPrice: {
    color: baseColors.greenDark,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.bold,
  },
  oldPrice: {
    color: baseColors.grayMedium,
    textDecorationLine: 'line-through',
    fontWeight: fontWeights.semiBold,
  },
  discountText: {
    color: baseColors.grayMedium,
    fontWeight: fontWeights.semiBold,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: baseColors.grayExtraLight,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
  },
  quantity: {
    fontSize: 16,
    fontFamily: fontsFamily.medium,
    color: baseColors.grayMedium,
  },
});

export default CartItem;
