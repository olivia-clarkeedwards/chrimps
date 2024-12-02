import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { PlayerState } from "../models/player"

const debugState: PlayerState = {
  clickLevel: 10000,
  clickMultiUpgradeCount: 0,
  gold: 100,
  dotLevel: 50,
  dotMultiUpgradeCount: 3,

  // Never changes
  startDate: performance.timeOrigin,
}

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  gold: 1,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,

  // Never changes
  startDate: performance.timeOrigin,
}

export const playerSlice = createSlice({
  name: "player",
  initialState: debugState,
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
export const selectStartDate = (state: RootState) => state.player.startDate

export default playerSlice.reducer
