// locationService.js

import * as Location from "expo-location";
/*async function saveToDatabase(data) {
  try {
    const response = await fetch(`http://10.0.2.2:3000/api/benchPR`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to save data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Database save error:", error);
    throw error;
  }
}*/
export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

export async function getLocation() {
  const { coords } = await Location.getCurrentPositionAsync({});
  return coords;
}

export async function saveWorkoutWithLocation(workoutData, route) {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error("Location permission denied");
    }

    const location = await getLocation();
    const { latitude, longitude } = location;
    const workoutWithLocation = { ...workoutData, latitude, longitude };
    const response = await fetch(`http://10.0.2.2:3000/api/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutWithLocation),
    });
    if (!response.ok) {
      throw new Error("Failed to save data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving workout with location:", error);
  }
}
