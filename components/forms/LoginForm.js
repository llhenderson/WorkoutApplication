import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../assets/StoreAndSlices/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUser } from "../../assets/StoreAndSlices/UserSlice";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in.");
      }

      const data = await response.json();
      await AsyncStorage.setItem("userToken", data.token);
      dispatch(setAuth(data.token));
      dispatch(addUser(data.userId));
      navigation.navigate("Actual HomePage");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Username"
          value={username}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          value={password}
        />
      </View>
      <View style={{ width: "80%" }}>
        <Button color="#FF4C4C" title="Login" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 30,
    margin: "5%",
    marginTop: "40%", // Adjusted for better responsiveness
    justifyContent: "space-between",
  },
  title: {
    fontSize: 60,
    fontWeight: "900",
    fontFamily: "BebasNeue",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default LoginForm;
