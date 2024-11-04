// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

// Export actions
export const { setAuth, clearAuth } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;

// Export reducer
export default authSlice.reducer;
