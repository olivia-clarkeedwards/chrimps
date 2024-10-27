import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getRandomMonster } from "../gameconfig/monster";
import { Root } from "react-dom/client";
import { Enemy } from "../models/monsters";

const initialState = { ...getRandomMonster({ stageNumber: 1 }) } as Enemy;

export const monsterSlice = createSlice({
  name: "monster",
  initialState,
  reducers: {
    takeClickDamage(state, action: PayloadAction<number>) {
      state.health -= action.payload;
    },
    spawnMonster(state, action: PayloadAction<Enemy>) {
      return { ...action.payload };
    },
  },
});

export const { takeClickDamage, spawnMonster } = monsterSlice.actions;

export const selectMonsterName = (state: RootState) => state.monster.name;
export const selectMonsterLevel = (state: RootState) => state.monster.level;
export const selectMonsterHealth = (state: RootState) => state.monster.health;
export const selectMonsterImage = (state: RootState) => state.monster.image;

export default monsterSlice.reducer;
