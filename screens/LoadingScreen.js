import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login Screen"); // Navigate to the login screen
    }, 2000); // Set time in milliseconds (2000ms = 2 seconds)

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Workout_Landing_Page.jpg")}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>Workout Tracker</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
});

export default LoadingScreen;
