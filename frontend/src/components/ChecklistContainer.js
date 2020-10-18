import React from "react";
import styled from "styled-components/native";
import { bool, string, number, shape, arrayOf, oneOfType } from "prop-types";
import { checklistsColors } from "../constants/colors";
import ChecklistCtas from "../components/ChecklistCtas";
import { List, Divider } from "react-native-paper";
import ItemDoneMark from "../components/ItemDoneMark";
import ItemRemoveButton from "../components/ItemRemoveButton";
import ItemScheduleButton from "../components/ItemScheduleButton";

const StyledView = styled.View`
  background-color: ${checklistsColors.defaultColorLight};
  margin: 20px 0;
`;

const StyledCtaContainer = styled.View`
  display: flex;
  flex-direction: row;
`

const ChecklistContainer = ({ name, id, items, shouldRenderDoneMark = false, shouldRenderScheduleButton = false, shouldRenderRemoveButton = false, shouldRenderAddItemCta = false }) => (
  <StyledView key={name}>
    <List.Section>
      <List.Accordion
        title={name}
        left={(props) => <List.Icon {...props} icon="playlist-check" />}
      >
        {items.map(({ name, done, id, isScheduled }) => (
          <List.Item
            key={id}
            title={name}
            left={() => (shouldRenderDoneMark && <ItemDoneMark done={done} id={id} />)}
            right={() => (
              <StyledCtaContainer>
                {shouldRenderScheduleButton && <ItemScheduleButton id={id} isScheduled={isScheduled} />}
                {shouldRenderRemoveButton && <ItemRemoveButton id={id} />}
              </StyledCtaContainer>
            )}
          />
        ))}
      </List.Accordion>
      {shouldRenderAddItemCta && <ChecklistCtas name={name} checklistId={id} />}
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
  shouldRenderAddItemCta: bool,
  shouldRenderRemoveButton: bool,
  shouldRenderScheduleButton: bool,
  shouldRenderDoneMark: bool,
};

export default ChecklistContainer;
