import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { zoneComplete } from "./zoneSlice"

interface StatsState {
  clickCount: number
  totalClickDamage: number
  totalDotDamage: number
  killCount: number
  farmZonesCompleted: number
  totalZonesCompleted: number
  highestZoneEver: number
  highestZone: number
}

const initialState: StatsState = {
  clickCount: 0,
  totalClickDamage: 0,
  totalDotDamage: 0,
  killCount: 0,
  farmZonesCompleted: 0,
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
    incrementFarmZonesCompleted: (state) => {
      state.farmZonesCompleted++
    },
  },
  extraReducers(builder) {
    builder.addCase(zoneComplete, (state) => {
      state.totalZonesCompleted++
      state.highestZone++
      if (state.highestZone > state.highestZoneEver) {
        state.highestZoneEver = state.highestZone
      }
    })
  },
})

export const {
  incrementClickCount,
  increaseTotalClickDamageDealt,
  increaseTotalDotDamageDealt,
  incrementKillCount,
  incrementFarmZonesCompleted,
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
