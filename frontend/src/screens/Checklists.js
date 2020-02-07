import React from 'react'
import {View, Text, Button} from 'react-native'

function Checklists({ navigation }) {
  return (
    <View>
      <Text>Checklists Screen</Text>
      <Button title="Checklist1" onPress={() => navigation.navigate('SingleChecklist', {
        name: 'Test checklist 1',
        itemsCount: 2,
      })} />
      <Button title="Checklist2" onPress={() => navigation.navigate('SingleChecklist', {
        name: 'Test checklist 2',
        itemsCount: 7,
      })} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default Checklists