import React, { useState } from "react";
import { bool, string, number, oneOfType } from "prop-types";
import { useStoreData } from "../hooks/useStoreData";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
} from "react-native-paper";
import useDialogModal from "../hooks/useDialogModal";
import { basicColors } from "../constants/colors";
import { DAILY_OPTS, REPEAT_OPTIONS } from "../constants/scheduleOptions"
import DatePicker from 'react-native-date-picker'

function useChecklists() {
  return useStoreData(({ itemStore }) => ({
    scheduleItem: itemStore.scheduleItem,
  }));
}

function ItemScheduleButton({ id }) {
  const { scheduleItem } = useChecklists();
  const { isModalOpened, openDialogModal, closeDialogModal } = useDialogModal();
  const [repeat, setRepeat] = useState('daily')
  const [every, setEvery] = useState("")
  const [days, setDays] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [occurencesCount, setOccurencesCount] = useState("")

  return (
    <View>
      <IconButton icon="clock-outline" onPress={openDialogModal} />
      <Portal>
        <Modal
          visible={isModalOpened}
          onDismiss={closeDialogModal}
          contentContainerStyle={{ backgroundColor: basicColors.white }}
        >
          <Text>Repeat</Text>
          <Picker
            selectedValue={repeat}
            // style={}
            onValueChange={(itemValue) =>
              setRepeat(itemValue)
            }>
            {REPEAT_OPTIONS.map((option) => <Picker.Item key={option} label={option} value={option} />)}
          </Picker>
          <Text>Every</Text>
          <TextInput
            onChangeText={text => setEvery(text)}
            value={every}
          />
        <Text>Days</Text>
          <FlatList
            horizontal
            data={DAILY_OPTS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item}
                onPress={setDays(item)}
                >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        <Text>Start</Text>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            mode="date"
            locale="en"
            androidVariant="nativeAndroid"
          />
        <Text>End</Text>
          <Button icon="close" mode="contained" onPress={() => {}}>
            Never
          </Button>
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            mode="date"
            locale="en"
            androidVariant="nativeAndroid"
          />
        <Text>After</Text>
          <TextInput
            onChangeText={text => setOccurencesCount(text)}
            value={occurencesCount}
          />
        <Text>Occurences</Text>
          <Button icon="update" mode="contained" onPress={closeDialogModal}>
            Schedule item
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

ItemScheduleButton.propTypes = {
  id: number.isRequired,
};

export default ItemScheduleButton;
