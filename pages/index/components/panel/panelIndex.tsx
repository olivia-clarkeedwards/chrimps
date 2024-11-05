import React from "react"
import { selectGold } from "../../../../redux/playerSlice"
import { useAppSelector } from "../../../../redux/hooks"
import UpgradeIndex from "./upgrades/upgradeIndex"

export default function Panel() {
  const gold = useAppSelector(selectGold)

  return (
    <div className="flex flex-col basis-3/5 min-h-[66svh] bg-gradient-to-b from-amber-300 to-amber-950">
      <div id="gold-cont" className="flex flex-col items-center basis-1/6 relative">
        <div className="flex absolute items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="pl-20" src="/icons/coin.png" alt="gold coin" />
          <span className="text-3xl min-w-[9ch] text-left">{gold}</span>
        </div>
      </div>
      <UpgradeIndex />
    </div>
  )
}
