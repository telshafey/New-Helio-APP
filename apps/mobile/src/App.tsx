
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider, useUI } from './shared';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import Toast from './components/common/Toast';

const AppContent = () => {
  const { isDarkMode } = useUI();
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
