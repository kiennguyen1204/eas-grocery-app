import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Interfaces
import { IBanner } from '@/interfaces';

// Mocks
import { BANNERS } from '@/mocks';

// Styles
import { styles } from './styles';

const Banner = () => {
  const renderItem = ({
    item: { id, imageUrl, title, buttonText },
  }: {
    item: IBanner;
  }) => {
    return imageUrl ? (
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.banner}
        imageStyle={styles.imageStyle}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : (
      <View style={[styles.banner, styles.noImage]}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={BANNERS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      snapToInterval={310}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

export default Banner;
