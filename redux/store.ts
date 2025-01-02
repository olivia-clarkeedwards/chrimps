import { configureStore, createSlice, Middleware } from "@reduxjs/toolkit"
import statsReducer from "./statsSlice"
import monsterReducer from "./monsterSlice"
import zoneReducer from "./zoneSlice"
import playerReducer from "./playerSlice"
import { loadFromLocalStorage, saveToLocalStorage } from "../gameconfig/utils"

export interface StoreState {
  monster: ReturnType<typeof monsterReducer>
  player: ReturnType<typeof playerReducer>
  stats: ReturnType<typeof statsReducer>
  zone: ReturnType<typeof zoneReducer>
}

const metaSlice = createSlice({
  name: "meta",
  initialState: { lastPlayed: Date.now(), catchUpDate: 0 as number | undefined },
  reducers: {
    saveGame: (state) => {
      const now = Date.now()
      state.lastPlayed = now
      state.catchUpDate = now
    },
  },
})

const saveMiddleware: Middleware = (store) => (next) => (action) => {
  const nextAction = next(action)

  if (metaSlice.actions.saveGame.match(action)) {
    saveToLocalStorage(store.getState())
  }

  return nextAction
}

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
    player: playerReducer,
    stats: statsReducer,
    zone: zoneReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveMiddleware),
})

export type RootState = StoreState
export type AppDispatch = typeof store.dispatch
