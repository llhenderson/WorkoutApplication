import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const WorkoutSlice = createSlice({
  name: "workout",
  initialState: initialState,
  reducers: {
    addWorkout: (state, action) => {
      return action.payload;
      //state.push(action.payload);
    },
    removeWorkout: (state, action) => {
      const { id } = action.payload;
      return state.filter((task) => task.id !== id);
    },
  },
});
export const selectWorkout = (state) => state.workout;
export const { addWorkout, removeWorkout } = WorkoutSlice.actions;
export default WorkoutSlice.reducer;
