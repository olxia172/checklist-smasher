import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import HomeScreen from './src/screens/HomeScreen'
import ChecklistsScreen from './src/screens/ChecklistsScreen'
import { StoreProvider } from './src/stores/storesContext'
import RootStore from './src/stores/RootStore'
import { basicColors } from './src/constants/colors'

const Stack = createStackNavigator();

function App() {
  const store = new RootStore();

  useEffect(() => {
    store.setup()
  });

  const headerStyles = {
    headerStyle: {
      backgroundColor: basicColors.primary,
    },
    headerTintColor: basicColors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: basicColors.primary,
      accent: basicColors.primaryLight,
    },
  };

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                ...headerStyles,
                title: 'ChecklistSmasher',
              }}
            />
            <Stack.Screen
              name='Checklists'
              component={ChecklistsScreen}
              options={{
                ...headerStyles,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App
