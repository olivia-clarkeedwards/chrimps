import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { PlayerState } from "../models/player"
import { playerCalc, UPGRADE_CONFIG } from "../gameconfig/upgrades"
import { setInitElementMap } from "../gameconfig/utils"
import { UpgradeIdWithLevel, UpgradeKey } from "../models/upgrades"

const debugState: PlayerState = {
  clickLevel: 10000,
  clickMultiUpgradeCount: 3,
  dotLevel: 50000,
  dotMultiUpgradeCount: 3,
  gold: 1000000,
  plasma: 1000000,

  hasInitClickMulti1: false,
  hasInitClickMulti2: false,
  hasInitClickMulti3: false,

  hasInitDotPane: false,
  hasInitDotMulti1: false,
  hasInitDotMulti2: false,
  hasInitDotMulti3: false,

  startDate: performance.timeOrigin,
}

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,
  gold: 1,

  // Prevents animation triggering again on mount
  hasInitClickMulti1: false,
  hasInitClickMulti2: false,
  hasInitClickMulti3: false,

  hasInitDotPane: false,
  hasInitDotMulti1: false,
  hasInitDotMulti2: false,
  hasInitDotMulti3: false,

  // Preserved between runs
  startDate: performance.timeOrigin,
  plasma: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
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
    initialiseElement(state, action: PayloadAction<UpgradeIdWithLevel | UpgradeKey>) {
      setInitElementMap[action.payload](state)
    },
    increaseGold(state, action: PayloadAction<number>) {
      state.gold += action.payload
    },
    decreaseGold(state, action: PayloadAction<number>) {
      state.gold -= action.payload
    },
    increasePlasma(state, action: PayloadAction<number>) {
      state.plasma += action.payload
    },
    decreasePlasma(state, action: PayloadAction<number>) {
      state.plasma -= action.payload
    },
    toggleDebugState: (state) => {
      if (state.plasma < 1000000) {
        return (state = debugState)
      } else {
        return (state = { ...initialState, gold: 1000000 })
      }
    },
  },
})

export const {
  incrementClickLevel,
  incrementClickMultiUpgradeCount,
  incrementDotLevel,
  incrementDotMultiUpgradeCount,
  initialiseElement,
  increaseGold,
  decreaseGold,
  increasePlasma,
  decreasePlasma,
  toggleDebugState,
} = playerSlice.actions

export const selectPlayerState = createSelector([(state: RootState) => state.player], (player) => ({
  clickLevel: player.clickLevel,
  clickMultiUpgradeCount: player.clickMultiUpgradeCount,
  dotLevel: player.dotLevel,
  dotMultiUpgradeCount: player.dotMultiUpgradeCount,
  plasma: player.plasma,
  startDate: player.startDate,
}))

export const selectInitState = createSelector(
  [(state: RootState) => state.player],
  ({
    hasInitClickMulti1,
    hasInitClickMulti2,
    hasInitClickMulti3,
    hasInitDotPane,
    hasInitDotMulti1,
    hasInitDotMulti2,
    hasInitDotMulti3,
  }) => ({
    hasInitClickMulti1,
    hasInitClickMulti2,
    hasInitClickMulti3,
    hasInitDotPane,
    hasInitDotMulti1,
    hasInitDotMulti2,
    hasInitDotMulti3,
  }),
)

export const selectClickLevel = (state: RootState) => state.player.clickLevel
export const selectGold = (state: RootState) => state.player.gold
export const selectCanAfford = (cost: number) => (state: RootState) => selectGold(state) >= cost

export const selectClickDamage = (state: RootState) =>
  playerCalc.clickDamage(state.player.clickLevel, state.player.clickMultiUpgradeCount)
export const selectDotDamage = (state: RootState) =>
  playerCalc.dotDamage(state.player.dotLevel, state.player.dotMultiUpgradeCount)
export const selectClickLevelUpCost = (state: RootState) => UPGRADE_CONFIG.click.levelUpCost(state.player.clickLevel)
export const selectDotLevelUpCost = (state: RootState) => UPGRADE_CONFIG.dot.levelUpCost(state.player.dotLevel)

export default playerSlice.reducer
