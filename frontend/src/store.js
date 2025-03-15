import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./redux/themeSlice";
import { AuthReducers } from "./redux/authRedux/AuthSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: AuthReducers,
  },
});

export default store;
