import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceListScreen from '../screens/ServiceListScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import { useUI } from '../shared';

const Stack = createNativeStackNavigator();

const ServicesNavigator = () => {
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
        name="Services" 
        component={ServicesScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ServiceList" 
        component={ServiceListScreen} 
        options={({ route }: any) => ({ title: route.params.title })}
      />
      <Stack.Screen 
        name="ServiceDetail" 
        component={ServiceDetailScreen} 
        options={{ title: 'تفاصيل الخدمة' }}
      />
    </Stack.Navigator>
  );
};

export default ServicesNavigator;