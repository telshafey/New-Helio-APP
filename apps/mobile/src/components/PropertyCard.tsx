import React from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import type { Property } from '../../../../packages/shared-logic/src/types';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <ImageBackground 
        source={{ uri: property.images[0] || `https://picsum.photos/600/400?random=${property.id}` }} 
        style={styles.image}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.overlay} />
        <View style={[styles.typeBadge, { backgroundColor: property.type === 'sale' ? '#0891b2' : '#8b5cf6' }]}>
            <Text style={styles.typeText}>{property.type === 'sale' ? 'للبيع' : 'للإيجار'}</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>{property.title}</Text>
            <Text style={styles.price}>{property.price.toLocaleString('ar-EG')} جنيه</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginLeft: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e0f2fe', // sky-100
    marginTop: 4,
    textAlign: 'right',
  },
});

export default PropertyCard;