import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../stores/storesContext";
import { Title, Button, IconButton } from 'react-native-paper';
import styled from "styled-components/native";
import ChecklistContainer from "../components/ChecklistContainer";
import { toJS } from "mobx";
import { tomorrowDate, toString, prevDate, nextDate } from "../helpers/dateHelpers"
import { observer } from 'mobx-react-lite'
import { basicColors } from "../constants/colors"
import { ActivityIndicator } from 'react-native-paper';

const Container = styled.View`
  height: 100%;
`

const ActionButtons = styled.View`
  display: flex;
  flex-direction: row;
`

const CurrentDate = styled.Text`
  width: 40%;
  background-color: ${basicColors.primaryLight};
  text-align: center;
  display: flex;
  padding: 10px 0;

`

const TomorrowScreen = observer(({ navigation }) => {
  const {
    dailyChecklistsStore: {
      newDailyChecklists: dailyChecklists,
      newGetMyDailyChecklists,
      areChecklistsFetched,
    },
  } = useStoreData();
  const initialCurrentDay = tomorrowDate()
  const initialPrevDay = prevDate(initialCurrentDay)
  const initialNextDay = nextDate(initialCurrentDay)

  const [currentDay, setCurrentDay] = useState(initialCurrentDay)
  const [prevDay, setPrevDay] = useState(initialPrevDay)
  const [nextDay, setNextDay] = useState(initialNextDay)

  const dailyChecklist = dailyChecklists.find(({ date }) => date === currentDay)
  const data = dailyChecklist ? dailyChecklist.checklists : []

  const handleNextDayPress = () => {
    setCurrentDay(nextDay)
    setPrevDay(prevDate(nextDay))
    setNextDay(nextDate(nextDay))
  }

  const handlePrevDayPress = () => {
    setCurrentDay(prevDay)
    setPrevDay(prevDate(prevDay))
    setNextDay(nextDate(prevDay))
  }

  const reset = () => {
    setCurrentDay(initialCurrentDay)
    setPrevDay(initialPrevDay)
    setNextDay(initialNextDay)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="undo"
          color={basicColors.white}
          style={{ paddingVertical: 8 }}
          onPress={reset}
          mode="contained"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    newGetMyDailyChecklists(currentDay)
  }, [currentDay, newGetMyDailyChecklists])

  return (
    <Container>
      <ActionButtons>
        <Button
          mode="contained"
          color={basicColors.primaryLight}
          style={{ width: '30%' }}
          icon="arrow-left"
          compact
          onPress={handlePrevDayPress}
        />
        <Button
          mode="contained"
          color={basicColors.primaryLight}
          style={{ width: '40%' }}
          icon="calendar"
          compact
        >
          {currentDay}
        </Button>
        <Button
          mode="contained"
          color={basicColors.primaryLight}
          style={{ width: '30%' }}
          icon="arrow-right"
          compact
          onPress={handleNextDayPress}
        />
      </ActionButtons>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer {...item} shouldRenderDoneMark shouldRenderDescription />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  )
});

export default TomorrowScreen;
