import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ImageBackground, Text, Pressable } from 'react-native';
import type { Advertisement } from '../../../../packages/shared-logic/src/types';

const { width } = Dimensions.get('window');

interface AdSliderProps {
  ads: Advertisement[];
  navigation: any; // Using any for simplicity, can be typed with navigation props
}

const AdSlider: React.FC<AdSliderProps> = ({ ads, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Advertisement>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;
  
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % ads.length;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, ads.length]);

  const handlePress = (item: Advertisement) => {
    if (item.serviceId) {
        navigation.navigate('ServiceDetail', { serviceId: item.serviceId });
    }
    // External URL handling would require Linking from react-native
  };

  const renderItem = ({ item }: { item: Advertisement }) => (
    <Pressable onPress={() => handlePress(item)} style={styles.slide}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.imageBackground} resizeMode="cover">
        <View style={styles.overlay} />
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />
      <View style={styles.pagination}>
        {ads.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { backgroundColor: index === activeIndex ? '#0891b2' : '#cbd5e1' }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
  },
  flatList: {
    width: width,
  },
  slide: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 16,
    textAlign: 'right',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default AdSlider;
