import React, { useState } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import LoginButton from "../components/buttons/LoginButton";
import RegisterButton from "../components/buttons/RegisterButton";
import RecoveryEmail from "../components/RecoveryEmail";

function Homepage() {
  const [userInput, setUserInput] = useState("login");

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Workout_Landing_Page.jpg")}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>Workout Tracker</Text>
      </View>

      {userInput === "login" ? (
        <LoginForm />
      ) : userInput === "register" ? (
        <RegisterForm />
      ) : (
        <RecoveryEmail />
      )}

      <View>
        <Text style={styles.link} onPress={() => setUserInput("reset")}>
          Reset Password?
        </Text>
      </View>

      <View style={styles.loginButton}>
        <LoginButton title="LOGIN" onPress={() => setUserInput("login")} />
      </View>

      <View style={styles.registerButton}>
        <RegisterButton
          title="REGISTER"
          onPress={() => setUserInput("register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    alignItems: "center",
    position: "absolute",
    top: "10%",
    width: "100%",
  },
  titleText: {
    color: "white",
    fontSize: 50,
    fontFamily: "BebasNeue",
  },
  loginButton: {
    alignItems: "center",
  },
  registerButton: {
    alignItems: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default Homepage;
