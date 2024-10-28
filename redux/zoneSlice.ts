import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { BaseZone } from "../models/zones";

interface ZoneState extends BaseZone {
  zoneNumber: 1;
}

const initialState = {
  zoneNumber: 1,
} as ZoneState;

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    incrementZoneNumber: (state) => {
      state.zoneNumber++;
    },
  },
});

export const { incrementZoneNumber } = zoneSlice.actions;

export const selectZoneNumber = (state: RootState) => state.zone.zoneNumber;

export default zoneSlice.reducer;
