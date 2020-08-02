import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import { headerStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const GuestUserNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ ...headerStyles }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GuestUserNav;
