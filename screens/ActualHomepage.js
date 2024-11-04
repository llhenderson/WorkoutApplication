import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import WorkoutButton from "../components/buttons/WorkoutButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAuth } from "../assets/StoreAndSlices/AuthSlice";
import { useDispatch } from "react-redux";
/*  DATA will carry objects of the workout id and workout title
    taken from the store*/
const Item = ({ title, onPress }) => (
  <WorkoutButton onPress={onPress} title={title} />
);
export function ActualHomepage() {
  const [DATA, setDATA] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /*const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch(clearAuth());
  };
  */
  const handlePR = () => {
    navigation.navigate("PR Screen");
  };
  try {
    const getWorkouts = async () => {
      const response = await fetch("http://10.0.2.2:3000/api/workout");
      const DATA = await response.json();
      setDATA(DATA);
    };
    getWorkouts();
  } catch (error) {
    console.error(error);
  }

  const handleClick = (item) => {
    navigation.navigate("Workout Screen", { data: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image
          source={require("../assets/images/pexels-leonardho-1552252.jpg")}
          style={styles.image}
        />
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item onPress={() => handleClick(item)} title={item.name} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="ATTEMPT PR" onPress={handlePR} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgcontainer: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  image: {
    width: "100%", // Adjust width as needed
    height: "100%", // Adjust height as needed
    resizeMode: "cover", // Options: 'contain', 'cover', 'stretch', etc.
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    //alignItems: "center",
    //paddingHorizontal: "1%",
    width: "100%",
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ActualHomepage;
