import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface StatsState {
  clickCount: number
  totalClickDamage: number
  killCount: number
  totalZonesCompleted: number
  highestZoneEver: number
}

const initialState: StatsState = {
  clickCount: 0,
  totalClickDamage: 0,
  killCount: 0,
  totalZonesCompleted: 0,
  highestZoneEver: 0,
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
    incrementKillCount: (state) => {
      state.killCount++
    },
    incrementTotalZonesCompleted: (state) => {
      state.totalZonesCompleted++
    },
    incrementHighestZoneEver: (state) => {
      state.highestZoneEver++
    },
  },
})

export const {
  incrementClickCount,
  increaseTotalClickDamageDealt,
  incrementKillCount,
  incrementTotalZonesCompleted,
  incrementHighestZoneEver,
} = statsSlice.actions

export const selectClickCount = (state: RootState) => state.stats.clickCount
export const selecttotalClickDamageDealt = (state: RootState) => state.stats.totalClickDamage
export const selectKillCount = (state: RootState) => state.stats.killCount
export const selectTotalZonesCompleted = (state: RootState) => state.stats.totalZonesCompleted
export const selectHighestZoneEver = (state: RootState) => state.stats.highestZoneEver

export default statsSlice.reducer
