import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChecklistsScreen from "../../screens/ChecklistsScreen";
import ScheduleItemScreen from "../../screens/ScheduleItemScreen";
import { userHeaderStyles } from "../../constants/themeConfig";

const Stack = createStackNavigator();

const ChecklistsNav = () => (
  <Stack.Navigator initialRouteName="Checklists">
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
);

export default ChecklistsNav;
