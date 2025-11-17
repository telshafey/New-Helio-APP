import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import type { MarketplaceItem } from '../../../../../packages/shared-logic/src/types';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24; // 2 columns with 16 padding on each side and 16 between

const MarketplaceItemCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => {
    return (
        <Pressable style={styles.card}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>{item.price.toLocaleString('ar-EG')} جنيه</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    content: {
        padding: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0891b2',
        textAlign: 'right',
        marginTop: 4,
    },
});

export default MarketplaceItemCard;
