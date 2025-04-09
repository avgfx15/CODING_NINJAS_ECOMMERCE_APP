import { createSlice } from "@reduxjs/toolkit";
import {
  addUserSocialMediaAction,
  getUserSocialMediaAction,
} from "./socialMediaAction";

const initialState = {
  userSocialMediaData: null,
  socialMediaLoading: false,
  socialMediaMessage: null,
  socialMediaError: null,
  socialMediaSuccessStatus: false,
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // / Get User Social Media Data
    builder.addCase(getUserSocialMediaAction.pending, (state) => {
      state.socialMediaLoading = true;
      state.socialMediaSuccessStatus = false;
      state.socialMediaMessage = null;
      state.userSocialMediaData = null;
      state.socialMediaError = null;
    });
    builder.addCase(getUserSocialMediaAction.fulfilled, (state, action) => {
      state.socialMediaLoading = false;
      state.socialMediaSuccessStatus = true;
      state.userSocialMediaData = action.payload.socialMediaDetails;
      state.socialMediaMessage = action.payload.message;
      state.socialMediaError = null;
    });
    builder.addCase(getUserSocialMediaAction.rejected, (state, action) => {
      state.socialMediaLoading = false;
      state.socialMediaSuccessStatus = false;
      state.userSocialMediaData = null;
      state.socialMediaMessage = null;
      state.socialMediaError = action.payload.message;
    });

    // + Add User Social Media Data
    builder.addCase(addUserSocialMediaAction.pending, (state) => {
      state.socialMediaLoading = true;
      state.socialMediaSuccessStatus = false;
      state.socialMediaMessage = null;
      state.userSocialMediaData = null;
      state.socialMediaError = null;
    });
    builder.addCase(addUserSocialMediaAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.socialMediaLoading = false;
      state.socialMediaSuccessStatus = true;
      state.userSocialMediaData = action.payload.socialMediaDetails;
      state.socialMediaMessage = action.payload.message;
      state.socialMediaError = null;
    });
    builder.addCase(addUserSocialMediaAction.rejected, (state, action) => {
      state.socialMediaLoading = false;
      state.socialMediaSuccessStatus = false;
      state.userSocialMediaData = null;
      state.socialMediaMessage = null;
      state.socialMediaError = action.payload.message;
    });
  },
});

const socialMediaReducers = socialMediaSlice.reducer;

export default socialMediaReducers;

export const socialMediaLoadingState = (state) =>
  state.socialMediaReducers?.socialMediaLoading;

export const socialMediaSuccessState = (state) =>
  state.socialMediaReducers?.socialMediaSuccessStatus;

export const socialMediaMessageState = (state) =>
  state.socialMediaReducers?.socialMediaMessage;

export const socialMediaErrorState = (state) =>
  state.socialMediaReducers?.socialMediaError;

export const userSocialMediaDataState = (state) =>
  state.socialMediaReducers?.userSocialMediaData;
