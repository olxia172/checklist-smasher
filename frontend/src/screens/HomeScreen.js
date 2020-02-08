import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { observer } from "mobx-react"
import { useStores } from "../hooks/useStores"

function HomeScreen({ navigation }) {
  const { checklistsStore } = useStores()

  useEffect(() => {
    checklistsStore.getChecklists()
  })

  const { checklists } = checklistsStore
  const checks = checklists && JSON.stringify(checklists, null, 2)

  return (
    <View>
      <Text>Checks: {checks}</Text>
      <Button
        title="Go to checklists"
        onPress={() => navigation.navigate("Checklists")}
      />
    </View>
  )
}

export default observer(HomeScreen)