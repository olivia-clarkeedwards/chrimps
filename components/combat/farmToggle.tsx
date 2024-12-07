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
    <div
      className={clsx(
        "absolute right-2 w-8 h-8 -rotate-45 border border-4 rounded-full opacity-0",
        !hasTransitioned ? "transition-opacity duration-1000" : "transition-none",
        currentZone > 4 && "opacity-100",
        isFarming ? "fill-gray-500 border-gray-500 opacity-60" : "fill-white border-white",
      )}
      onClick={handleFarmToggle}>
      {FarmToggleIcon()}
    </div>
  )
}
