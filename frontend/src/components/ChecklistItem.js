import React from 'react'
import { Text } from 'react-native'
import { Checkbox } from 'react-native-paper'

function ChecklistItem({ name, done }) {
  console.log(done)
  return (
    <>
      <Checkbox.Android
        status={Boolean(done) ? 'checked' : 'unchecked'}
      />
      <Text>{name}</Text>
    </>
  )
};

export default ChecklistItem