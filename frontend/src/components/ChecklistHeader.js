import React from 'react'
import styled from 'styled-components/native'
import { basicColors, checklistsColors } from '../constants/colors'
import {Button} from 'react-native-paper'

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

function ChecklistHeader({ name }) {
  return (
    <StyledHeader>
      <StyledTitle>{name}</StyledTitle>
      <Button
        icon='plus'
        mode='contained'
        color={basicColors.white}
      >
        Add item
      </Button>
    </StyledHeader>
  )
}

export default ChecklistHeader