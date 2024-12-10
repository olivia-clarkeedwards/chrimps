import React from "react"
import { selectGold } from "../../redux/playerSlice"
import { useAppSelector } from "../../redux/hooks"
import UpgradeIndex from "./upgrades/upgradeIndex"
import clsx from "clsx/lite"

export default function Panel() {
  const gold = useAppSelector(selectGold)

  return (
    <div
      className={clsx(
        // Base
        "flex w-full max-w-2/3 flex-col p-4 rounded-xl relative flex-3/5 m-2 shadow-inner shadow-amber-600",
        // Mobile
        "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
        // Large
        "lg:bg-gradient-to-br lg:from-amber-400 lg:via-orange-500 lg:to-purple-950",
      )}>
      <div id="gold-cont" className="flex flex-col h-28 items-center justify-center relative">
        <div className="flex items-center gap-1">
          <img src="/icons/coin.png" alt="gold coin" />
          <span className="text-3xl text-left">{gold}</span>
        </div>
      </div>
      <UpgradeIndex />
    </div>
  )
}
