import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const Shimmer: React.FC<{ style?: any }> = ({ style }) => {
    // Basic skeleton view, pulsing animation can be added with Animated API for better effect
    return <View style={[styles.shimmer, style]} />;
}

const HomeScreenSkeleton = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Shimmer style={styles.adSlider} />

            <View style={styles.carousel}>
                <Shimmer style={styles.carouselTitle} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                    <Shimmer style={styles.card} />
                    <Shimmer style={styles.card} />
                </ScrollView>
            </View>
            <View style={styles.carousel}>
                <Shimmer style={styles.carouselTitle} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                    <Shimmer style={styles.card} />
                    <Shimmer style={styles.card} />
                </ScrollView>
            </View>
            <View style={styles.carousel}>
                <Shimmer style={styles.carouselTitle} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                    <Shimmer style={styles.card} />
                    <Shimmer style={styles.card} />
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    shimmer: {
        backgroundColor: '#e2e8f0', // slate-200
    },
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    content: {
        paddingTop: 44, // Safe area top
    },
    adSlider: {
        height: 200,
        width: '100%',
        marginBottom: 16,
    },
    carousel: {
        marginVertical: 16,
    },
    carouselTitle: {
        height: 24,
        width: '40%',
        borderRadius: 8,
        marginRight: 16,
        marginBottom: 12,
    },
    card: {
        width: 280,
        height: 220,
        borderRadius: 12,
        marginLeft: 16,
    },
});

export default HomeScreenSkeleton;