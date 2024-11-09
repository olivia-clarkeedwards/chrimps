import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { getRandomMonster } from "../gameconfig/monster"
import { Root } from "react-dom/client"
import { Enemy } from "../models/monsters"

interface EnemyState extends Enemy {
  alive: boolean
}

const initialState = { ...getRandomMonster(), alive: true } as EnemyState

export const monsterSlice = createSlice({
  name: "monster",
  initialState,
  reducers: {
    takeClickDamage(state, action: PayloadAction<number>) {
      state.health - action.payload < 1 ? (state.alive = false) : (state.health -= action.payload)
    },
    spawnMonster(state, action: PayloadAction<EnemyState>) {
      return { ...action.payload }
    },
    monsterDied: (state) => {
      state.alive = false
    },
  },
})

export const { takeClickDamage, spawnMonster, monsterDied } = monsterSlice.actions

export const selectMonsterName = (state: RootState) => state.monster.name
export const selectMonsterLevel = (state: RootState) => state.monster.level
export const selectMonsterHealth = (state: RootState) => state.monster.health
export const selectMonsterGoldValue = (state: RootState) => state.monster.goldValue
export const selectMonsterAlive = (state: RootState) => state.monster.alive
export const selectMonsterImage = (state: RootState) => state.monster.image

export default monsterSlice.reducer
