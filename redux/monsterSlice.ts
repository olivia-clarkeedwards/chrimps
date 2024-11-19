import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { getMonster, getRandomMonster } from "../gameconfig/monster"
import { EnemyState } from "../models/monsters"

interface EnemyThatDies extends EnemyState {
  alive: boolean
}

const initialState = { ...getMonster("Slime"), alive: true } as EnemyThatDies

export const monsterSlice = createSlice({
  name: "monster",
  initialState,
  reducers: {
    takeDamage(state, action: PayloadAction<number>) {
      state.health - action.payload < 1 ? (state.alive = false) : (state.health -= action.payload)
    },
    spawnMonster(state, action: PayloadAction<EnemyState>) {
      return { ...action.payload, alive: true }
    },
    monsterDied: (state) => {
      state.alive = false
    },
  },
})

export const { takeDamage, spawnMonster, monsterDied } = monsterSlice.actions

export const selectMonsterName = (state: RootState) => state.monster.name
export const selectMonsterLevel = (state: RootState) => state.monster.level
export const selectMonsterHealth = (state: RootState) => state.monster.health
export const selectMonsterGoldValue = (state: RootState) => state.monster.goldValue
export const selectMonsterAlive = (state: RootState) => state.monster.alive
export const selectMonsterImage = (state: RootState) => state.monster.image

export default monsterSlice.reducer
