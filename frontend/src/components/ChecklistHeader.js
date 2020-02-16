import React, { useState } from 'react'
import styled from 'styled-components/native'
import { basicColors, checklistsColors } from '../constants/colors'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'
import useDialogModal from '../hooks/useDialogModal'
import {useStoreData} from "../hooks/useStoreData";

const StyledTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  align-self: center;
  color: ${basicColors.black};
  background-color: ${checklistsColors.defaultColorDark};
`;

const StyledHeader = styled.View`
  color: ${basicColors.black};
  background-color: ${checklistsColors.defaultColorDark};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    addItem: itemStore.addItem,
  }))
}

function ChecklistHeader({ name, checklistId }) {
  const { addItem } = useChecklists();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    addItem(itemName, checklistId);
    closeDialogModal();
    setItemName('');
  };

  return (
    <StyledHeader>
      <StyledTitle>{name}</StyledTitle>
      <Button
        icon='plus'
        mode='contained'
        color={basicColors.white}
        onPress={() => openDialogModal()}
      >
        Add item
      </Button>
      <Portal>
        <Modal
          visible={isModalOpened}
          onDismiss={closeDialogModal}
          contentContainerStyle={{ backgroundColor: basicColors.white }}
        >
          <TextInput
            label='New item'
            mode='outlined'
            style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 20 }}
            value={itemName}
            onChangeText={text => { setItemName(text) }}
          />
          <Button
            icon='plus'
            mode='contained'
            onPress={handleAddItem}
          >
            Add item
          </Button>
        </Modal>
      </Portal>
    </StyledHeader>
  )
}

export default ChecklistHeader