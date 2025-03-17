// | import createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// | import signInUserAction from AuthActions
import {
  logoutUserAction,
  signInUserAction,
  signUpUserAction,
} from "./AuthActions";

// @ initialState variable
const initialState = {
  users: null,
  isUserLoggedIn: false,
  loggedInUser: null,
  authMessage: null,
  authLoading: false,
  authSuccessStatus: false,
};

// # AuthSlice for redux toolkit
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ? signInUserAction
      .addCase(signInUserAction.pending, (state) => {
        state.authLoading = true;
      })
      // / signInUserAction
      .addCase(signInUserAction.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isUserLoggedIn = true;
        state.loggedInUser = action.payload.loggedInUser;
        state.authSuccessStatus = action.payload.successStatus;
        state.authMessage = action.payload.message;
      })
      // ! signInUserAction
      .addCase(signInUserAction.rejected, (state, action) => {
        state.authLoading = false;
        state.authSuccessStatus = false;
        state.authMessage = action.payload.message;
      });
    // ? signUpUserAction
    builder
      .addCase(signUpUserAction.pending, (state) => {
        state.authLoading = true;
      })
      // / signUpUserAction
      .addCase(signUpUserAction.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authSuccessStatus = action.payload.successStatus;
        state.authMessage = action.payload.message;
      })
      // ! signUpUserAction
      .addCase(signUpUserAction.rejected, (state, action) => {
        state.authLoading = false;
        state.authSuccessStatus = false;
        state.authMessage = action.payload.message;
      });
    // ? logOutUserAction
    builder.addCase(logoutUserAction.pending, (state) => {
      state.authLoading = true;
    });
    // / logOutUserAction
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.authLoading = false;
      state.isUserLoggedIn = false;
      state.loggedInUser = null;
      state.authMessage = action.payload.message;
      state.authSuccessStatus = action.payload.successStatus;
    });
    // ! logOutUserAction
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.authLoading = false;
      state.authSuccessStatus = false;
      state.authMessage = action.payload.message;
    });
  },
});

export const AuthReducers = AuthSlice.reducer;

export const usersState = (state) => state.AuthReducers.users;
export const isUserLoggedInState = (state) =>
  state.AuthReducers?.isUserLoggedIn;
export const loggedInUserState = (state) => state.AuthReducers?.loggedInUser;
export const authMessageStete = (state) => state.AuthReducers?.authMessage;
export const authLoadingState = (state) => state.AuthReducers?.authLoading;
export const authSuccessStatusState = (state) =>
  state.AuthReducers?.authSuccessStatus;
