import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "./store"
import { zoneComplete } from "./zoneSlice"
import { prestigeReset } from "./sharedActions"
import { selectDotDamage } from "./playerSlice"
import { ACHIEVEMENT_CONFIG } from "../gameconfig/achievements"

interface StatsState {
  clickCount: number
  totalClickDamage: number
  totalDotDamage: number
  killCount: number
  farmZonesCompleted: number
  totalZonesCompleted: number
  highestZoneEver: number
  prestigeCount: number
  achievementsUnlocked: string[]
  zoneTenCompleted: boolean
  highestZone: number
}

const initialState: StatsState = {
  clickCount: 0,
  totalClickDamage: 0,
  totalDotDamage: 0,
  killCount: 0,
  farmZonesCompleted: 0,
  totalZonesCompleted: 0,
  highestZoneEver: 1,
  prestigeCount: 0,
  achievementsUnlocked: [],

  // Milestones
  zoneTenCompleted: false,

  // This run data
  highestZone: 1,
}

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    unlockAchievement(state, action: PayloadAction<string>) {
      state.achievementsUnlocked.push(action.payload)
      console.log("Achievement unlocked", action.payload)
    },
    monsterClicked(state, action: PayloadAction<number>) {
      state.clickCount++
      state.totalClickDamage += action.payload
    },
    increaseTotalDotDamageDealt(state, action: PayloadAction<number>) {
      state.totalDotDamage += action.payload
    },
    incrementKillCount: (state) => {
      state.killCount++
    },
    incrementFarmZonesCompleted: (state) => {
      state.farmZonesCompleted++
    },
    zoneTenCompleted: (state) => {
      state.zoneTenCompleted = true
    },
  },
  extraReducers(builder) {
    builder.addCase(zoneComplete, (state) => {
      state.totalZonesCompleted++
      state.highestZone++
      if (state.highestZone > state.highestZoneEver) {
        state.highestZoneEver = state.highestZone
      }
    })
    builder.addCase(prestigeReset, (state) => {
      state.prestigeCount++
      state.highestZone = 1
    })
  },
})

export const {
  unlockAchievement,
  monsterClicked,
  increaseTotalDotDamageDealt,
  incrementKillCount,
  incrementFarmZonesCompleted,
  zoneTenCompleted,
} = statsSlice.actions

export const selectStatsState = createSelector([(state) => state.stats], (stats) => ({
  clickCount: stats.clickCount,
  totalClickDamageDealt: stats.totalClickDamage,
  totalDotDamageDealt: stats.totalDotDamage,
  killCount: stats.killCount,
  zonesCompleted: stats.zonesCompleted,
  totalZonesCompleted: stats.totalZonesCompleted,
  highestZoneEver: stats.highestZoneEver,
  highestZone: stats.highestZone,
}))

export const selectHighestZoneEver = (state: RootState) => state.stats.highestZoneEver
export const selectZoneTenComplete = createSelector(
  [(state: RootState) => state.stats.highestZone],
  (highestZone) => highestZone > 10,
)

export const updateDotDamage = (damage: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(increaseTotalDotDamageDealt(damage))

  const state = getState()
  const nextAchievement = ACHIEVEMENT_CONFIG.dot.damage.find(
    (achievement) => !state.stats.achievementsUnlocked.includes(achievement.id),
  )

  console.log(nextAchievement)
  if (nextAchievement && state.stats.totalDotDamage >= nextAchievement.condition) {
    dispatch(unlockAchievement(nextAchievement.id))
  }
}

export default statsSlice.reducer

// const checkDotAchievements = createAsyncThunk("stats/checkDot", async (_, { getState, dispatch }) => {
//   const state = getState() as RootState
//   const unlockedAchievements = state.stats.achievementsUnlocked
//   const currentDotDamage = selectDotDamage(state)
//   const totalDotDamage = state.stats.totalDotDamage

//   const valueMap = {
//     "dot-value": selectDotDamage(state),
//     "dot-damage": state.stats.totalDotDamage,
//   }

//   Object.entries(ACHIEVEMENT_CONFIG.dot).forEach(([category, achievements]) => {
//     console.log(category, achievements)
//     for (const achievement of achievements) {
//       console.log(achievement)
//       const [thisAchievementCategory] = achievement.id.split(".")
//       const value = valueMap[thisAchievementCategory as keyof typeof valueMap]

//       if (value >= achievement.condition && !state.stats.achievementsUnlocked.includes(achievement.id)) {
//         dispatch(unlockAchievement(achievement.id))
//       }
//     }
//   })
// })
