import React from 'react'
import { Checkbox } from 'react-native-paper'
import { useStoreData } from "../hooks/useStoreData"
import styled from "styled-components";

const StyledItemName = styled.Text`
  text-decoration: ${props => props.done ? 'line-through' : 'none'}
`;

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    toggleDoneItem: itemStore.toggleDoneItem,
  }))
}

function ChecklistItem({ name, done, id }) {
  const { toggleDoneItem } = useChecklists();

  function toggleDone() {
    toggleDoneItem(id, !Boolean(done))
  }
  
  return (
    <>
      <Checkbox.Android
        status={Boolean(done) ? 'checked' : 'unchecked'}
        onPress={() => toggleDone()}
      />
      <StyledItemName done={Boolean(done)} >{name}</StyledItemName>
    </>
  )
};

export default ChecklistItem