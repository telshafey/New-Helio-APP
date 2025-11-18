import React, { useState, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { HomeModernIcon } from './Icons';

interface ImageSliderProps {
    images: string[];
}
const { width } = Dimensions.get('window');

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
          setActiveIndex(viewableItems[0].index);
        }
    }).current;
    
    if (images.length === 0) {
        return <View style={styles.placeholder}><HomeModernIcon width={80} height={80} color="#cbd5e1"/></View>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />
            {images.length > 1 && (
                <View style={styles.pagination}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.dot, { backgroundColor: index === activeIndex ? '#0891b2' : '#cbd5e1' }]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: 250 },
    image: { width, height: 250, resizeMode: 'cover' },
    pagination: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
    dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 3 },
    placeholder: { width: '100%', height: 250, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
});

export default ImageSlider;
