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

export default function Combat() {
  const dispatch = useAppDispatch()
  const currentZoneNumber = useAppSelector(selectCurrentZoneNumber)

  function debug() {
    console.log("click")
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
    <div className={`flex w-full lg:max-w-[55%] flex-col justify-center h-full p-8 rounded-3xl m-2 text-white`}>
      {currentZoneNumber > 4 && (
        <div className={clsx("flex basis-1/6 transition-opacity opacity-0 duration-1000", fadeIn && "opacity-100")}>
          <ZoneSelector />
        </div>
      )}
      <div className="basis-5/6 flex flex-col items-center relative">
        <div className="absolute top-0 left-0 w-7 h-7 z-10 fill-white" onClick={debug}>
          {CookieEnjoyerIcon()}
        </div>
        <Monster>
          <Healthbar />
        </Monster>
        <ZoneMap />
      </div>
    </div>
  )
}
