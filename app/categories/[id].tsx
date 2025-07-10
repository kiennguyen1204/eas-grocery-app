import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import {
  CategoryIcon,
  ChevronLeftIcon,
  Dropdown,
  MapIcon,
  ProductList,
  SortIcon,
  Text,
} from '@/components';

// Constants
import {
  CATEGORIES,
  PRODUCT_CATEGORY,
  ROUTES,
  SORT_BY_PRICE,
} from '@/constants';

// Hooks
import { useGetProducts } from '@/hooks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

export default function ProductsByCategory() {
  const { id } = useLocalSearchParams();
  const [filter, setFilter] = useState({
    order: '',
  });

  const {
    data: products,
    isLoading,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useGetProducts({
    categoryName: CATEGORIES[Number(id)].toLowerCase(),
    limit: 6,
    order: filter.order,
  });

  const handlePressProduct = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAIL(id));
  }, []);

  const handlePressBackIcon = () => {
    router.back();
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSelectSort = useCallback((option: string) => {
    setFilter(prev => ({ ...prev, order: option }));
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.textHeading} size="xl">
            {CATEGORIES[Number(id)]}
          </Text>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeading} size="xl">
          {CATEGORIES[Number(id)]}
        </Text>
        <View style={styles.groupDropdown}>
          <Dropdown
            defaultValue="Sort by price"
            options={SORT_BY_PRICE}
            onSelect={handleSelectSort}
            rightIcon={<SortIcon />}
          />
          <Dropdown
            defaultValue="location"
            isDisabled
            rightIcon={<MapIcon />}
          />
          <Dropdown
            options={PRODUCT_CATEGORY}
            defaultValue="Category"
            rightIcon={<CategoryIcon />}
          />
        </View>
      </View>
      {isLoading && !isRefetching ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.list}>
          {error && <Text>Error when load products</Text>}
          <ProductList
            products={products || []}
            onPress={handlePressProduct}
            hasNextPage={isFetchingNextPage}
            isGridView
            isRefreshing={isRefetching}
            onRefresh={handleRefresh}
            fetchNextPage={handleEndReached}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: baseColors.whiteSoft,
    gap: 30,
    flex: 1,
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
  title: {},
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textHeading: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whiteSoft,
    textAlign: 'center',
    flex: 1,
  },
  groupDropdown: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
