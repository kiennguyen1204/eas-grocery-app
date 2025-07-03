import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Components
import { Header, ProductList, Text } from '@/components';

// Hooks
import { useGetProducts } from '@/hooks';

// Constants
import { PRODUCT_CATEGORY, ROUTES, SORT_BY_PRICE } from '@/constants';

// Themes
import { baseColors } from '@/themes';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const totalQuantity = 0;
  const [filter, setFilter] = useState({
    order: '',
    categoryName: '',
  });

  const {
    data: products,
    isFetching: isFetchingProducts,
    error: productsError,
  } = useGetProducts({
    searchProducts: searchQuery,
    categoryName: filter.categoryName,
    order: filter.order,
    limit: 6,
  });

  const handleNavigateCartScreen = () => {
    router.push(ROUTES.CART as never);
  };

  const handlePressProduct = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAIL(id) as never);
  }, []);

  const handleSelectSort = useCallback((option: string) => {
    setFilter(prev => ({ ...prev, order: option }));
  }, []);

  const handleSelectCategory = useCallback((categoryName: string) => {
    setFilter(prev => ({ ...prev, categoryName }));
  }, []);

  return (
    <View style={styles.wrapper}>
      <Header
        title="Browse"
        isBrowse
        isSearch
        onChangeText={text => setSearchQuery(text)}
        optionSort={SORT_BY_PRICE}
        optionCategory={PRODUCT_CATEGORY}
        totalQuantity={totalQuantity}
        onSelect={handleSelectSort}
        onCategorySelect={handleSelectCategory}
        onNavigate={handleNavigateCartScreen}
      />
      <View style={styles.productListWrapper}>
        {productsError && <Text>Error when load new products</Text>}
        {isFetchingProducts ? (
          <ActivityIndicator />
        ) : (
          <ProductList
            isGridView
            products={products || []}
            onPress={handlePressProduct}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: baseColors.whiteSoft,
    flex: 1,
  },
  productListWrapper: {
    marginTop: 16,
    flex: 1,
  },
});
