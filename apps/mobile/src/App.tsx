
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '../../../packages/shared-logic/src/context/AppProvider';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { useUI } from '../../../packages/shared-logic/src/context/UIContext';
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