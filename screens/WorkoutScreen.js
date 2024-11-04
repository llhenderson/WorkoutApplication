import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
} from "react-native";
import Table from "../components/table";
import CooldownTimer from "../components/CooldownTimer";
import CompleteWorkoutButton from "../components/buttons/CompleteWorkoutButton";

function Workoutpage(data) {
  const [props, setProps] = useState([]);
  const [timer, setTimer] = useState(60);
  const workoutName = data.route.params.data.name;

  const getWorkout = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/api/workoutandexercises?workout_id=${data.route.params.data.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const DATA = await response.json();
      setProps(DATA);
    } catch (error) {
      console.error("Error fetching workout data:", error);
    }
  };

  useEffect(() => {
    getWorkout();
  }, [data]);

  return (
    <ImageBackground
      source={require("../assets/images/pexels-leonardho-1552242.jpg")}
      style={styles.background}
    >
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>
            {workoutName}
          </Text>
        </View>
        <TextInput onChangeText={setTimer} value={timer} placeholder="timer" />
        <CooldownTimer />
        <View style={styles.tableContainer}>
          <Table props={props} />
        </View>
        <View style={styles.buttonContainer}>
          <CompleteWorkoutButton
            title="Complete Workout"
            onPress={() => console.log("Workout completed")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    marginTop: "5%",
  },
  buttonContainer: {
    bottom: 0,
    width: "100%",
    position: "absolute",
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    flex: 1,
    //justifyContent: "flex-end", // Align children to the bottom
  },
  tableContainer: {
    position: "absolute", // Fix the table's position
    maxHeight: "17%",
    bottom: "12.8%", // Adjust based on button height plus margin
    left: 0,
    right: 0,
    //top: 0, // Allow it to grow upwards
    //justifyContent: "flex-end", // Ensure items are at the bottom
  },
});

export default Workoutpage;
