import { memo } from 'react';
import isEqual from 'react-fast-compare';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Constants
import { SCREEN_WIDTH } from '@/constants';

import { Text } from '@/components';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

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

  const renderItem = ({ item }: { item: CategoryItem }) => {
    const handlePress = () => onPress(item.id);
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { width: itemScreenWidth }]}
        onPress={handlePress}>
        <ImageBackground
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.overlay} />
          <Text size="xs" style={styles.text}>
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      nestedScrollEnabled={true}
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={4}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
    marginBottom: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    color: baseColors.whitePure,
    fontSize: 11,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    textAlign: 'center',
  },
});

export default memo(CategoryList, isEqual);
