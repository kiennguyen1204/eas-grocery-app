import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

// Components
import { Button, Text } from '@/components';

// Constants
import { ROUTES, SCREEN_WIDTH, SLIDES_ONBOARDING } from '@/constants';

// Themes
import { baseColors } from '@/themes';

// Types
import { SlideItem } from '@/types';

const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideListRef = useRef<FlatList>(null);
  const router = useRouter();

  const goToNextSlide = () => {
    const nextSlide = activeSlide + 1;
    if (nextSlide < SLIDES_ONBOARDING.length) {
      try {
        slideListRef.current?.scrollToIndex({
          index: nextSlide,
          animated: true,
        });
      } catch (error) {
        console.error('Error scrolling to slide:', error);
      }
    } else {
      router.replace(ROUTES.LOGIN as any);
    }
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );
    setActiveSlide(slideIndex);
  };

  const renderIndicators = () => (
    <View style={styles.dotsContainer}>
      {SLIDES_ONBOARDING.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, { opacity: index === activeSlide ? 1 : 0.6 }]}
        />
      ))}
    </View>
  );

  const renderSlide = ({ item }: { item: SlideItem }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text size="lg" color={baseColors.greenDark} style={styles.slideTitle}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={slideListRef}
        data={SLIDES_ONBOARDING}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.slideList}
        renderItem={renderSlide}
      />

      <View style={styles.bottomBar}>
        {renderIndicators()}
        <Button
          variant="primary"
          title={
            activeSlide === SLIDES_ONBOARDING.length - 1
              ? 'Get Started'
              : 'Next'
          }
          onPress={goToNextSlide}
          style={styles.actionButton}
          disabled={false}
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColors.greenDark,
  },

  slideList: {
    zIndex: 1,
  },

  slide: {
    gap: 30,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: baseColors.whitePure,
    borderRadius: 8,
  },

  image: {
    width: 250,
    height: 300,
  },

  slideTitle: {
    textAlign: 'center',
    padding: 2,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    height: '50%',
    justifyContent: 'flex-end',
    backgroundColor: baseColors.whitePure,
    paddingBottom: 20,
    gap: 40,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: baseColors.greenDark,
    marginHorizontal: 4,
  },

  actionButton: {
    zIndex: 2,
    width: '100%',
    paddingVertical: 16,
  },
});
