import { configureStore } from "@reduxjs/toolkit"
import statsReducer from "./statsSlice"
import monsterReducer from "./monsterSlice"
import zoneReducer from "./zoneSlice"
import playerReducer from "./playerSlice"

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
    player: playerReducer,
    stats: statsReducer,
    zone: zoneReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
