import React, { useState } from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import clsx from "clsx/lite"
import Currency from "./currency"
import { PlasmaIcon } from "../svg/resourceIcons"
import { selectPlasma } from "../../redux/playerSlice"
import { PrestigeUpgradeName } from "../../models/upgrades"

export default function Prestige() {
  const dispatch = useAppDispatch()
  const plasmaSelector = selectPlasma
  const plasma = useAppSelector(plasmaSelector)

  interface PrestigeState {
    cost: number
    purchaseCount: number
  }

  const [totalCost, setTotalCost] = useState(
    Object.fromEntries(
      UPGRADE_CONFIG.prestige.map((upgrade) => [
        upgrade.id,
        {
          cost: 0,
          purchaseCount: 0,
        },
      ]),
    ) as Record<PrestigeUpgradeName, PrestigeState>,
  )

  function onUpdatePurchase(e: React.MouseEvent<HTMLButtonElement>, cost: number, purchaseCount: number) {
    const purchasedUpgrade = e.currentTarget.id
    setTotalCost((previousCosts) => ({
      ...previousCosts,
      [purchasedUpgrade]: {
        cost: cost,
        purchaseCount: purchaseCount,
      },
    }))
    // dispatch an action to set a plasmaAfterPurchase state var to -= cost
    console.log(cost, purchaseCount)
  }

  function onPrestige() {
    // dispatch prestige action to set plasma -= plasmaAfterPurchase and reset the store
  }

  return (
    <>
      <Currency image={PlasmaIcon()} fontstyle="text-cyan-300" currencySelector={plasmaSelector} />
      <div className="flex font-sans gap-2">
        {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
          <PrestigeButton key={prestigeUpgrade.id} config={prestigeUpgrade} onClick={onUpdatePurchase} hidden={false} />
        ))}
      </div>
      <div className="flex w-full h-full items-end">
        <button onClick={onPrestige} className="w-24 h-8 bg-red-500 text-white font-sans font-extrabold text-4xl">
          Prestige
        </button>
      </div>
    </>
  )
}
