import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { useStoreData } from "../hooks/useStoreData";

function useData() {
  return useStoreData(({ checklistsStore, userStore }) => ({
    checklistsCount: checklistsStore.checklistsCount,
    login: userStore.loginUser,
    logout: userStore.logoutUser,
    isUserLoggedIn: userStore.isUserLoggedIn,
  }));
}

function HomeScreen({ navigation }) {
  const { checklistsCount, isUserLoggedIn, login, logout } = useData();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    login(email, password);
  };

  const handleLogout = () => logout();

  return (
    <>
      {isUserLoggedIn ? (
        <View>
          <Text>You have {checklistsCount} checklists! Check them out!</Text>
          <Button
            title="Go to checklists"
            onPress={() => navigation.navigate("Checklists")}
          />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text>Login</Text>
          <TextInput
            label="Email"
            mode="outlined"
            style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 20 }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 20 }}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </>
  );
}

export default HomeScreen;
