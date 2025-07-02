import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Mocks
import { BANNERS } from '@/mocks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

const Banner = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {BANNERS.map(banner =>
        banner.imageUrl ? (
          <ImageBackground
            key={banner.id}
            source={{ uri: banner.imageUrl }}
            style={styles.banner}
            imageStyle={styles.imageStyle}>
            <Text style={styles.text}>{banner.title}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{banner.buttonText}</Text>
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <View key={banner.id} style={[styles.banner, styles.noImage]}>
            <Text style={styles.text}>{banner.title}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{banner.buttonText}</Text>
            </TouchableOpacity>
          </View>
        ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  banner: {
    width: 300,
    height: 165,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    paddingHorizontal: 20,
  },
  noImage: {
    backgroundColor: 'black',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  button: {
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: baseColors.whitePure,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whitePure,
  },
});

export default Banner;
