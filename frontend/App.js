import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import Checklists from './src/screens/Checklists'
import SingleChecklist from './src/screens/SingleChecklist'
import { StoreProvider } from './src/stores/storesContext'
import RootStore from "./src/stores/RootStore"

const Stack = createStackNavigator()


function App() {
  return (
    <StoreProvider store={new RootStore()}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ChecklistSmasher' }} />
          <Stack.Screen name="Checklists" component={Checklists} />
          <Stack.Screen
            name="SingleChecklist"
            component={SingleChecklist}
            options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  )
}

export default App
