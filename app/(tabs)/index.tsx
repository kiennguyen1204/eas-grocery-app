import { useCallback } from 'react';

import { router } from 'expo-router';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Banner,
  Button,
  CartIcon,
  CategoryList,
  HeartIcon,
  Input,
  ProductList,
  SearchIcon,
  StoreList,
  Text,
} from '@/components';

// Mocks
import { CATEGORIES, STORE_CARDS } from '@/mocks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

// Constants
import { ROUTES } from '@/constants';

// Hooks
import { useGetCart, useGetProducts } from '@/hooks';

const HomeScreen = () => {
  const {
    data: products,
    isFetching: isFetchingProducts,
    error: productsError,
  } = useGetProducts({ limit: 10 });

  const { data: cartData } = useGetCart();

  const totalQuantity = (cartData ?? []).reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const handlePressProduct = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAIL(id) as never);
  }, []);

  const handlePressSeeAll = () => {
    router.push(ROUTES.BROWSE);
  };

  const handlePressCategoryItem = useCallback((id: number) => {
    router.push(ROUTES.CATEGORY(id) as never);
  }, []);

  const handleNavigateCartScreen = () => {
    router.push(ROUTES.CART as never);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text color={baseColors.whitePure} size="xl" fontFamily="bold">
            Groceries
          </Text>
          <View style={styles.icon}>
            <HeartIcon />
            <CartIcon />
            <TouchableOpacity
              style={styles.navLink}
              testID="cart-button"
              onPress={handleNavigateCartScreen}>
              <View style={styles.totalQuantity}>
                <Text
                  size="xs"
                  color={baseColors.whitePure}
                  style={styles.textQuantity}>
                  {totalQuantity}
                </Text>
              </View>
              <CartIcon />
            </TouchableOpacity>
          </View>
        </View>

        <Input
          leftIcon={<SearchIcon color={baseColors.greenLight} />}
          placeholder="Search Product"
        />
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <Banner />
        </View>
        <CategoryList data={CATEGORIES} onPress={handlePressCategoryItem} />
        <View style={styles.product}>
          <View style={styles.productHeading}>
            <Text color={baseColors.grayMedium} style={styles.productTitle}>
              New Product
            </Text>
            <Button
              title="See All"
              size="small"
              style={styles.button}
              onPress={handlePressSeeAll}
            />
          </View>

          {productsError && <Text>Error when load new products</Text>}
          {isFetchingProducts ? (
            <ActivityIndicator />
          ) : (
            <ProductList
              products={products || []}
              onPress={handlePressProduct}
            />
          )}
        </View>

        <View style={styles.storesHeading}>
          <Text style={styles.storesTitle}>Store to follow</Text>
          <Button
            title="View All"
            size="small"
            variant="secondary"
            style={styles.btnViewAll}
          />
        </View>
        <View style={styles.storeList}>
          <StoreList stores={STORE_CARDS} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: baseColors.greenDark,
    padding: 16,
    gap: 16,
  },
  icon: {
    flexDirection: 'row',
    gap: 16,
  },
  header: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    marginBottom: 16,
  },

  product: {
    marginTop: 16,
    padding: 8,
    gap: 8,
  },
  productHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: baseColors.greenDark,
  },
  btnViewAll: {
    paddingVertical: 6,
    borderRadius: 16,
  },

  storesHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: baseColors.greenDark,
    paddingTop: 16,
  },
  storesTitle: {
    color: baseColors.whitePure,
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    height: 184,
  },
  storeList: {
    bottom: 120,
    paddingHorizontal: 20,
  },
  navLink: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  totalQuantity: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 150,
    backgroundColor: baseColors.redPrimary,
    zIndex: 1000,
    left: 15,
  },
  textQuantity: {
    bottom: 1,
  },
});

export default HomeScreen;
