import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';

// Import tab components
import CommunityFeedTab from '../components/community/CommunityFeedTab';
import MarketplaceTab from '../components/community/MarketplaceTab';
import JobsTab from '../components/community/JobsTab';
import LostAndFoundTab from '../components/community/LostAndFoundTab';
import { PlusIcon } from '../components/Icons';

const Tab = createMaterialTopTabNavigator();

type CommunityStackParamList = {
    NewPost: undefined;
    NewMarketplaceItem: undefined;
    NewJob: undefined;
    NewLostAndFound: undefined;
    Login: undefined;
};
type ScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList>;

const CommunityScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { isPublicAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('Feed');

  const handleAddPress = () => {
    if (!isPublicAuthenticated) {
        navigation.navigate('Login');
        return;
    }

    switch (activeTab) {
        case 'Feed':
            navigation.navigate('NewPost');
            break;
        case 'Marketplace':
            navigation.navigate('NewMarketplaceItem');
            break;
        case 'Jobs':
            navigation.navigate('NewJob');
            break;
        case 'LostAndFound':
            navigation.navigate('NewLostAndFound');
            break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
        <Tab.Navigator
            screenListeners={{
                state: (e) => {
                    const currentRoute = e.data.state.routes[e.data.state.index];
                    setActiveTab(currentRoute.name);
                },
            }}
            screenOptions={{
                tabBarActiveTintColor: '#0891b2',
                tabBarInactiveTintColor: 'gray',
                tabBarIndicatorStyle: {
                backgroundColor: '#0891b2',
                },
                tabBarLabelStyle: {
                fontWeight: 'bold',
                fontSize: 12,
                },
                tabBarStyle: {
                backgroundColor: 'white',
                },
                tabBarScrollEnabled: true,
            }}
        >
            <Tab.Screen name="Feed" component={CommunityFeedTab} options={{ title: 'المنشورات' }} />
            <Tab.Screen name="Marketplace" component={MarketplaceTab} options={{ title: 'البيع والشراء' }} />
            <Tab.Screen name="Jobs" component={JobsTab} options={{ title: 'الوظائف' }} />
            <Tab.Screen name="LostAndFound" component={LostAndFoundTab} options={{ title: 'المفقودات' }} />
        </Tab.Navigator>
        <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
            <PlusIcon color="#fff" width={28} height={28} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0891b2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
});

export default CommunityScreen;
