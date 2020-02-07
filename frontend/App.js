import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import Checklists from './src/screens/Checklists'
import SingleChecklist from './src/screens/SingleChecklist'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const Stack = createStackNavigator()
const client = new ApolloClient()

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default App
