import { PlayerState } from "./state"

export type UpgradeId = "clickMulti" | "dotMulti"
export type CostKey = "clickMultiCosts" | "dotMultiCosts"

export interface UpgradeElement {
  upgradeId: UpgradeId
  purchasedUpgradeLevel: string
}

export interface Upgrade {
  elementId: UpgradeId
  costKey: CostKey
  costs: number[]
  levelUpCost: (currentLevel: number) => number
}
export interface UpgradeConfig {
  click: Upgrade
  dot: Upgrade
  calcMultiCost: (upgradeName: UpgradeId, upgradeCount: number) => number
}

export interface PlayerCalc {
  clickDamage: (clickBaseDamage: number, clickMulti: number) => number
  dotDamage: (dotBaseDamage: number, dotMulti: number) => number
}
