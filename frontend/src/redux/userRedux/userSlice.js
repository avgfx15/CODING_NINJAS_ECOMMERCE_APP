// | import createSlice
import { createSlice } from "reduxjs/toolkit";

// @ initialState variable
const initialState = {
  // @ user object
  user: {},
  // @ loading boolean
  userLoading: false,
  // @ error string
  userMessage: null,
  userSuccessStatus: false,
};

// @ createSlice function
const userSlice = createSlice({
  // @ name of the slice
  name: "user",
  // @ initial state
  initialState,
  // @ reducers
  reducers: {},
  // @ extraReducers
  extraReducers: (builder) => {
    // @ user loading reducer
  },
});

// ~ export User Reducer
export const UserReducer = userSlice.reducer;

// ~ export user state
export const userState = (state) => state.UserReducer.user;

// ~ export userLoading State
export const userLoadingState = (state) => state.UserReducer.userLoading;

// ~ export userMessage State
export const userMessageState = (state) => state.UserReducer.userMessage;

// ~ export userSuccessStatus State
export const userSuccessStatusState = (state) =>
  state.UserReducer.userSuccessStatus;
