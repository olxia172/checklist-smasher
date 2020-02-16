import React  from "react"
import { View, Text, Button } from "react-native"
import { useStoreData } from "../hooks/useStoreData"

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklistsCount: checklistsStore.checklistsCount,
  }))
}

function HomeScreen({ navigation }) {
  const { checklistsCount } = useChecklists()

  return (
    <View>
      <Text>You have {checklistsCount} checklists! Check them out!</Text>
      <Button
        title="Go to checklists"
        onPress={() => navigation.navigate("Checklists")}
      />
    </View>
  )
}

export default HomeScreen