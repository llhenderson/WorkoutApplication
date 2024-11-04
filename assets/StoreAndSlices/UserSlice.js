import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      return state;
    },
  },
});
export const selectUser = (state) => state.user;
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
