import { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

// Themes
import { baseColors } from '@/themes';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

// Components
import { Text } from '@/components';

// Utils
import { calculateDiscountPercentage } from '@/utils';

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

  const discountPercentage = calculateDiscountPercentage(oldPrice, newPrice);

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoCart}>
        <Image
          source={{ uri: image }}
          style={[styles.image]}
          resizeMode="cover"
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_ITEM_IMAGE(
            title || 'item',
          )}
        />
        <View style={styles.groupInfo}>
          <Text
            style={[styles.textTitle, { maxWidth: 260 }]}
            color={baseColors.grayMedium}
            accessible={true}
            accessibilityRole="header">
            {title}
          </Text>
          <View style={styles.price}>
            <View style={styles.priceGroup}>
              <Text
                style={styles.newPrice}
                accessible={true}
                accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_CURRENT_PRICE(
                  newPrice || price || 0,
                )}>
                ${newPrice || price || 0}
              </Text>
              {oldPrice ? (
                <View style={styles.discountGroup}>
                  <Text
                    style={styles.oldPrice}
                    accessible={true}
                    accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_ORIGINAL_PRICE(
                      oldPrice,
                    )}>
                    ${oldPrice}
                  </Text>
                  <Text
                    style={styles.discountText}
                    accessible={true}
                    accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_DISCOUNT(
                      discountPercentage,
                    )}>
                    {discountPercentage > 0
                      ? `${discountPercentage}% off`
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
              disabled={isUpdating}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.DECREASE_QUANTITY}
              accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.DECREASE_QUANTITY(
                quantity,
              )}
              accessibilityState={{
                disabled: isUpdating,
              }}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text
              style={styles.quantity}
              accessible={true}
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_QUANTITY(
                quantity,
              )}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={onIncrease}
              style={[
                styles.quantityButton,
                isUpdating && styles.disabledButton,
              ]}
              disabled={isUpdating}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.INCREASE_QUANTITY}
              accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.INCREASE_QUANTITY(
                quantity,
              )}
              accessibilityState={{
                disabled: isUpdating,
              }}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonRemove}
        onPress={handleRemoveItem}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.REMOVE_FROM_CART(
          title || 'item',
        )}
        accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.REMOVE_FROM_CART}>
        <Text style={styles.textTitle} color={baseColors.grayMedium}>
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CartItem);
