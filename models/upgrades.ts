import { PlayerState } from "./state"

// const UPGRADE_CONFIG: Record<string, UpgradeInfo> = {
//   clickMulti: {
//     id: 'clickMulti',
//     costKey: 'clickMultiCosts',
//     getCount: selectClickMultiUpgradeCount,
//     incrementAction: incrementClickMultiUpgradeCount,
//   },
//   dotMulti: {
//     id: 'dotMulti',
//     costKey: 'dotMultiCosts',
//     getCount: selectDotMultiUpgradeCount,
//     incrementAction: incrementDotMultiUpgradeCount,
//   },
// }

export interface UpgradeCost {
  clickLevelUpCost: (currentLevel: number) => number
  clickMultiCosts: number[]
  dotLevelUpCost: (currentLevel: number) => number
  dotMultiCosts: number[]
  calcMultiCost: (upgradeName: "clickMultiCosts" | "dotMultiCosts", upgradeCount: number) => number
}

export interface PlayerCalc {
  clickDamage: (clickBaseDamage: number, clickMulti: number) => number
  dotDamage: (dotBaseDamage: number, dotMulti: number) => number
}
