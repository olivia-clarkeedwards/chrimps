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
  farmZoneMonsters: null | EnemyState[]
  farmZoneNumber: number
  farmZoneLength: number
  farmStageIndex: number
  zoneInView: number
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
  farmZoneMonsters: null,
  farmZoneNumber: 1,
  farmZoneLength: 30,
  farmStageIndex: 1,
  // Display logic
  zoneInView: 1,
}

// Todo: implement return to zone action
export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    zoneComplete: (state) => {
      if (!state.isFarming) {
        state.currentZoneNumber++
        state.zoneInView++
        const nextZone = new Zone(state.currentZoneNumber)
        state.monsters = nextZone.monsters
        state.nextStageIndex = 1
        console.log(state.monsters)
      }
    },
    incrementStageNumber: (state) => {
      if (state.zoneInView === state.currentZoneNumber) {
        state.nextStageIndex++
      } else {
        state.farmStageIndex++
      }
    },
    zoneSelection(state, action: PayloadAction<number>) {
      const zoneNumber = state.currentZoneNumber - action.payload
      if (zoneNumber === state.zoneInView) return
      if (zoneNumber === state.currentZoneNumber) {
        state.zoneInView = zoneNumber
        return
      }
      const thisFarmZone = new Zone(zoneNumber, true)
      state.farmZoneNumber = zoneNumber
      state.farmStageIndex = 1
      state.zoneInView = zoneNumber
      state.farmZoneMonsters = thisFarmZone.monsters
      state.isFarming = true
    },
    refreshFarmZone: (state) => {
      const thisFarmZone = new Zone(state.farmZoneNumber)
      state.farmStageIndex = 1
      state.farmZoneMonsters = thisFarmZone.monsters
    },
    setMonsters(state, action: PayloadAction<EnemyState[]>) {
      state.monsters = action.payload
    },
    toggleFarming(state, action: PayloadAction<boolean>) {
      state.isFarming = !state.isFarming
      // if (state.isFarming === false) state.zoneInFocus = state.currentZoneNumber
    },
    setZoneLength(state, action: PayloadAction<number>) {
      state.currentZoneLength = action.payload
    },
  },
})

export const { zoneComplete, incrementStageNumber, zoneSelection, refreshFarmZone, setMonsters, setZoneLength } =
  zoneSlice.actions

export const selectZoneNumber = (state: RootState) => state.zone.currentZoneNumber
export const selectCurrentZoneLength = (state: RootState) => state.zone.currentZoneLength
export const selectZoneMonsters = (state: RootState) => state.zone.monsters
export const selectStage = (state: RootState) => state.zone.nextStageIndex
export const selectIsFarming = (state: RootState) => state.zone.isFarming
export const selectFarmZoneMonsters = (state: RootState) => state.zone.farmZoneMonsters
export const selectZoneInView = (state: RootState) => state.zone.zoneInView
export const selectFarmZoneNumber = (state: RootState) => state.zone.farmZoneNumber
export const selectFarmStage = (state: RootState) => state.zone.farmStageIndex

export default zoneSlice.reducer
