// @ts-nocheck

import { useEffect, useState } from "react"

export function useForcedDPI() {
  const [dpiScale, setDpiScale] = useState(window.devicePixelRatio)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)

    const handleChange = () => {
      setDpiScale(window.devicePixelRatio)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
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
