import React from "react"
import {
  decreaseGold,
  increaseClickBaseDamage,
  incrementClickLevel,
  incrementClickMulti,
  selectClickLevel,
  selectClickMulti,
  selectGold,
  selectClickBaseDamage,
} from "../../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks"
import { playerCalc, upgradeCost } from "../../../../../gameconfig/upgrades"
import clsx from "clsx/lite"

export default function Upgrades() {
  const dispatch = useAppDispatch()
  const gold = useAppSelector(selectGold)
  const clickMulti = useAppSelector(selectClickMulti)
  const clickLevel = useAppSelector(selectClickLevel)
  const clickLevelUpCost = upgradeCost.clickLevelUpCost(clickLevel)
  const clickBaseDamage = useAppSelector(selectClickBaseDamage)
  const clickDamage = playerCalc.clickDamage(clickBaseDamage, clickMulti)

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

  function upgradeHandler(e: React.MouseEvent<HTMLImageElement>) {
    const upgradeName = e.currentTarget.id
    const clickMultiCost = upgradeCost.clickMultiCost(clickMulti)

    switch (upgradeName) {
      case "click-multi":
        if (gold >= clickMultiCost) {
          dispatch(incrementClickMulti())
          dispatch(decreaseGold(clickMultiCost))
        }
        break
      default:
        throw new Error("Unexpected upgrade target")
    }
  }

  return (
    <div className="divide-y-2 divide-slate-500">
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div className="flex flex-col w-32 items-center">
          <div>Click Damage</div>
          <div className="self-center">{clickDamage}</div>
          <div className="flex">
            {clickLevel > 9 && ( // Add on hover mouse icon, add tooltip, add border styling & disabled state until clickLevel is 10
              <div className={clsx(gold < 200 && "opacity-30")}>
                <img id="click-multi" src="/icons/click-1.svg" onClick={upgradeHandler} />
              </div>
            )}
            <div className="self-start w-8">
              <img id="click-multi" src="/icons/click-2.svg" onClick={upgradeHandler} />
            </div>
            <div className="self-start w-8">
              <img id="click-multi" src="/icons/click-3.svg" onClick={upgradeHandler} />
            </div>
          </div>
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
        <div className="flex flex-col w-32 items-center">
          <div>Placeholder</div>
          <div className="self-center">dmg#</div>
          <div className="flex">icon</div>
        </div>
        <button
          id="placeholder"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={levelUpHandler}>
          Placeholder
        </button>
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div className="flex flex-col w-32 items-center">
          <div>Placeholder</div>
          <div className="self-center">dmg#</div>
          <div className="flex">icon</div>
        </div>
        <button
          id="placeholder"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={levelUpHandler}>
          Placeholder
        </button>
      </div>
    </div>
  )
}
