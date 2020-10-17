import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import { userHeaderStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const MainScreenNav = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        ...userHeaderStyles,
      }}
    />
  </Stack.Navigator>
);

export default MainScreenNav;
