import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChecklistsNav from "./ChecklistsNav";
import MainScreenNav from "./MainScreenNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { basicColors } from "../../constants/colors"

const Tab = createBottomTabNavigator();

const LoggedUserNav = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === "Home" ? "check-double" : "list"
          return <Icon name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: basicColors.primary,
      }}
      >
      <Tab.Screen name="Home" component={MainScreenNav} />
      <Tab.Screen name="Checklists" component={ChecklistsNav} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default LoggedUserNav;
