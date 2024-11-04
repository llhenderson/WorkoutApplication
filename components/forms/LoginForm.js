import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
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
    try {
      const response = await fetch("http://10.0.2.2:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("userToken", data.token);
        console.log(data);
        dispatch(setAuth(data.token));
        dispatch(addUser(data.userId));
        Alert.alert("Success", "Login successful!");

        // Handle successful login, e.g., navigate to a different screen
        navigation.navigate("Actual HomePage");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ bottom: "25%", left: "25%" }}>
      <Text
        style={{
          color: "white",
          left: "20%",
          fontSize: 30,
          fontFamily: "BebasNeue",
        }}
      >
        LOGIN
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="username"
        value={username}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        keyboardType="numeric"
      />
      <View style={{ width: "10%", left: "20%" }}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "50%",
  },
});
export default LoginForm;
