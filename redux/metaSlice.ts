import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState = {
  lastPlayed: Date.now(),
  catchUpDate: 0 as number | undefined,
}

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    saveGame: (state) => {
      const now = Date.now()
      state.lastPlayed = now
      state.catchUpDate = now
    },
    catchUpComplete: (state) => {
      state.catchUpDate = undefined
    },
  },
})

export const { saveGame } = metaSlice.actions

export const selectCatchUpDate = (state: RootState) => state.meta.catchUpDate

export default metaSlice.reducer
