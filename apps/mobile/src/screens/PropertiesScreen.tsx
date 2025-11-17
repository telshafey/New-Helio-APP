import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useProperties } from '../../../../packages/shared-logic/src/context/PropertiesContext';
import PropertyCard from '../components/PropertyCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdjustmentsHorizontalIcon } from '../components/Icons';
import PropertyFiltersModal from '../components/properties/PropertyFiltersModal';

type PropertiesStackParamList = {
  Properties: undefined;
  PropertyDetail: { propertyId: number };
};
type ScreenNavigationProp = NativeStackNavigationProp<PropertiesStackParamList, 'Properties'>;

const PropertiesScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const { properties } = useProperties();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'sale' | 'rent'>('all');
    
    // State for modal and filters
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (priceRange.min || priceRange.max) count++;
        count += selectedAmenities.length;
        return count;
    }, [priceRange, selectedAmenities]);

    const filteredProperties = useMemo(() => {
        return properties.filter(prop => {
            const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  prop.location.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || prop.type === typeFilter;
            
            const minPrice = parseFloat(priceRange.min);
            const maxPrice = parseFloat(priceRange.max);
            const matchesPrice = 
                (isNaN(minPrice) || prop.price >= minPrice) &&
                (isNaN(maxPrice) || prop.price <= maxPrice);

            const matchesAmenities = selectedAmenities.length === 0 || 
                                     selectedAmenities.every(amenity => prop.amenities.includes(amenity));

            return matchesSearch && matchesType && matchesPrice && matchesAmenities;
        });
    }, [properties, searchTerm, typeFilter, priceRange, selectedAmenities]);
    
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
                 <TouchableOpacity style={styles.advancedFilterButton} onPress={() => setFilterModalVisible(true)}>
                    <AdjustmentsHorizontalIcon color="#334155" width={20} height={20} />
                    <Text style={styles.advancedFilterButtonText}>فلاتر متقدمة</Text>
                     {activeFilterCount > 0 && (
                        <View style={styles.filterCountBadge}>
                            <Text style={styles.filterCountText}>{activeFilterCount}</Text>
                        </View>
                     )}
                </TouchableOpacity>
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
            />
            <PropertyFiltersModal
                isVisible={isFilterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={(price, amenities) => {
                    setPriceRange(price);
                    setSelectedAmenities(amenities);
                    setFilterModalVisible(false);
                }}
                initialPriceRange={priceRange}
                initialAmenities={selectedAmenities}
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
    advancedFilterButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, paddingVertical: 10, backgroundColor: '#f1f5f9', borderRadius: 8 },
    advancedFilterButtonText: { fontWeight: '600', color: '#334155' },
    filterCountBadge: { position: 'absolute', top: -5, left: -5, backgroundColor: '#0891b2', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    filterCountText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#64748b' }
});

export default PropertiesScreen;