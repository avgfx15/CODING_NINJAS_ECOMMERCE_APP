import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInUserAction = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpUserAction = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/signup", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
