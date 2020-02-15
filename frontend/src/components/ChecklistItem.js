import React from 'react'
import { View, Text } from 'react-native'

const ChecklistItem = ({ name }) => (
  <View accessibilityRole="checkbox">
    <Text>{name}</Text>
  </View>
);

export default ChecklistItem