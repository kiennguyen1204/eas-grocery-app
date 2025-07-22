import { Image, TouchableOpacity, View } from 'react-native';

// Themes
import { baseColors } from '@/themes';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

// Components
import Button from '../Button';
import Text from '../Text';

// Styles
import { styles } from './styles';

type StoreCardProps = {
  id: string;
  imageUrl: string;
  storeName: string;
  logoLetter: string;
};

const StoreCard = ({ imageUrl, storeName, logoLetter, id }: StoreCardProps) => {
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.STORE_CARD(storeName)}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.STORE_IMAGE(
            storeName,
          )}
        />
        <View style={styles.logoContainer}>
          <Text
            style={styles.logoText}
            accessible={true}
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.STORE_LOGO(
              logoLetter,
            )}>
            {logoLetter}
          </Text>
        </View>
      </View>
      <Text
        color={baseColors.grayMedium}
        style={styles.storeName}
        accessible={true}
        accessibilityRole="header">
        {storeName}
      </Text>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.FOLLOW_STORE(storeName)}
        accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.FOLLOW_STORE}>
        <Button style={styles.followButton} title="Follow" size="small" />
      </TouchableOpacity>
    </View>
  );
};

export default StoreCard;
