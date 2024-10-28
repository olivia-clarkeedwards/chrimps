import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Root } from "react-dom/client"

interface PlayerState {
  clickDamage: number
}

const initialState: PlayerState = {
  clickDamage: 1,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increaseClickDamage(state, action: PayloadAction<number>) {
      state.clickDamage += action.payload
    },
  },
})

export const { increaseClickDamage } = playerSlice.actions

export const selectClickDamage = (state: RootState) => state.player.clickDamage

export default playerSlice.reducer
