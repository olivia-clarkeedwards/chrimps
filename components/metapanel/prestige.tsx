import React, { useEffect, useState } from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import clsx from "clsx/lite"
import Currency from "./currency"
import { PlasmaIcon } from "../svg/resourceIcons"
import { resetPlasmaSpent, selectPlasma, selectPlasmaSpent, spendPlasma } from "../../redux/playerSlice"
import { PrestigeUpgradeName } from "../../models/upgrades"
import { prestigeReset } from "../../redux/store"

export default function Prestige() {
  const dispatch = useAppDispatch()
  const plasmaSelector = selectPlasma
  const plasma = useAppSelector(plasmaSelector)
  const plasmaSpent = useAppSelector(selectPlasmaSpent)

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

  useEffect(() => {
    dispatch(resetPlasmaSpent())
  }, [])

  function onUpdatePurchase(e: React.MouseEvent<HTMLButtonElement>, cost: number, purchaseCount: number) {
    const purchasedUpgrade = e.currentTarget.id

    setTotalCost((previousCosts) => ({
      ...previousCosts,
      [purchasedUpgrade]: {
        cost: cost,
        purchaseCount: purchaseCount,
      },
    }))

    const newTotalCost = {
      ...totalCost,
      [purchasedUpgrade]: {
        cost: cost,
        purchaseCount: purchaseCount,
      },
    }
    const plasmaToSpend = Object.values(newTotalCost).reduce((acc, upgrade) => acc + upgrade.cost, 0)
    dispatch(spendPlasma(plasmaToSpend))
  }

  return (
    <div className="flex flex-col h-full">
      <Currency
        image={PlasmaIcon()}
        fontstyle="text-cyan-300"
        currencySelector={plasmaSelector}
        suffix={plasmaSpent > 0 ? `  (-${plasmaSpent})` : undefined}
      />
      <div className="flex font-sans gap-2">
        {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
          <PrestigeButton key={prestigeUpgrade.id} config={prestigeUpgrade} onClick={onUpdatePurchase} hidden={false} />
        ))}
      </div>
      <div className="flex grow h-full w-full items-end justify-center">
        <button
          onClick={() => dispatch(prestigeReset())}
          className="w-40 h-16 my-4 cursor-hand rounded-lg border-2 border-white bg-red-600 text-white font-sans font-extrabold text-2xl">
          Prestige
        </button>
      </div>
    </div>
  )
}
