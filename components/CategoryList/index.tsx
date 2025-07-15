import { memo } from 'react';
import isEqual from 'react-fast-compare';
import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

// Constants
import { SCREEN_WIDTH } from '@/constants';

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
      <TouchableOpacity
        style={[styles.itemContainer, { width: itemScreenWidth }]}
        onPress={handlePress}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.overlay} />
          <Text size="xs" style={styles.text}>
            {title}
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

export default memo(CategoryList, isEqual);
