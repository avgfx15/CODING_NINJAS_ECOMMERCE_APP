import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  loggedInUser: null,
  userMessage: null,
  userLoading: false,
  userSuccessStatus: flase,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.loggedInUser = action.payload;
        state.userSuccess = true;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
      });
  },
});

export const AuthReducers = AuthSlice.reducer;

export const selectUsers = (state) => state.AuthReducers.users;
export const selectLoggedInUser = (state) => state.AuthReducers.loggedInUser;
export const selectUserMessage = (state) => state.AuthReducers.userMessage;
export const selectUserLoading = (state) => state.AuthReducers.userLoading;
export const selectUserSuccessStatus = (state) =>
  state.AuthReducers.userSuccessStatus;
