import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceListScreen from '../screens/ServiceListScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';

const Stack = createNativeStackNavigator();

const ServicesNavigator = () => {
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
        name="Services" 
        component={ServicesScreen} 
        options={{ headerShown: false }} // Hide header on the main category screen
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