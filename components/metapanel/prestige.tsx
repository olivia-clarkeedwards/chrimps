import React from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import clsx from "clsx/lite"

export default function Prestige() {
  const dispatch = useAppDispatch()

  function onPrestige(e: React.MouseEvent<HTMLButtonElement>, totalCost: number, isAffordable: boolean) {
    console.log(e.currentTarget.id, totalCost, isAffordable)
  }

  return (
    <div className="flex font-sans">
      {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
        <PrestigeButton
          key={prestigeUpgrade.id}
          config={prestigeUpgrade}
          onClick={onPrestige}
          currentUpgradeCount={1}
          hidden={false}
        />
      ))}
    </div>
  )
}
