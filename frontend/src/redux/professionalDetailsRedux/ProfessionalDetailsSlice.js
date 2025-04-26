import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professionalDetails: null,
  professionalDetailsLoading: false,
  professionalDetailsMessage: null,
  professionalDetailsError: null,
  professionalDetailsSuccessStatus: false,
};

export const professionalDetailsSlice = createSlice({
  name: "professionalDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        "professionalDetails/fetchProfessionalDetails/pending",
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        "professionalDetails/fetchProfessionalDetails/fulfilled",
        (state, action) => {
          state.loading = false;
          state.professionalDetails = action.payload;
        }
      )
      .addCase(
        "professionalDetails/fetchProfessionalDetails/rejected",
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

const ProfessionalDataReducer = professionalDetailsSlice.reducer;

export default ProfessionalDataReducer;

export const professionalDetailsStatus = (state) =>
  state.professionalDetails.professionalDetails;

export const selectLoading = (state) => state.professionalDetails.loading;

export const selectError = (state) => state.professionalDetails.error;

export const selectProfessionalDetailsMessage = (state) =>
  state.professionalDetails.professionalDetailsMessage;

export const selectProfessionalDetailsError = (state) =>
  state.professionalDetails.professionalDetailsError;

export const selectProfessionalDetailsSuccessStatus = (state) =>
  state.professionalDetails.professionalDetailsSuccessStatus;

export const selectProfessionalDetailsLoading = (state) =>
  state.professionalDetails.professionalDetailsLoading;
