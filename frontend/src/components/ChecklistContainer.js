import React from "react";
import styled from "styled-components/native";
import { bool, string, number, shape, arrayOf, oneOfType } from "prop-types";
import { checklistsColors } from "../constants/colors";
import ChecklistCtas from "../components/ChecklistCtas";
import { List } from "react-native-paper";
import ItemDoneMark from "../components/ItemDoneMark";
import ItemRemoveButton from "../components/ItemRemoveButton";

const StyledView = styled.View`
  border-width: 1px;
  border-style: solid;
  border-color: ${checklistsColors.defaultColorDark};
  background-color: ${checklistsColors.defaultColorLight};
  margin: 15px;
`;

const ChecklistContainer = ({ name, id, items }) => (
  <StyledView key={name}>
    <List.Section>
      <List.Accordion title={name}>
        {items.map(({ name, done, id }) => (
          <List.Item
            title={name}
            left={() => <ItemDoneMark done={done} id={id} />}
            right={() => <ItemRemoveButton id={id} />}
          />
        ))}
      </List.Accordion>
      <ChecklistCtas name={name} checklistId={id} />
    </List.Section>
  </StyledView>
);

ChecklistContainer.propTypes = {
  name: string,
  id: oneOfType([number, string]),
  items: arrayOf(
    shape({
      name: string,
      id: oneOfType([number, string]),
      done: bool,
    })
  ),
};

export default ChecklistContainer;
