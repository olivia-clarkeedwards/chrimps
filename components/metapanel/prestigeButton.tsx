import React, { useState } from "react"
import clsx from "clsx/lite"
import { PrestigeUpgradeConfig, PrestigeUpgradeName } from "../../models/upgrades"
import { prestigeUpgradeMap } from "../../gameconfig/utils"
import { useAppSelector } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import { selectPrestigeState } from "../../redux/playerSlice"

interface PrestigeBtnProps {
  config: PrestigeUpgradeConfig
  onClick: (e: React.MouseEvent<HTMLButtonElement>, cost: number, isAffordable: boolean) => void
  currentUpgradeCount: number
  hidden: boolean
}

export default function PrestigeButton({ config, onClick: onPrestige, currentUpgradeCount, hidden }: PrestigeBtnProps) {
  if (hidden) return null

  const [toPurchase, setToPurchase] = useState(0)

  const thisUpgradeName = config.id
  const upgradeCount = useAppSelector(prestigeUpgradeMap[thisUpgradeName])
  const { plasma } = useAppSelector(selectPrestigeState)
  const cost = UPGRADE_CONFIG.calcAdditiveCost(toPurchase, config)
  const isAffordable = plasma >= cost

  console.log(
    `Upgrade: ${thisUpgradeName}, Count: ${upgradeCount}, Cost: ${cost}, Current Plasma: ${plasma}, Affordable: ${isAffordable} `,
  )
  return (
    <button
      key={config.id}
      id={config.id}
      onClick={(e) => {
        setToPurchase(toPurchase + 1)
        onPrestige(e, cost, isAffordable)
      }}
      disabled={!isAffordable}
      className={clsx(
        "relative w-56 cursor-hand bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 border-2 border-pink-500 shadow-lg shadow-pink-500/20 transition-[background-color,box-shadow] duration-300 overflow-hidden group",
        "hover:bg-gray-900 hover:shadow-pink-500/40",
      )}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 
            group-hover:opacity-30 transition-opacity"
      />
      <span className="text-xl relative z-10">
        {config.title} {upgradeCount} {toPurchase && toPurchase}
      </span>
    </button>
  )
}

// alt style
// <button
// onClick={onPrestige}
// className={clsx(
//   "relative w-56 font-extrabold cursor-hand bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 border-2 border-pink-500 shadow-lg shadow-pink-500/20 transition-all duration-300 overflow-hidden group",
//   "hover:bg-gray-900 hover:shadow-pink-500/40",
// )}>
// <div
//   className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20
// group-hover:opacity-30 transition-opacity"
// />
// <span className="text-xl relative z-10">Neural Upgrade</span>
// </button>
