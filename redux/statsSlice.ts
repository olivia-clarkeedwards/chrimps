import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Root } from "react-dom/client";

interface statsState {
  clicks: number;
  totalClickDamage: number;
}

const initialState: statsState = {
  clicks: 0,
  totalClickDamage: 0,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    incrementClicks: (state) => {
      state.clicks++;
    },
    increaseTotalClickDamage(state, action: PayloadAction<number>) {
      state.clicks += action.payload;
    },
  },
});

export const { incrementClicks, increaseTotalClickDamage } = statsSlice.actions;

export const selectClicks = (state: RootState) => state.stats.clicks;
export const selecttotalClickDamage = (state: RootState) => state.stats.totalClickDamage;

export default statsSlice.reducer;
