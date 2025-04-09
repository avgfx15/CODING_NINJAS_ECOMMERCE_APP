import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers
import AuthReducer from "./redux/authRedux/AuthSlice";
import ThemeReducer from "./redux/themeSlice";
import UserReducers from "./redux/userRedux/userSlice";
import socialMediaReducers from "./redux/socialMediaRedux/socialMediaSlice";

// Root Reducer
const rootReducer = combineReducers({
  ThemeReducer,
  AuthReducer,
  UserReducers,
  socialMediaReducers,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthReducer"],
  version: 1,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
