import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { EnemyState } from "../models/monsters"
import { Zone } from "../gameconfig/zone"
import { getMonster } from "../gameconfig/monster"

interface ZoneState {
  currentZoneNumber: number
  currentZoneLength: number
  monsters: EnemyState[]
  nextStageIndex: number
  isFarming: boolean
  farmZone: null | EnemyState[]
  farmZoneNumber: null | number
  farmZoneLength: null | number
  zoneInFocus: number
}

const firstZone = new Zone(1)
firstZone.monsters = [getMonster("Slime"), ...firstZone.monsters.slice(1)]
const initialState: ZoneState = {
  // Progression zone data
  currentZoneLength: firstZone.zoneLength,
  currentZoneNumber: firstZone.zoneNumber,
  monsters: firstZone.monsters,
  nextStageIndex: 1,
  // Farming zone data
  isFarming: false,
  farmZone: null,
  farmZoneNumber: null,
  farmZoneLength: null,
  // Display logic
  zoneInFocus: 1,
}

// Todo: implement return to zone action
export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    incrementZoneNumber: (state) => {
      state.currentZoneNumber++
      state.zoneInFocus++
      const nextZone = new Zone(state.currentZoneNumber)
      state.monsters = nextZone.monsters
      state.nextStageIndex = 1
      console.log(state.monsters)
    },
    incrementStageNumber: (state) => {
      state.nextStageIndex++
    },
    setFarmZone(state, action: PayloadAction<number>) {
      const zoneNumber = state.currentZoneNumber - action.payload
      if (zoneNumber === state.farmZoneNumber || zoneNumber === state.currentZoneNumber) return
      const thisFarmZone = new Zone(zoneNumber, true)
      state.farmZoneNumber = zoneNumber
      state.zoneInFocus = zoneNumber
      state.farmZone = thisFarmZone.monsters
      state.isFarming = true
    },
    setMonsters(state, action: PayloadAction<EnemyState[]>) {
      state.monsters = action.payload
    },
    toggleFarming(state, action: PayloadAction<boolean>) {
      state.isFarming = !state.isFarming
    },
    setZoneLength(state, action: PayloadAction<number>) {
      state.currentZoneLength = action.payload
    },
  },
})

export const { incrementZoneNumber, incrementStageNumber, setFarmZone, setMonsters, setZoneLength } = zoneSlice.actions

export const selectZoneNumber = (state: RootState) => state.zone.currentZoneNumber
export const selectCurrentZoneLength = (state: RootState) => state.zone.currentZoneLength
export const selectZoneMonsters = (state: RootState) => state.zone.monsters
export const selectStage = (state: RootState) => state.zone.nextStageIndex
export const selectIsFarming = (state: RootState) => state.zone.isFarming
export const selectZoneInFocus = (state: RootState) => state.zone.zoneInFocus
export const selectFarmZoneNumber = (state: RootState) => state.zone.farmZoneNumber

export default zoneSlice.reducer
