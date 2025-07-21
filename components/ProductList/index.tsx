import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { ActivityIndicator, View } from 'react-native';

// Components
import { ProductCard, Text } from '@/components';

//  Constants
import { MESSAGES } from '@/constants';

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
    }: {
      item: TProduct;
    }) => {
      return (
        <View
          style={isGridView ? styles.gridItemWrapper : styles.listItemWrapper}>
          <ProductCard
            id={id}
            imageUrl={images[0]}
            name={name}
            discountPrice={discountPrice}
            storeName={storeName}
            price={price}
            onPress={handlePress}
          />
        </View>
      );
    },
    [handlePress, isGridView],
  );

  return (
    <FlashList
      key={`${isGridView ? 'grid' : 'list'}-${products.length}`}
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString() || ''}
      numColumns={isGridView ? 2 : 1}
      horizontal={!isGridView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={isGridView ? styles.gridContainer : undefined}
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
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      estimatedItemSize={isGridView ? 200 : 150}
    />
  );
};

export default memo(ProductList, isEqual);
