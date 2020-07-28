import React from "react";
import { bool, string, number, oneOfType } from "prop-types";
import { useStoreData } from "../hooks/useStoreData";
import { IconButton } from "react-native-paper";

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    removeItem: itemStore.removeItem,
  }));
}

function ItemRemoveButton({ id }) {
  const { removeItem } = useChecklists();

  return <IconButton icon="close-circle" onPress={() => removeItem(id)} />;
}

ItemRemoveButton.propTypes = {
  name: string,
  done: bool,
  id: oneOfType([number, string]),
};

export default ItemRemoveButton;
