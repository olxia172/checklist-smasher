import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ChecklistsScreen from "../../screens/ChecklistsScreen";
// import MainScreenHeader from "./src/components/MainScreenHeader";
import { headerStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const LoggedUserNav = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...headerStyles,
        }}
      />
      <Stack.Screen
        name="Checklists"
        component={ChecklistsScreen}
        options={{
          ...headerStyles,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default LoggedUserNav;
