import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

// Components
import { ProductCard, Text } from '@/components';

//  Constants
import { MESSAGES, PAGINATION_LIMIT, RENDER_PER_BATCH } from '@/constants';

//
import { TProduct } from '@/interfaces';

export interface ProductListProps {
  products: TProduct[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isRefreshing?: boolean;
  isEditing?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isGridView?: boolean;
  onPress: (id: string) => void;
  onRefresh?: () => void;
}

const ProductList = ({
  products,
  fetchNextPage,
  hasNextPage = false,
  isRefreshing = false,
  isGridView = false,
  onPress,
  onRefresh,
  ...props
}: ProductListProps) => {
  const handlePress = useCallback((id: string) => onPress(id), [onPress]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TProduct>) => {
      return (
        <ProductCard
          id={item.id}
          imageUrl={item.images[0]}
          name={item.name}
          newPrice={item.newPrice}
          storeName={item.storeName}
          oldPrice={item.oldPrice}
          onPress={handlePress}
        />
      );
    },
    [isGridView],
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString() || ''}
      numColumns={isGridView ? 2 : 1}
      columnWrapperStyle={isGridView ? styles.columnWrapper : undefined}
      horizontal={!isGridView}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        hasNextPage ? <ActivityIndicator size="small" /> : null
      }
      ListEmptyComponent={
        <View style={styles.wrapper}>
          <Text>{MESSAGES.EMPTY_PRODUCT_LIST}</Text>
        </View>
      }
      {...props}
      initialNumToRender={PAGINATION_LIMIT}
      maxToRenderPerBatch={RENDER_PER_BATCH}
      removeClippedSubviews
      windowSize={5}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    marginBottom: 20,
    justifyContent: 'center',
    gap: 6,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 20,
  },
});

export default memo(ProductList, isEqual);
