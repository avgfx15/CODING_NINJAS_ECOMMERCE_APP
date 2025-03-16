import { createSlice } from "@reduxjs/toolkit";
import { signInUserAction } from "./AuthActions";

const initialState = {
  users: null,
  isUserLoggedIn: false,
  loggedInUser: null,
  userMessage: null,
  userLoading: false,
  userSuccessStatus: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUserAction.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signInUserAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userLoading = false;
        state.isUserLoggedIn = true;
        state.loggedInUser = action.payload.loggedInUser;
        state.userSuccessStatus = action.payload.successStatus;
        state.userMessage = action.payload.message;
      })
      .addCase(signInUserAction.rejected, (state, action) => {
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
