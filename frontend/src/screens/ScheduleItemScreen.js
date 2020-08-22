import React from "react";
import ScheduleForm from "../components/ScheduleForm";
import { useStoreData } from "../hooks/useStoreData";

function useData() {
  return useStoreData(({ itemStore }) => ({
    scheduleItem: itemStore.scheduleItem,
  }));
}

const ScheduleItemScreen = ({ route, navigation }) => {
  const { scheduleItem } = useData();
  const { itemId } = route.params;

  const handleScheduleItem = (scheduleData) => scheduleItem(itemId, scheduleData).then(() => navigation.goBack());

  return <ScheduleForm id={itemId} onFormSubmit={handleScheduleItem} />
}

export default ScheduleItemScreen;
