import React from "react"
import { selectGold } from "../../../../redux/playerSlice"
import { useAppSelector } from "../../../../redux/hooks"

export default function Game() {
  const gold = useAppSelector(selectGold)

  function upgradeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.id)
  }

  return (
    <div className="flex flex-col basis-3/5 bg-gradient-to-b from-amber-300 to-amber-950">
      <div id="gold-cont" className="flex basis-1/6 relative">
        <div className="absolute flex items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="w-1/2 " src="/coin-icon.png" alt="gold coin" />
          <div className="text-3xl">{gold}</div>
        </div>
      </div>
      <div className="divide-y-2 divide-slate-500">
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div>Click Damage</div>
          <button
            id="click-damage"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={upgradeHandler}>
            Level up
          </button>
        </div>
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div>Placeholder</div>
          <button
            id="placeholder"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={upgradeHandler}>
            Placeholder
          </button>
        </div>
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div>Placeholder</div>
          <button
            id="placeholder"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={upgradeHandler}>
            Placeholder
          </button>
        </div>
      </div>
    </div>
  )
}
