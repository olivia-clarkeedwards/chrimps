import { PlayerCalc, UpgradeConfig } from "../models/upgrades"

export const UPGRADE_CONFIG: UpgradeConfig = {
  click: {
    visibleAtZone: 1,
    elementId: "click-multi",
    costKey: "clickMultiCosts",
    costs: [100, 400, 1000],
    levelUpCost: (currentLevel) => {
      const base = 10
      const growthRate = 1.1
      return Math.floor(base * (1 + Math.log10(currentLevel)) * Math.pow(growthRate, currentLevel) - 1)
    },
  },
  dot: {
    visibleAtZone: 3,
    elementId: "dot-multi",
    costKey: "dotMultiCosts",
    costs: [5000, 10000, 25000],
    levelUpCost: (currentLevel) => {
      const base = 500
      const growthRate = 1.1
      return Math.floor(base * (1 + Math.log10(currentLevel + 1)) * Math.pow(growthRate, currentLevel))
    },
  },
  calcMultiCost: function (upgradeName, upgradeCount) {
    const costs = {
      "click-multi": this.click.costs,
      "dot-multi": this.dot.costs,
    }
    return costs[upgradeName][upgradeCount]
  },
}

export const playerCalc: PlayerCalc = {
  clickDamage: (clickLevel, clickMultiUpgradeCount) => clickLevel * Math.pow(2, clickMultiUpgradeCount),
  dotDamage: function (dotLevel, dotMultiUpgradeCount) {
    const damagePerSecond = dotLevel * Math.pow(2, dotMultiUpgradeCount)
    return damagePerSecond
  },
}
