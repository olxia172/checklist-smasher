import React from 'react'
import { Text, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { checklistsColors } from '../constants/colors'
import ChecklistItem from '../components/ChecklistItem'

const StyledView = styled.View`
  background-color: ${checklistsColors.defaultColor};
  padding: 10px;
  margin: 20px;
`;

const ChecklistContainer = ({ name, data }) => (
  <StyledView key={name}>
    <Text>{name}</Text>
    <FlatList
      data={data}
      renderItem={({ item }) => <ChecklistItem key={item.name} {...item} />}
    />
  </StyledView>
);

export default ChecklistContainer