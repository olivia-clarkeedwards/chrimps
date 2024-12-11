import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectZoneNumber } from "../../redux/zoneSlice"
import Healthbar from "./healthbar"
import Monster from "./monster"
import ZoneMap from "./zoneMap"
import ZoneSelector from "./zoneSelector"
import clsx from "clsx/lite"

export default function Combat() {
  const zone = useAppSelector(selectZoneNumber)

  const [shouldMount, setShouldMount] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (zone > 4 && !shouldMount) {
      setShouldMount(true)
      setTimeout(() => setFadeIn(true), 350)
    }
    return () => clearTimeout(timeoutId)
  }, [zone, shouldMount])

  return (
    <div
      className={`flex w-full lg:max-w-[40%] flex-col justify-center h-full p-8 rounded-3xl m-2 text-white 
        shadow-combat bg-gradient-to-br from-purple-500 via-purple-700 to-green-950`}>
      {zone > 4 && (
        <div className={clsx("flex basis-1/6 transition-opacity opacity-0 duration-1000", fadeIn && "opacity-100")}>
          <ZoneSelector />
        </div>
      )}
      <div className="basis-5/6 flex flex-col items-center relative">
        <Monster>
          <Healthbar />
        </Monster>
        <ZoneMap />
      </div>
    </div>
  )
}
