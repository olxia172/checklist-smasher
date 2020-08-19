import React from "react";
import ScheduleForm from "../components/ScheduleForm";

const ScheduleItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;

  return <ScheduleForm id={itemId} />
}

export default ScheduleItemScreen;
