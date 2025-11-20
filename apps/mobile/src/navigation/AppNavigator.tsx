
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, Squares2X2Icon, HomeModernIcon, NewspaperIcon, Bars3Icon } from '../components/Icons';

// Import stack navigators for each tab
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import PropertiesNavigator from './PropertiesNavigator';
import NewsNavigator from './NewsNavigator';
import MoreNavigator from './MoreNavigator';
import { useUI } from '../shared';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { isDarkMode } = useUI();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          if (route.name === 'HomeTab') IconComponent = HomeIcon;
          else if (route.name === 'ServicesTab') IconComponent = Squares2X2Icon;
          else if (route.name === 'PropertiesTab') IconComponent = HomeModernIcon;
          else if (route.name === 'NewsTab') IconComponent = NewspaperIcon;
          else if (route.name === 'MoreTab') IconComponent = Bars3Icon;
          return IconComponent ? <IconComponent color={color} width={size} height={size} /> : null;
        },
        tabBarActiveTintColor: '#0891b2', // cyan-600
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          borderTopColor: isDarkMode ? '#334155' : '#e2e8f0',
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'الرئيسية' }} />
      <Tab.Screen name="ServicesTab" component={ServicesNavigator} options={{ title: 'الخدمات' }} />
      <Tab.Screen name="PropertiesTab" component={PropertiesNavigator} options={{ title: 'العقارات' }} />
      <Tab.Screen name="NewsTab" component={NewsNavigator} options={{ title: 'الأخبار' }} />
      <Tab.Screen name="MoreTab" component={MoreNavigator} options={{ title: 'المزيد' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
