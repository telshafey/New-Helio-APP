import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsScreen from '../screens/NewsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { useUI } from '../shared';

const Stack = createNativeStackNavigator();

const NewsNavigator = () => {
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
        name="NewsList" 
        component={NewsScreen} 
        options={{ title: 'الأخبار' }} 
      />
      <Stack.Screen 
        name="NewsDetail" 
        component={NewsDetailScreen} 
        options={{ title: 'تفاصيل الخبر' }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigator;