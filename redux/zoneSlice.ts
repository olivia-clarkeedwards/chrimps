import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Enemy } from "../models/monsters"
import { Zone } from "../gameconfig/zone"
import { getMonster } from "../gameconfig/monster"

interface ZoneState {
  zoneNumber: number
  zoneLength: number
  Monsters: Enemy[]
}

const firstZone = new Zone(1)
firstZone.Monsters = firstZone.Monsters.slice(1)
firstZone.Monsters.unshift({ ...getMonster("Slime") })
const { zoneLength, zoneNumber, Monsters } = firstZone

const initialState = { zoneLength, zoneNumber, Monsters }

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
      state.Monsters = action.payload
    },
  },
})

export const { incrementZoneNumber, setMonsters } = zoneSlice.actions

export const selectZoneNumber = (state: RootState) => state.zone.zoneNumber
export const selectZoneLength = (state: RootState) => state.zone.zoneLength
export const selectZoneMonsters = (state: RootState) => state.zone.Monsters

export default zoneSlice.reducer
