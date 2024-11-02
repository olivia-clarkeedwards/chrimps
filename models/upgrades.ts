import { PlayerState } from "./state"

export interface UpgradeCost {
  clickLevelUpCost: (currentLevel: number) => number
  clickMultiCost: (currentLevel: number) => number
}

export interface PlayerCalc {
  clickDamage: (clickBaseDamage: number, clickMulti: number) => number
}
