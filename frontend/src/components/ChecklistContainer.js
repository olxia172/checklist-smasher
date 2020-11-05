import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components/native";
import { bool, string, number, shape, arrayOf, oneOfType } from "prop-types";
import { checklistsColors } from "../constants/colors";
import ChecklistCtas from "../components/ChecklistCtas";
import { List, Divider } from "react-native-paper";
import ItemDoneMark from "../components/ItemDoneMark";
import ItemRemoveButton from "../components/ItemRemoveButton";
import ItemScheduleButton from "../components/ItemScheduleButton";
import { observer } from 'mobx-react-lite'

const StyledView = styled.View`
  background-color: ${checklistsColors.defaultColorLight};
  margin-bottom: 10px;
`;

const StyledCtaContainer = styled.View`
  display: flex;
  flex-direction: row;
`

const ChecklistContainer = observer(({
  name,
  id,
  items,
  progress,
  itemsCount,
  doneItemsCount,
  shouldRenderDescription = false,
  shouldRenderDoneMark = false,
  shouldRenderScheduleButton = false,
  shouldRenderRemoveButton = false,
  shouldRenderAddItemCta = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const isFullDone = useMemo(() => progress === 1, [progress])
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    setExpanded(!isFullDone)
  }, [isFullDone, setExpanded])

  return (
    <StyledView key={name}>
      <List.Section>
        <List.Accordion
          title={name}
          description={shouldRenderDescription && `${doneItemsCount}/${itemsCount}`}
          left={(props) => <List.Icon {...props} icon="playlist-check" />}
          expanded={expanded}
          onPress={handlePress}
        >
          {items.map((item) => (
            <List.Item
              key={item.id}
              title={item.name}
              left={() => (shouldRenderDoneMark && <ItemDoneMark item={item} />)}
              right={() => (
                <StyledCtaContainer>
                  {shouldRenderScheduleButton && <ItemScheduleButton id={item.id} isScheduled={item.isScheduled} />}
                  {shouldRenderRemoveButton && <ItemRemoveButton id={item.id} />}
                </StyledCtaContainer>
              )}
            />
          ))}
        </List.Accordion>
        {shouldRenderAddItemCta && <ChecklistCtas name={name} checklistId={id} />}
      </List.Section>
    </StyledView>
  )
})

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
