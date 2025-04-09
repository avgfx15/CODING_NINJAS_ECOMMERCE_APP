import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../axiosInstance";

export const getUserSocialMediaAction = createAsyncThunk(
  "getUserSocialMedia",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/social/getsocialmedia`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || "Social Media not found");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);

export const addUserSocialMediaAction = createAsyncThunk(
  "addUserSocialMedia",
  async (socialMediaData, { rejectWithValue }) => {
    try {
      console.log(socialMediaData);
      const response = await axiosInstance.put("/social/addsocialmedia", {
        socialMediaData,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || "Social Media error");
      } else {
        return rejectWithValue("Network error. Please try again.");
      }
    }
  }
);
