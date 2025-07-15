import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native';

// Components
import { ProductCard, Text } from '@/components';

//  Constants
import { MESSAGES, PAGINATION_LIMIT, RENDER_PER_BATCH } from '@/constants';

// Interfaces
import { TProduct } from '@/interfaces';

// Styles
import { styles } from './styles';

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
    ({
      item: { id, images, name, discountPrice, storeName, price },
    }: ListRenderItemInfo<TProduct>) => {
      return (
        <ProductCard
          id={id}
          imageUrl={images[0]}
          name={name}
          discountPrice={discountPrice}
          storeName={storeName}
          price={price}
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

export default memo(ProductList, isEqual);
