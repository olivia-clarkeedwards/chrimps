export type UpgradeId = "click-multi" | "dot-multi"
export type UpgradeIdWithLevel =
  | "click-multi.1"
  | "click-multi.2"
  | "click-multi.3"
  | "dot-multi.1"
  | "dot-multi.2"
  | "dot-multi.3"
export type CostKey = "clickMultiCosts" | "dotMultiCosts"
export type LevelUpID = "click" | "dot"

export interface UpgradeElement {
  upgradeId: UpgradeId
  purchasedUpgradeLevel: string
}

export interface Upgrade {
  visibleAtZone: number
  elementId: UpgradeId
  displayName: string
  MultiCosts: number[]
  levelUpCost: (currentLevel: number) => number
}

export type PrestigeUpgradeName = "damage" | "health"

export interface PrestigeUpgradeConfig {
  id: PrestigeUpgradeName
  title: string
  description: string
  basePrice: number
  additiveInc: number
  modifier: number
  unlocked: boolean
  tooltip: string
}

export interface PrestigeState {
  cost: number
  purchaseCount: number
}
export interface UpgradeConfig {
  click: Upgrade
  dot: Upgrade
  prestige: PrestigeUpgradeConfig[]
  calcMultiCost: (upgradeName: UpgradeId, upgradeCount: number) => number
  calcAdditiveCost: (atLevel: number, prestigeUpgrade: PrestigeUpgradeConfig) => number
}

export interface PlayerCalc {
  clickDamage: (clickLevel: number, clickMulti: number, pDamage: number, achievementModifier: number) => number
  dotDamage: (dotLevel: number, dotMulti: number, pDamage: number, achievementModifier: number) => number
}

export type UpgradeKey = "click" | "dot"

export type UpgradeProps = {
  [key in UpgradeKey]: {
    level: number
    upgradeCount: number
    levelUpCost: number
  }
}
