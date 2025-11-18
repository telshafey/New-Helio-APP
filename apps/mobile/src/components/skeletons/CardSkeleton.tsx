import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface CardSkeletonProps {
    height: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ height }) => {
    return (
        <View style={[styles.card, { height }]}>
            <View style={styles.image} />
            <View style={styles.content}>
                <View style={styles.lineLg} />
                <View style={styles.lineSm} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e2e8f0', // Using a solid color for simplicity
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        height: '60%',
        backgroundColor: '#cbd5e1',
    },
    content: {
        padding: 12,
    },
    lineLg: {
        height: 18,
        backgroundColor: '#cbd5e1',
        borderRadius: 4,
        marginBottom: 8,
        width: '80%',
    },
    lineSm: {
        height: 14,
        width: '50%',
        backgroundColor: '#cbd5e1',
        borderRadius: 4,
    },
});

export default CardSkeleton;