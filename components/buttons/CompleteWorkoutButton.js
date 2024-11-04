import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const CompleteWorkoutButton = ({ onPress, title }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handlePress = () => {
    setIsSelected(isSelected);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.appButtonContainer, isSelected && styles.selectedButton]}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.appButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appButtonContainer: {
    width: "100%",
    height: 70,
    elevation: 8,
    backgroundColor: "green",
    justifyContent: "center",
    paddingHorizontal: 20,
    //alignSelf: "flex-end",
  },
  appButtonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    //alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3700B3",
    elevation: 20,
  },
});
export default CompleteWorkoutButton;
