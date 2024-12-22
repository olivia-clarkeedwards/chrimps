import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCurrentZoneNumber, selectZoneState } from "../../redux/zoneSlice"
import Healthbar from "./healthbar"
import Monster from "./monster"
import ZoneMap from "./zoneMap"
import ZoneSelector from "./zoneSelector"
import clsx from "clsx/lite"
import { setDebugState } from "../../redux/playerSlice"
import { CookieEnjoyerIcon } from "../svg/stageIcons"
import FarmToggle from "./farmToggle"

export default function CombatIndex() {
  const dispatch = useAppDispatch()
  const currentZoneNumber = useAppSelector(selectCurrentZoneNumber)

  function debug() {
    dispatch(setDebugState())
  }

  const [shouldMount, setShouldMount] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (currentZoneNumber > 4 && !shouldMount) {
      setShouldMount(true)
      const timeout = setTimeout(() => setFadeIn(true), 350)
      return () => clearTimeout(timeout)
    }
  }, [currentZoneNumber])

  return (
    <div className="flex flex-col justify-center min-h-[99svh] md:min-h-[89svh] lg:-ml-6 basis-7/12 md:basis-2/5 text-white min-h-0 overflow-y-auto">
      {currentZoneNumber > 4 && (
        <div
          className={clsx(
            "flex basis-1/6 justify-center transition-opacity opacity-0 duration-1000",
            fadeIn && "opacity-100",
          )}>
          <ZoneSelector />
        </div>
      )}
      <div className="basis-5/6 flex flex-col items-center relative overflow-y-auto">
        <div className="absolute top-0 left-0 w-7 h-7 z-20 opacity-10 fill-white" onClick={debug}>
          {CookieEnjoyerIcon()}
        </div>
        {currentZoneNumber > 4 && (
          <div className={clsx("transition-opacity opacity-0 duration-300", fadeIn && "opacity-100")}>
            <FarmToggle />
          </div>
        )}
        <Monster>
          <Healthbar />
        </Monster>
        <ZoneMap />
      </div>
    </div>
  )
}
