import React from 'react'
import { toJS } from "mobx";
import { View, Text } from 'react-native'
import { useStoreData } from "../hooks/useStoreData"
import ChecklistContainer from '../components/ChecklistContainer'

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
  }))
}

function Checklists({ navigation }) {
  const { checklists } = useChecklists();

  const data = checklists && toJS(checklists).map(({ name, items }) => ({
    name,
    data: items,
  }));

  return (
    <View>
      <Text>Checklists Screen</Text>
      {data && data.map(checklist => (
        <ChecklistContainer key={checklist.name} {...checklist} />
      ))}
    </View>
  )
}

export default Checklists