import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface statsState {
  clickCount: number;
  totalClickDamage: number;
  killCount: number;
  zonesCompleted: number;
  highestZoneEver: number;
}

const initialState: statsState = {
  clickCount: 0,
  totalClickDamage: 0,
  killCount: 0,
  zonesCompleted: 0,
  highestZoneEver: 0,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    incrementClickCount: (state) => {
      state.clickCount++;
    },
    increaseTotalClickDamage(state, action: PayloadAction<number>) {
      state.totalClickDamage += action.payload;
    },
    incrementKillCount: (state) => {
      state.killCount++;
    },
    incrementZonesCompleted: (state) => {
      state.zonesCompleted++;
    },
    incrementHighestZoneEver: (state) => {
      state.highestZoneEver++;
    },
  },
});

export const {
  incrementClickCount,
  increaseTotalClickDamage,
  incrementKillCount,
  incrementZonesCompleted,
  incrementHighestZoneEver,
} = statsSlice.actions;

export const selectClicks = (state: RootState) => state.stats.clickCount;
export const selecttotalClickDamage = (state: RootState) => state.stats.totalClickDamage;
export const selectKillCount = (state: RootState) => state.stats.killCount;
export const selectZonesCompleted = (state: RootState) => state.stats.zonesCompleted;
export const selectHighestZoneEver = (state: RootState) => state.stats.highestZoneEver;

export default statsSlice.reducer;
