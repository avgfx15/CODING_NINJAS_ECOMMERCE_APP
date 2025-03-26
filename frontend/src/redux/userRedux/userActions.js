// | import createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// |import axios
import axios from "axios";

// @ baseURL variable
const baseURL = "http://localhost:3150/api/v1";

// + Add User Profile
export const addUserProfileAction = createAsyncThunk(
  "addUserProfile",
  async (userProfile, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/user-profile", userProfile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// / Get user Profile By LoggedInUser
export const getUserProfileByLoggedInUserAction = createAsyncThunk(
  "getUserProfileByLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users/getprofile`, {
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
