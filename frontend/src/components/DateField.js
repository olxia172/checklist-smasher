import React from "react";
import { string, func, instanceOf } from "prop-types";
import DatePicker from 'react-native-date-picker'

import useDialogModal from "../hooks/useDialogModal";
import styled from "styled-components/native";

const Container = styled.View`
  margin-right: auto;
  margin-left: auto;
`

const DateField = ({ onChange, value }) => (
  <Container>
    <DatePicker
      date={value}
      onDateChange={onChange}
      mode="date"
      locale="en"
      androidVariant="nativeAndroid"
    />
  </Container>
)

DateField.propTypes = {
  onChange: func.isRequired,
  value: instanceOf(Date).isRequired,
}

export default DateField;
