// | import createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// |import axios
import axios from "axios";
import { axiosInstance } from "../axiosInstance";

// / Get user Profile By LoggedInUser
export const getUserProfileByLoggedInUserAction = createAsyncThunk(
  "getUserProfileByLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/getprofile`, {
        withCredentials: true, // Ensure cookies are sent
      });
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

// + Upload Image
export const uploadImageAction = createAsyncThunk(
  "uploadImage",
  async ({ formData, setUploadProgress }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/upload/profilepic`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure cookies are sent
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || "Upload error");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);

// * Update User Profile By Own
export const updateUserProfileAction = createAsyncThunk(
  "updateUserProfile",
  async (inputData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/users/updateprofile`,
        inputData,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || "Update error");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);
