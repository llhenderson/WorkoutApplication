import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import RadioButton from "../components/buttons/RadioButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../assets/StoreAndSlices/AuthSlice";
import { selectUser } from "../assets/StoreAndSlices/UserSlice";
import {
  requestLocationPermission,
  getLocation,
  saveWorkoutWithLocation,
} from "../components/locationService";

const PRScreen = () => {
  const [exercise, setExercise] = useState();
  const [weight, setWeight] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const user_id = useSelector(selectUser)[0];
  const dispatch = useDispatch();

  // databaseService.js

  const exerciseList = [
    { key: 1, value: "Bench" },
    { key: 2, value: "Squat" },
    { key: 3, value: "Deadlift" },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch(clearAuth());
  };

  const handleRecordSelection = () => {
    Alert.alert(
      "This video may be visible to other users to verify accuracy. Ensure your full body is in frame with good lighting."
    );

    setSelectedOption("Record");
  };
  const handleDontRecordSelection = () => {
    Alert.alert(
      "For verification purposes, only PR's submitted with a video recording will be shown on the leaderboard."
    );
    setSelectedOption("Don't Record");
  };
  const handleSumbit = async () => {
    let workoutData = { weight, user_id, date: new Date().toISOString() };
    if (selectedOption === "Record") {
      console.log(2);
    } else {
      try {
        switch (exercise) {
          case "Bench":
            await saveWorkoutWithLocation(workoutData, "benchPR");
            setWeight();
            Alert.alert("Workout Saved!");
            break;
          case "Squat":
            await saveWorkoutWithLocation(workoutData, "squatPR");
            setWeight();
            Alert.alert("Workout Saved!");
            break;
          case "Deadlift":
            await saveWorkoutWithLocation(workoutData, "deadliftPR");
            setWeight();
            Alert.alert("Workout Saved!");
            break;
          default:
            console.log("No valid option selected.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <SafeAreaView>
      <SelectList
        data={exerciseList}
        setSelected={setExercise}
        placeholder="Select workout type"
        value={exercise}
        save="value"
        style={styles.dropdown}
      />
      <TextInput
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <RadioButton
          label="Record"
          selected={selectedOption === "Record"}
          onPress={handleRecordSelection}
        />
        <RadioButton
          label="Don't Record"
          selected={selectedOption === "Don't Record"}
          onPress={handleDontRecordSelection}
        />
      </View>
      <Button title="Submit" onPress={handleSumbit} />
      <Button title="logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
export default PRScreen;
