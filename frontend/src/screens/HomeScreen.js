import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";

const Container = styled.View`
  height: 100%;
`

const TitleWrapper = styled.View`
  padding: 10px 0;
  margin: 0 auto;
`

const ChecklistsButtonWrapper = styled.View`
  margin: 20px;
`

const LogoutButtonWrapper = styled.View`
  margin-top: auto;
`

function useData() {
  return useStoreData(({ checklistsStore, userStore }) => ({
    checklistsCount: checklistsStore.checklistsCount,
    getChecklists: checklistsStore.getChecklists,
    logout: userStore.logoutUser,
  }));
}

const HomeScreen = ({ navigation }) => {
  const { getChecklists, checklistsCount, logout } = useData();

  const handleLogout = () => logout();

  useEffect(() => {
    getChecklists();
  });

  return (
    <Container>
      <TitleWrapper>
        <Title>You have {checklistsCount} checklists! Check them out!</Title>
      </TitleWrapper>
      <ChecklistsButtonWrapper>
        <Button
          icon="progress-check"
          mode="contained"
          contentStyle={{ paddingVertical: 16 }}
          onPress={() => navigation.navigate("Checklists")}
        >
          Go to checklists
        </Button>
      </ChecklistsButtonWrapper>
      <LogoutButtonWrapper>
        <Button onPress={handleLogout}>Logout</Button>
      </LogoutButtonWrapper>
    </Container>
  );
};

export default HomeScreen;
