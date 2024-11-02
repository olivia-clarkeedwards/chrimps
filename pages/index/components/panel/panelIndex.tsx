import React from "react"
import { selectGold } from "../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import Upgrades from "./upgrades/upgrades"

export default function Panel() {
  const gold = useAppSelector(selectGold)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col basis-3/5 bg-gradient-to-b from-amber-300 to-amber-950">
      <div id="gold-cont" className="flex basis-1/6 relative">
        <div className="absolute flex items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="w-1/2 " src="/icons/coin.png" alt="gold coin" />
          <div className="text-3xl">{gold}</div>
        </div>
      </div>
      <Upgrades />
    </div>
  )
}
