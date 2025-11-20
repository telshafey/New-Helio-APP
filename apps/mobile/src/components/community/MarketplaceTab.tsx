
import React, { useState, useMemo } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { useCommunity } from '../../shared';
import type { MarketplaceItem } from '../../shared';
import { ShoppingBagIcon } from '../Icons';
import EmptyState from '../common/EmptyState';
import MarketplaceItemCard from './MarketplaceItemCard';
import MarketplaceSkeleton from '../skeletons/MarketplaceSkeleton';

const MarketplaceTab: React.FC = () => {
    const { marketplaceItems, loading } = useCommunity();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedItems = useMemo(() => {
        return marketplaceItems
            .filter(item => item.status === 'approved')
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [marketplaceItems, searchTerm]);
    
    if (loading) {
        return <MarketplaceSkeleton />;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="ابحث عن منتج أو فئة..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <FlatList
                data={approvedItems}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MarketplaceItemCard item={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <EmptyState
                        icon={<ShoppingBagIcon width={64} height={64} color="#9ca3af" />}
                        title="لا توجد إعلانات"
                        message="لم يضف أحد أي شيء للبيع بعد."
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    searchInput: { backgroundColor: 'white', marginHorizontal: 16, marginTop: 8, marginBottom: 8, padding: 12, borderRadius: 8, textAlign: 'right' },
    listContent: { paddingHorizontal: 8 },
});

export default MarketplaceTab;