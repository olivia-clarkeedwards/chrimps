import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { EnemyState } from "../models/monsters"
import { Zone } from "../gameconfig/zone"
import { getMonster } from "../gameconfig/monster"

interface ZoneState {
  zoneNumber: number
  zoneLength: number
  monsters: EnemyState[]
  currentStageIndex: number
}

const firstZone = new Zone(1)
firstZone.monsters = [getMonster("Slime"), ...firstZone.monsters.slice(1)]
const initialState: ZoneState = {
  zoneLength: firstZone.zoneLength,
  zoneNumber: firstZone.zoneNumber,
  monsters: firstZone.monsters,
  currentStageIndex: 1,
}
export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    incrementZoneNumber: (state) => {
      state.zoneNumber++
      const nextZone = new Zone(state.zoneNumber)
      state.monsters = nextZone.monsters
      state.currentStageIndex = 0
      console.log(state.monsters)
      return
    },
    incrementStageNumber: (state) => {
      state.currentStageIndex++
    },
    setZoneLength(state, action: PayloadAction<number>) {
      state.zoneLength = action.payload
    },
    setMonsters(state, action: PayloadAction<EnemyState[]>) {
      state.monsters = action.payload
    },
  },
})

export const { incrementZoneNumber, incrementStageNumber, setMonsters, setZoneLength } = zoneSlice.actions

export const selectZoneNumber = (state: RootState) => state.zone.zoneNumber
export const selectZoneLength = (state: RootState) => state.zone.zoneLength
export const selectZoneMonsters = (state: RootState) => state.zone.monsters
export const selectStageIndex = (state: RootState) => state.zone.currentStageIndex

export default zoneSlice.reducer
