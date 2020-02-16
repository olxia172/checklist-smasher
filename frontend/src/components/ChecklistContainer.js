import React from 'react'
import { Text, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { checklistsColors, basicColors } from '../constants/colors'
import ChecklistItem from '../components/ChecklistItem'
import {View} from "react-native-reanimated";

const StyledView = styled.View`
  border-width: 4px;
  border-style: solid;
  border-color: ${checklistsColors.defaultColorDark};
  border-radius: 5px;
  background-color: ${checklistsColors.defaultColorLight};
  margin: 15px;
`;

const StyledTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${basicColors.black};
  background-color: ${checklistsColors.defaultColorDark};
  padding: 10px;
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
    <StyledTitle>{name}</StyledTitle>
    <StyledList
      data={data}
      renderItem={({ item }) => <ChecklistItem key={item.name} {...item} />}
      ItemSeparatorComponent={(props) => (<StyledSeparator />)}
    />
  </StyledView>
);

export default ChecklistContainer