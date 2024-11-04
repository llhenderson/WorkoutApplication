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
    <View style={{ bottom: "25%", left: "25%" }}>
      <Text
        style={{
          color: "white",
          left: "20%",
          fontSize: 30,
          fontFamily: "BebasNeue",
        }}
      >
        REGISTER
      </Text>
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
      <View style={{ width: "12%", left: "20%" }}>
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

export default RegisterForm;
