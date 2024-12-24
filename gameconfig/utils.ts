// @ts-nocheck

import { useEffect, useState } from "react"
import { UpgradeIdWithLevel, UpgradeKey } from "../models/upgrades"
import { RootState } from "../redux/store"
import { PlayerState } from "../models/player"
import { selectInitState } from "../redux/playerSlice"

export const setInitElementMap: Record<UpgradeIdWithLevel | UpgradeKey, (state: PlayerState) => boolean> = {
  "click-multi.1": (state) => {
    state.hasInitClickMulti1 = true
  },
  "click-multi.2": (state) => {
    state.hasInitClickMulti2 = true
  },
  "click-multi.3": (state) => {
    state.hasInitClickMulti3 = true
  },
  "dot-multi.1": (state) => {
    state.hasInitDotMulti1 = true
  },
  "dot-multi.2": (state) => {
    state.hasInitDotMulti2 = true
  },
  "dot-multi.3": (state) => {
    state.hasInitDotMulti3 = true
  },
  dot: (state) => {
    state.hasInitDotPane = true
  },
  click: (state) => true,
}

export const initSelectorMap: Record<UpgradeIdWithLevel | UpgradeKey, (state: RootState) => boolean> = {
  "click-multi.1": (state) => selectInitState(state).hasInitClickMulti1,
  "click-multi.2": (state) => selectInitState(state).hasInitClickMulti2,
  "click-multi.3": (state) => selectInitState(state).hasInitClickMulti3,
  "dot-multi.1": (state) => selectInitState(state).hasInitDotMulti1,
  "dot-multi.2": (state) => selectInitState(state).hasInitDotMulti2,
  "dot-multi.3": (state) => selectInitState(state).hasInitDotMulti3,
  dot: (state) => selectInitState(state).hasInitDotPane,
}

export function useForcedDPI() {
  const getDPIScale = () => (window.matchMedia("(min-width: 1024px)").matches ? window.devicePixelRatio : 1)

  const [dpiScale, setDpiScale] = useState(getDPIScale)

  useEffect(() => {
    const queries = [
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),
      window.matchMedia("(min-width: 1024px)"),
    ]

    const handleChange = () => setDpiScale(getDPIScale())

    queries.forEach((query) => query.addEventListener("change", handleChange))

    return () => queries.forEach((query) => query.removeEventListener("change", handleChange))
  }, [])

  return dpiScale
}

export function serialize(classInstance) {
  if (classInstance == null || typeof classInstance !== "object") return classInstance

  if (Array.isArray(classInstance)) return classInstance.map(serialize)

  const serialized = {}

  for (const key of Object.keys(classInstance)) {
    serialized[key] = serialize(classInstance[key])
  }
  return serialized
}

function getAdditivePrice(atLevel, prestigeUpgrade) {
  return (((atLevel - 1) * atLevel) / 2) * prestigeUpgrade.additiveInc + prestigeUpgrade.priceBase * atLevel
}
