import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { Service } from '../../../../packages/shared-logic/src/types';
import ServiceCard from './ServiceCard';

interface ServicesCarouselProps {
  title: string;
  services: Service[];
  navigation: any;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ title, services, navigation }) => {
  if (services.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <ServiceCard 
            service={item} 
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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

export default ServicesCarousel;
