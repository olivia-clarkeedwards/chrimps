import React from "react"
import {
  decreaseGold,
  increaseClickBaseDamage,
  incrementClickLevel,
  selectClickLevel,
  selectGold,
} from "../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { upgradeCost } from "../../../../gameconfig/upgrades"

export default function Game() {
  const gold = useAppSelector(selectGold)
  const clickLevel = useAppSelector(selectClickLevel)
  const dispatch = useAppDispatch()

  const clickLevelUpCost = upgradeCost.clickLevelUpCost(clickLevel)

  function levelUpHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const upgradeName = e.currentTarget.id
    switch (upgradeName) {
      case "click-level":
        if (gold >= clickLevelUpCost) {
          dispatch(incrementClickLevel())
          dispatch(increaseClickBaseDamage(1))
          dispatch(decreaseGold(clickLevelUpCost))
        } else {
          // dispatch stat for secret achievement for trying to purchase it too many times?
        }
        break
      default:
        throw new Error("Unexpected levelup target")
    }
  }

  function upgradeHandler(e: React.MouseEvent<HTMLDivElement>) {
    console.log("upgrade")
  }

  return (
    <div className="flex flex-col basis-3/5 bg-gradient-to-b from-amber-300 to-amber-950">
      <div id="gold-cont" className="flex basis-1/6 relative">
        <div className="absolute flex items-center gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="w-1/2 " src="/icons/coin.png" alt="gold coin" />
          <div className="text-3xl">{gold}</div>
        </div>
      </div>
      {/* Upgrades elements need to be pulled out into their own components, this is stanky already */}
      <div className="divide-y-2 divide-slate-500">
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div className="flex flex-col items-center">
            <div>Click Damage</div>
            <div>{clickLevel}</div>
            {clickLevel > 3 && ( // Add on hover mouse icon, add tooltip, add border styling & disabled state until clickLevel is 10
              <div className="self-start w-8">
                <img id="click-upgrade" src="/icons/click.svg" onClick={upgradeHandler} />
              </div>
            )}
          </div>
          {/* Add disabled state for these buttons too */}
          <button
            id="click-level"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={levelUpHandler}>
            Level up {clickLevelUpCost}
          </button>
        </div>
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div>Placeholder</div>
          <button
            id="placeholder"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={levelUpHandler}>
            Placeholder
          </button>
        </div>
        <div className="flex w-full items-start justify-between align-start py-4 px-4">
          <div>Placeholder</div>
          <button
            id="placeholder"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={levelUpHandler}>
            Placeholder
          </button>
        </div>
      </div>
    </div>
  )
}
