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
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/clickIcons"
import { playerCalc, UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { levelUpID, UpgradeId } from "../../../models/upgrades"
import UpgradePane from "./upgradePane"
import { selectZoneNumber } from "../../../redux/zoneSlice"

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
  const zone = useAppSelector(selectZoneNumber)

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
    <div>
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
    </div>
  )
}
