import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ResetPasswordComponent = () => {
  const [passwordResetToken, setPasswordResetToken] = useState();

  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();
  const handleReset = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, passwordResetToken }),
      });
      setPasswordResetToken("");
      if (response.ok) {
        Alert.alert("Success", "Password updated successfully");
        navigation.navigate("Login Screen");
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
        placeholder="Enter the password reset code"
        secureTextEntry
        value={passwordResetToken}
        onChangeText={setPasswordResetToken}
      />
      <TextInput
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
};

export default ResetPasswordComponent;
