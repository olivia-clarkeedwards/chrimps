import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import {
  selectCanAfford,
  selectClickLevelUpCost,
  selectDotLevelUpCost,
  selectPlayerState,
} from "../../../redux/playerSlice"
import MultiplierUpgrade from "./multiplierUpgrade"
import { UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { Upgrade, UpgradeKey, UpgradeProps } from "../../../models/upgrades"
import LevelUpButton from "./levelUpButton"
import { selectCurrentZoneNumber } from "../../../redux/zoneSlice"
import clsx from "clsx/lite"

interface UpgradePaneProps {
  config: Upgrade
  damage: number
  multiIcons: JSX.Element[]
  onUpgrade: (e: React.MouseEvent<HTMLDivElement>, hidden: boolean, cost: number, isAffordable: boolean) => void
  onLevelUp: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function UpgradePane({ config, damage, multiIcons, onUpgrade, onLevelUp }: UpgradePaneProps) {
  const [upgradeName] = config.elementId.split("-")
  const thisUpgradeName = upgradeName as UpgradeKey

  const { clickLevel, clickMultiUpgradeCount, dotLevel, dotMultiUpgradeCount } = useAppSelector(selectPlayerState)

  const upgradeProps: UpgradeProps = {
    click: {
      level: clickLevel,
      upgradeCount: clickMultiUpgradeCount,
      levelUpCost: useAppSelector(selectClickLevelUpCost),
    },
    dot: {
      level: dotLevel,
      upgradeCount: dotMultiUpgradeCount,
      levelUpCost: useAppSelector(selectDotLevelUpCost),
    },
  }
  const thisUpgradeProps = upgradeProps[thisUpgradeName]

  const canAffordLevelUp = useAppSelector(selectCanAfford(thisUpgradeProps.levelUpCost))
  const canAffordMultiUpgrade = useAppSelector(
    selectCanAfford(UPGRADE_CONFIG.calcMultiCost(config.elementId, thisUpgradeProps.upgradeCount)),
  )

  const currentZoneNumber = useAppSelector(selectCurrentZoneNumber)

  const [shouldMount, setShouldMount] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const isNotClick = upgradeName !== "click"

  useEffect(() => {
    if (currentZoneNumber >= config.visibleAtZone && !shouldMount) {
      setShouldMount(true)
      const timeout = setTimeout(() => setIsVisible(true), 350)
      return () => clearTimeout(timeout)
    }
  }, [currentZoneNumber, config.visibleAtZone])

  if (!shouldMount && isNotClick) return null

  return (
    <div
      className={clsx(
        `flex w-full items-start justify-between align-start py-4 px-4
        bg-gradient-to-br shadow-upgrade rounded-lg bg-nm bg-orange-400 from-orange-400  to-orange-800/70 transition-opacity duration-1000`,
        // upgradeName === "click" ? "border-y-2" : "border-b-2",
        isVisible && isNotClick && "opacity-100",
        !isVisible && isNotClick && "opacity-0",
      )}>
      <div className="flex flex-col w-40 items-center">
        <div className="">{`${upgradeName[0].toUpperCase()}${upgradeName.substring(1)} Damage`}</div>
        <div className="self-center">{damage}</div>
        <div className="flex gap-2.5 pt-1">
          {multiIcons.map((icon, i) => (
            <MultiplierUpgrade
              key={upgradeName + i}
              id={`${config.elementId}.${i + 1}`}
              onClick={onUpgrade}
              icon={icon}
              hidden={i === 0 ? thisUpgradeProps.level < 10 : thisUpgradeProps.upgradeCount < i}
              cost={thisUpgradeProps.levelUpCost}
              isAffordable={canAffordMultiUpgrade}
              isPurchased={thisUpgradeProps.upgradeCount > i}
            />
          ))}
        </div>
      </div>
      <LevelUpButton
        id={upgradeName}
        onClick={onLevelUp}
        currentLevel={thisUpgradeProps.level}
        levelUpCost={thisUpgradeProps.levelUpCost}
        isAffordable={canAffordLevelUp}
      />
    </div>
  )
}
