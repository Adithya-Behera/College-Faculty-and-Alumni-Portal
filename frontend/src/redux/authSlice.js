import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// Define the initial state for the auth slice
const initialState = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
  error: null,
};

// Async thunk for handling login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        credentials
      );
      console.log(response.data);
      return response.data; // Return the response data to be used in extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.error = null; // Clear any previous error
        localStorage.setItem("token", action.payload.token); // Store token
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
