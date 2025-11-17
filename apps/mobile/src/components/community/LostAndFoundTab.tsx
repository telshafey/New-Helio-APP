import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import LostAndFoundCard from './LostAndFoundCard';
import EmptyState from '../common/EmptyState';
import { ArchiveBoxIcon } from '../Icons';
import LostAndFoundSkeleton from '../skeletons/LostAndFoundSkeleton';

const Tab = createMaterialTopTabNavigator();

const ItemList: React.FC<{ type: 'lost' | 'found' }> = ({ type }) => {
    const { lostAndFoundItems, loading } = useCommunity();

    const filteredItems = React.useMemo(() => {
        return lostAndFoundItems
            .filter(item => item.status === 'approved' && item.type === type)
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [lostAndFoundItems, type]);
    
    if(loading) {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <LostAndFoundSkeleton />
                    <LostAndFoundSkeleton />
                </View>
            </View>
        )
    }

    return (
         <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <LostAndFoundCard item={item} />}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
                <View style={{marginTop: 50}}>
                    <EmptyState
                        icon={<ArchiveBoxIcon width={64} height={64} color="#9ca3af" />}
                        title={`لا توجد ${type === 'lost' ? 'مفقودات' : 'موجودات'} حالياً`}
                        message="سيتم عرض البلاغات هنا عند توفرها."
                    />
                </View>
            }
        />
    );
}

const LostAndFoundTab = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#0891b2',
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: { backgroundColor: '#0891b2' },
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: '#f1f5f9'},
        }}
    >
      <Tab.Screen name="Lost" options={{ title: 'مفقودات' }}>
        {() => <ItemList type="lost" />}
      </Tab.Screen>
      <Tab.Screen name="Found" options={{ title: 'تم العثور عليها' }}>
        {() => <ItemList type="found" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    contentContainer: { padding: 16 },
    separator: { height: 16 },
});

export default LostAndFoundTab;
