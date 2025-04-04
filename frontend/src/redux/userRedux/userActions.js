// | import createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// |import axios
import axios from "axios";
import { axiosInstance } from "../axiosInstance";

// @ baseURL variable
const baseURL = "http://localhost:3150/api/v1";

// + Add User Profile
export const addUserProfileAction = createAsyncThunk(
  "addUserProfile",
  async (userProfile, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/addprofile",
        userProfile
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        return rejectWithValue(error.response.data || "Sign Up error");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);

// / Get user Profile By LoggedInUser
export const getUserProfileByLoggedInUserAction = createAsyncThunk(
  "getUserProfileByLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/users/getprofile`, {
        withCredentials: true, // Ensure cookies are sent
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Return proper error messages
        return rejectWithValue(error.response.data || "User Profile not found");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);
