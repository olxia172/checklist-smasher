import React from "react";
import { Checkbox } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import { bool, string, number, oneOfType } from "prop-types";
import { useStoreData } from "../hooks/useStoreData";

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    toggleDoneItem: itemStore.toggleDoneItem,
  }));
}

const ItemDoneMark = ({ done, id }) => {
  const { toggleDoneItem } = useChecklists();

  function toggleDone() {
    toggleDoneItem(id, !Boolean(done));
  }

  return (
    <TouchableHighlight
      style={{ alignSelf: "center" }}
      underlayColor="#FFFFFF"
      onPress={() => toggleDone()}
    >
      <Checkbox.Android status={Boolean(done) ? "checked" : "unchecked"} />
    </TouchableHighlight>
  );
}

ItemDoneMark.propTypes = {
  done: bool,
  id: oneOfType([number, string]),
};

export default ItemDoneMark;
