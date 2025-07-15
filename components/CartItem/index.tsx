import { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

// Themes
import { baseColors } from '@/themes';

// Components
import { Text } from '@/components';

// Styles
import { styles } from './styles';

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
  isUpdating?: boolean;
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
  isUpdating,
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
              style={[
                styles.quantityButton,
                isUpdating && styles.disabledButton,
              ]}
              disabled={isUpdating}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={onIncrease}
              style={[
                styles.quantityButton,
                isUpdating && styles.disabledButton,
              ]}
              disabled={isUpdating}>
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

export default memo(CartItem);
