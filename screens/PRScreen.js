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

const PRScreen = () => {
  const [exercise, setExercise] = useState();
  const [weight, setWeight] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const userID = useSelector(selectUser)[0];
  const dispatch = useDispatch();
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
    () => setSelectedOption("Don't Record");
  };
  const handleSumbit = async () => {
    if (selectedOption === "Record") {
      console.log(2);
    } else {
      try {
        switch (exercise) {
          case "Bench":
            console.log(userID);
            const benchResponse = await fetch(
              "http://10.0.2.2:3000/api/benchPR",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ weight: weight, user_id: userID }),
              }
            );
            const dataBench = await benchResponse.json();

            if (benchResponse.ok) {
              Alert.alert("Success", "PR Posted!");
            } else {
              Alert.alert("Error", dataBench.message);
            }
            break;
          case "Squat":
            console.log(userID);
            const squatResponse = await fetch(
              "http://10.0.2.2:3000/api/squatPR",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ weight: weight, user_id: userID }),
              }
            );
            const dataSquat = await squatResponse.json();

            if (squatResponse.ok) {
              Alert.alert("Success", "PR Posted!");
            } else {
              Alert.alert("Error", dataSquat.message);
            }
            break;
          case "Deadlift":
            console.log(userID);
            const deadliftResponse = await fetch(
              "http://10.0.2.2:3000/api/deadliftPR",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ weight: weight, user_id: userID }),
              }
            );
            const dataDeadlift = await deadliftResponse.json();

            if (deadliftResponse.ok) {
              Alert.alert("Success", "PR Posted!");
            } else {
              Alert.alert("Error", dataDeadlift.message);
            }
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
