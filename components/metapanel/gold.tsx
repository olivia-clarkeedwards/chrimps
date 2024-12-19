import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectGold } from "../../redux/playerSlice"

export default function Gold() {
  const gold = useAppSelector(selectGold)

  return (
    <div id="gold-cont" className="flex flex-col h-28 items-center relative">
      <div className="flex absolute items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img className="pl-20" src="/icons/coin.png" alt="gold coin" />
        <span className="text-3xl min-w-[9ch] text-left">{gold}</span>
      </div>
    </div>
  )
}
