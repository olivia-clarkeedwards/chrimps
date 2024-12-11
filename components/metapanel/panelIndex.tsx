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
        "flex flex-col w-full max-w-[60%] p-4 rounded-3xl relative flex-3/5 m-2 shadow-panel",
        // Mobile
        // "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
        // // Large
        "lg:bg-gradient-to-br lg:from-orange-400 lg:via-orange-500 lg:to-purple-700",
      )}>
      <GoldCoinCounter gold={gold} />
      <UpgradeIndex />
    </div>
  )
}

type GoldCoinCounterProps = {
  gold: number
}

function GoldCoinCounter({ gold }: GoldCoinCounterProps) {
  return (
    <div id="gold-container" className="flex items-center justify-center mb-4">
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 hover:animate-bounce">
          <div className="absolute top-3 left-3 h-14 w-14 shadow-2xl shadow-black rounded-full" />
          <img src="/icons/coin.png" alt="gold coin" className="absolute top-0 left-0 h-full w-full" />
        </div>
        <span id="gold-count" className="text-3xl text-left">
          {gold}
        </span>
      </div>
    </div>
  )
}
