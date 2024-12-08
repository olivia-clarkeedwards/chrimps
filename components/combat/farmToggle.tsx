import React, { useEffect, useState } from "react"
import clsx from "clsx/lite"
import { FarmToggleIcon } from "../svg/metaIcons"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectIsFarming, selectZoneNumber, toggleFarming } from "../../redux/zoneSlice"

export default function FarmToggle() {
  const dispatch = useAppDispatch()
  const [hasTransitioned, setHasTransitioned] = useState(false)

  const isFarming = useAppSelector(selectIsFarming)
  const currentZone = useAppSelector(selectZoneNumber)

  function handleFarmToggle(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(toggleFarming())
  }

  useEffect(() => {
    if (!hasTransitioned) {
      if (currentZone > 4) {
        const timeout = setTimeout(() => {
          setHasTransitioned(true)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentZone])

  return (
    // Todo: migrate to tailwind 4.0 and use radial gradients for circular buttons
    <div className="absolute flex items-center justify-center w-10 h-10 right-2 top-1 bg-gradient-to-tr from-yellow-400/20 to-yellow-400 rounded-full">
      <div
        className={clsx(
          "w-8 h-8 -rotate-45 border border-2 border-[3px] rounded-full opacity-0",
          !hasTransitioned ? "transition-opacity duration-1000" : "transition-none",
          currentZone > 4 && "opacity-100",
          isFarming ? "fill-gray-700 border-gray-700 opacity-60" : "fill-white border-white",
        )}
        onClick={handleFarmToggle}>
        {FarmToggleIcon()}
      </div>
    </div>
  )
}
