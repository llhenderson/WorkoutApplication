import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const RecoveryComponent = () => {
  const [email, setEmail] = useState("");

  const handleRecover = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert("Success", "Recovery email sent!");
      } else {
        const errorData = await response.text();
        Alert.alert("Error", errorData);
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Recover Password" onPress={handleRecover} />
    </View>
  );
};

export default RecoveryComponent;
