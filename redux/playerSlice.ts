import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { PlayerState } from "../models/player"

const debugState: PlayerState = {
  clickLevel: 10000,
  clickMultiUpgradeCount: 0,
  gold: 100,
  dotLevel: 50000,
  dotMultiUpgradeCount: 3,

  startDate: performance.timeOrigin,
}

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  gold: 12313241412,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,

  // Never changes
  startDate: performance.timeOrigin,
}

export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
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

export const selectPlayerState = createSelector([(state) => state.player], (player) => ({
  clickLevel: player.clickLevel,
  clickMultiUpgradeCount: player.clickMultiUpgradeCount,
  dotLevel: player.dotLevel,
  dotMultiUpgradeCount: player.dotMultiUpgradeCount,
  startDate: player.startDate,
}))

export const selectGold = (state: RootState) => state.player.gold

export const selectCanAfford = (cost: number) => (state: RootState) => selectGold(state) >= cost

export default playerSlice.reducer
