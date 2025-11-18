import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Service } from '../../../../packages/shared-logic/src/types';
import { StarIcon } from './Icons';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
    <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} width={16} height={16} color={i < Math.round(rating) ? '#facc15' : '#d1d5db'} filled={i < Math.round(rating)} />
        ))}
    </View>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image 
        source={{ uri: service.images[0] || `https://picsum.photos/400/300?random=${service.id}` }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{service.name}</Text>
        <Text style={styles.address} numberOfLines={1}>{service.address}</Text>
        <Rating rating={service.rating} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  address: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 4,
    textAlign: 'right',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ServiceCard;