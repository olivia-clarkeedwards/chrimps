import { PlayerCalc, UpgradeCost } from "../models/upgrades"

export const upgradeCost: UpgradeCost = {
  clickLevelUpCost: (currentLevel: number) => Math.floor(Math.pow(1.1, currentLevel * 4) + 9),
  clickMultiCosts: [100, 400, 1000],
  calcMultiCost: function (upgradeCount: number) {
    return this.clickMultiCosts[upgradeCount]
  },
}

export const playerCalc: PlayerCalc = {
  clickDamage: (clickBaseDamage, clickMulti) => clickBaseDamage * clickMulti,
}
