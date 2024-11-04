import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

const CooldownTimer = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeUnits, setTimeUnits] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    //sets the minutes and seconds units based on the totalSeconds property passed from the updateCountdown function
    const calculateTimeUnits = (totalSeconds) => {
      setTimeUnits({
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
      });
    };
    //Updates the time from the current total seconds
    const updateCountdown = () => {
      const totalSeconds = timeUnits.minutes * 60 + timeUnits.seconds;

      if (totalSeconds <= 0) {
        setTimerRunning(false);
        Alert.alert("Countdown Finished!", "The timer has expired.");
        //Possibly change 0 to a variable binded to the initial valuef
        calculateTimeUnits(0);
      } else {
        calculateTimeUnits(totalSeconds - 1);
      }
    };

    if (timerRunning) {
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRunning, timeUnits]);

  const handleStartTimer = () => {
    const totalMinutes = parseInt(minutes) || 0;
    const totalSeconds = parseInt(seconds) || 0;

    setTimeUnits({
      minutes: totalMinutes,
      seconds: totalSeconds,
    });

    setTimerRunning(true);
  };

  const handleResetTimer = () => {
    //If there are no values in the time text inputs set time units and minute and second timevalues to zero and ""
    setMinutes("");
    setSeconds("");
    setTimeUnits({ minutes: 0, seconds: 0 });
    setTimerRunning(false);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Countdown Timer</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Minutes"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
          <TextInput
            style={styles.input}
            placeholder="Seconds"
            keyboardType="numeric"
            value={seconds}
            onChangeText={setSeconds}
          />
        </View>
        <View style={styles.timer}>
          <Text style={styles.timeUnit}>
            {formatTime(timeUnits.minutes)}:{formatTime(timeUnits.seconds)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Start Timer" onPress={handleStartTimer} />
          <Button title="Reset Timer" onPress={handleResetTimer} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "green",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "40%",
    marginHorizontal: 10,
    textAlign: "center",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  timeUnit: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

export default CooldownTimer;
