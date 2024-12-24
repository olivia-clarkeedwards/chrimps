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
  costKey: CostKey
  MultiCosts: number[]
  levelUpCost: (currentLevel: number) => number
}

export interface PrestigeUpgrade {
  id: "damage" | "health"
  basePrice: number
  additiveInc: number
  modifier: number
  tooltip: string
}
export interface UpgradeConfig {
  click: Upgrade
  dot: Upgrade
  prestige: PrestigeUpgrade[]
  calcMultiCost: (upgradeName: UpgradeId, upgradeCount: number) => number
  calcAdditiveCost: (atLevel: number, prestigeUpgrade: PrestigeUpgrade) => number
}

export interface PlayerCalc {
  clickDamage: (clickLevel: number, clickMulti: number, pDamageUpgradeCount: number) => number
  dotDamage: (dotLevel: number, dotMulti: number, pDamageUpgradeCount: number) => number
}

export type UpgradeKey = "click" | "dot"

export type UpgradeProps = {
  [key in UpgradeKey]: {
    level: number
    upgradeCount: number
    levelUpCost: number
  }
}
