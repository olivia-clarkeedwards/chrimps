import React from "react"
import clsx from "clsx/lite"
import { PrestigeUpgradeConfig, PrestigeUpgradeName } from "../../models/upgrades"

interface PrestigeBtnProps {
  config: PrestigeUpgradeConfig
  onPrestige: (e: React.MouseEvent<HTMLButtonElement>, cost: number, isAffordable: boolean) => void
  cost: number
  isAffordable: boolean
  purchaseCount: number
  hidden: boolean
}

export default function PrestigeButton({
  config,
  onPrestige,
  cost,
  isAffordable,
  purchaseCount,
  hidden,
}: PrestigeBtnProps) {
  if (hidden) return null

  return (
    <button
      id={config.id}
      onClick={(e) => onPrestige(e, cost, isAffordable)}
      className={clsx(
        "relative w-56 cursor-hand bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 border-2 border-pink-500 shadow-lg shadow-pink-500/20 transition-[background-color,box-shadow] duration-300 overflow-hidden group",
        "hover:bg-gray-900 hover:shadow-pink-500/40",
      )}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 
            group-hover:opacity-30 transition-opacity"
      />
      <span className="text-xl relative z-10">{config.title}</span>
    </button>
  )
}
