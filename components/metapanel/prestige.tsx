import clsx from "clsx"
import React from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"

export default function Prestige() {
  const dispatch = useAppDispatch()

  function onPrestige(e: React.MouseEvent<HTMLButtonElement>, cost: number, isAffordable: boolean) {
    console.log(e.currentTarget.id, cost, isAffordable)
  }

  return (
    <div className="flex font-sans">
      {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
        <PrestigeButton config={prestigeUpgrade} onClick={onPrestige} currentUpgradeCount={1} hidden={false} />
      ))}
    </div>
  )
}
