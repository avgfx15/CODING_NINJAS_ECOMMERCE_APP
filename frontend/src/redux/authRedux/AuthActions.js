// | import createAsyncThunk from redux-toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// | import axios
import axios from "axios";

// @ baseURL variable
const baseURL = "http://localhost:3150/api/v1";

// # signInUserAction
// @ description: This function is used to handle the sign in user action
// ~ export singInUserAction
export const signInUserAction = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, user);

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
      const response = await axios.post(`${baseURL}/auth/signup`, user);
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
    try {
      // Clear user session (e.g., remove token from localStorage)
      localStorage.removeItem("userToken");
      return true; // Return success
    } catch (error) {
      return rejectWithValue("Logout failed!");
    }
  }
);
