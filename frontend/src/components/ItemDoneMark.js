import React, { useContext } from "react";
import { Checkbox } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import { bool, string, number, oneOfType } from "prop-types";
import { observer } from 'mobx-react-lite'

const ItemDoneMark = observer(({ item }) => {
  return (
    <TouchableHighlight
      style={{ alignSelf: "center" }}
      underlayColor="#FFFFFF"
      onPress={async () => await item.toggleDone()}
    >
      <Checkbox.Android status={Boolean(item.done) ? "checked" : "unchecked"} />
    </TouchableHighlight>
  );
})

ItemDoneMark.propTypes = {
  done: bool,
  id: oneOfType([number, string]),
};

export default ItemDoneMark;
