import { UpgradeCost } from "../models/upgrades"

export const upgradeCost: UpgradeCost = {
  clickCost: (currentLevel: number) => Math.floor(Math.pow(2, currentLevel) + 8),
}
