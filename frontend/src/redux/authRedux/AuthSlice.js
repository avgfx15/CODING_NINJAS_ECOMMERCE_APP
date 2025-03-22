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

// ~ export AuthReducer
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;

// ~ export auth state

// ~ export isUserLoggedIn state
export const isUserLoggedInState = (state) => state.AuthReducer?.isUserLoggedIn;

// ~ export loggedInUser state
export const loggedInUserState = (state) => state.AuthReducer?.loggedInUser;

// ~ export authMessage state
export const authMessageStete = (state) => state.AuthReducer?.authMessage;

// ~ export authLoading state
export const authLoadingState = (state) => state.AuthReducer?.authLoading;

// ~ export authSuccessStatus state
export const authSuccessStatusState = (state) =>
  state.AuthReducer?.authSuccessStatus;
