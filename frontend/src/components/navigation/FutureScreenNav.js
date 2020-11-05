import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TomorrowScreen from "../../screens/TomorrowScreen";
import { userHeaderStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const FutureScreenNav = () => (
  <Stack.Navigator initialRouteName="Upcoming">
    <Stack.Screen
      name="Upcoming"
      component={TomorrowScreen}
      options={{
        ...userHeaderStyles,
      }}
    />
  </Stack.Navigator>
);

export default FutureScreenNav;
