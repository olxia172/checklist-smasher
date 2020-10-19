import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";
import { tomorrowDate, toString } from "../helpers/dateHelpers"
import _isEmpty from "lodash/isEmpty"

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

const TomorrowScreen = () => {
  const { getDailyChecklists, dailyChecklistsCount, logout, dailyChecklists } = useData();

  const handleLogout = () => logout();

  const data = !_isEmpty(dailyChecklists) ? toJS(dailyChecklists[tomorrowDate()]) : []
  const count = !_isEmpty(dailyChecklistsCount) ? dailyChecklistsCount[tomorrowDate()] : ""

  return (
    <Container>
      <TitleWrapper>
        <Title>You have {count} checklists! Check them out!</Title>
      </TitleWrapper>
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

export default TomorrowScreen;
