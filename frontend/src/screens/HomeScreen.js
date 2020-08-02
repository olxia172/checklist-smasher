import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useStoreData } from "../hooks/useStoreData";

function useData() {
  return useStoreData(({ checklistsStore, userStore }) => ({
    checklistsCount: checklistsStore.checklistsCount,
    getChecklists: checklistsStore.getChecklists,
    logout: userStore.logoutUser,
  }));
}

const HomeScreen = ({ navigation }) => {
  const { getChecklists, checklistsCount, logout } = useData();

  const handleLogout = () => logout();

  useEffect(() => {
    getChecklists();
  });

  return (
    <View>
      <Text>You have {checklistsCount} checklists! Check them out!</Text>
      <Button
        title="Go to checklists"
        onPress={() => navigation.navigate("Checklists")}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
