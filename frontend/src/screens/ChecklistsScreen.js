import React from 'react'
import { toJS } from "mobx";
import { View, ScrollView } from 'react-native'
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
    <ScrollView>
      {data && data.map(checklist => (
        <View key={checklist.name}>
          <ChecklistContainer {...checklist} />
        </View>
      ))}
    </ScrollView>
  )
}

export default ChecklistsScreen