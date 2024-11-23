import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Root } from "react-dom/client"
import { PlayerState } from "../models/state"

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  gold: 1000000,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increaseGold(state, action: PayloadAction<number>) {
      state.gold += action.payload
    },
    decreaseGold(state, action: PayloadAction<number>) {
      state.gold -= action.payload
    },
    incrementClickLevel: (state) => {
      state.clickLevel++
    },
    incrementClickMultiUpgradeCount: (state) => {
      state.clickMultiUpgradeCount++
    },
    incrementDotLevel: (state) => {
      state.dotLevel++
    },
    incrementDotMultiUpgradeCount: (state) => {
      state.dotMultiUpgradeCount++
    },
  },
})

export const {
  increaseGold,
  decreaseGold,
  incrementClickLevel,
  incrementClickMultiUpgradeCount,
  incrementDotLevel,
  incrementDotMultiUpgradeCount,
} = playerSlice.actions

export const selectClickLevel = (state: RootState) => state.player.clickLevel
export const selectClickMultiUpgradeCount = (state: RootState) => state.player.clickMultiUpgradeCount
export const selectGold = (state: RootState) => state.player.gold
export const selectDotLevel = (state: RootState) => state.player.dotLevel
export const selectDotMultiUpgradeCount = (state: RootState) => state.player.dotMultiUpgradeCount

export default playerSlice.reducer
