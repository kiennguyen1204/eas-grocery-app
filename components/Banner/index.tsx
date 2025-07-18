import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

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
        imageStyle={styles.imageStyle}
        accessible={true}
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.BANNER_ITEM(title)}
        accessibilityRole="image">
        <Text style={styles.text} accessible={true} accessibilityRole="header">
          {title}
        </Text>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={buttonText}
          accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.BANNER_BUTTON(
            buttonText,
          )}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : (
      <View
        style={[styles.banner, styles.noImage]}
        accessible={true}
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.BANNER_ITEM(title)}>
        <Text style={styles.text} accessible={true} accessibilityRole="header">
          {title}
        </Text>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={buttonText}
          accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.BANNER_BUTTON(
            buttonText,
          )}>
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
      accessible={true}
      accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.BANNER_CAROUSEL}
      accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.BANNER_CAROUSEL}
    />
  );
};

export default Banner;
