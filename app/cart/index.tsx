import { router } from 'expo-router';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import {
  Button,
  CartItem,
  ChevronLeftIcon,
  Text,
  TotalCart,
} from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  MESSAGES,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';

// Hooks
import { useGetCart, useRemoveFromCart, useUpdateCartQuantity } from '@/hooks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

export default function CartScreen() {
  const { data: cartItems = [], isLoading: isLoadingCart } = useGetCart();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateCartQuantity, isPending: isUpdating } =
    useUpdateCartQuantity();

  const handleRemoveItem = async (cartItemId: string) => {
    removeFromCart(cartItemId, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: SUCCESS_MESSAGES.REMOVE_FROM_CART,
        });
      },
      onError: (error: Error) => {
        const errorMessage =
          error.message || ERROR_MESSAGES.REMOVE_FROM_CART_FAILED;
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      },
    });
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    updateCartQuantity(
      { cartItemId, quantity },
      {
        onError: error => {
          const errorMessage =
            error.message || ERROR_MESSAGES.UPDATE_CART_QUANTITY_FAILED;
          Toast.show({
            type: 'error',
            text1: errorMessage,
          });
        },
      },
    );
  };

  const handleCheckout = async () => {
    try {
      await Promise.all(
        cartItems.map(item =>
          removeFromCart(item.id!, {
            onSuccess: () => {
              Toast.show({
                type: 'success',
                text1: SUCCESS_MESSAGES.REMOVE_FROM_CART,
              });
              router.push(ROUTES.HOME as never);
            },
            onError: (error: Error) => {
              const errorMessage =
                error.message || ERROR_MESSAGES.REMOVE_FROM_CART_FAILED;
              Toast.show({
                type: 'error',
                text1: errorMessage,
              });
            },
          }),
        ),
      );

      Toast.show({
        type: 'success',
        text1: SUCCESS_MESSAGES.CHECKOUT_SUCCESS,
      });
    } catch (error) {
      let errorMessage = ERROR_MESSAGES.CHECKOUT_FAILED;
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    }
  };

  const handleNavigateBack = () => {
    router.back();
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.newPrice ?? item.price ?? 0) * (item.quantity ?? 0),
    0,
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0,
  );

  const handlePressBackIcon = () => {
    handleNavigateBack();
  };

  const renderCartContent = () => {
    if (isLoadingCart) {
      return (
        <ActivityIndicator
          size="large"
          color={baseColors.greenDark}
          style={{ marginTop: 20 }}
        />
      );
    }

    if (cartItems.length === 0) {
      return <Text style={styles.emptyCartText}>{MESSAGES.EMPTY_CART}</Text>;
    }

    return cartItems.map(item => {
      const { id, title, newPrice, oldPrice, image, quantity } = item || {};
      if (!id) return null;

      return (
        <View key={id}>
          <CartItem
            id={id}
            title={title ?? ''}
            newPrice={newPrice ?? item.price ?? 0}
            oldPrice={oldPrice ?? 0}
            image={image ?? ''}
            quantity={quantity ?? 0}
            onRemove={() => handleRemoveItem(id)}
            onIncrease={() => handleUpdateQuantity(id, (quantity ?? 0) + 1)}
            onDecrease={() => handleUpdateQuantity(id, (quantity ?? 0) - 1)}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.textHeading} size="xl">
            My Cart
          </Text>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCartContent()}
        <TotalCart totalPrice={totalPrice} totalQuantity={totalQuantity} />
      </ScrollView>
      <View style={styles.checkoutWrapper}>
        <Button
          style={styles.btnCheckout}
          size="large"
          title="Checkout"
          onPress={handleCheckout}
          disabled={cartItems.length === 0 || isRemoving || isUpdating}
          isLoading={isRemoving || isUpdating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColors.whiteSoft,
    height: '100%',
    paddingBottom: 80,
  },
  checkoutWrapper: {
    backgroundColor: baseColors.whitePure,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 16,
    borderRadius: 16,
  },
  btnCheckout: {
    width: '100%',
    height: 50,
    borderRadius: 24,
  },
  header: {
    backgroundColor: baseColors.greenDark,
    gap: 30,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  titleGroup: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  textHeading: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whiteSoft,
    textAlign: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontFamily: fontsFamily.regular,
    fontWeight: fontWeights.bold,
    color: baseColors.greenDark,
    textAlign: 'center',
    marginTop: 20,
  },
});
