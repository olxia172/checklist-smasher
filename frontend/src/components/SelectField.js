import React from "react";
import { arrayOf, func, string } from "prop-types";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";

const SelectField = ({ options, onChange, selectedOption }) => (
  <FlatList
    horizontal
    data={options}
    keyExtractor={(item) => item}
    renderItem={({ item }) => {
      const isSelectedOption = item === selectedOption;

      return (
        <Button
          key={item}
          mode={isSelectedOption ? "contained" : "outlined"}
          style={{ marginRight: 10 }}
          onPress={() => onChange(item)}
        >
          {item}
        </Button>
      )
    }}
  />
)

SelectField.propTypes = {
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
  selectedOption: string.isRequired,
}

export default SelectField;
