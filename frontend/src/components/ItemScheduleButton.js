import React, { useState } from "react";
import { bool, string } from "prop-types";
import { useStoreData } from "../hooks/useStoreData";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { checklistsColors } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    scheduleItem: itemStore.scheduleItem,
  }));
}

const ItemScheduleButton = ({ id, isScheduled }) => {
  const { scheduleItem } = useChecklists();
  const navigation = useNavigation();

  const handlePress = () => navigation.navigate("ScheduleItem", { itemId: id })

  return (
    <View>
      <IconButton icon="clock-outline" onPress={handlePress} color={isScheduled ? checklistsColors.defaultColorDark : checklistsColors.black} />
    </View>
  );
}

ItemScheduleButton.propTypes = {
  id: string.isRequired,
  isScheduled: bool.isRequired,
};

export default ItemScheduleButton;
