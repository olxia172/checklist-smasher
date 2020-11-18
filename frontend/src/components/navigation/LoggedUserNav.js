import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChecklistsNav from "./ChecklistsNav";
import MainScreenNav from "./MainScreenNav";
import FutureScreenNav from "./FutureScreenNav"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { basicColors } from "../../constants/colors"

const Tab = createBottomTabNavigator();

const LoggedUserNav = () => {
  return (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = {
            "Home": "check-double",
            "Tomorrow": "forward",
            "Checklists": "list"
          }[route.name]
          return <Icon name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: basicColors.primary,
      }}
      >
      <Tab.Screen name="Home" component={MainScreenNav} />
      <Tab.Screen name="Tomorrow" component={FutureScreenNav} />
      <Tab.Screen name="Checklists" component={ChecklistsNav} />
    </Tab.Navigator>
  </NavigationContainer>
)
}
export default LoggedUserNav;
