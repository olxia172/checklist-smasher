import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TomorrowScreen from "../../screens/TomorrowScreen";
import { userHeaderStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const FutureScreenNav = () => (
  <Stack.Navigator initialRouteName="Tomorrow">
    <Stack.Screen
      name="Tomorrow"
      component={TomorrowScreen}
      options={{
        ...userHeaderStyles,
      }}
    />
  </Stack.Navigator>
);

export default FutureScreenNav;
