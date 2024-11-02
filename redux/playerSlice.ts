import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Root } from "react-dom/client"
import { PlayerState } from "../models/state"

const initialState: PlayerState = {
  clickBaseDamage: 1,
  clickLevel: 1,
  clickMulti: 1,
  gold: 100,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    increaseClickBaseDamage(state, action: PayloadAction<number>) {
      state.clickBaseDamage += action.payload
    },
    increaseGold(state, action: PayloadAction<number>) {
      state.gold += action.payload
    },
    decreaseGold(state, action: PayloadAction<number>) {
      state.gold -= action.payload
    },
    incrementClickLevel: (state) => {
      state.clickLevel++
    },
    incrementClickMulti: (state) => {
      state.clickMulti++
    },
  },
})

export const { increaseClickBaseDamage, increaseGold, decreaseGold, incrementClickLevel, incrementClickMulti } =
  playerSlice.actions

export const selectClickBaseDamage = (state: RootState) => state.player.clickBaseDamage
export const selectClickLevel = (state: RootState) => state.player.clickLevel
export const selectGold = (state: RootState) => state.player.gold
export const selectClickMulti = (state: RootState) => state.player.clickMulti

export default playerSlice.reducer
