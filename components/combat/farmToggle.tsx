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
    <div
      className={clsx(
        "absolute flex items-center justify-center right-2 top-1 -rotate-45 rounded-full w-10 h-10 z-10 opacity-0 bg-gradient-to-tr",
        !hasTransitioned ? "transition-opacity duration-1000" : "transition-none",
        currentZoneNumber > 4 && "opacity-100",
        isFarming ? "from-yellow-500/30 via-orange-500/30 to-white/80" : " from-yellow-500 via-orange-500 to-white/80",
      )}>
      <div>
        <div
          className={clsx(
            "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gold via-lightgold to-white/50 rounded-full ",
          )}>
          <div
            className={clsx(
              "w-8 h-8 ",
              isFarming ? "fill-gray-700 border-gray-700 opacity-60" : "fill-orange-600 border-gray-100",
            )}
            onClick={handleFarmToggle}>
            {FarmToggleIcon()}
          </div>
        </div>
      </div>
    </div>
  )
}
