import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";
import { toString } from "../helpers/dateHelpers"
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";

const Container = styled.View`
  height: 100%;
`

const TitleWrapper = styled.View`
  padding: 10px 0;
  margin: 0 auto;
`

const LogoutButtonWrapper = styled.View`
  margin-top: auto;
`

function useData() {
  return useStoreData(({ checklistsStore, userStore }) => ({
    dailyChecklistsCount: checklistsStore.dailyChecklistsCount,
    logout: userStore.logoutUser,
    getDailyChecklists: checklistsStore.getMyDailyChecklists,
    dailyChecklists: checklistsStore.dailyChecklists,
  }));
}

const HomeScreen = () => {
  const { getDailyChecklists, dailyChecklistsCount, logout, dailyChecklists } = useData();

  const handleLogout = () => logout();

  useEffect(() => {
    getDailyChecklists(toString(new Date()));
  }, [getDailyChecklists]);

  const data = dailyChecklists && toJS(dailyChecklists)

  return (
    <Container>
      <TitleWrapper>
        <Title>You have {dailyChecklistsCount} checklists! Check them out!</Title>
      </TitleWrapper>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer {...item} />
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
