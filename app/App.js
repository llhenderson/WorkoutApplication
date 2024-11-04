import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../assets/StoreAndSlices/store";
import Homepage from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import CreateWorkoutScreen from "../screens/CreateWorkoutScreen";
import { ActualHomepage } from "../screens/ActualHomepage";
import ResetPasswordComponent from "../components/RessetPasswordComponent";
import { setAuth, clearAuth } from "../assets/StoreAndSlices/AuthSlice";
import { selectIsAuthenticated } from "../assets/StoreAndSlices/AuthSlice";
import PRScreen from "../screens/PRScreen";
import VideoRecordingScreen from "../screens/VideoRecordingScreen";

const Drawer = createDrawerNavigator();

const MainApp = () => {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          dispatch(setAuth(token));
        } else {
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error("Failed to check auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  /*if (loading || !fontsLoaded) {
    return <LoadingIndicator />; // Add a loading indicator component here
  }*/

  return (
    <Drawer.Navigator>
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="Actual HomePage" component={ActualHomepage} />
          <Drawer.Screen name="Workout Screen" component={WorkoutScreen} />
          <Drawer.Screen
            name="Create Workout"
            component={CreateWorkoutScreen}
          />
          <Drawer.Screen name="PR Screen" component={PRScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login Screen"
            component={Homepage}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Password Reset"
            component={ResetPasswordComponent}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
