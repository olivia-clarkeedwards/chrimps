import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Root } from "react-dom/client"

interface PlayerState {
  clickDamage: number
  gold: number
  clickLevel: number
}

const initialState: PlayerState = {
  clickDamage: 1,
  clickLevel: 1,
  gold: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increaseClickDamage(state, action: PayloadAction<number>) {
      state.clickDamage += action.payload
    },
    increaseGold(state, action: PayloadAction<number>) {
      state.gold += action.payload
    },
    decreaseGold(state, action: PayloadAction<number>) {
      state.gold -= action.payload
    },
    incrementClickLevel: (state) => {
      state.clickLevel++
    },
  },
})

export const { increaseClickDamage, increaseGold, decreaseGold, incrementClickLevel } = playerSlice.actions

export const selectClickDamage = (state: RootState) => state.player.clickDamage
export const selectClickLevel = (state: RootState) => state.player.clickLevel
export const selectGold = (state: RootState) => state.player.gold

export default playerSlice.reducer
