// | import createSlice

import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileByLoggedInUserAction } from "./userActions";
import { logoutUserAction } from "../authRedux/AuthActions";

// @ initialState variable
const initialState = {
  // @ user object
  userProfile: {},
  // @ loading boolean
  userProfileLoading: false,
  // @ error string
  userProfileMessage: null,
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
    builder.addCase(getUserProfileByLoggedInUserAction.pending, (state) => {
      state.userProfileLoading = true;
      state.userProfileSuccessStatus = false;
      state.userProfileMessage = null;
      state.userProfile = {};
    });
    builder.addCase(
      getUserProfileByLoggedInUserAction.fulfilled,
      (state, action) => {
        console.log(action.payload);
        state.userProfileLoading = false;
        state.userProfileSuccessStatus = true;
        state.userProfile = action.payload.userProfile;
        state.userProfileMessage = action.payload.message;
      }
    );
    builder.addCase(
      getUserProfileByLoggedInUserAction.rejected,
      (state, action) => {
        state.userProfileLoading = false;
        state.userProfileSuccessStatus = false;
        state.userProfileMessage = action.payload;
        state.userProfile = {};
      }
    );
    // / logOutUserAction
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userProfile = {};
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

// ~ export userProfileSuccessStatus State
export const userProfileSuccessStatusState = (state) =>
  state.UserReducers?.userProfileSuccessStatus;
