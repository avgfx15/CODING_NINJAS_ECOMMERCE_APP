// | import createAsyncThunk from redux-toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// | import axios
import axios from "axios";
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
      return rejectWithValue(error.response.data);
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

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      // This is a placeholder, you should implement the actual logout logic
      // For example, you might call an API endpoint to invalidate the user's session
      const response = await axiosInstance.post("/auth/logout", {});
      // Remove token from localStorage

      localStorage.removeItem("persist:root");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
