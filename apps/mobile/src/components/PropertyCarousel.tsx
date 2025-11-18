import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { Property } from '../../../../packages/shared-logic/src/types';
import PropertyCard from './PropertyCard';

interface PropertyCarouselProps {
  title: string;
  properties: Property[];
  navigation: any;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ title, properties, navigation }) => {
  if (properties.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <PropertyCard 
            property={item}
            onPress={() => navigation.navigate('PropertyDetail', { propertyId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 16,
    marginBottom: 12,
    textAlign: 'right',
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default PropertyCarousel;
