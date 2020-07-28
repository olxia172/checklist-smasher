import React, { useState } from "react";
import styled from "styled-components/native";
import { number, oneOfType, string } from "prop-types";
import { basicColors, checklistsColors } from "../constants/colors";
import {
  Modal,
  Portal,
  Button,
  IconButton,
  TextInput,
} from "react-native-paper";
import useDialogModal from "../hooks/useDialogModal";
import { useStoreData } from "../hooks/useStoreData";

const StyledHeader = styled.View`
  color: ${basicColors.black};
  background-color: ${checklistsColors.defaultColorLight};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.View`
  background-color: ${checklistsColors.defaultColorDark};
  margin-left: auto;
`;

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    addItem: itemStore.addItem,
  }));
}

function ChecklistCtas({ checklistId }) {
  const { addItem } = useChecklists();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const [itemName, setItemName] = useState("");

  const handleAddItem = () => {
    addItem(itemName, checklistId);
    closeDialogModal();
    setItemName("");
  };

  return (
    <StyledHeader>
      <StyledButton>
        <Button
          icon="plus"
          color={basicColors.white}
          onPress={() => openDialogModal()}
        >
          Add item
        </Button>
      </StyledButton>
      <Portal>
        <Modal
          visible={isModalOpened}
          onDismiss={closeDialogModal}
          contentContainerStyle={{ backgroundColor: basicColors.white }}
        >
          <TextInput
            label="New item"
            mode="outlined"
            style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 20 }}
            value={itemName}
            onChangeText={(text) => {
              setItemName(text);
            }}
          />
          <Button icon="plus" mode="contained" onPress={handleAddItem}>
            Add item
          </Button>
        </Modal>
      </Portal>
    </StyledHeader>
  );
}

ChecklistCtas.propTypes = {
  name: string,
  checklistId: oneOfType([number, string]),
};

export default ChecklistCtas;
