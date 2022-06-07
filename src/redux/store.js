import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";
import listsReducer from "../redux/slices/listsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 0,
  blacklist: [],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
