import React from 'react'
import styled from 'styled-components/native'
import { checklistsColors } from '../constants/colors'
import ChecklistItem from '../components/ChecklistItem'
import ChecklistHeader from '../components/ChecklistHeader'

const StyledView = styled.View`
  border-width: 4px;
  border-style: solid;
  border-color: ${checklistsColors.defaultColorDark};
  border-radius: 5px;
  background-color: ${checklistsColors.defaultColorLight};
  margin: 15px;
`;

const StyledList = styled.FlatList`
  padding: 10px;
`;

const StyledSeparator = styled.View`
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ChecklistContainer = ({ name, data }) => (
  <StyledView key={name}>
    <ChecklistHeader name={name} />
    <StyledList
      data={data}
      renderItem={({ item }) => <ChecklistItem key={item.name} {...item} />}
      ItemSeparatorComponent={(props) => (<StyledSeparator />)}
    />
  </StyledView>
);

export default ChecklistContainer