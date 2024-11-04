import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const ExerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeExercise: (state, action) => {
      const id = action.payload;

      return state.filter((task) => task.id !== id);
    },
    clearExercise: () => {
      return initialState;
    },
  },
});
export const selectExercises = (state) => state.exercises;
export const { addExercise, removeExercise, clearExercise } =
  ExerciseSlice.actions;
export default ExerciseSlice.reducer;
