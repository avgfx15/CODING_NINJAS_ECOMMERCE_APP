import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserAction = createAsyncThunk(
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
