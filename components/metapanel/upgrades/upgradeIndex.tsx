import React from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  decreaseGold,
  incrementClickLevel,
  incrementClickMultiUpgradeCount,
  incrementDotMultiUpgradeCount,
  incrementDotLevel,
  selectCanAfford,
  selectClickDamage,
  selectDotDamage,
  selectClickLevelUpCost,
  selectDotLevelUpCost,
} from "../../../redux/playerSlice"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/clickIcons"
import { UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { LevelUpID } from "../../../models/upgrades"
import UpgradePane from "./upgradePane"
import Gold from "../gold"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()

  const clickDamage = useAppSelector(selectClickDamage)
  const dotDamage = useAppSelector(selectDotDamage)
  const clickLevelUpCost = useAppSelector(selectClickLevelUpCost)
  const dotLevelUpCost = useAppSelector(selectDotLevelUpCost)

  const LevelUp = {
    click: {
      cost: clickLevelUpCost,
      canAfford: useAppSelector(selectCanAfford(clickLevelUpCost)),
      action: incrementClickLevel(),
    },
    dot: {
      cost: dotLevelUpCost,
      canAfford: useAppSelector(selectCanAfford(dotLevelUpCost)),
      action: incrementDotLevel(),
    },
  }

  function onLevelup(e: React.MouseEvent<HTMLButtonElement>) {
    const levelUpId = e.currentTarget.id as LevelUpID

    const { cost, canAfford, action } = LevelUp[levelUpId]

    if (canAfford) {
      dispatch(action)
      dispatch(decreaseGold(cost))
    } else {
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
    <>
      <div id="gold-cont" className="flex flex-none flex-col h-28 items-center relative">
        <Gold />
      </div>
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
    </>
  )
}
