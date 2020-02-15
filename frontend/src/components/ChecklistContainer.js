import React from 'react'
import { Text, FlatList } from 'react-native'
import ChecklistItem from '../components/ChecklistItem'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: red;
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
)

export default ChecklistContainer