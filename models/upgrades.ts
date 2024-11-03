import { PlayerState } from "./state"

export interface UpgradeCost {
  clickLevelUpCost: (currentLevel: number) => number
  clickMultiCosts: number[]
  calcMultiCost: (currentLevel: number) => number
}

export interface PlayerCalc {
  clickDamage: (clickBaseDamage: number, clickMulti: number) => number
}
