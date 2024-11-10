import React from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://10.0.2.2:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Registration successful!");
    } else {
      Alert.alert("Error", data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="username"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          keyboardType="visible-password"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
      </View>
      <View style={{ width: "80%" }}>
        <Button title="Register" onPress={handleSubmit} />
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
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 60,
    fontWeight: "900",
    fontFamily: "BebasNeue",
  },
});

export default RegisterForm;
