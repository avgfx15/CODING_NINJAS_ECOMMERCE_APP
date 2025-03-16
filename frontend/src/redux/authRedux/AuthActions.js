import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const baseURL = "http://localhost:3150/api/v1";

export const signInUserAction = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, user, {
        headers: { "Content-Type": "application/json" },
      });

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
      const response = await axios.post("/auth/signup", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
