import React from "react";
import { arrayOf, func, number, string } from "prop-types";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";

const MultiSelectField = ({ options, onChange, numOfColumns, selectedOptions }) => (
  <FlatList
    numColumns={numOfColumns}
    data={options}
    extraData={selectedOptions}
    keyExtractor={(item) => item}
    renderItem={({ item }) => {
      const isSelectedOption = selectedOptions.includes(item);

      return (
        <Button
          key={[item, isSelectedOption]}
          mode={isSelectedOption ? "contained" : "outlined"}
          style={{ marginRight: 10, marginBottom: 10 }}
          onPress={() => onChange(item)}
        >
          {item}
          {isSelectedOption}
        </Button>
      )
    }}
  />
)

MultiSelectField.propTypes = {
  numOfColumns: number.isRequired,
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
  selectedOptions: arrayOf(string).isRequired,
}

export default MultiSelectField;
