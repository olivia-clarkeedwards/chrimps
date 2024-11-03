import { PlayerCalc, UpgradeCost } from "../models/upgrades"
import { useAppSelector } from "../redux/hooks"
import { PlayerState } from "../models/state"

export const upgradeCost: UpgradeCost = {
  clickLevelUpCost: (currentLevel: number) => Math.floor(Math.pow(1.1, currentLevel * 4) + 9),
  clickMultiCosts: [100, 400, 1000],
  calcMultiCost: function (currentLevel: number) {
    return this.clickMultiCosts[currentLevel - 1]
  },
}

export const playerCalc: PlayerCalc = {
  clickDamage: (clickBaseDamage, clickMulti) => clickBaseDamage * clickMulti,
}
