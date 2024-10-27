import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface statsState {
  clickCount: number;
  totalClickDamage: number;
}

const initialState: statsState = {
  clickCount: 0,
  totalClickDamage: 0,
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
  },
});

export const { incrementClickCount, increaseTotalClickDamage } = statsSlice.actions;

export const selectClicks = (state: RootState) => state.stats.clickCount;
export const selecttotalClickDamage = (state: RootState) => state.stats.totalClickDamage;

export default statsSlice.reducer;
