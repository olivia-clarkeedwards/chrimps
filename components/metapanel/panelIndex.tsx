import React from "react"
import { selectGold } from "../../redux/playerSlice"
import { useAppSelector } from "../../redux/hooks"
import UpgradeIndex from "./upgrades/upgradeIndex"
import clsx from "clsx/lite"

export default function PanelIndex() {
  const gold = useAppSelector(selectGold)

  return (
    <div
      className={clsx(
        // Base
        "flex flex-col relative basis-5/12 md:basis-3/5 shadow-panel rounded-xl m-6 overflow-y-auto",
        // Mobile
        "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
        // Large
        "lg:bg-gradient-to-br lg:from-amber-400 lg:via-orange-500 lg:to-purple-950",
      )}>
      <div id="gold-cont" className="flex flex-col h-28 items-center relative">
        <div className="flex absolute items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="pl-20" src="/icons/coin.png" alt="gold coin" />
          <span className="text-3xl min-w-[9ch] text-left">{gold}</span>
        </div>
      </div>
      <UpgradeIndex />
    </div>
  )
}
