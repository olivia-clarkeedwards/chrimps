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
  selectCanAfford,
} from "../../../redux/playerSlice"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/clickIcons"
import { playerCalc, UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { LevelUpID, UpgradeId } from "../../../models/upgrades"
import UpgradePane from "./upgradePane"
import { selectZoneState } from "../../../redux/zoneSlice"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()

  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickLevel = useAppSelector(selectClickLevel)
  const clickDamage = playerCalc.clickDamage(clickLevel, clickMultiUpgradeCount)
  const dotLevel = useAppSelector(selectDotLevel)
  const dotMultiUpgradeCount = useAppSelector(selectDotMultiUpgradeCount)
  const clickLevelUpCost = UPGRADE_CONFIG.click.levelUpCost(clickLevel)
  const dotLevelUpCost = UPGRADE_CONFIG.dot.levelUpCost(dotLevel)
  const dotDamage = playerCalc.dotDamage(dotLevel, dotMultiUpgradeCount)
  const { currentZoneNumber } = useAppSelector(selectZoneState)

  const canAffordClickLevelUp = useAppSelector(selectCanAfford(clickLevelUpCost))
  const canAffordDotLevelUp = useAppSelector(selectCanAfford(dotLevelUpCost))
  const LevelUpCosts = {
    click: {
      levelUpCost: clickLevelUpCost,
    },
    dot: {
      levelUpCost: dotLevelUpCost,
    },
  }

  function onLevelup(e: React.MouseEvent<HTMLButtonElement>) {
    const levelUpId = e.currentTarget.id as LevelUpID

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

  function onUpgrade(
    e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement>,
    hidden: boolean,
    cost: number,
    isAffordable: boolean,
  ) {
    const [upgradeId, purchasedUpgradeLevel] = e.currentTarget.id.split(".")
    const upgradeActions = {
      "click-multi": incrementClickMultiUpgradeCount(),
      "dot-multi": incrementDotMultiUpgradeCount(),
    }

    if (isAffordable && !hidden) {
      dispatch(upgradeActions[upgradeId as keyof typeof upgradeActions])
      dispatch(decreaseGold(cost))
    } else {
      throw new Error(`Unexpected upgrade target ${upgradeId}`)
    }
  }

  return (
    <div>
      <UpgradePane
        config={UPGRADE_CONFIG.click}
        damage={clickDamage}
        multiIcons={[ClickMultiIcon1(), ClickMultiIcon2(), ClickMultiIcon3()]}
        onUpgrade={onUpgrade}
        onLevelUp={onLevelup}
      />
      <UpgradePane
        config={UPGRADE_CONFIG.dot}
        damage={dotDamage}
        multiIcons={[ClickMultiIcon1(), ClickMultiIcon2(), ClickMultiIcon3()]}
        onUpgrade={onUpgrade}
        onLevelUp={onLevelup}
      />
    </div>
  )
}
