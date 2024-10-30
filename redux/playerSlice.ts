import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Root } from "react-dom/client"

interface PlayerState {
  clickBaseDamage: number
  gold: number
  clickLevel: number
}

const initialState: PlayerState = {
  clickBaseDamage: 1,
  clickLevel: 1,
  gold: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increaseClickBaseDamage(state, action: PayloadAction<number>) {
      state.clickBaseDamage += action.payload
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

export const { increaseClickBaseDamage, increaseGold, decreaseGold, incrementClickLevel } = playerSlice.actions

export const selectClickBaseDamage = (state: RootState) => state.player.clickBaseDamage
export const selectClickLevel = (state: RootState) => state.player.clickLevel
export const selectGold = (state: RootState) => state.player.gold

export default playerSlice.reducer
