import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState = {
  lastPlayed: Date.now(),
  lastSaveCatchUp: 0 as number | undefined,
  loading: false,
}

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    saveGame: (state) => {
      const now = Date.now()
      state.lastPlayed = now
      state.lastSaveCatchUp = now
    },
    catchUpComplete: (state) => {
      state.lastSaveCatchUp = undefined
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { saveGame, catchUpComplete, setLoading } = metaSlice.actions

export const selectLastSaveCatchUp = (state: RootState) => state.meta.lastSaveCatchUp
export const selectLoading = (state: RootState) => state.meta.loading

export default metaSlice.reducer
