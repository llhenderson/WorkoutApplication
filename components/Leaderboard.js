import React from "react";
import { StyleSheet, FlatList, View, Text, TextInput } from "react-native";
import { useState } from "react";
const Item = ({}) => (
  <View>
    <Text>test</Text>
  </View>
);

const Leaderboard = async () => {
  const [data, setData] = useState();
  try {
    const response = await fetch("http://10.0.2.2:3000/api/leaderboard");
    const data = response.json();
    setData(data);
    console.log(data);
  } catch {
    console.error(error);
  }
  return (
    <View style={styles.table}>
      <View style={styles.table_head}>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Date</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Name</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Weight</Text>
        </View>
        <View style={{}}>
          <Text style={styles.table_head_captions}>Rank</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
};
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

export default Leaderboard;
