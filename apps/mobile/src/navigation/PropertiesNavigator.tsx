import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertiesScreen from '../screens/PropertiesScreen';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';
import { useUI } from '../../../packages/shared-logic/src/context/UIContext';

const Stack = createNativeStackNavigator();

const PropertiesNavigator = () => {
  const { isDarkMode } = useUI();
  
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: '#0891b2',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : '#1e293b',
        }
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