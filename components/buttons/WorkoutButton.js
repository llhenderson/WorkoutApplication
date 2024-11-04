import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

const WorkoutButton = ({ onPress, title }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.appButtonContainer, isSelected && styles.selectedButton]}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.appButtonText}>{title}</Text>
        <Icon name="check" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appButtonContainer: {
    width: "100%",
    height: 70,
    elevation: 8,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    //alignSelf: "center",
    textTransform: "uppercase",
  },
  icon: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    //alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3700B3",
    elevation: 20,
  },
});
export default WorkoutButton;
