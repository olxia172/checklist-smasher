import React from 'react'
import { toJS } from 'mobx';
import { View, FlatList } from 'react-native'
import { useStoreData } from '../hooks/useStoreData'
import ChecklistContainer from '../components/ChecklistContainer'

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
  }))
}

function ChecklistsScreen({ navigation }) {
  const { checklists } = useChecklists();

  const data = checklists && toJS(checklists);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        <View key={item.name}>
          <ChecklistContainer {...item} />
        </View>
      }
      keyExtractor={item => item.id}
    >
    </FlatList>
  )
}

export default ChecklistsScreen