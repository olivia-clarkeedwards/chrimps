import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./statsSlice";
import monsterReducer from "./monsterSlice";

export const store = configureStore({
  reducer: {
    // stage: stageReducer,
    monster: monsterReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
