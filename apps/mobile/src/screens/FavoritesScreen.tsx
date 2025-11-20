
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useServices } from '../shared';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ServiceCard from '../components/ServiceCard';
import EmptyState from '../components/common/EmptyState';
import { HeartIconSolid } from '../components/Icons';

type RootStackParamList = {
  ServiceDetail: { serviceId: number };
  Services: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FavoritesScreen = () => {
    const { services } = useServices();
    const navigation = useNavigation<NavigationProp>();
    
    const favoriteServices = services.filter(s => s.isFavorite);

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteServices}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <ServiceCard 
                            service={item} 
                            onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <EmptyState
                            icon={<HeartIconSolid width={64} height={64} color="#9ca3af" />}
                            title="قائمة المفضلة فارغة"
                            message="لم تقم بإضافة أي خدمات إلى المفضلة بعد. انقر على القلب ❤️ لإضافتها هنا."
                        />
                    </View>
                }
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f5f9',
    paddingTop: 8,
  },
  cardContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }
});

export default FavoritesScreen;
