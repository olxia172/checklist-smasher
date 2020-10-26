import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../stores/storesContext";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";
import { toString } from "../helpers/dateHelpers"
import { observer } from 'mobx-react-lite'

const Container = styled.View`
  height: 100%;
`

const LogoutButtonWrapper = styled.View`
  margin-top: auto;
`

const HomeScreen = observer(() => {
  const {
    dailyChecklistsStore: {
      newDailyChecklists: dailyChecklists,
    },
    userStore: {
      logoutUser: logout,
    },
  } = useStoreData();

  const handleLogout = () => logout();

  const data = dailyChecklists.find(({ date }) => date === toString(new Date())).checklists

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer name={item.name} id={item.id} items={item.items} shouldRenderDoneMark />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <LogoutButtonWrapper>
        <Button onPress={handleLogout}>Logout</Button>
      </LogoutButtonWrapper>
    </Container>
  );
});

export default HomeScreen;
