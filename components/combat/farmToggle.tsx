import React, { useEffect, useState } from "react"
import clsx from "clsx/lite"
import { FarmToggleIcon } from "../svg/metaIcons"
import { useAppSelector } from "../../redux/hooks"
import { selectIsFarming, selectZoneNumber } from "../../redux/zoneSlice"

export default function FarmToggle() {
  const [hasTransitioned, setHasTransitioned] = useState(false)

  const isFarming = useAppSelector(selectIsFarming)
  const currentZone = useAppSelector(selectZoneNumber)

  useEffect(() => {
    if (!hasTransitioned) {
      if (currentZone > 4) {
        setTimeout(() => {
          setHasTransitioned(true)
        }, 1000)
      }
    }
  }, [currentZone, hasTransitioned])

  return (
    <div
      className={clsx(
        "absolute right-2 w-8 h-8 -rotate-45 border border-4 rounded-full opacity-0 ",
        currentZone > 4 && "transition-opacity duration-1000 opacity-100",
        isFarming ? "fill-gray-500 border-gray-500 opacity-60" : "fill-white border-white",
        hasTransitioned && "transition-none",
      )}>
      {FarmToggleIcon()}
    </div>
  )
}
