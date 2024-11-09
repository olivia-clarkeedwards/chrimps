import React, { useState } from "react"
import {
  decreaseGold,
  increaseClickBaseDamage,
  incrementClickLevel,
  incrementClickMulti,
  selectClickLevel,
  selectGold,
  selectClickBaseDamage,
  selectClickMultiUpgradeCount,
} from "../../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks"
import { playerCalc, upgradeCost } from "../../../../../gameconfig/upgrades"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/click-icons"
import MultiplierUpgrade from "./multiplierUpgrade"
import clsx from "clsx/lite"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()
  const gold = useAppSelector(selectGold)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickLevel = useAppSelector(selectClickLevel)
  const clickLevelUpCost = upgradeCost.clickLevelUpCost(clickLevel)
  const clickBaseDamage = useAppSelector(selectClickBaseDamage)
  const clickDamage = playerCalc.clickDamage(clickBaseDamage, clickMultiUpgradeCount)

  const canAffordClickLevelUp = gold >= clickLevelUpCost

  function handleLevelUp(e: React.MouseEvent<HTMLButtonElement>) {
    const upgradeName = e.currentTarget.id

    switch (upgradeName) {
      case "click-level":
        if (canAffordClickLevelUp) {
          dispatch(incrementClickLevel())
          dispatch(increaseClickBaseDamage(1))
          dispatch(decreaseGold(clickLevelUpCost))
        }
        break
      default:
        throw new Error("Unexpected levelup target")
    }
  }

  function handleUpgrade(e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement>) {
    const [upgradeName, purchasedUpgradeLevel] = e.currentTarget.id.split(".")
    const clickMultiCost = upgradeCost.calcMultiCost(clickMultiUpgradeCount)

    switch (upgradeName) {
      case "click-multi":
        if (gold >= clickMultiCost && Number(purchasedUpgradeLevel) > clickMultiUpgradeCount) {
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
          <div className="flex gap-2.5 pt-1">
            <MultiplierUpgrade
              id="click-multi.1"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon1()}
              hidden={clickLevel < 10}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMultiUpgradeCount)}
              isPurchased={clickMultiUpgradeCount > 0}
            />
            <MultiplierUpgrade
              id="click-multi.2"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon2()}
              hidden={clickMultiUpgradeCount < 1}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMultiUpgradeCount)}
              isPurchased={clickMultiUpgradeCount > 1}
            />
            <MultiplierUpgrade
              id="click-multi.3"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon3()}
              hidden={clickMultiUpgradeCount < 2}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMultiUpgradeCount)}
              isPurchased={clickMultiUpgradeCount > 2}
            />
          </div>
        </div>
        <div className="border-4 border-amber-950 bg-amber-950">
          <button
            disabled={!canAffordClickLevelUp}
            id="click-level"
            className={clsx(
              // This buttons frame has a nice texture when disabled, need to find way to reproduce it when enabled
              // Base
              "flex flex-col items-center py-1 px-4 min-w-28 text-white font-bold ",
              "border-2 border-amber-300",
              "transition-all duration-75",
              "shadow-[0_0_4px_0px_rgba(251,191,36,0.9),inset_0_0_4px_-1px_rgba(251,191,36,0.8)]",

              // Enabled
              "enabled:hover:border-amber-200",
              "enabled:hover:shadow-[0_0_6px_0px_rgba(251,191,36,1),inset_0_0_6px_-1px_rgba(251,191,36,0.9)]",

              // Pressed
              "enabled:active:translate-y-0.5",
              "enabled:active:shadow-[0_0_3px_0px_rgba(251,191,36,0.8),inset_0_0_8px_-1px_rgba(251,191,36,1)]",
              "enabled:active:border-amber-400",

              canAffordClickLevelUp
                ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                : "bg-blue-950 border-amber-950",
            )}
            onClick={handleLevelUp}>
            <span>Level {clickLevel}</span>
            <span>
              <img className="m-auto w-[1.4rem] inline-block self-center" src="/icons/coin.png" alt="gold coin" />{" "}
              {clickLevelUpCost}
            </span>
          </button>
        </div>
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
          onClick={handleLevelUp}>
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
          onClick={handleLevelUp}>
          Placeholder
        </button>
      </div>
    </div>
  )
}
