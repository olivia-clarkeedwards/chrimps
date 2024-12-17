import React, { useEffect, useState } from "react"
import { FarmToggleIcon } from "../svg/metaIcons"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCurrentZoneNumber, selectIsFarming, selectZoneState, toggleFarming } from "../../redux/zoneSlice"
import clsx from "clsx/lite"

export default function FarmToggle() {
  const dispatch = useAppDispatch()
  const [hasTransitioned, setHasTransitioned] = useState(false)

  const currentZoneNumber = useAppSelector(selectCurrentZoneNumber)
  const isFarming = useAppSelector(selectIsFarming)

  function handleFarmToggle(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(toggleFarming())
  }

  useEffect(() => {
    if (!hasTransitioned) {
      if (currentZoneNumber > 4) {
        const timeout = setTimeout(() => {
          setHasTransitioned(true)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentZoneNumber])

  return (
    <div className={clsx("w-10 h-10 z-10", isFarming && "bg-black")}>
      <div
        className={clsx(
          "absolute flex items-center justify-center w-full h-full right-2 top-1 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gold via-lightgold to-gold rounded-full opacity-0",
          !hasTransitioned ? "transition-opacity duration-1000" : "transition-none",
          currentZoneNumber > 4 && "opacity-100",
        )}>
        <div
          className={clsx(
            "w-8 h-8 -rotate-45 border border-2 border-[3px] rounded-full",
            isFarming ? "fill-gray-700 border-gray-700 opacity-60" : "fill-hpgreen border-gray-100",
          )}
          onClick={handleFarmToggle}>
          {FarmToggleIcon()}
        </div>
      </div>
    </div>
  )
}
