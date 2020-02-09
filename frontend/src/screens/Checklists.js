import React from 'react'
import {View, Text, Button} from 'react-native'
import { useStoreData } from "../hooks/useStoreData"

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
  }))
}

function Checklists({ navigation }) {
  const { checklists } = useChecklists()
  console.log(checklists[0].items)
  return (
    <View>
      <Text>Checklists Screen</Text>
      {checklists.map(checklist => (
        <Button key={checklist.name} title={checklist.name} onPress={() => navigation.navigate('SingleChecklist', {
          name: checklist.name,
          itemsCount: 2,
        })} />
      ))}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default Checklists