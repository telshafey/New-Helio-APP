import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '../../../packages/shared-logic/src/context/AppProvider';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Note: The UIProvider handles dark/light mode automatically.
  // We can assume SafeAreaView and other native-specific layout components
  // will be handled within screens as needed.
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </AppProvider>
  );
}