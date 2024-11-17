import React from "react"
import clsx from "clsx/lite"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
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
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/click-icons"
import { playerCalc, UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { levelUpID, UpgradeId } from "../../../models/upgrades"
import UpgradePane from "./upgradePane"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()

  const gold = useAppSelector(selectGold)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickLevel = useAppSelector(selectClickLevel)
  const clickDamage = playerCalc.clickDamage(clickLevel, clickMultiUpgradeCount)
  const dotLevel = useAppSelector(selectDotLevel)
  const dotMultiUpgradeCount = useAppSelector(selectDotMultiUpgradeCount)
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
    const upgradeCount = upgradeId === "click-multi" ? clickMultiUpgradeCount : dotMultiUpgradeCount

    const cost = UPGRADE_CONFIG.calcMultiCost(upgradeId as UpgradeId, upgradeCount)

    // This logic should soon be made generic
    switch (upgradeId) {
      case "click-multi":
        if (gold >= cost && Number(purchasedUpgradeLevel) > clickMultiUpgradeCount) {
          dispatch(incrementClickMultiUpgradeCount())
          dispatch(decreaseGold(cost))
        }
        break
      case "dot-multi":
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
      <UpgradePane
        config={UPGRADE_CONFIG.click}
        damage={clickDamage}
        multiIcons={[ClickMultiIcon1(), ClickMultiIcon2(), ClickMultiIcon3()]}
        onUpgrade={handleUpgrade}
        onLevelUp={handleLevelUp}
      />
      <UpgradePane
        config={UPGRADE_CONFIG.dot}
        damage={dotDamage}
        multiIcons={[ClickMultiIcon1(), ClickMultiIcon2(), ClickMultiIcon3()]}
        onUpgrade={handleUpgrade}
        onLevelUp={handleLevelUp}
      />
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
