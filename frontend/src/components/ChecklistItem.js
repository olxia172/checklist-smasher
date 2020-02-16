import React from 'react'
import { Checkbox } from 'react-native-paper'
import { TouchableHighlight } from 'react-native'
import { bool, string, number, oneOfType } from 'prop-types'
import { useStoreData } from '../hooks/useStoreData'
import styled from 'styled-components'

const StyledItemName = styled.Text`
  text-decoration: ${props => props.done ? 'line-through' : 'none'}
  align-self: center;
  font-size: 16px;
`;

const StyledView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
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
    <StyledView>
      <TouchableHighlight underlayColor='#FFFFFF' onPress={() => toggleDone()}>
        <Checkbox.Android
          status={Boolean(done) ? 'checked' : 'unchecked'}
        />
      </TouchableHighlight>
      <StyledItemName done={Boolean(done)} >{name}</StyledItemName>
    </StyledView>
  )
}

ChecklistItem.propTypes = {
  name: string,
  done: bool,
  id: oneOfType([number, string]),
};

export default ChecklistItem