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
import ReactModal from "react-modal"

export default function Prestige() {
  const dispatch = useAppDispatch()
  const plasmaSelector = selectPlasma
  const plasma = useAppSelector(plasmaSelector)
  const plasmaReserved = useAppSelector(selectPlasmaReserved)

  const [confirmPrestige, setConfirmPrestige] = useState(false)
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
  ReactModal.defaultStyles.content = {
    ...ReactModal.defaultStyles.content,
    cursor: "url(/icons/hand.png) 0 0, pointer",
    zIndex: 1000,
    top: "10%",
    right: "10%",
    bottom: "10%",
    left: "10%",
  }
  ReactModal.defaultStyles.overlay = {
    ...ReactModal.defaultStyles.overlay,
    cursor: "url(/icons/hand.png) 0 0, pointer",
    zIndex: 1000,
  }

  return (
    <div className="flex flex-col h-full">
      <Currency
        image={PlasmaIcon()}
        fontstyle="text-cyan-300"
        currencySelector={plasmaSelector}
        suffix={plasmaReserved > 0 ? `  (-${plasmaReserved})` : undefined}
      />
      <div className="flex mx-2 font-sans gap-2">
        {UPGRADE_CONFIG.prestige.map((prestigeUpgrade) => (
          <PrestigeButton key={prestigeUpgrade.id} config={prestigeUpgrade} onClick={onUpdatePurchase} hidden={false} />
        ))}
      </div>
      <div className="flex grow gap-4 h-full w-full items-end justify-center">
        <ReactModal
          isOpen={confirmPrestige}
          onRequestClose={() => setConfirmPrestige(false)}
          // className={"cursor-hand"}
          // overlayClassName={""}

          contentLabel="Prestige confirmation prompt">
          <div className="flex h-full">
            <button
              onClick={() => dispatch(prestigeReset(prestigePurchase))}
              className="w-40 h-16 my-4 self-end cursor-hand rounded-lg border-2 border-white bg-red-600 text-white font-sans font-bold text-2xl">
              Confirm
            </button>
          </div>
        </ReactModal>
        <button
          onClick={() => setConfirmPrestige(true)}
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

// Default modal styles:
// style={{
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.75)'
//   },
//   content: {
//     position: 'absolute',
//     top: '40px',
//     left: '40px',
//     right: '40px',
//     bottom: '40px',
//     border: '1px solid #ccc',
//     background: '#fff',
//     overflow: 'auto',
//     WebkitOverflowScrolling: 'touch',
//     borderRadius: '4px',
//     outline: 'none',
//     padding: '20px'
//   }
// }}
