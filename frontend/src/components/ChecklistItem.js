import React from 'react'
import { Checkbox } from 'react-native-paper'
import { TouchableHighlight } from 'react-native'
import { bool, string, number, oneOfType } from 'prop-types'
import { useStoreData } from '../hooks/useStoreData'
import styled from 'styled-components'
import { IconButton } from 'react-native-paper'

const StyledItemName = styled.Text`
  text-decoration: ${props => props.done ? 'line-through' : 'none'}
  align-self: center;
  font-size: 16px;
`;

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-content: space-between;
`;

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    toggleDoneItem: itemStore.toggleDoneItem,
    removeItem: itemStore.removeItem,
  }))
}

function ChecklistItem({ name, done, id }) {
  const { toggleDoneItem, removeItem } = useChecklists();

  function toggleDone() {
    toggleDoneItem(id, !Boolean(done))
  }

  return (
    <StyledWrapper>
      <StyledView>
        <TouchableHighlight
          style={{ alignSelf: 'center' }}
          underlayColor='#FFFFFF'
          onPress={() => toggleDone()}
        >
          <Checkbox.Android
            status={Boolean(done) ? 'checked' : 'unchecked'}
          />
        </TouchableHighlight>
        <StyledItemName done={Boolean(done)} >{name}</StyledItemName>
      </StyledView>
      <IconButton
        icon='close-circle'
        onPress={() => removeItem(id)}
      />
    </StyledWrapper>
  )
}

ChecklistItem.propTypes = {
  name: string,
  done: bool,
  id: oneOfType([number, string]),
};

export default ChecklistItem