import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useServices } from '../../../../packages/shared-logic/src/context/ServicesContext';
import ServiceCard from '../components/ServiceCard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardSkeleton from '../components/skeletons/CardSkeleton';

type ServicesStackParamList = {
  Services: undefined;
  ServiceList: { subCategoryId: number, title: string };
  ServiceDetail: { serviceId: number };
};

type ScreenRouteProp = RouteProp<ServicesStackParamList, 'ServiceList'>;
type ScreenNavigationProp = NativeStackNavigationProp<ServicesStackParamList, 'ServiceList'>;

const ServiceListScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { services, loading } = useServices();
  const { subCategoryId, title } = route.params;

  // Set the header title dynamically
  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
  
  const filteredServices = services.filter(s => s.subCategoryId === subCategoryId);

  if (loading) {
      return (
        <View style={styles.container}>
            <FlatList
                data={[1,2,3,4]}
                keyExtractor={item => item.toString()}
                renderItem={() => (
                    <View style={{ marginVertical: 8, alignItems: 'center' }}>
                        <CardSkeleton height={220} />
                    </View>
                )}
                contentContainerStyle={{ paddingTop: 16 }}
            />
        </View>
      );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredServices}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <View style={{ marginVertical: 8, alignItems: 'center' }}>
                <ServiceCard 
                    service={item} 
                    onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
                />
            </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>لا توجد خدمات في هذه الفئة بعد.</Text>}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', // slate-100
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#64748b'
  }
});

export default ServiceListScreen;