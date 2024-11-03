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
  selectClickMultiUpgradeCount,
} from "../../../../../redux/playerSlice"
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks"
import { playerCalc, upgradeCost } from "../../../../../gameconfig/upgrades"
import { ClickMultiIcon1, ClickMultiIcon2, ClickMultiIcon3 } from "../../svg/click-icons"
import clsx from "clsx/lite"

export default function UpgradeIndex() {
  const dispatch = useAppDispatch()
  const gold = useAppSelector(selectGold)
  const clickMulti = useAppSelector(selectClickMulti)
  const clickMultiUpgrades = useAppSelector(selectClickMultiUpgradeCount)
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

  function upgradeHandler(e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement>) {
    const upgradeName = e.currentTarget.id
    const clickMultiCost = upgradeCost.calcMultiCost(clickMulti)

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

  interface UpgradeComponentProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
    Icon: JSX.Element
    isAffordable: boolean
    isPurchased: boolean
    hidden: boolean
  }

  const DisplayClickUpgrades = ({ onClick, Icon, hidden, isAffordable, isPurchased }: UpgradeComponentProps) => {
    return (
      <div
        id="click-multi"
        className={clsx(
          "relative cursor-pointer ring-2 ring-offset-2 rounded-lg ring-amber-800",
          hidden && "hidden",
          isPurchased || !isAffordable ? "ring-offset-yellow-700" : "ring-offset-yellow-300",
          !isPurchased && !isAffordable && "ring-offset-yellow-600 opacity-60",
        )}
        onClick={onClick}>
        <div
          className={clsx(
            "absolute",
            "inset-0",
            "bg-gradient-to-br",
            "from-amber-600",
            "to-amber-800",
            "rounded-lg",
            isAffordable && !isPurchased ? "opacity-100" : "opacity-30",
          )}
        />
        {isPurchased && <div className="absolute inset-[2px] bg-amber-950/60 rounded-md z-10" />}
        <div className="relative z-20 w-8 h-8 flex items-center justify-center p-1 text-amber-400">{Icon}</div>
      </div>
    )
  }

  return (
    <div className="divide-y-2 divide-slate-500">
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div className="flex flex-col w-32 items-center">
          <div>Click Damage</div>
          <div className="self-center">{clickDamage}</div>
          <div className="flex gap-2.5 pt-1">
            <DisplayClickUpgrades
              onClick={upgradeHandler}
              Icon={ClickMultiIcon1()}
              hidden={clickLevel < 10}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMulti)}
              isPurchased={clickMultiUpgrades > 0}
            />
            <DisplayClickUpgrades
              onClick={upgradeHandler}
              Icon={ClickMultiIcon2()}
              hidden={clickMultiUpgrades < 1}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMulti)}
              isPurchased={clickMultiUpgrades > 1}
            />
            <DisplayClickUpgrades
              onClick={upgradeHandler}
              Icon={ClickMultiIcon3()}
              hidden={clickMultiUpgrades < 2}
              isAffordable={gold >= upgradeCost.calcMultiCost(clickMulti)}
              isPurchased={clickMultiUpgrades > 2}
            />
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
