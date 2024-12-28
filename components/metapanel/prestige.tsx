import React, { useEffect, useState } from "react"
import PrestigeButton from "./prestigeButton"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { UPGRADE_CONFIG } from "../../gameconfig/upgrades"
import Currency from "./currency"
import { PlasmaIcon } from "../svg/resourceIcons"
import { resetPlasmaReserved, selectPlasma, selectPlasmaReserved, reservePlasma } from "../../redux/playerSlice"
import { PrestigeState, PrestigeUpgradeName } from "../../models/upgrades"
import clsx from "clsx/lite"
import { prestigeReset } from "../../redux/sharedActions"

export default function Prestige() {
  const dispatch = useAppDispatch()
  const plasmaSelector = selectPlasma
  const plasma = useAppSelector(plasmaSelector)
  const plasmaReserved = useAppSelector(selectPlasmaReserved)

  const [prestigePurchase, setPrestigePurchase] = useState(
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
    dispatch(resetPlasmaReserved())
  }, [])

  function onUpdatePurchase(e: React.MouseEvent<HTMLButtonElement>, cost: number, purchaseCount: number) {
    const purchasedUpgrade = e.currentTarget.id

    setPrestigePurchase((previousCosts) => ({
      ...previousCosts,
      [purchasedUpgrade]: {
        cost: cost,
        purchaseCount: purchaseCount,
      },
    }))

    const newTotalCost = {
      ...prestigePurchase,
      [purchasedUpgrade]: {
        cost: cost,
        purchaseCount: purchaseCount,
      },
    }
    const plasmaToReserve = Object.values(newTotalCost).reduce((acc, upgrade) => acc + upgrade.cost, 0)
    dispatch(reservePlasma(plasmaToReserve))
  }

  return (
    <div className="flex flex-col h-full">
      <Currency
        image={PlasmaIcon()}
        fontstyle="text-cyan-300"
        currencySelector={plasmaSelector}
        suffix={plasmaReserved > 0 ? `  (-${plasmaReserved})` : undefined}
      />
      <div className="flex font-sans gap-2">
        {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
          <PrestigeButton key={prestigeUpgrade.id} config={prestigeUpgrade} onClick={onUpdatePurchase} hidden={false} />
        ))}
      </div>
      <div className="flex grow gap-4 h-full w-full items-end justify-center">
        <button
          onClick={() => dispatch(prestigeReset(prestigePurchase))}
          className="w-40 h-16 my-4 cursor-hand rounded-lg border-2 border-white bg-red-600 text-white font-sans font-extrabold text-2xl">
          Prestige
        </button>
        <button
          onClick={() => dispatch(resetPlasmaReserved())}
          className="w-40 h-16 my-4 cursor-hand rounded-lg border-2 border-black bg-gray-700 text-white font-sans font-extrabold text-2xl">
          Reset
        </button>
      </div>
    </div>
  )
}
