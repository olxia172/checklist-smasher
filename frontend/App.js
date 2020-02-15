import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import Checklists from './src/screens/Checklists'
import { StoreProvider } from './src/stores/storesContext'
import RootStore from "./src/stores/RootStore"

const Stack = createStackNavigator();

function App() {
  const store = new RootStore();

  useEffect(() => {
    store.setup()
  });

  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ChecklistSmasher' }} />
          <Stack.Screen name="Checklists" component={Checklists} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  )
}

export default App
