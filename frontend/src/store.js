// | import store and reducer from redux/toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// | import persist store and reducer from redux-persist
import { persistReducer, persistStore } from "redux-persist";

// | import storage from redux-persist storage
import storage from "redux-persist/lib/storage";

// | import Reducers
// | import AuthReducer
import AuthReducer from "./redux/authRedux/AuthSlice";

// | import ThemeReducer
import ThemeReducer from "./redux/themeSlice";

// | import UserReducer
import UserReducers from "./redux/userRedux/userSlice";

// @ rootReducer declare
const rootReducer = combineReducers({
  ThemeReducer,
  AuthReducer,
  UserReducers,
});

// ` persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthReducer"],
  version: 1,
};

// @ persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ` store Configure
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// @ create persistor store
const persistor = persistStore(store);

// ~ export store
export { store, persistor };
