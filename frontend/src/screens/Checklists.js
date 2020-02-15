import React from 'react'
import { toJS } from "mobx";
import { View, Text, FlatList } from 'react-native'
import { useStoreData } from "../hooks/useStoreData"
import ChecklistItem from '../components/ChecklistItem'

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
  }))
}

function Checklists({ navigation }) {
  const { checklists } = useChecklists()

  const data = checklists && toJS(checklists).map(({ name, items }) => ({
    name,
    data: items,
  }))

  return (
    <View>
      <Text>Checklists Screen</Text>
      {data && data.map(checklist => (
        <View key={checklist.name}>
          <Text>{checklist.name}</Text>
          <FlatList
            data={checklist.data}
            renderItem={({ item }) => <ChecklistItem key={item.name} {...item} />}
          />
        </View>
      ))}
    </View>
  )
}

export default Checklists