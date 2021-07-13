import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { AppRoutes } from './src/routes/app.routes';
import { StorageDataProvider, useStorageData } from './src/hooks/storageData';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const { storageDataLoading } = useStorageData();

  if (!fontsLoaded || storageDataLoading) {
    return <AppLoading />
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StorageDataProvider>
          <AppRoutes />
        </StorageDataProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}