import React, { useState } from "react";
import { bool, string, number, oneOfType } from "prop-types";
import { useStoreData } from "../hooks/useStoreData";
import { View } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
} from "react-native-paper";
import useDialogModal from "../hooks/useDialogModal";
import { basicColors } from "../constants/colors";
import ScheduleForm from "./ScheduleForm"
import { useNavigation } from '@react-navigation/native';

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    scheduleItem: itemStore.scheduleItem,
  }));
}

const ItemScheduleButton = ({ id }) => {
  const { scheduleItem } = useChecklists();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const navigation = useNavigation();

  const handlePress = () => navigation.navigate("ScheduleItem", { itemId: id })

  return (
    <View>
      <IconButton icon="clock-outline" onPress={handlePress} />
    </View>
  );
}

ItemScheduleButton.propTypes = {
  id: string.isRequired,
};

export default ItemScheduleButton;
