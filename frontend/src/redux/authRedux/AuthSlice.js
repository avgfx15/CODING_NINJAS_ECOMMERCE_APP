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
  userMessage: null,
  userLoading: false,
  userSuccessStatus: false,
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
        state.userLoading = true;
      })
      // / signInUserAction
      .addCase(signInUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.isUserLoggedIn = true;
        state.loggedInUser = action.payload.loggedInUser;
        state.userSuccessStatus = action.payload.successStatus;
        state.userMessage = action.payload.message;
      })
      // ! signInUserAction
      .addCase(signInUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userSuccessStatus = false;
        state.userMessage = action.payload.message;
      });
    // ? signUpUserAction
    builder
      .addCase(signUpUserAction.pending, (state) => {
        state.userLoading = true;
      })
      // / signUpUserAction
      .addCase(signUpUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccessStatus = action.payload.successStatus;
        state.userMessage = action.payload.message;
      })
      // ! signUpUserAction
      .addCase(signUpUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userSuccessStatus = false;
        state.userMessage = action.payload.message;
      });
    // ? logOutUserAction
    builder.addCase(logoutUserAction.pending, (state) => {
      state.userLoading = true;
    });
    // / logOutUserAction
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userLoading = false;
      state.isUserLoggedIn = false;
      state.loggedInUser = null;
      state.userMessage = action.payload.message;
      state.userSuccessStatus = action.payload.successStatus;
    });
    // ! logOutUserAction
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userSuccessStatus = false;
      state.userMessage = action.payload.message;
    });
  },
});

export const AuthReducers = AuthSlice.reducer;

export const usersState = (state) => state.AuthReducers.users;
export const isUserLoggedInState = (state) =>
  state.AuthReducers?.isUserLoggedIn;
export const loggedInUserState = (state) => state.AuthReducers?.loggedInUser;
export const userMessageStete = (state) => state.AuthReducers?.userMessage;
export const userLoadingState = (state) => state.AuthReducers?.userLoading;
export const userSuccessStatusState = (state) =>
  state.AuthReducers?.userSuccessStatus;
