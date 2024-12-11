import React, { useEffect, useState } from "react"
import clsx from "clsx/lite"
import { useAppSelector } from "../../../redux/hooks"
import { selectCanAfford } from "../../../redux/playerSlice"
import MultiplierUpgrade from "./multiplierUpgrade"
import { UPGRADE_CONFIG } from "../../../gameconfig/upgrades"
import { Upgrade } from "../../../models/upgrades"
import { PlayerState } from "../../../models/player"
import LevelUpButton from "./levelUpButton"
import { selectZoneState } from "../../../redux/zoneSlice"

interface UpgradePaneProps {
  config: Upgrade
  damage: number
  multiIcons: JSX.Element[]
  onUpgrade: (e: React.MouseEvent<HTMLDivElement>, hidden: boolean, cost: number, isAffordable: boolean) => void
  onLevelUp: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function UpgradePane({ config, damage, multiIcons, onUpgrade, onLevelUp }: UpgradePaneProps) {
  const [upgradeName] = config.elementId.split("-")
  const thisLevelUp = `${upgradeName}Level` as keyof PlayerState
  const thisMultiUpgradeCount = `${upgradeName}MultiUpgradeCount` as keyof PlayerState

  const upgradeLevel = useAppSelector((state) => state.player[thisLevelUp])
  const multiUpgradeCount = useAppSelector((state) => state.player[thisMultiUpgradeCount])
  const levelUpCost = config.levelUpCost(upgradeLevel)
  const canAffordLevelUp = useAppSelector(selectCanAfford(levelUpCost))
  const canAffordMultiUpgrade = useAppSelector(
    selectCanAfford(UPGRADE_CONFIG.calcMultiCost(config.elementId, multiUpgradeCount)),
  )
  const { currentZoneNumber } = useAppSelector(selectZoneState)

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
        "flex w-full items-start justify-between align-start py-4 px-4 border-amber-950 transition-opacity duration-1000",
        upgradeName === "click" ? "border-y-2" : "border-b-2",
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
              id={`${upgradeName}-multi.${i + 1}`}
              onUpgrade={onUpgrade}
              icon={icon}
              hidden={i === 0 ? upgradeLevel < 10 : multiUpgradeCount < i}
              cost={UPGRADE_CONFIG.calcMultiCost(config.elementId, i)}
              isAffordable={canAffordMultiUpgrade}
              isPurchased={multiUpgradeCount > i}
            />
          ))}
        </div>
      </div>
      <LevelUpButton
        id={upgradeName}
        onClick={onLevelUp}
        currentLevel={upgradeLevel}
        levelUpCost={levelUpCost}
        isAffordable={canAffordLevelUp}
      />
    </div>
  )
}
