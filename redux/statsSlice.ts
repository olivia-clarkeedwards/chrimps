import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface StatsState {
  clickCount: number
  totalClickDamage: number
  totalDotDamage: number
  killCount: number
  zonesCompleted: number
  totalZonesCompleted: number
  highestZoneEver: number
  highestZone: number
}

const initialState: StatsState = {
  clickCount: 0,
  totalClickDamage: 0,
  totalDotDamage: 0,
  killCount: 0,
  zonesCompleted: 0,
  totalZonesCompleted: 0,
  highestZoneEver: 1,

  // This run data
  highestZone: 1,
}

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    incrementClickCount: (state) => {
      state.clickCount++
    },
    increaseTotalClickDamageDealt(state, action: PayloadAction<number>) {
      state.totalClickDamage += action.payload
    },
    increaseTotalDotDamageDealt(state, action: PayloadAction<number>) {
      state.totalClickDamage += action.payload
    },
    incrementKillCount: (state) => {
      state.killCount++
    },
    incrementZonesCompleted: (state) => {
      state.zonesCompleted++
      state.totalZonesCompleted++
    },
    incrementHighestZoneEver: (state) => {
      state.highestZoneEver++
    },
    incrementHighestZone: (state) => {
      state.highestZone++
    },
  },
})

export const {
  incrementClickCount,
  increaseTotalClickDamageDealt,
  increaseTotalDotDamageDealt,
  incrementKillCount,
  incrementZonesCompleted,
  incrementHighestZoneEver,
  incrementHighestZone,
} = statsSlice.actions

export const selectStatsState = createSelector([(state) => state.stats], (stats) => ({
  clickCount: stats.clickCount,
  totalClickDamageDealt: stats.totalClickDamage,
  totalDotDamageDealt: stats.totalDotDamage,
  killCount: stats.killCount,
  zonesCompleted: stats.zonesCompleted,
  totalZonesCompleted: stats.totalZonesCompleted,
  highestZoneEver: stats.highestZoneEver,
  highestZone: stats.highestZone,
}))

export const selectHighestZoneEver = (state: RootState) => state.stats.highestZoneEver

export default statsSlice.reducer
