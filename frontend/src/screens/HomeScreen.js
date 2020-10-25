import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";
import { toString } from "../helpers/dateHelpers"
import _isEmpty from "lodash/isEmpty"

const Container = styled.View`
  height: 100%;
`

const LogoutButtonWrapper = styled.View`
  margin-top: auto;
`

function useData() {
  return useStoreData(({ checklistsStore, userStore }) => ({
    dailyChecklistsCount: checklistsStore.dailyChecklistsCount,
    logout: userStore.logoutUser,
    dailyChecklists: checklistsStore.dailyChecklists,
  }));
}

const HomeScreen = () => {
  const { getDailyChecklists, dailyChecklistsCount, logout, dailyChecklists } = useData();

  const handleLogout = () => logout();

  const data = dailyChecklists

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer {...item} shouldRenderDoneMark />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <LogoutButtonWrapper>
        <Button onPress={handleLogout}>Logout</Button>
      </LogoutButtonWrapper>
    </Container>
  );
};

export default HomeScreen;
