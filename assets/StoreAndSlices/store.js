import { configureStore } from "@reduxjs/toolkit";
import WorkoutReducer from "./WorkoutSlice";
import ExerciseReducer from "./ExerciseSlice";
import authReducer from "./AuthSlice";
import userReducer from "./UserSlice";
export default configureStore({
  reducer: {
    workout: WorkoutReducer,
    exercises: ExerciseReducer,
    auth: authReducer,
    user: userReducer,
  },
});
