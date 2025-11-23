import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer";

export const store = configureStore({
  reducer: {
    manageData: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
