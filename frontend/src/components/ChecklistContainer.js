import React from 'react'
import styled from 'styled-components/native'
import {bool, string, number, shape, arrayOf, oneOfType} from 'prop-types'
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

const ChecklistContainer = ({ name, id, items }) => (
  <StyledView key={name}>
    <ChecklistHeader name={name} checklistId={id} />
    <StyledList
      data={items}
      renderItem={({ item }) => <ChecklistItem key={item.name} {...item} />}
      ItemSeparatorComponent={() => (<StyledSeparator />)}
    />
  </StyledView>
);

ChecklistContainer.propTypes = {
  name: string,
  id: oneOfType([number, string]),
  items: arrayOf(shape({
    name: string,
    id: oneOfType([number, string]),
    done: bool,
  }))
};

export default ChecklistContainer