import React from "react"
import {
  decreaseGold,
  incrementClickLevel,
  incrementClickMultiUpgradeCount,
  selectGold,
  selectClickLevel,
  selectClickMultiUpgradeCount,
  selectDotLevel,
  selectDotMultiUpgradeCount,
  incrementDotMultiUpgradeCount,
  incrementDotLevel,
} from "../../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks"
import { playerCalc, UPGRADE_CONFIG } from "../../../../../gameconfig/upgrades"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/click-icons"
import MultiplierUpgrade from "./multiplierUpgrade"
import clsx from "clsx/lite"
import { levelUpID, Upgrade, UpgradeConfig, UpgradeElement, UpgradeId } from "../../../../../models/upgrades"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()
  const gold = useAppSelector(selectGold)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickLevel = useAppSelector(selectClickLevel)
  const clickDamage = playerCalc.clickDamage(clickLevel, clickMultiUpgradeCount)
  const dotLevel = useAppSelector(selectDotLevel)
  const dotMultiUpgradeCount = useAppSelector(selectDotMultiUpgradeCount)
  // To be removed when levelup buttons are made into components
  const clickLevelUpCost = UPGRADE_CONFIG.click.levelUpCost(clickLevel)
  const dotLevelUpCost = UPGRADE_CONFIG.dot.levelUpCost(dotLevel)
  const canAffordClickLevelUp = gold >= clickLevelUpCost
  const canAffordDotLevelUp = gold >= dotLevelUpCost
  const LevelUpCosts = {
    click: {
      levelUpCost: clickLevelUpCost,
    },
    dot: {
      levelUpCost: dotLevelUpCost,
    },
  }

  function handleLevelUp(e: React.MouseEvent<HTMLButtonElement>) {
    const levelUpId = e.currentTarget.id as levelUpID

    const cost = LevelUpCosts[levelUpId].levelUpCost

    switch (levelUpId) {
      case "click":
        if (canAffordClickLevelUp) {
          dispatch(incrementClickLevel())
          dispatch(decreaseGold(cost))
        }
        break
      case "dot":
        if (canAffordDotLevelUp) {
          dispatch(incrementDotLevel())
          dispatch(decreaseGold(cost))
        }
        break
      default:
        throw new Error(`Unexpected levelup target ${levelUpId}`)
    }
  }

  function handleUpgrade(e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement>) {
    const [upgradeId, purchasedUpgradeLevel] = e.currentTarget.id.split(".")
    const upgradeCount = upgradeId === "clickMulti" ? clickMultiUpgradeCount : dotMultiUpgradeCount

    const cost = UPGRADE_CONFIG.calcMultiCost(upgradeId as UpgradeId, upgradeCount)

    // This logic should soon be made generic
    switch (upgradeId) {
      case "clickMulti":
        if (gold >= cost && Number(purchasedUpgradeLevel) > clickMultiUpgradeCount) {
          dispatch(incrementClickMultiUpgradeCount())
          dispatch(decreaseGold(cost))
        }
        break
      case "dotMulti":
        if (gold >= cost && Number(purchasedUpgradeLevel) > dotMultiUpgradeCount) {
          dispatch(incrementDotMultiUpgradeCount())
          dispatch(decreaseGold(cost))
        }
      default:
        throw new Error(`Unexpected upgrade target ${upgradeId}`)
    }
  }

  return (
    <div className="divide-y-2 divide-slate-500">
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div className="flex flex-col w-40 items-center">
          <div className="">Click Damage</div>
          <div className="self-center">{clickDamage}</div>
          <div className="flex gap-2.5 pt-1">
            <MultiplierUpgrade
              id="clickMulti.1"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon1()}
              hidden={clickLevel < 10}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 0}
            />
            <MultiplierUpgrade
              id="clickMulti.2"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon2()}
              hidden={clickMultiUpgradeCount < 1}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 1}
            />
            <MultiplierUpgrade
              id="clickMulti.3"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon3()}
              hidden={clickMultiUpgradeCount < 2}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 2}
            />
          </div>
        </div>
        <div className="border-4 border-amber-950 bg-amber-950">
          <button
            disabled={!canAffordClickLevelUp}
            id="click"
            className={clsx(
              // This buttons frame has a nice texture when disabled, need to find way to reproduce it when enabled
              // Base
              "flex flex-col items-center py-2 px-4 min-w-32 text-white font-bold",
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
            <span className="">
              <img className="w-[1.4rem] inline-block self-center" src="/icons/coin.png" alt="gold coin" />{" "}
              {clickLevelUpCost}
            </span>
          </button>
        </div>
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div className="flex flex-col w-40 items-center text-center">
          <div className="text-center">Damage over time</div>
          <div className="self-center">{}</div>
          <div className="flex gap-2.5 pt-1">
            <MultiplierUpgrade
              id="dotMulti.1"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon1()}
              hidden={dotLevel < 10}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 0}
            />
            <MultiplierUpgrade
              id="dotMulti.2"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon2()}
              hidden={dotMultiUpgradeCount < 1}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 1}
            />
            <MultiplierUpgrade
              id="dotMulti.3"
              onClick={handleUpgrade}
              Icon={ClickMultiIcon3()}
              hidden={dotMultiUpgradeCount < 2}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 2}
            />
          </div>
        </div>
        <div className="border-4 border-amber-950 bg-amber-950">
          <button
            disabled={!canAffordDotLevelUp}
            id="dot"
            className={clsx(
              // This buttons frame has a nice texture when disabled, need to find way to reproduce it when enabled
              // Base
              "flex flex-col items-center py-2 px-4 min-w-32 text-white font-bold",
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

              canAffordDotLevelUp ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700" : "bg-blue-950 border-amber-950",
            )}
            onClick={handleLevelUp}>
            <span>Level {dotLevel}</span>
            <span className="">
              <img className="w-[1.4rem] inline-block self-center" src="/icons/coin.png" alt="gold coin" />{" "}
              {dotLevelUpCost}
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
    </div>
  )
}
