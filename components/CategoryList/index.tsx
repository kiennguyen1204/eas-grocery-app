import { FlashList } from '@shopify/flash-list';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

// Constants
import { ACCESSIBILITY_CONFIG, SCREEN_WIDTH } from '@/constants';

import { Text } from '@/components';

// Styles
import { styles } from './styles';

interface CategoryItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface CategoryListProps {
  data: CategoryItem[];
  onPress: (id: number) => void;
}

const CategoryList = ({ data, onPress }: CategoryListProps) => {
  const itemScreenWidth = SCREEN_WIDTH / 4 - 1;

  const renderItem = ({
    item: { id, title, imageUrl },
  }: {
    item: CategoryItem;
  }) => {
    const handlePress = () => onPress(id);
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          style={[styles.itemContainer, { width: itemScreenWidth }]}
          onPress={handlePress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CATEGORY_ITEM(title)}
          accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.CATEGORY_ITEM(title)}>
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CATEGORY_IMAGE(
              title,
            )}>
            <View style={styles.overlay} />
            <Text
              size="xs"
              style={styles.text}
              accessible={true}
              accessibilityRole="text">
              {title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlashList
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={4}
      accessible={true}
      accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CATEGORY_LIST}
      accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.CATEGORY_LIST}
      estimatedItemSize={itemScreenWidth}
    />
  );
};

export default memo(CategoryList, isEqual);
