import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.selectedRadio]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default RadioButton;
