import { Image, TouchableOpacity, View } from 'react-native';

// Themes
import { baseColors } from '@/themes';

// Components
import { Button, Text } from '@/components';
import { memo } from 'react';

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
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{logoLetter}</Text>
        </View>
      </View>
      <Text color={baseColors.grayMedium} style={styles.storeName}>
        {storeName}
      </Text>
      <TouchableOpacity>
        <Button style={styles.followButton} title="Follow" size="small" />
      </TouchableOpacity>
    </View>
  );
};

export default memo(StoreCard);
