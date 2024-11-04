import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (e) {
    console.error(e);
  }
};

// Retrieving the token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (e) {
    console.error(e);
  }
};

export const apiCall = async (endpoint, method, body) => {
  const token = await getToken();
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const checkToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      console.log("Token is stored:", token);
      return token; // Token exists
    } else {
      console.log("No token found.");
      return null; // Token does not exist
    }
  } catch (error) {
    console.error("Failed to retrieve the token:", error);
    return null; // Error occurred
  }
};
