import React from 'react'
import { Text } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useStoreData } from "../hooks/useStoreData"

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    toggleDoneItem: itemStore.toggleDoneItem,
  }))
}

function ChecklistItem({ name, done, id }) {
  const { toggleDoneItem } = useChecklists();

  function toggleDone() {
    toggleDoneItem(id, !Boolean(done))
  }
  
  return (
    <>
      <Checkbox.Android
        status={Boolean(done) ? 'checked' : 'unchecked'}
        onPress={() => toggleDone()}
      />
      <Text>{name}</Text>
    </>
  )
};

export default ChecklistItem