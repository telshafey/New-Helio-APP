import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24;

const SkeletonItem = () => (
    <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.content}>
            <View style={styles.lineLg} />
            <View style={styles.lineSm} />
        </View>
    </View>
);

const MarketplaceSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBox} />
            <View style={styles.grid}>
                {[...Array(6)].map((_, i) => <SkeletonItem key={i} />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    searchBox: {
        height: 48,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: cardWidth,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: '#e2e8f0',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    content: {
        padding: 8,
    },
    lineLg: {
        height: 16,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        marginBottom: 8,
    },
    lineSm: {
        height: 14,
        width: '60%',
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
    },
});

export default MarketplaceSkeleton;
