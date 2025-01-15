import { createAction } from "@reduxjs/toolkit"
import { PrestigeState, PrestigeUpgradeName } from "../../models/upgrades"

export const prestigeReset = createAction<Record<PrestigeUpgradeName, PrestigeState>>("prestige/reset")
