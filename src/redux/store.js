import { configureStore } from "@reduxjs/toolkit";
import activeBoardReducer from "./activeBoard/activeBoardSlice";
import userReducer from "./user/userSlice";
import { activeCardReducer } from "./activeCard/activeCardSlice";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { notificationsReducer } from "./notifications/notificationsSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Cấu hình persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

// Combine các reducers trong dự án
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer,
});

// Thực hiện persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
