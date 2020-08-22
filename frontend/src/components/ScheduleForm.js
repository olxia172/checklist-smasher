import React, { useState } from "react";
import { string, func } from "prop-types";
import { View, Text, TextInput, FlatList, ScrollView } from "react-native";
import { Picker } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
} from "react-native-paper";
import { basicColors } from "../constants/colors";
import { DAILY_OPTS, REPEAT_OPTIONS, MONTHLY_OPTS, END_OPTS } from "../constants/scheduleOptions"
import DatePicker from 'react-native-date-picker'
import styled from "styled-components/native";
import DateField from "./DateField"
import SelectField from "./SelectField"
import MultiSelectField from "./MultiSelectField"

const Container = styled.View`
  padding: 30px 20px;
  margin-bottom: 30px;
`

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  border-style: solid;
`

const FlexWrapper = styled.View`
  display: flex;
  flex-direction: row;
`

const Input = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  border-style: solid;
  width: 50px;
  margin-right: 10px;
`

const InputText = styled.Text`
  align-self: flex-end;
  margin-right: 10px;
`

const ScheduleForm = ({ id, onFormSubmit }) => {
  const [repeat, setRepeat] = useState('daily');
  const [every, setEvery] = useState("");
  const [days, setDays] = useState([]);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [occurencesCount, setOccurencesCount] = useState("");
  const [endOption, setEndOption] = useState("never");

  const handleDaysChange = (option) => setDays((prevDays) => {
    const index = prevDays.indexOf(option);

    if (index > -1) {
      prevDays.splice(index, 1);
    } else {
      prevDays.push(option)
    }

    return [...prevDays]
  })

  const formValues = {
    repeat,
    startDate,
    every,
    days,
    endDate,
    occurencesCount,
    daysOfMonth,
  }

  console.log(formValues);

  const handleDaysOfMonthChange = (option) => setDaysOfMonth((prevDays) => {
    const index = prevDays.indexOf(option);

    if (index > -1) {
      prevDays.splice(index, 1);
    } else {
      prevDays.push(option)
    }

    return [...prevDays]
  })

  return (
    <ScrollView>
      <Container>
        <Label>Repeat</Label>
        <SelectField options={REPEAT_OPTIONS} onChange={setRepeat} selectedOption={repeat} />
        {repeat !== "yearly" && <Label>Every</Label>}
        {repeat === "daily" &&
          <FlexWrapper>
            <Input
              onChangeText={text => setEvery(text)}
              value={every}
            />
            <InputText>"day(s)"</InputText>
          </FlexWrapper>
        }
        {repeat === "weekly" && <MultiSelectField options={DAILY_OPTS} selectedOptions={days} onChange={handleDaysChange} numOfColumns={5} />}
        {repeat === "monthly" && <MultiSelectField options={MONTHLY_OPTS} selectedOptions={daysOfMonth} onChange={handleDaysOfMonthChange} numOfColumns={5} />}
        <Label>Start</Label>
        <DateField label="Start" onChange={setStartDate} value={startDate} />
        <Label>End</Label>
        <FlexWrapper>
          <Button icon="infinity" mode={endOption === "never" ? "contained" : "outlined"} onPress={() => setEndOption("never")}>
            Never
          </Button>
          <Button icon="calendar" mode={endOption === "onDate" ? "contained" : "outlined"} style={{ marginRight: "auto", marginLeft: "auto" }} onPress={() => setEndOption("onDate")}>
            On date
          </Button>
          <Button icon="numeric" mode={endOption === "count" ? "contained" : "outlined"} onPress={() => setEndOption("count")}>
            Amount
          </Button>
        </FlexWrapper>
        {endOption === "onDate" && <DateField onChange={setEndDate} value={endDate} />}
        {endOption === "count" &&
          <FlexWrapper>
            <InputText>After</InputText>
            <Input
              onChangeText={text => setOccurencesCount(text)}
              value={occurencesCount}
            />
            <InputText>"occurence(s)"</InputText>
          </FlexWrapper>
        }
      </Container>
      <Button icon="calendar-arrow-right" mode="contained" onPress={() => onFormSubmit(formValues)} contentStyle={{ paddingVertical: 16 }}>
        Schedule
      </Button>
    </ScrollView>
  );
}

ScheduleForm.propTypes = {
  id: string.isRequired,
  onFormSubmit: func.isRequired,
};

export default ScheduleForm;
