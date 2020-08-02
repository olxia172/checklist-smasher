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

const LoginScreen = () => {
  const { login } = useData();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    login(email, password);
  };

  return (
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
  );
};

export default LoginScreen;
