import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import {
  addExercise,
  selectExercises,
  removeExercise,
  clearExercise,
} from "../assets/StoreAndSlices/ExerciseSlice";

const workoutTypeList = [
  { key: 1, value: "Strength" },
  { key: 2, value: "Hypertrophy" },
  { key: 3, value: "Endurance" },
  { key: 4, value: "Cardio" },
  { key: 5, value: "Flexibility" },
];

const Item = ({ title, onPress }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title.exercise}</Text>
    <Text style={styles.title}>{title.sets}</Text>
    <Text style={styles.title}>{title.reps}</Text>
    <Text style={styles.title}>{title.weight}</Text>
    <Button title="Remove" onPress={onPress} />
  </View>
);

const CreateWorkoutScreen = () => {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useDispatch();
  const exerciseList = useSelector(selectExercises);

  useEffect(() => {
    dispatch(clearExercise());
  }, [dispatch]);

  const handleSubmitWorkout = async () => {
    if (!workoutName || !selectedWorkoutType || exerciseList.length === 0) {
      Alert.alert(
        "Error",
        "Please fill all fields and add at least one exercise."
      );
      return;
    }

    try {
      // Create workout and fetch its ID
      const workoutResponse = await fetch("http://10.0.2.2:3000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: workoutName }),
      });

      if (!workoutResponse.ok) throw new Error("Failed to create workout.");

      const workoutId = await workoutResponse.json();

      // Process exercises
      const exercisePromises = exerciseList.map(async (obj) => {
        const exerciseData = {
          exercise: obj.exercise,
          reps: obj.reps,
          sets: obj.sets,
          weight: obj.weight,
        };

        const exerciseResponse = await fetch(
          "http://10.0.2.2:3000/api/addexercise",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(exerciseData),
          }
        );

        if (!exerciseResponse.ok) throw new Error("Failed to add exercise.");

        return exerciseResponse.json(); // Get the exercise data with the ID
      });

      const newExercises = await Promise.all(exercisePromises);

      // Associate exercises with the workout
      const associationPromises = newExercises.map((exerciseId) => {
        return fetch("http://10.0.2.2:3000/api/workout_exercises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise_id: exerciseId.id,
            workout_id: workoutId.id,
          }),
        });
      });

      await Promise.all(associationPromises);
      Alert.alert("Success", "Workout created successfully!");
      // Reset form
      setWorkoutName("");
      setExercise("");
      setWeight("0");
      dispatch(clearExercise());
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleAddExercise = () => {
    if (!exercise || !sets || !reps || !weight) {
      Alert.alert("Error", "Please fill all exercise fields.");
      return;
    }

    const newList = { id: Date.now(), exercise, sets, reps, weight };
    dispatch(addExercise(newList));
    setExercise("");
    setWeight("0");
  };

  const handleRemoveExercise = (id) => {
    dispatch(removeExercise(id));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        placeholder="Input Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
        style={styles.input}
      />
      <SelectList
        data={workoutTypeList}
        setSelected={setSelectedWorkoutType}
        placeholder="Select workout type"
        value={selectedWorkoutType}
        save="value"
        style={styles.dropdown}
      />
      <View style={styles.table}>
        <TextInput
          placeholder="Exercise"
          value={exercise}
          onChangeText={setExercise}
          style={styles.input}
        />
        <TextInput
          placeholder="Sets"
          value={sets}
          onChangeText={setSets}
          style={styles.input}
        />
        <TextInput
          placeholder="Reps"
          value={reps}
          onChangeText={setReps}
          style={styles.input}
        />
        <TextInput
          placeholder="Weight"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <Button title="Add Exercise" onPress={handleAddExercise} />
      </View>
      <FlatList
        data={exerciseList}
        renderItem={({ item }) => (
          <Item title={item} onPress={() => handleRemoveExercise(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Submit Workout"
        onPress={handleSubmitWorkout}
        style={styles.submitButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    //backgroundColor: "green",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  dropdown: {
    marginVertical: 10,
  },
  table: {
    marginVertical: 20,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateWorkoutScreen;
