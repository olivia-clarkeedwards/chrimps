export type UpgradeId = "click-multi" | "dot-multi"
export type CostKey = "clickMultiCosts" | "dotMultiCosts"
export type LevelUpID = "click" | "dot"

export interface UpgradeElement {
  upgradeId: UpgradeId
  purchasedUpgradeLevel: string
}

export interface Upgrade {
  visibleAtZone: number
  elementId: UpgradeId
  costKey: CostKey
  MultiCosts: number[]
  levelUpCost: (currentLevel: number) => number
}
export interface UpgradeConfig {
  click: Upgrade
  dot: Upgrade
  calcMultiCost: (upgradeName: UpgradeId, upgradeCount: number) => number
}

export interface PlayerCalc {
  clickDamage: (clickLevel: number, clickMulti: number) => number
  dotDamage: (dotLevel: number, dotMulti: number) => number
}

export type UpgradeKey = "click" | "dot"

export type UpgradeProps = {
  [key in UpgradeKey]: {
    level: number
    upgradeCount: number
    levelUpCost: number
  }
}
