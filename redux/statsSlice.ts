import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

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

export const selectCount = (state: RootState) => state.stats.clicks;

export default statsSlice.reducer;
