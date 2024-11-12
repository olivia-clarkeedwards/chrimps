import { PlayerCalc, UpgradeCost } from "../models/upgrades"

export const upgradeCost: UpgradeCost = {
  clickLevelUpCost: (currentLevel) => Math.floor(Math.pow(1.1, currentLevel * 4) + 9),
  clickMultiCosts: [100, 400, 1000],
  calcMultiCost: function (upgradeName, upgradeCount) {
    return this[upgradeName][upgradeCount]
  },
  dotLevelUpCost: (currentLevel) => Math.floor(Math.pow(1.1, currentLevel * 4) + 500),
  dotMultiCosts: [5000, 10000, 25000],
}

export const playerCalc: PlayerCalc = {
  clickDamage: (clickBaseDamage, clickMultiUpgradeCount) => clickBaseDamage * Math.pow(2, clickMultiUpgradeCount),
  dotDamage: (dotBaseDamage, dotMultiUpgradeCount) => dotBaseDamage * Math.pow(2, dotMultiUpgradeCount),
}
