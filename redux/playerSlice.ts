import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { type RootState } from "./store"
import { PlayerState, Tab } from "../models/player"
import { playerCalc, UPGRADE_CONFIG } from "../gameconfig/upgrades"
import { setInitElementMap } from "../gameconfig/utils"
import { PrestigeState, PrestigeUpgradeName, UpgradeIdWithLevel, UpgradeKey } from "../models/upgrades"
import { prestigeReset } from "./sharedActions"

const debugState: PlayerState = {
  clickLevel: 500,
  clickMultiUpgradeCount: 3,
  dotLevel: 500,
  dotMultiUpgradeCount: 3,
  gold: 1000000,
  plasma: 1000000,

  plasmaReserved: 0,
  hasInitClickMulti1: false,
  hasInitClickMulti2: false,
  hasInitClickMulti3: false,

  hasInitDotPane: false,
  hasInitDotMulti1: false,
  hasInitDotMulti2: false,
  hasInitDotMulti3: false,

  tabInView: "upgrade",

  startDate: performance.timeOrigin,
  pDamageUpgradeCount: 10,
  pHealthUpgradeCount: 10,
  plasmaSpent: 50000,
}

const initialState: PlayerState = {
  clickLevel: 1,
  clickMultiUpgradeCount: 0,
  dotLevel: 0,
  dotMultiUpgradeCount: 0,
  gold: 0,

  plasmaReserved: 0,
  // Prevents animation triggering again on mount
  hasInitClickMulti1: false,
  hasInitClickMulti2: false,
  hasInitClickMulti3: false,

  hasInitDotPane: false,
  hasInitDotMulti1: false,
  hasInitDotMulti2: false,
  hasInitDotMulti3: false,

  tabInView: "upgrade",
  // Preserved between runs
  startDate: performance.timeOrigin,
  plasma: 0,
  pDamageUpgradeCount: 0,
  pHealthUpgradeCount: 0,
  plasmaSpent: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
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
    increaseGold(state, action: PayloadAction<number>) {
      state.gold += action.payload
    },
    decreaseGold(state, action: PayloadAction<number>) {
      state.gold -= action.payload
    },
    increasePlasma(state, action: PayloadAction<number>) {
      state.plasma += action.payload
    },
    reservePlasma(state, action: PayloadAction<number>) {
      const diff = action.payload - state.plasmaReserved
      state.plasmaReserved += diff
      state.plasma -= diff
    },
    resetPlasmaReserved: (state) => {
      state.plasma += state.plasmaReserved
      state.plasmaReserved = 0
    },
    incrementPDamageUpgradeCount: (state) => {
      state.pDamageUpgradeCount++
    },
    incrementPHealthUpgradeCount: (state) => {
      state.pHealthUpgradeCount++
    },
    prestigeRespec: (state) => {
      state.plasma += state.plasmaReserved
      state.plasma += state.plasmaSpent
      state.plasmaReserved = 0
      state.plasmaSpent = 0
      state.pDamageUpgradeCount = 0
      state.pHealthUpgradeCount = 0
    },
    initialiseElement(state, action: PayloadAction<UpgradeIdWithLevel | UpgradeKey>) {
      setInitElementMap[action.payload](state)
    },
    setTabInView: (state, action: PayloadAction<Tab>) => {
      state.tabInView = action.payload
    },
    toggleDebugState: (state) => {
      if (state.plasma < 1000000) {
        return (state = debugState)
      } else {
        return (state = { ...initialState, gold: 1000000 })
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(prestigeReset, (state, action: PayloadAction<Record<PrestigeUpgradeName, PrestigeState>>) => {
      state.clickLevel = 1
      state.clickMultiUpgradeCount = 0
      state.dotLevel = 0
      state.dotMultiUpgradeCount = 0
      state.gold = 0
      state.plasmaSpent += state.plasmaReserved
      state.plasmaReserved = 0
      state.hasInitClickMulti1 = false
      state.hasInitClickMulti2 = false
      state.hasInitClickMulti3 = false
      state.hasInitDotPane = false
      state.hasInitDotMulti1 = false
      state.hasInitDotMulti2 = false
      state.hasInitDotMulti3 = false

      state.tabInView = "upgrade"

      state.pDamageUpgradeCount += action.payload.damage.purchaseCount
      state.pHealthUpgradeCount += action.payload.health.purchaseCount
    })
  },
})

export const {
  incrementClickLevel,
  incrementClickMultiUpgradeCount,
  incrementDotLevel,
  incrementDotMultiUpgradeCount,
  increaseGold,
  decreaseGold,
  increasePlasma,
  reservePlasma,
  resetPlasmaReserved,
  // decreasePlasma,
  incrementPDamageUpgradeCount,
  incrementPHealthUpgradeCount,
  prestigeRespec,
  initialiseElement,
  setTabInView,
  toggleDebugState,
} = playerSlice.actions

export const selectPlayerState = createSelector([(state: RootState) => state.player], (player) => ({
  clickLevel: player.clickLevel,
  clickMultiUpgradeCount: player.clickMultiUpgradeCount,
  dotLevel: player.dotLevel,
  dotMultiUpgradeCount: player.dotMultiUpgradeCount,
  startDate: player.startDate,
}))

export const selectPrestigeState = createSelector([(state: RootState) => state.player], (player) => ({
  plasma: player.plasma,
  pDamageUpgradeCount: player.pDamageUpgradeCount,
  pHealthUpgradeCount: player.pHealthUpgradeCount,
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
export const selectGCanAfford = (cost: number) => (state: RootState) => selectGold(state) >= cost

export const selectPlasma = (state: RootState) => state.player.plasma
export const selectPCanAfford = (cost: number) => (state: RootState) => selectPlasma(state) >= cost
export const selectPlasmaReserved = (state: RootState) => state.player.plasmaReserved

const prestigeDamage = UPGRADE_CONFIG.prestige.find((pUpgrade) => pUpgrade.id === "damage")!.modifier
export const selectClickDamage = (state: RootState) =>
  playerCalc.clickDamage(
    state.player.clickLevel,
    state.player.clickMultiUpgradeCount,
    1 + state.player.pDamageUpgradeCount * prestigeDamage,
  )
export const selectDotDamage = (state: RootState) =>
  playerCalc.dotDamage(
    state.player.dotLevel,
    state.player.dotMultiUpgradeCount,
    1 + state.player.pDamageUpgradeCount * prestigeDamage,
  )
export const selectClickLevelUpCost = (state: RootState) => UPGRADE_CONFIG.click.levelUpCost(state.player.clickLevel)
export const selectDotLevelUpCost = (state: RootState) => UPGRADE_CONFIG.dot.levelUpCost(state.player.dotLevel)

export const selectTabInView = (state: RootState) => state.player.tabInView

export default playerSlice.reducer
