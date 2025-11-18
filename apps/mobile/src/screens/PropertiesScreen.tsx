import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { useProperties } from '../../../../packages/shared-logic/src/context/PropertiesContext';
import PropertyCard from '../components/PropertyCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardSkeleton from '../components/skeletons/CardSkeleton';

type PropertiesStackParamList = {
  Properties: undefined;
  PropertyDetail: { propertyId: number };
};
type ScreenNavigationProp = NativeStackNavigationProp<PropertiesStackParamList, 'Properties'>;

const PropertiesScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const { properties, loading } = useProperties();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'sale' | 'rent'>('all');
    const [refreshing, setRefreshing] = useState(false);

    const filteredProperties = useMemo(() => {
        return properties.filter(prop => {
            const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  prop.location.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || prop.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [properties, searchTerm, typeFilter]);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);
    
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.filtersContainer}>
                    <View style={[styles.searchInput, styles.skeleton]} />
                    <View style={[styles.buttonGroup, styles.skeleton, { height: 44 }]}/>
                </View>
                <FlatList
                    data={[1,2,3,4]}
                    keyExtractor={item => item.toString()}
                    renderItem={() => (
                        <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
                           <CardSkeleton height={200}/>
                        </View>
                    )}
                    contentContainerStyle={{ paddingTop: 8 }}
                />
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.filtersContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="بحث بالعنوان أو المنطقة..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={[styles.filterButton, typeFilter === 'all' && styles.activeFilter]} onPress={() => setTypeFilter('all')}><Text style={[styles.filterButtonText, typeFilter === 'all' && styles.activeText]}>الكل</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.filterButton, typeFilter === 'sale' && styles.activeFilter]} onPress={() => setTypeFilter('sale')}><Text style={[styles.filterButtonText, typeFilter === 'sale' && styles.activeText]}>بيع</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.filterButton, typeFilter === 'rent' && styles.activeFilter]} onPress={() => setTypeFilter('rent')}><Text style={[styles.filterButtonText, typeFilter === 'rent' && styles.activeText]}>إيجار</Text></TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={filteredProperties}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
                        <PropertyCard 
                            property={item} 
                            onPress={() => navigation.navigate('PropertyDetail', { propertyId: item.id })}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>لا توجد عقارات تطابق بحثك.</Text>}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0891b2']} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    filtersContainer: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    searchInput: { backgroundColor: '#f1f5f9', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, textAlign: 'right', marginBottom: 12 },
    buttonGroup: { flexDirection: 'row-reverse', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#e2e8f0' },
    filterButton: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white' },
    activeFilter: { backgroundColor: '#0891b2' },
    filterButtonText: { fontWeight: '600', color: '#334155' },
    activeText: { color: 'white' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#64748b' },
    skeleton: { backgroundColor: '#e2e8f0' },
});

export default PropertiesScreen;