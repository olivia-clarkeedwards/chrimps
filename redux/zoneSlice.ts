import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Enemy } from "../models/monsters"
import { Zone } from "../gameconfig/zone"

interface ZoneState {
  zoneNumber: number
  zoneLength: number
  Monsters: Enemy[]
}

const initialState: ZoneState = { ...new Zone(1) }

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    incrementZoneNumber: (state) => {
      state.zoneNumber++
    },
    selectZoneLength(state, action: PayloadAction<number>) {
      state.zoneLength = action.payload
    },
    setMonsters(state, action: PayloadAction<Enemy[]>) {
      if (state.zoneNumber === 1) {
        state.Monsters = [...state.Monsters, ...action.payload.slice(1)]
      } else {
        state.Monsters = action.payload
      }
    },
  },
})

export const { incrementZoneNumber, setMonsters } = zoneSlice.actions

export const selectZoneNumber = (state: RootState) => state.zone.zoneNumber
export const selectZoneLength = (state: RootState) => state.zone.zoneLength
export const selectZoneMonsters = (state: RootState) => state.zone.Monsters

export default zoneSlice.reducer
