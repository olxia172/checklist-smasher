import React from 'react'
import {View, Text, Button} from 'react-native'

function SingleChecklist({ route, navigation }) {
  const { name, itemsCount } = route.params
  return (
    <View>
      <Text>SingleChecklist Screen</Text>
      <Text>{name}</Text>
      <Text>{itemsCount}</Text>
      <Button title="Go back" onPress={() => navigation.popToTop()} />
    </View>
  )
}

export default SingleChecklist