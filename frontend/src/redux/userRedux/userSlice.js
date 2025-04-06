// | import createSlice

import { createSlice } from "@reduxjs/toolkit";
import {
  addUserProfileAction,
  getUserProfileByLoggedInUserAction,
  uploadImageAction,
} from "./userActions";
import { logoutUserAction } from "../authRedux/AuthActions";

// @ initialState variable
const initialState = {
  // @ get all User Profile
  allUserProfile: null,
  // @ user object
  userProfile: null,
  // @ profileImage
  profileImage: null,
  // @ loading boolean
  userProfileLoading: false,
  // @ message state
  userProfileMessage: null,
  // @ error message
  userProfileError: null,
  // @ success boolean
  userProfileSuccessStatus: false,
};

// @ createSlice function
const UserSlice = createSlice({
  // @ name of the slice
  name: "user",
  // @ initial state
  initialState,
  // @ reducers
  reducers: {},
  // @ extraReducers
  extraReducers: (builder) => {
    // / Get User Profile By LoggedInUser
    // & pending
    builder.addCase(getUserProfileByLoggedInUserAction.pending, (state) => {
      state.userProfileLoading = true;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfile = null;
      state.userProfileError = null;
    });
    // & fulfilled
    builder.addCase(
      getUserProfileByLoggedInUserAction.fulfilled,
      (state, action) => {
        console.log(action.payload);
        state.userProfileLoading = false;
        state.userProfileSuccessStatus = true;
        state.userProfile = action.payload.userProfile;
        state.userProfileMessage = action.payload.message;
        state.userProfileError = null;
      }
    );
    // ! rejected
    builder.addCase(
      getUserProfileByLoggedInUserAction.rejected,
      (state, action) => {
        state.userProfileLoading = false;
        state.userProfileSuccessStatus = false;
        state.userProfileMessage = null;
        state.userProfileError = action.payload.message;
        state.userProfile = null;
      }
    );
    // + addUserProfileAction
    // & pending
    builder.addCase(addUserProfileAction.pending, (state) => {
      state.userProfileLoading = true;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfile = null;
      state.userProfileError = null;
    });
    // & fulfilled
    builder.addCase(addUserProfileAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userProfileLoading = false;
      state.userProfileError = null;
      state.userProfileSuccessStatus = true;
      state.userProfile = action.payload.userProfile;
      state.userProfileMessage = action.payload.message;
    });
    // ! rejected
    builder.addCase(addUserProfileAction.rejected, (state, action) => {
      state.userProfileLoading = false;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfileError = action.payload.message;
      state.userProfile = null;
    });

    // + Upload Image
    // & pending
    builder.addCase(uploadImageAction.pending, (state) => {
      state.userProfileLoading = true;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfileError = null;
      state.userProfile = null;
    });
    // & fulfilled
    builder.addCase(uploadImageAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userProfileLoading = false;
      state.userProfileSuccessStatus = true;
      state.userProfileMessage = action.payload.message;
      state.userProfileError = null;
      state.userProfile = action.payload.userProfile; // Assuming the updated user profile is returned
    });
    // ! rejected
    builder.addCase(uploadImageAction.rejected, (state, action) => {
      state.userProfileLoading = false;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfileError = action.payload.message;
      state.userProfile = null;
    });
    // / logOutUserAction
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userProfile = null;
      state.userProfileLoading = false;
      state.userProfileMessage = action.payload.message;
    });
  },
});

// ~ export User Reducer
const UserReducers = UserSlice.reducer;

export default UserReducers;

// ~ export user state
export const userProfileState = (state) => state.UserReducers?.userProfile;

// ~ export userProfileLoading State
export const userProfileLoadingState = (state) =>
  state.UserReducers?.userProfileLoading;

// ~ export userProfileMessage State
export const userProfileMessageState = (state) =>
  state.UserReducers?.userProfileMessage;

// ~ export userProfileError State
export const userProfileErrorState = (state) =>
  state.UserReducers?.userProfileError;

// ~ export userProfileSuccessStatus State
export const userProfileSuccessStatusState = (state) =>
  state.UserReducers?.userProfileSuccessStatus;
