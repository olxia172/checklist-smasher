import React, { useState } from "react";
import { toJS } from "mobx";
import { View, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import ChecklistContainer from "../components/ChecklistContainer";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { basicColors } from "../constants/colors";
import useDialogModal from "../hooks/useDialogModal";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fab: {
    maxWidth: "20px",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

function useChecklists() {
  return useStoreData(({ checklistsStore }) => ({
    checklists: checklistsStore.checklists,
    createChecklist: checklistsStore.createChecklist,
  }));
}

function ChecklistsScreen({ navigation }) {
  const { checklists, createChecklist } = useChecklists();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const [checklistName, setChecklistName] = useState("");

  const data = checklists && toJS(checklists);

  function handleAddChecklist() {
    createChecklist(checklistName);
    closeDialogModal();
    setChecklistName("");
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer {...item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View>
        <Portal>
          <Modal
            visible={isModalOpened}
            onDismiss={closeDialogModal}
            contentContainerStyle={{ backgroundColor: basicColors.white }}
          >
            <TextInput
              label="New checklist name"
              mode="outlined"
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
              value={checklistName}
              onChangeText={(text) => {
                setChecklistName(text);
              }}
            />
            <Button icon="plus" mode="contained" onPress={handleAddChecklist}>
              Add Checklist
            </Button>
          </Modal>
        </Portal>
      </View>
      <FAB
        icon="plus"
        styles={styles.fab}
        color={basicColors.white}
        onPress={() => openDialogModal()}
      />
    </>
  );
}

export default ChecklistsScreen;
