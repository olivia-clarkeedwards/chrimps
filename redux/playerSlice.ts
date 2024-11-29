import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { PlayerState } from "../models/player"

const debugState: PlayerState = {
  clickLevel: 100,
  clickMultiUpgradeCount: 0,
  gold: 100,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,

  // Never changes
  startTime: performance.timeOrigin,
}

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  gold: 1,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,

  // Never changes
  startTime: performance.timeOrigin,
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
export const selectStartTime = (state: RootState) => state.player.startTime

export default playerSlice.reducer
