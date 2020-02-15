import React from 'react'
import { toJS } from "mobx";
import { View } from 'react-native'
import { useStoreData } from "../hooks/useStoreData"
import ChecklistContainer from '../components/ChecklistContainer'

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
  }))
}

function ChecklistsScreen({ navigation }) {
  const { checklists } = useChecklists();

  const data = checklists && toJS(checklists).map(({ name, items }) => ({
    name,
    data: items,
  }));

  return (
    <View>
      {data && data.map(checklist => (
        <ChecklistContainer key={checklist.name} {...checklist} />
      ))}
    </View>
  )
}

export default ChecklistsScreen