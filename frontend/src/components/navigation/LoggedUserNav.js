import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ChecklistsScreen from "../../screens/ChecklistsScreen";
import ScheduleItemScreen from "../../screens/ScheduleItemScreen";
// import MainScreenHeader from "./src/components/MainScreenHeader";
import { userHeaderStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const LoggedUserNav = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...userHeaderStyles,
        }}
      />
      <Stack.Screen
        name="Checklists"
        component={ChecklistsScreen}
        options={{
          ...userHeaderStyles,
        }}
      />
      <Stack.Screen
        name="ScheduleItem"
        component={ScheduleItemScreen}
        options={{
          ...userHeaderStyles,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default LoggedUserNav;
