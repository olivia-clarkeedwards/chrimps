import { UpgradeCost } from "../models/upgrades"

export const upgradeCost: UpgradeCost = {
  clickLevelUpCost: (currentLevel: number) => Math.floor(Math.pow(2, currentLevel) + 8),
}
