import { configureStore, createSlice, Middleware } from "@reduxjs/toolkit"
import statsReducer from "./statsSlice"
import monsterReducer from "./monsterSlice"
import zoneReducer from "./zoneSlice"
import playerReducer from "./playerSlice"
import { loadFromLocalStorage, saveToLocalStorage } from "../gameconfig/utils"

const metaSlice = createSlice({
  name: "meta",
  initialState: {},
  reducers: {
    saveGame: () => undefined,
  },
})

const saveMiddleware: Middleware = (store) => (next) => (action) => {
  const nextAction = next(action)

  if (metaSlice.actions.saveGame.match(action)) {
    console.log("Saving game")
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

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
