import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../stores/storesContext";
import { Title, Button } from 'react-native-paper';
import styled from "styled-components/native";
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";
import { tomorrowDate, toString } from "../helpers/dateHelpers"
import { observer } from 'mobx-react-lite'

const Container = styled.View`
  height: 100%;
`

const TomorrowScreen = observer(() => {
  const {
    dailyChecklistsStore: {
      newDailyChecklists: dailyChecklists,
    },
  } = useStoreData();

  const data = dailyChecklists.find(({ date }) => date === tomorrowDate()).checklists

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
    </Container>
  )
});

export default TomorrowScreen;
