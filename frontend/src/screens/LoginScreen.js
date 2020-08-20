import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useStoreData } from "../hooks/useStoreData";
import styled from "styled-components";

const MainViewContainer = styled.View`
  height: 100%;
`;

const Container = styled.View`
  margin-top: 40px;
`;

const ButtonWrapper = styled.View`
  margin: 20px;
`;

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
    <MainViewContainer>
      <Container>
        <TextInput
          label="Email"
          mode="outlined"
          style={{
            fontSize: 16,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          secureTextEntry={true}
          password={true}
          style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 20 }}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <ButtonWrapper>
          <Button
            icon="login"
            onPress={handleLogin}
            mode="contained"
            contentStyle={{ paddingVertical: 16 }}
          >
            Login
          </Button>
        </ButtonWrapper>
      </Container>
    </MainViewContainer>
  );
};

export default LoginScreen;
