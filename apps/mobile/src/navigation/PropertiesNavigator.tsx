import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertiesScreen from '../screens/PropertiesScreen';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';

const Stack = createNativeStackNavigator();

const PropertiesNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: '#0891b2',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen 
        name="Properties" 
        component={PropertiesScreen} 
        options={{ title: 'العقارات' }} 
      />
      <Stack.Screen 
        name="PropertyDetail" 
        component={PropertyDetailScreen} 
        options={{ title: 'تفاصيل العقار' }}
      />
    </Stack.Navigator>
  );
};

export default PropertiesNavigator;