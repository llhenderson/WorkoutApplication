import React from "react";
import { StyleSheet, FlatList, View, Text, TextInput } from "react-native";
import { useState } from "react";
import CompleteWorkoutButton from "../components/buttons/CompleteWorkoutButton";
const Item = ({
  title,
  weight,
  onWeightChange,
  alternateExercise,
  onExerciseChange,
}) => (
  <View style={styles.item}>
    <View
      style={{
        flexDirection: "row",
        //justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View style={{ width: "10%", paddingLeft: "5%", alignSelf: "center" }}>
        <Text style={styles.titles}>{title.exercise}</Text>
      </View>
      <View
        style={{
          paddingLeft: "10%",
          width: "18%",
        }}
      >
        <TextInput
          onChangeText={onExerciseChange}
          value={alternateExercise}
          placeholder="Exercise"
        />
      </View>
      <View style={{ paddingLeft: "8%", alignSelf: "center" }}>
        <Text style={styles.titles}>{title.sets}</Text>
      </View>
      <View style={{ paddingLeft: "15%", alignSelf: "center" }}>
        <Text style={styles.titles}>{title.reps}</Text>
      </View>
      <View style={{ paddingLeft: "13%", width: "16%" }}>
        <TextInput
          style={styles.input}
          onChangeText={onWeightChange}
          placeholder="Weight"
          keyboardType="numeric"
          value={weight}
        />
      </View>
      <View style={{ paddingLeft: "12%", alignSelf: "center" }}>
        <Text style={styles.titles}>{title.weight}</Text>
      </View>
    </View>
  </View>
);

function Table(props) {
  const [weights, setWeights] = useState(Array(props.length).fill(""));
  const [alternateExercise, setAlternateExercise] = useState(
    Array(props.length).fill("")
  );
  const DATA = props.props;

  const handleWeightChange = (index) => (newWeight) => {
    const newWeights = [...weights];
    newWeights[index] = newWeight;
    setWeights(newWeights);
  };
  const handleExerciseChange = (index) => (alternateExercise) => {
    const newExercise = [...alternateExercise];
    newExercise[index] = newExercise;
    setAlternateExercise(newExercise);
  };
  return (
    <View style={styles.table}>
      <View style={styles.table_head}>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Exercise</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Alternate</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Sets</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Repititions</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Weights</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Prev. Weight</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <Item
              title={item}
              weight={weights[index]}
              alternateExercise={alternateExercise[[index]]}
              onExerciseChange={handleExerciseChange(index)}
              onWeightChange={handleWeightChange(index)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  titles: {
    alignItems: "center",
    //marginTop: "50%",
  },
  table_head: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    //borderColor: "#ddd",
    //padding: 17,
    width: "100%",
    backgroundColor: "#3bcd6b",
    justifyContent: "space-around",
  },
  table_head_captions: {
    fontSize: 15,
    color: "white",
  },
  table_body_single_row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 7,
  },
  table_data: {
    fontSize: 11,
  },
  table: {
    alignItems: "center",
    //elevation: 1,
    backgroundColor: "#fff",
  },
  table_row_items: {
    width: "16%",
  },
  input: {
    width: 60,
  },
});

export default Table;
