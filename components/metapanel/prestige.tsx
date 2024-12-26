import React from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import clsx from "clsx/lite"
import Currency from "./currency"
import { PlasmaIcon } from "../svg/resourceIcons"
import { selectPlasma, selectPrestigeState } from "../../redux/playerSlice"

export default function Prestige() {
  const dispatch = useAppDispatch()
  const plasmaSelector = selectPlasma
  function onPrestige(
    e: React.MouseEvent<HTMLButtonElement>,
    totalCost: number,
    upgradeCount: number,
    isAffordable: boolean,
  ) {
    console.log(e.currentTarget.id, totalCost, upgradeCount, isAffordable)
  }

  return (
    <>
      <Currency image={PlasmaIcon()} fontstyle="text-cyan-300" currencySelector={plasmaSelector} />
      <div className="flex font-sans gap-2">
        {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
          <PrestigeButton key={prestigeUpgrade.id} config={prestigeUpgrade} onClick={onPrestige} hidden={false} />
        ))}
      </div>
    </>
  )
}
