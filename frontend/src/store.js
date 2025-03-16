import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { AuthReducers } from "./redux/authRedux/AuthSlice";
import ThemeReducer from "./redux/themeSlice";

const rootReducer = combineReducers({
  // Add your reducers here
  AuthReducers,
  ThemeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
