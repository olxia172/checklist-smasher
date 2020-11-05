import React, { useState, useLayoutEffect } from "react";
import { toJS } from "mobx";
import { View, FlatList } from "react-native";
import { useStoreData } from "../stores/storesContext";
import ChecklistContainer from "../components/ChecklistContainer";
import { Button, IconButton, Modal, Portal, TextInput } from "react-native-paper";
import { basicColors } from "../constants/colors";
import useDialogModal from "../hooks/useDialogModal";
import { observer } from 'mobx-react-lite'

const ChecklistsScreen = observer(({ navigation }) => {
  const {
    checklistsStore: {
      checklists,
      createChecklist,
    }
  } = useStoreData();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const [checklistName, setChecklistName] = useState("");

  const data = checklists && toJS(checklists);

  const handleAddChecklist = () => {
    createChecklist(checklistName);
    closeDialogModal();
    setChecklistName("");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          color={basicColors.white}
          style={{ paddingVertical: 8 }}
          onPress={() => openDialogModal()}
          mode="contained"
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.name}>
            <ChecklistContainer {...item} shouldRenderScheduleButton shouldRenderRemoveButton shouldRenderAddItemCta />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
          <Button icon="plus" mode="contained" onPress={handleAddChecklist} contentStyle={{ paddingVertical: 16 }}>
            Add Checklist
          </Button>
        </Modal>
      </Portal>
    </>
  );
})

export default ChecklistsScreen;
