import React, { useState } from "react"
import { PrestigeUpgradeConfig, PrestigeUpgradeName } from "../../models/upgrades"
import { prestigeUpgradeMap } from "../../gameconfig/utils"
import { useAppSelector } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import { selectPCanAfford, selectPlasma } from "../../redux/playerSlice"
import clsx from "clsx/lite"

interface PrestigeBtnProps {
  config: PrestigeUpgradeConfig
  onClick: (e: React.MouseEvent<HTMLButtonElement>, cost: number, upgradeCount: number, isAffordable: boolean) => void
  hidden: boolean
}

export default function PrestigeButton({ config, onClick: onPrestige, hidden }: PrestigeBtnProps) {
  if (hidden) return null

  const thisUpgradeName = config.id
  const upgradeCount = useAppSelector(prestigeUpgradeMap[thisUpgradeName])

  const [toPurchase, setToPurchase] = useState(0)
  const [nextCost, setNextCost] = useState(UPGRADE_CONFIG.calcAdditiveCost(upgradeCount + 1, config))
  const [totalCost, setTotalCost] = useState(0)

  const plasma = useAppSelector(selectPlasma)
  const isAffordable = useAppSelector(selectPCanAfford(nextCost))

  function onSelectPrestigeUpgrade(
    e: React.MouseEvent<HTMLButtonElement>,
    upgradeCount: number,
    nextCost: number,
    toPurchase: number,
    isAffordable: boolean,
  ) {
    const tempUpgradeCount = upgradeCount + toPurchase + 1
    setTotalCost(nextCost + totalCost)
    setNextCost(UPGRADE_CONFIG.calcAdditiveCost(tempUpgradeCount + 1, config))
    setToPurchase(toPurchase + 1)
    onPrestige(e, totalCost, upgradeCount, isAffordable)
    console.log(
      `Cost: ${nextCost}, Total purchased: ${toPurchase}, Total cost: ${totalCost + nextCost}, Plasma: ${plasma}`,
    )
  }

  return (
    <button
      key={config.id}
      id={config.id}
      onClick={(e) => {
        onSelectPrestigeUpgrade(e, upgradeCount, nextCost, toPurchase, isAffordable)
      }}
      disabled={!isAffordable}
      className={clsx(
        "w-56 cursor-hand bg-cyan-800/50 text-cyan-300 py-4 px-6 rounded-lg flex items-center justify-center gap-2 border border-cyan-500 shadow-lg shadow-cyan-500/20 transition-all duration-300",
        "hover:bg-cyan-700/80 hover:shadow-cyan-500/40 disabled:bg-cyan-800/50 disabled:shadow-none disabled:text-gray-300/80 disabled:border-black",
      )}>
      <div className="relative flex flex-col items-center">
        <span className="text-xl font-extrabold"> {config.title}</span>
        <span>
          Level: {upgradeCount} {toPurchase > 0 && `(+${toPurchase})`}
        </span>
        <span>Price: {nextCost}</span>
      </div>
    </button>
  )
}

// <button
//   onClick={onPrestige}
//   className={clsx(
//     "w-56 cursor-hand bg-cyan-800/50 font-extrabold text-cyan-300 py-4 px-6 rounded-lg flex items-center justify-center gap-2 border border-cyan-500 shadow-lg shadow-cyan-500/20 transition-all duration-300",
//     "hover:bg-cyan-700/80 hover:shadow-cyan-500/40",
//   )}>
//   <div className="relative flex items-center gap-2">
//     <span className="text-xl">Damage</span>
//   </div>

{
  /* alt style
<button
      key={config.id}
      id={config.id}
      onClick={(e) => {
        setToPurchase(toPurchase + 1)
        onPrestige(e, cost, isAffordable)
      }}
      disabled={!isAffordable}
      className={clsx(
        "relative w-56 cursor-hand font-extrabold bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 border-2 border-pink-500 shadow-lg shadow-pink-500/20 transition-[background-color,box-shadow] duration-300 overflow-hidden group",
        "hover:bg-gray-900 hover:shadow-pink-500/40",
      )}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 
            group-hover:opacity-30 transition-opacity"
      />
      <span className="text-xl relative z-10">
        {config.title} {upgradeCount} {toPurchase && toPurchase}
      </span>
    </button> */
}
