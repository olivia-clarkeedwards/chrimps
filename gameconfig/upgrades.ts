import { PlayerCalc, UpgradeCost } from "../models/upgrades"
import { useAppSelector } from "../redux/hooks"
import { PlayerState } from "../models/state"

export const upgradeCost: UpgradeCost = {
  clickLevelUpCost: (currentLevel: number) => Math.floor(Math.pow(2, currentLevel) + 8),
  clickMultiCost: function (currentLevel: number) {
    const clickMultiCost = [100, 400, 1000]
    return clickMultiCost[currentLevel - 1]
  },
}

export const playerCalc: PlayerCalc = {
  clickDamage: ({ clickBaseDamage, clickMulti }: PlayerState) => clickBaseDamage * clickMulti,
}
