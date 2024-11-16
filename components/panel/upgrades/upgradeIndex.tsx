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
} from "../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { playerCalc, UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/click-icons"
import MultiplierUpgrade from "./multiplierUpgrade"
import clsx from "clsx/lite"
import { levelUpID, Upgrade, UpgradeConfig, UpgradeElement, UpgradeId } from "../../../models/upgrades"
import LevelUpButton from "./levelUpButton"

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
  const dotDamage = playerCalc.dotDamage(dotLevel, dotMultiUpgradeCount)
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
        break
      default:
        throw new Error(`Unexpected upgrade target ${upgradeId}`)
    }
  }

  return (
    <div className="">
      <div className="flex w-full items-start justify-between align-start py-4 px-4 border-y-2 border-amber-950">
        <div className="flex flex-col w-40 items-center">
          <div className="">Click Damage</div>
          <div className="self-center">{clickDamage}</div>
          <div className="flex gap-2.5 pt-1">
            <MultiplierUpgrade
              id="clickMulti.1"
              onClick={handleUpgrade}
              icon={ClickMultiIcon1()}
              hidden={clickLevel < 10}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 0}
            />
            <MultiplierUpgrade
              id="clickMulti.2"
              onClick={handleUpgrade}
              icon={ClickMultiIcon2()}
              hidden={clickMultiUpgradeCount < 1}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 1}
            />
            <MultiplierUpgrade
              id="clickMulti.3"
              onClick={handleUpgrade}
              icon={ClickMultiIcon3()}
              hidden={clickMultiUpgradeCount < 2}
              isAffordable={
                gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.click.elementId, clickMultiUpgradeCount)
              }
              isPurchased={clickMultiUpgradeCount > 2}
            />
          </div>
        </div>
        <LevelUpButton
          id="click"
          onClick={handleLevelUp}
          currentLevel={clickLevel}
          levelUpCost={clickLevelUpCost}
          isAffordable={canAffordClickLevelUp}
        />
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4 border-b-2 border-amber-950">
        <div className="flex flex-col w-40 items-center text-center">
          <div className="text-center">Damage over time</div>
          <div className="self-center">{dotDamage}</div>
          <div className="flex gap-2.5 pt-1">
            <MultiplierUpgrade
              id="dotMulti.1"
              onClick={handleUpgrade}
              icon={ClickMultiIcon1()}
              hidden={dotLevel < 10}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 0}
            />
            <MultiplierUpgrade
              id="dotMulti.2"
              onClick={handleUpgrade}
              icon={ClickMultiIcon2()}
              hidden={dotMultiUpgradeCount < 1}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 1}
            />
            <MultiplierUpgrade
              id="dotMulti.3"
              onClick={handleUpgrade}
              icon={ClickMultiIcon3()}
              hidden={dotMultiUpgradeCount < 2}
              isAffordable={gold >= UPGRADE_CONFIG.calcMultiCost(UPGRADE_CONFIG.dot.elementId, dotMultiUpgradeCount)}
              isPurchased={dotMultiUpgradeCount > 2}
            />
          </div>
        </div>
        <LevelUpButton
          id="dot"
          onClick={handleLevelUp}
          currentLevel={dotLevel}
          levelUpCost={dotLevelUpCost}
          isAffordable={canAffordDotLevelUp}
        />
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4 border-b-2 border-amber-950">
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
