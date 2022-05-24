import { configureStore } from "@reduxjs/toolkit";
import { boardReducer, settingsReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
