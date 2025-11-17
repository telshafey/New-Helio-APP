import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, Squares2X2Icon, HomeModernIcon, ChatBubbleOvalLeftEllipsisIcon, Bars3Icon } from '../components/Icons';

// Import the new stack navigators
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import PropertiesNavigator from './PropertiesNavigator';
import CommunityNavigator from './CommunityNavigator';
import MoreNavigator from './MoreNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          if (route.name === 'HomeTab') {
            IconComponent = HomeIcon;
          } else if (route.name === 'ServicesTab') {
            IconComponent = Squares2X2Icon;
          } else if (route.name === 'PropertiesTab') {
            IconComponent = HomeModernIcon;
          } else if (route.name === 'CommunityTab') {
            IconComponent = ChatBubbleOvalLeftEllipsisIcon;
          } else if (route.name === 'MoreTab') {
            IconComponent = Bars3Icon;
          }

          return IconComponent ? <IconComponent color={color} width={size} height={size} /> : null;
        },
        tabBarActiveTintColor: '#0891b2', // cyan-600
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'الرئيسية' }} />
      <Tab.Screen name="ServicesTab" component={ServicesNavigator} options={{ title: 'الخدمات' }} />
      <Tab.Screen name="PropertiesTab" component={PropertiesNavigator} options={{ title: 'العقارات' }} />
      <Tab.Screen name="CommunityTab" component={CommunityNavigator} options={{ title: 'المجتمع' }} />
      <Tab.Screen name="MoreTab" component={MoreNavigator} options={{ title: 'المزيد' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
