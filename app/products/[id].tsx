import { useCallback, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView as RNScrollView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Constants
import {
  ERROR_MESSAGES,
  MESSAGES,
  NOTIFICATION_ACTION_KEYS,
  NOTIFICATION_MESSAGES,
  ROUTES,
  SCREEN_WIDTH,
} from '@/constants';

// Hooks
import { useAddToCart, useGetCart, useGetProductDetail } from '@/hooks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

// Components
import {
  Button,
  ChevronLeftIcon,
  HeartOutlineIcon,
  MoreIcon,
  ShareIcon,
  Text,
} from '@/components';

// Utils
import {
  calculateDiscountPercentage,
  checkAndRequestNotificationPermission,
  roundToDecimal,
  scheduleNotification,
} from '@/utils';

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { data: cartItems = [] } = useGetCart();

  const productId = Array.isArray(id) ? id[0] : id;
  const { data, error } = useGetProductDetail(productId);
  const {
    name,
    images,
    description,
    discountPrice,
    price,
    storeName,
    condition,
    priceType,
    categoryName,
    location,
  } = data || {};

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Image
        source={{ uri: item }}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    );
  };

  /**
   * Handles horizontal scroll of product images
   * Updates current image index based on scroll position
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleBack = () => {
    router.back();
  };

  /**
   * Handles successful addition of product to cart
   * - Requests notification permission
   * - Schedules a notification with product details
   * - Navigates to cart screen
   */
  const handleAddToCartSuccess = useCallback(() => {
    checkAndRequestNotificationPermission().then(() => {
      scheduleNotification(
        NOTIFICATION_MESSAGES.ADD_PRODUCT_SUCCESS,
        NOTIFICATION_MESSAGES.ADD_PRODUCT_DETAILS(name || ''),
        NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING,
        { url: `products/${id}` },
      );
      router.push(ROUTES.CART);
    });
  }, [id, name]);

  /**
   * Handles error when adding product to cart
   * Shows error toast notification
   */
  const handleAddToCartError = () => {
    Toast.show({
      type: 'error',
      text1: ERROR_MESSAGES.CART_FAIL,
    });
  };

  /**
   * Shows info toast when product is already in cart
   */
  const showProductInCartToast = () => {
    Toast.show({
      type: 'info',
      text1: MESSAGES.ALREADY_IN_CART,
    });
  };

  /**
   * Adds product to cart with current product data
   * Creates product object and calls mutation with success/error handlers
   */
  const addProductToCart = async () => {
    const product = {
      title: name,
      image: images?.[0] || '',
      discountPrice,
      price: discountPrice || price || 0,
      quantity: 1,
    };
    addToCart(product, {
      onSuccess: handleAddToCartSuccess,
      onError: handleAddToCartError,
    });
  };

  /**
   * Main handler for add to cart button
   * - Checks if product data exists
   * - Verifies if product is already in cart
   * - Shows appropriate message or adds product
   */
  const handleAddToCart = async () => {
    if (!data) return;

    const isProductInCart = cartItems.some(item => item.title === name);

    if (isProductInCart) {
      showProductInCartToast();
    } else {
      await addProductToCart();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {error && <Text>Error when load product</Text>}
        <View style={styles.imageContainer}>
          <View style={styles.overlay} />
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={item => item}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={renderItem}
            snapToInterval={SCREEN_WIDTH}
          />
          <View style={styles.topBar}>
            <Pressable style={styles.iconButton} onPress={handleBack}>
              <ChevronLeftIcon />
            </Pressable>
            <View style={styles.iconGroup}>
              <Pressable style={styles.iconButton}>
                <ShareIcon />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <HeartOutlineIcon />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <MoreIcon />
              </Pressable>
            </View>
          </View>
          <View style={styles.indicatorContainer}>
            {images?.map((image, index) => (
              <View
                key={`${image}-${index}`}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
        <View style={styles.content}>
          <Text
            style={styles.productName}
            size="lg"
            color={baseColors.grayDark}>
            {name}
          </Text>
          <View style={styles.priceGroup}>
            <Text style={styles.newPrice}>
              ${roundToDecimal(discountPrice ?? price ?? 0)}
            </Text>
            {discountPrice ? (
              <View style={styles.discountGroup}>
                <Text style={styles.oldPrice}>
                  ${roundToDecimal(price ?? 0)}
                </Text>
                <Text style={styles.discountText}>
                  {calculateDiscountPercentage(price, discountPrice) > 0
                    ? `${calculateDiscountPercentage(price, discountPrice)}% off`
                    : '0% off'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.store}>
          <View style={styles.storeGroup}>
            <View style={styles.storeLogo}>
              <Text color={baseColors.whitePure} style={styles.storeName}>
                {storeName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text color={baseColors.grayMedium}>{storeName}</Text>
          </View>
          <Button style={styles.followButton} title="Follow" size="small" />
        </View>
        <View style={styles.descriptionGroup}>
          <RNScrollView style={styles.descriptionContainer}>
            <Text style={styles.description} color={baseColors.grayMedium}>
              {description}
            </Text>
          </RNScrollView>
          <View style={styles.btnGroup}>
            <Button
              style={styles.btnAddToCart}
              size="large"
              title="Add To Cart"
              onPress={handleAddToCart}
              disabled={isAdding}
              isLoading={isAdding}
            />
          </View>
        </View>

        <View style={styles.detail}>
          <Text style={styles.storeName} size="md" color={baseColors.blackPure}>
            Details
          </Text>
          <View style={{ gap: 10 }}>
            <Text size="sm" color={baseColors.grayMedium}>
              Condition: {condition}
            </Text>
            <Text size="sm" color={baseColors.grayMedium}>
              Price Type: {priceType}
            </Text>
            <Text size="sm" color={baseColors.grayMedium}>
              Category: {categoryName}
            </Text>
            <Text size="sm" color={baseColors.grayMedium}>
              Location: {location}
            </Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Text style={styles.storeName} size="md" color={baseColors.blackPure}>
            Additional Details
          </Text>
          <View>
            <Text size="sm" color={baseColors.grayMedium}>
              Delivery Details: Home Delivery Available, Cash On Delivery
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.whiteSoft,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  topBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: baseColors.whitePure,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: baseColors.greenDark,
    opacity: 1,
  },
  content: {
    flexDirection: 'column',
    backgroundColor: baseColors.whitePure,
    marginTop: 16,
  },
  productName: {
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.grayMedium,
  },
  priceGroup: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
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
  store: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: baseColors.whitePure,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeLogo: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: baseColors.greenDark,
  },
  storeName: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
  },
  storeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descriptionContainer: {
    maxHeight: 100,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
  },
  followButton: {
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: baseColors.greenDark,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },

  descriptionGroup: {
    flexDirection: 'column',
    backgroundColor: baseColors.whitePure,
    marginTop: 5,
  },
  detail: {
    flexDirection: 'column',
    gap: 20,
    backgroundColor: baseColors.whitePure,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 6,
  },
  btnAddToCart: {
    width: '70%',
    height: 50,
    borderRadius: 24,
  },
});

export default ProductDetail;
