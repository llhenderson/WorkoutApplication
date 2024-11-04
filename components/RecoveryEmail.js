import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { storeToken } from "../context/HandleTokens";
import { useNavigation } from "@react-navigation/native";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/resetemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      if (response.ok) {
        Alert.alert("Success", "Password reset email sent!");
        navigation.navigate("Password Reset");
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
          left: "10%",
          fontSize: 30,
          fontFamily: "BebasNeue",
        }}
      >
        Submit Recovery Email
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
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
