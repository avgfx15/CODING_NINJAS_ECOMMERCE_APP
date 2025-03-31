// | import createAsyncThunk from redux-toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// | import axios

import { axiosInstance } from "../axiosInstance";

// | import axiosInstance

// # signInUserAction
// @ description: This function is used to handle the sign in user action
// ~ export singInUserAction
export const signInUserAction = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/signin`, user);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Return proper error messages
        return rejectWithValue(error.response.data || "Invalid credentials");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);

// # signUpUserAction
// @ description: This function is used to handle the sign up user action
// ~ export signUpUserAction
export const signUpUserAction = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data || "Sign Up error");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);

// # LogoutUserAction
// @ description: This function is used to handle the logout user action
// ~ export logoutUserAction
export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    console.log("delete user session");
    try {
      // Clear user session (e.g., remove token from localStorage)
      const response = await axiosInstance.post("/auth/logout");

      // Clear Redux Persist Data

      localStorage.removeItem("persist:root"); // Ensure Local Storage is cleared

      return response.data;
    } catch (error) {
      console.error("Logout API Error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
